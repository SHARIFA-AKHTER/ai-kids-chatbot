'use client';

import { useState } from 'react';
import { BotMode, ChatResponse, Level, Message } from '../types';


export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [level, setLevel] = useState<Level>('L1');
  const [mode, setMode] = useState<BotMode>('Conversation');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', parts: [{ text }] };
    const updatedHistory = [...messages, userMessage];
    
    setMessages(updatedHistory);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentLevel: level,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error('Network response failure');

      const data = (await response.json()) as ChatResponse;

      setMessages((prev) => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
      setMode(data.mode);
      if (data.suggestedLevel !== level) {
        setLevel(data.suggestedLevel);
      }
    } catch (error) {
      console.error("Chat handling error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: 'model', parts: [{ text: "Oh look! A rainbow! 🌈 Let's try saying that again together!" }] }
      ]);
      setMode('Support');
    } finally {
      setLoading(false);
    }
  };

  return { messages, level, setLevel, mode, loading, sendMessage };
}