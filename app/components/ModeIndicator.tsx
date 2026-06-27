import React from 'react';
import { BotMode, Level } from '../types';


interface ModeIndicatorProps {
  mode: BotMode;
  level: Level;
  onLevelChange: (level: Level) => void;
}

export const ModeIndicator: React.FC<ModeIndicatorProps> = ({ mode, level, onLevelChange }) => {
  const getModeStyles = (currentMode: BotMode) => {
    switch (currentMode) {
      case 'Learning': return 'bg-purple-500 text-white';
      case 'Conversation': return 'bg-blue-500 text-white';
      case 'Engagement': return 'bg-amber-500 text-white';
      case 'Support': return 'bg-pink-500 text-white';
    }
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur rounded-2xl p-3 md:p-4 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center border-2 border-orange-200">
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-black text-orange-600">🤖 KidsBot 🌈</span>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
        <span className="px-3 py-1 bg-orange-100 text-orange-800 font-bold rounded-full text-xs md:text-sm border border-orange-300">
          🎒 Level: {level}
        </span>
        <span className={`px-3 py-1 font-bold rounded-full text-xs md:text-sm shadow-sm transition-colors ${getModeStyles(mode)}`}>
          ✨ {mode} Mode
        </span>
        
        <select
          value={level}
          onChange={(e) => onLevelChange(e.target.value as Level)}
          className="bg-orange-50 text-orange-800 font-bold px-3 py-1 rounded-full border border-orange-300 text-xs focus:outline-none"
        >
          <option value="L1">Level 1 (Words)</option>
          <option value="L2">Level 2 (Phrases)</option>
          <option value="L3">Level 3 (Sentences)</option>
        </select>
      </div>
    </div>
  );
};