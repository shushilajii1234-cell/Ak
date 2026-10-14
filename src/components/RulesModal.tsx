import React from 'react';
import { X, Lightbulb, Move, HelpCircle, Vibrate, Check } from 'lucide-react';
import { playClick } from '../utils/sound';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[0_10px_0_#0f172a] relative animate-in zoom-in-95 duration-200">
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
            <HelpCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              How to Play Brain Zingle
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Rules of engagement for lateral thinkers
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-5 text-left text-xs sm:text-sm font-medium text-slate-700">
          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <Move className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">
                Drag, Combine & Uncover
              </span>
              Drag items across the stage! Feed animals, light candles, or drag bushes away to find hidden objects.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <Vibrate className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">
                Shake the Canvas
              </span>
              When trees hold fruit or sleepers need waking, tap the SHAKE button to rattle the stage with physics!
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">
                Inspect the Question Itself
              </span>
              Sometimes the tricky answer is hidden inside the words or punctuation of the question itself.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">
                Two-Tier Clues
              </span>
              Stuck on a tricky level? Clue 1 gives a subtle nudge, while Clue 2 reveals the exact solution.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-xl border-2 border-slate-900 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
        >
          <Check className="w-4 h-4" />
          <span>I'm Ready to Zingle!</span>
        </button>
      </div>
    </div>
  );
};
