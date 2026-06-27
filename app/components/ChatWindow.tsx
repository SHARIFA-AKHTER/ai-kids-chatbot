import React from 'react';

import { MessageBubble } from './MessageBubble';
import { Message } from '../types';

interface ChatWindowProps {
    messages: Message[];
    loading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading }) => {
    return (
        <div className="w-full flex-1 bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 overflow-y-auto min-h-87.5 max-h-[55vh] md:max-h-[60vh] flex flex-col gap-3 md:gap-4 border-2 border-orange-200">
            {messages.length === 0 && (
                <div className="text-center my-auto flex flex-col items-center justify-center">
                    <p className="text-4xl md:text-5xl animate-bounce">👋</p>
                    <h2 className="text-lg md:text-2xl font-black text-gray-700 mt-2">Hello Little Friend!</h2>
                    <p className="text-gray-500 text-xs md:text-sm max-w-sm mt-1">
                        Let&apos;s talk and learn some fun English words together! Tell me your favorite animal! 🦁
                    </p>
                </div>
            )}

            {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
            ))}

            {loading && (
                <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-500 rounded-xl md:rounded-2xl px-4 py-2 text-xs md:text-sm animate-pulse rounded-tl-none border border-gray-200">
                        🤖 Thinking of a fun game... ⭐
                    </div>
                </div>
            )}
        </div>
    );
};