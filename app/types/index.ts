export type Level = 'L1' | 'L2' | 'L3';
export type BotMode = 'Learning' | 'Conversation' | 'Engagement' | 'Support';

export interface MessagePart {
  text: string;
}

export interface Message {
  role: 'user' | 'model';
  parts: MessagePart[];
}

export interface ChatResponse {
  reply: string;
  mode: BotMode;
  suggestedLevel: Level;
}