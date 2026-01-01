
import { GoogleGenAI, Type } from "@google/genai";
import { GSApplication } from "./types";

export const analyzeApplication = async (app: Partial<GSApplication>) => {
  try {
    // Obtenemos la API_KEY de forma segura
    let apiKey = '';
    try { apiKey = process.env.API_KEY || ''; } catch (e) { /* fallback */ }
    
    if (!apiKey) {
      console.warn("IA Sentinel: API_KEY no detectada. Usando evaluación por defecto.");
      return { score: 75, summary: "Evaluación automática: Candidato apto para revisión manual. (IA no disponible)" };
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this application for the Game Sage (GS) position in the Shaiya OS MMORPG server.
      
      Candidate Data:
      - Character Name: ${app.characterName}
      - Age: ${app.age}
      - Experience: ${app.experience}
      - Conflict Scenario: ${app.conflictScenario}
      - Hacker Scenario: ${app.hackerScenario}
      - Ethics Scenario: ${app.ethicsScenario}
      - Pressure Scenario: ${app.pressureScenario}
      - Communication Scenario: ${app.communicationScenario}
      - Potential Contribution: ${app.contribution}

      Evaluate based on: Maturity, Game Knowledge, Ethics, and Stress Management.
      Provide a JSON object with 'score' (0-100) and 'summary' (professional assessment in Spanish).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            summary: { type: Type.STRING },
          },
          required: ["score", "summary"],
        },
      },
    });

    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing application:", error);
    return { score: 50, summary: "Error técnico en el Oráculo. Se requiere revisión manual del Gran Consejo." };
  }
};
