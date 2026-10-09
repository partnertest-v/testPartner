export type PageId =
  | 'home'
  | 'experiences'
  | 'compatibility'
  | 'personality'
  | 'friendzone'
  | 'compliments'
  | 'daily'
  | 'games'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'adsense-guide';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  hasConsented: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    score: number;
    tag?: string;
  }[];
}

export interface QuizResult {
  title: string;
  percentage: number;
  badge: string;
  description: string;
  advice: string;
}

export interface Compliment {
  id: string;
  category: 'sweet' | 'funny' | 'poetic' | 'friendship';
  text: string;
  emoji: string;
}
