import React from 'react';
import { Message } from '../types';


interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 md:px-5 md:py-3 font-medium text-base md:text-lg shadow-sm transition-all ${
          isUser
            ? 'bg-orange-500 text-white rounded-tr-none'
            : 'bg-emerald-100 text-emerald-900 rounded-tl-none border border-emerald-200'
        }`}
      >
        {message.parts[0].text}
      </div>
    </div>
  );
};