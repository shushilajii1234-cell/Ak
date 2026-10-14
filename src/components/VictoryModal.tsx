import React, { useEffect } from 'react';
import { Star, ArrowRight, RotateCcw, Lightbulb, Zap, Award } from 'lucide-react';
import { playVictory, playClick } from '../utils/sound';

interface VictoryModalProps {
  levelNumber: number;
  levelTitle: string;
  quip: string;
  solutionExplanation: string;
  stars: number;
  onNextLevel: () => void;
  onReplayLevel: () => void;
  hasNextLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelNumber,
  levelTitle,
  quip,
  solutionExplanation,
  stars,
  onNextLevel,
  onReplayLevel,
  hasNextLevel
}) => {
  useEffect(() => {
    playVictory();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[0_10px_0_#0f172a] text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Confetti banner accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-100/60 rounded-full pointer-events-none" />

        {/* Mascot Avatar */}
        <div className="w-24 h-24 mx-auto mb-3 rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[0_4px_0_#0f172a] bg-amber-50">
          <img
            src="/src/assets/images/brain_zingle_mascot_1791966211839.jpg"
            alt="Brain Zingle Mascot"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3].map((starIdx) => (
            <Star
              key={starIdx}
              className={`w-7 h-7 ${
                starIdx <= stars
                  ? 'text-amber-400 fill-amber-400 drop-shadow-sm animate-bounce'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          LEVEL {levelNumber} SOLVED!
        </h3>
        <p className="text-xs font-bold text-amber-700 mb-3">{levelTitle}</p>

        {/* Quip card */}
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl mb-3 text-sm font-extrabold text-amber-900">
          "{quip}"
        </div>

        {/* Insight / Explanation */}
        <div className="text-left bg-slate-50 border border-slate-200 p-3 rounded-2xl mb-4">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Zingle Trick Revealed</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {solutionExplanation}
          </p>
        </div>

        {/* Reward Pill Ticker */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-600 mb-5">
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>+2 Brain IQ</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-300" />
            <span>+5 Hints Added</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              onReplayLevel();
            }}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-900 text-slate-800 font-bold text-sm bg-slate-100 hover:bg-slate-200 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay</span>
          </button>

          {hasNextLevel && (
            <button
              onClick={() => {
                playClick();
                onNextLevel();
              }}
              className="flex-2 py-3 px-4 rounded-xl border-2 border-slate-900 text-slate-900 font-black text-sm sm:text-base bg-amber-400 hover:bg-amber-300 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
