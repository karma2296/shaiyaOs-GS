
import { GSApplication } from './types';
import { getSafeEnv } from './supabaseClient';

export const sendDiscordWebhook = async (app: GSApplication) => {
  const webhookUrl = getSafeEnv('DISCORD_WEBHOOK_URL');
  
  if (!webhookUrl) {
    console.warn("Discord Webhook URL no configurada en Vercel.");
    return;
  }

  const embed = {
    title: "📜 Nueva Solicitud de Game Sage",
    description: `El usuario **${app.discordTag}** ha enviado un nuevo pergamino de reclutamiento para **Shaiya OS**.`,
    url: "https://shaiya-os-gs.vercel.app", 
    color: 0xc5a059, 
    fields: [
      { name: "👤 Personaje", value: `\`${app.characterName}\``, inline: true },
      { name: "🎂 Edad", value: app.age.toString(), inline: true },
      { name: "🌍 Zona Horaria", value: app.timezone, inline: true },
      { name: "⚖️ Puntuación IA", value: `**${app.aiScore}%**`, inline: true },
      { name: "🧠 Resumen del Oráculo", value: app.aiSummary || "Revisión pendiente." },
      { name: "💡 Propuesta", value: app.contribution.substring(0, 500) }
    ],
    thumbnail: { url: app.discordAvatar },
    footer: { text: "Sistema de Reclutamiento Shaiya OS" },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚀 **Nuevo Aspirante:** @everyone el usuario **${app.characterName}** ha postulado para GS.`,
        embeds: [embed]
      })
    });
  } catch (error) {
    console.error("Error enviando Webhook:", error);
  }
};

export const sendAcceptanceWebhook = async (app: GSApplication) => {
  // Nueva variable para el canal de anuncios de staff aceptado
  const webhookUrl = getSafeEnv('DISCORD_ACCEPTED_WEBHOOK_URL');
  
  if (!webhookUrl) {
    console.warn("Discord Acceptance Webhook no configurado.");
    return;
  }

  const embed = {
    title: "⚔️ ¡Nuevo Game Sage Ascendido!",
    description: `El Gran Consejo de **Shaiya OS** ha dictaminado sentencia. Un nuevo guardián se une a nuestras filas.`,
    color: 0x10b981, // Verde esmeralda
    fields: [
      { name: "🛡️ Nombre en Juego", value: `**${app.characterName}**`, inline: true },
      { name: "📡 Identidad Discord", value: app.discordTag, inline: true },
      { name: "📜 Veredicto", value: "Aprobado por méritos excepcionales y evaluación del Oráculo." }
    ],
    thumbnail: { url: app.discordAvatar },
    footer: { text: "Shaiya OS - Administración de Personal" },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🎊 **¡Bienvenido al Staff!** @everyone, denle la bienvenida al nuevo GS: **${app.characterName}**`,
        embeds: [embed]
      })
    });
  } catch (error) {
    console.error("Error enviando Webhook de aceptación:", error);
  }
};
