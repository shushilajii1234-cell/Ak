import React, { useState } from 'react';
import { CHAPTERS } from '../data/chapters';
import { TOTAL_LEVELS } from '../data/levelGenerator';
import { X, Search, Lock, Star, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { playClick } from '../utils/sound';

interface LevelSelectModalProps {
  currentLevel: number;
  highestUnlockedLevel: number;
  completedLevels: Record<number, { stars: number }>;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  currentLevel,
  highestUnlockedLevel,
  completedLevels,
  onSelectLevel,
  onClose
}) => {
  // Current active chapter viewed in the selector (1 to 25)
  const initialChapter = Math.ceil(currentLevel / 20);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialChapter);
  const [jumpInput, setJumpInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (isNaN(target) || target < 1 || target > TOTAL_LEVELS) {
      setErrorMsg(`Please enter a level between 1 and ${TOTAL_LEVELS}`);
      return;
    }
    if (target > highestUnlockedLevel) {
      setErrorMsg(`Level ${target} is locked! Highest unlocked is ${highestUnlockedLevel}.`);
      return;
    }
    setErrorMsg(null);
    playClick();
    onSelectLevel(target);
    onClose();
  };

  const completedCount = Object.keys(completedLevels).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-slate-900 p-5 sm:p-6 shadow-[0_10px_0_#0f172a] relative flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Level Select</span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                500 Levels
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Completed {completedCount} / {TOTAL_LEVELS} levels
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

        {/* Jump to Level input bar */}
        <form onSubmit={handleJump} className="my-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              min={1}
              max={TOTAL_LEVELS}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder="Jump to Level (1 - 500)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm rounded-xl border border-slate-900 shadow-[0_2px_0_#0f172a] active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            Jump
          </button>
        </form>

        {errorMsg && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 mb-2">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Chapter Carousel Navigator */}
        <div className="flex items-center justify-between bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200 mb-3">
          <button
            onClick={() => {
              playClick();
              setSelectedChapterId((prev) => Math.max(1, prev - 1));
            }}
            disabled={selectedChapterId <= 1}
            className="p-1.5 rounded-xl hover:bg-amber-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-amber-900" />
          </button>

          <div className="text-center">
            <span className="text-sm font-black text-amber-950 flex items-center justify-center gap-1.5">
              <span>{activeChapter.badgeEmoji}</span>
              <span>Chapter {activeChapter.id}: {activeChapter.title}</span>
            </span>
            <span className="text-[11px] font-bold text-amber-800">
              Levels {activeChapter.startLevel} – {activeChapter.endLevel}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              setSelectedChapterId((prev) => Math.min(CHAPTERS.length, prev + 1));
            }}
            disabled={selectedChapterId >= CHAPTERS.length}
            className="p-1.5 rounded-xl hover:bg-amber-200/60 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-amber-900" />
          </button>
        </div>

        {/* Levels Grid (20 levels in current chapter) */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 sm:gap-3 py-1">
            {Array.from({ length: 20 }, (_, i) => activeChapter.startLevel + i).map((lvlNum) => {
              const isUnlocked = lvlNum <= highestUnlockedLevel;
              const isCurrent = lvlNum === currentLevel;
              const record = completedLevels[lvlNum];
              const isCompleted = !!record;

              return (
                <button
                  key={lvlNum}
                  onClick={() => {
                    if (isUnlocked) {
                      playClick();
                      onSelectLevel(lvlNum);
                      onClose();
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`h-16 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all relative ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-100 shadow-[0_3px_0_#d97706] scale-102 font-black'
                      : isCompleted
                      ? 'border-emerald-600 bg-emerald-50 hover:bg-emerald-100 shadow-[0_2px_0_#059669]'
                      : isUnlocked
                      ? 'border-slate-800 bg-white hover:bg-amber-50 shadow-[0_2px_0_#1e293b]'
                      : 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-sm sm:text-base font-black text-slate-900">
                    {lvlNum}
                  </span>

                  {isCompleted ? (
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= (record?.stars || 3)
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-bold text-amber-700 mt-1">Play</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400 mt-1" />
                  )}

                  {isCurrent && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Tap any previously completed level to replay & earn 3 stars!</span>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="font-bold text-slate-800 hover:text-amber-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
