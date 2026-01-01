
import { GoogleGenAI, Type } from "@google/genai";
import { GSApplication } from "./types";

export const analyzeApplication = async (app: Partial<GSApplication>) => {
  try {
    // Initializing the GoogleGenAI client with process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

      Evaluate the candidate based on:
      1. Professional maturity and objective decision-making.
      2. Game knowledge and technical logic.
      3. Conflict resolution and crisis communication.
      4. Integrity, staff ethics, and prioritization skills.

      Provide a JSON object with a 'score' (0-100) and a 'summary' (professional assessment in English).`,
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

    // Accessing the generated text using the .text property
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing application:", error);
    return { score: 0, summary: "AI analysis could not be performed at this time." };
  }
};
