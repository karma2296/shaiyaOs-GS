
export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export interface GSApplication {
  id: string;
  userId: string;
  discordTag: string;
  characterName: string;
  age: number;
  timezone: string;
  hoursPerDay: string;
  experience: string;
  conflictScenario: string;
  hackerScenario: string;
  ethicsScenario: string;
  pressureScenario: string;
  communicationScenario: string;
  contribution: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  aiScore?: number;
  aiSummary?: string;
  submittedAt: string;
}

export type AppView = 'landing' | 'login' | 'form' | 'success' | 'admin';
