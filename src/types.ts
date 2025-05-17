
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  rank: string;
  avatar: string;
  level: number;
  completedLevels: string[];
  score: number;
  lastLogin: Date;
}

export interface GameLevel {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  unlockLevel: number;
  completed: boolean;
  image: string;
}

export interface GameScenario {
  id: string;
  levelId: string;
  title: string;
  description: string;
  questions: GameQuestion[];
  timeLimit: number; // in seconds
}

export interface GameQuestion {
  id: string;
  text: string;
  options: GameQuestionOption[];
  correctOptionId: string;
  explanation: string;
}

export interface GameQuestionOption {
  id: string;
  text: string;
  consequence?: string;
}

export type AuthState = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
