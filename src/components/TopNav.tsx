import React from 'react';
import { Grid, Sparkles, BookOpen, Award } from 'lucide-react';

interface TopNavProps {
  onOpenLevelSelect: () => void;
  onOpenChapters: () => void;
  onOpenStats: () => void;
  onOpenRules: () => void;
  currentLevel: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenLevelSelect,
  onOpenChapters,
  onOpenStats,
  onOpenRules,
  currentLevel
}) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-amber-200/60 sticky top-0 z-40 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🧠</span>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-amber-950 font-['Fredoka',sans-serif]">
            Brain Zingle
          </span>
        </div>

        {/* Zone 2: Single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={onOpenLevelSelect}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Grid className="w-4 h-4 text-amber-500" />
            <span>500 Levels</span>
          </button>

          <button
            onClick={onOpenChapters}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>25 Chapters</span>
          </button>

          <button
            onClick={onOpenStats}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Brain IQ</span>
          </button>

          <button
            onClick={onOpenRules}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Guide</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenLevelSelect}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 rounded-xl border-2 border-slate-900 shadow-[0_3px_0_#0f172a] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span>Level {currentLevel}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
