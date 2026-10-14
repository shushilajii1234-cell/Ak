import React, { useState } from 'react';
import { Lightbulb, Eye, X, Check } from 'lucide-react';
import { playClick, playHint } from '../utils/sound';

interface HintModalProps {
  hint1: string;
  hint2: string;
  hintsRemaining: number;
  onUseHint: () => void;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  hint1,
  hint2,
  hintsRemaining,
  onUseHint,
  onClose
}) => {
  const [revealedTier2, setRevealedTier2] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[0_10px_0_#0f172a] relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-amber-500 fill-amber-300" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Brain Clue
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Remaining hints: {hintsRemaining}
            </p>
          </div>
        </div>

        {/* Tier 1 Hint */}
        <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl mb-3">
          <div className="text-[11px] font-black text-amber-800 uppercase tracking-wider mb-1">
            Clue 1: Subtle Nudge
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">
            {hint1}
          </p>
        </div>

        {/* Tier 2 Hint */}
        {revealedTier2 ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-5 animate-in fade-in">
            <div className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-1">
              Clue 2: The Direct Trick
            </div>
            <p className="text-sm font-extrabold text-emerald-950 leading-snug">
              {hint2}
            </p>
          </div>
        ) : (
          <div className="border border-dashed border-slate-300 p-3.5 rounded-2xl mb-5 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Need the full spoiler?
            </span>
            <button
              onClick={() => {
                playHint();
                onUseHint();
                setRevealedTier2(true);
              }}
              className="text-xs font-extrabold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Solution</span>
            </button>
          </div>
        )}

        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Got it! Let's Solve</span>
        </button>
      </div>
    </div>
  );
};
