import React from 'react';
import { TOTAL_LEVELS } from '../data/levelGenerator';
import { X, Award, Star, Lightbulb, Zap, Brain, CheckCircle2 } from 'lucide-react';
import { playClick } from '../utils/sound';

interface StatsModalProps {
  brainIq: number;
  completedLevels: Record<number, { stars: number }>;
  hintsRemaining: number;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  brainIq,
  completedLevels,
  hintsRemaining,
  onClose
}) => {
  const solvedCount = Object.keys(completedLevels).length;
  const totalStars = Object.values(completedLevels).reduce((sum, item) => sum + (item.stars || 3), 0);

  // Compute Rank Title
  let rankTitle = 'Curious Novice';
  let rankDesc = 'You are warming up your creative synapses!';
  if (brainIq >= 160) {
    rankTitle = 'Galactic Mastermind';
    rankDesc = 'Your brain operates in 4 dimensions! Truly unstoppable.';
  } else if (brainIq >= 135) {
    rankTitle = 'Puzzle Grandmaster';
    rankDesc = 'Tricks and optical traps bounce right off your sharp intellect!';
  } else if (brainIq >= 110) {
    rankTitle = 'Riddle Buster';
    rankDesc = 'You spot the lateral trick before ordinary mortals even finish reading!';
  } else if (brainIq >= 90) {
    rankTitle = 'Lateral Scout';
    rankDesc = 'Thinking outside the box is becoming second nature to you.';
  }

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
            <Brain className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Brain Zingle Profile
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Your lateral thinking evaluation
            </p>
          </div>
        </div>

        {/* Big IQ Card */}
        <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-2xl text-center mb-4 relative overflow-hidden">
          <div className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">
            Official Zingle IQ
          </div>
          <div className="text-5xl font-black text-amber-950 font-mono tracking-tight my-1">
            {brainIq}
          </div>
          <div className="text-sm font-black text-amber-900 mt-1">
            🏆 {rankTitle}
          </div>
          <p className="text-xs text-amber-700 mt-1">
            {rankDesc}
          </p>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-center mb-1 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-lg font-black text-slate-900">
              {solvedCount}
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              Solved / {TOTAL_LEVELS}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-center mb-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div className="text-lg font-black text-slate-900">
              {totalStars}
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              Stars Collected
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-center mb-1 text-amber-600">
              <Lightbulb className="w-4 h-4 fill-amber-300" />
            </div>
            <div className="text-lg font-black text-slate-900">
              {hintsRemaining}
            </div>
            <div className="text-[10px] font-bold text-slate-500">
              Hints Left
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer text-sm"
        >
          Keep Training
        </button>
      </div>
    </div>
  );
};
