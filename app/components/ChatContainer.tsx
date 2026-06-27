'use client';

import { useState } from 'react';

import { ModeIndicator } from './ModeIndicator';
import { ChatWindow } from './ChatWindow';
import { useChat } from '../hooks/useChat';

export default function ChatContainer() {
  const { messages, level, setLevel, mode, loading, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl flex flex-col flex-1 h-full justify-between gap-4 mt-2">

      <ModeIndicator mode={mode} level={level} onLevelChange={setLevel} />


      <ChatWindow messages={messages} loading={loading} />


      <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or tell me something... ✏️"
          disabled={loading}
          className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-white border-2 border-orange-200 rounded-full shadow-md text-base md:text-lg focus:outline-none focus:border-orange-400 font-medium placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black h-[48px] md:h-[60px] px-6 md:px-8 rounded-full shadow-md transition-transform active:scale-95 text-base md:text-lg disabled:opacity-50 flex items-center justify-center"
        >
          Go! 🚀
        </button>
      </form>
    </div>
  );
}