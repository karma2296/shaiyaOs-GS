
import { GSApplication } from './types';

export const sendDiscordWebhook = async (app: GSApplication) => {
  const webhookUrl = (import.meta as any).env?.VITE_DISCORD_WEBHOOK_URL || (process as any).env?.VITE_DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("Discord Webhook URL not configured. Skipping notification.");
    return;
  }

  const embed = {
    title: "📜 Nueva Solicitud de Game Sage",
    description: `El usuario **${app.discordTag}** ha enviado un nuevo pergamino de reclutamiento para **Shaiya OS**.`,
    color: 0xc5a059, // Color Oro Shaiya
    fields: [
      { name: "Personaje Principal", value: app.characterName, inline: true },
      { name: "Edad", value: app.age.toString(), inline: true },
      { name: "Zona Horaria", value: app.timezone, inline: true },
      { name: "Puntuación IA", value: `**${app.aiScore}%**`, inline: true },
      { name: "Resumen del Oráculo (IA)", value: app.aiSummary || "Sin resumen disponible." },
      { name: "Contribución Propuesta", value: app.contribution.substring(0, 500) + (app.contribution.length > 500 ? "..." : "") }
    ],
    thumbnail: { url: app.discordAvatar },
    timestamp: new Date().toISOString(),
    footer: { text: "Shaiya OS - GS Recruitment System" }
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🔔 **¡Nueva Solicitud!** El aspirante **${app.characterName}** busca unirse al staff.`,
        embeds: [embed]
      })
    });
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
  }
};
