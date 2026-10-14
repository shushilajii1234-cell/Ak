import React from 'react';
import { CHAPTERS } from '../data/chapters';
import { X, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { playClick } from '../utils/sound';

interface ChaptersModalProps {
  highestUnlockedLevel: number;
  completedLevels: Record<number, { stars: number }>;
  onSelectLevel: (lvl: number) => void;
  onClose: () => void;
}

export const ChaptersModal: React.FC<ChaptersModalProps> = ({
  highestUnlockedLevel,
  completedLevels,
  onSelectLevel,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-slate-900 p-5 sm:p-6 shadow-[0_10px_0_#0f172a] relative flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>All 25 Chapters</span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                500 Levels
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Explore the themed worlds of Brain Zingle
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
          {CHAPTERS.map((ch) => {
            const isUnlocked = highestUnlockedLevel >= ch.startLevel;
            // Count completed levels in this chapter
            let completedInChapter = 0;
            for (let i = ch.startLevel; i <= ch.endLevel; i++) {
              if (completedLevels[i]) completedInChapter++;
            }
            const isComplete = completedInChapter === 20;

            return (
              <div
                key={ch.id}
                onClick={() => {
                  if (isUnlocked) {
                    playClick();
                    onSelectLevel(Math.min(highestUnlockedLevel, ch.startLevel));
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isUnlocked
                    ? 'border-slate-800 bg-white hover:bg-amber-50 cursor-pointer shadow-[0_2px_0_#1e293b]'
                    : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                    {ch.badgeEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-700">
                        CHAPTER {ch.id}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs font-bold text-slate-500">
                        Levels {ch.startLevel}–{ch.endLevel}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                      {ch.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700">
                    {completedInChapter}/20
                  </span>
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isUnlocked ? (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 mt-2 text-right">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
