import React from 'react';
import { Lightbulb, RotateCcw, SkipForward, Volume2, VolumeX, Zap } from 'lucide-react';
import { playClick } from '../utils/sound';

interface LevelHeaderProps {
  levelNumber: number;
  chapterTitle: string;
  hintsRemaining: number;
  brainIq: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHint: () => void;
  onResetLevel: () => void;
  onSkipLevel: () => void;
}

export const LevelHeader: React.FC<LevelHeaderProps> = ({
  levelNumber,
  chapterTitle,
  hintsRemaining,
  brainIq,
  soundEnabled,
  onToggleSound,
  onOpenHint,
  onResetLevel,
  onSkipLevel
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      {/* Top row: Chapter, Level, and IQ */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800/80">
          <span className="font-bold text-amber-900">LEVEL {levelNumber}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[200px] sm:max-w-xs">{chapterTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>IQ {brainIq}</span>
        </div>
      </div>

      {/* Action toolstrip */}
      <div className="flex items-center justify-between gap-2 bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-slate-800 shadow-[0_4px_0_#1e293b]">
        {/* Left: Hint Button */}
        <button
          onClick={() => {
            playClick();
            onOpenHint();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl border-2 border-slate-900 shadow-[0_2px_0_#0f172a] active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 fill-amber-100 text-slate-900" />
          <span>Hint</span>
          <span className="bg-amber-900 text-amber-200 text-[10px] px-1.5 py-0.2 rounded-md font-mono">
            {hintsRemaining}
          </span>
        </button>

        {/* Center: Utility quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reset */}
          <button
            onClick={() => {
              playClick();
              onResetLevel();
            }}
            title="Reset Level"
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound */}
          <button
            onClick={() => {
              playClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Skip */}
          <button
            onClick={() => {
              playClick();
              onSkipLevel();
            }}
            title="Skip to Next Level"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Skip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
