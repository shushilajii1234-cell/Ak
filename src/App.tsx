/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { LevelHeader } from './components/LevelHeader';
import { InteractiveStage } from './components/InteractiveStage';
import { VictoryModal } from './components/VictoryModal';
import { HintModal } from './components/HintModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { ChaptersModal } from './components/ChaptersModal';
import { StatsModal } from './components/StatsModal';
import { RulesModal } from './components/RulesModal';
import { getLevel, TOTAL_LEVELS } from './data/levelGenerator';
import { getChapterForLevel } from './data/chapters';
import { getSoundEnabled, setSoundEnabled, playClick, playHint } from './utils/sound';
import { Sparkles, Zap, Award, Grid, HelpCircle } from 'lucide-react';

const STORAGE_KEY = 'brain_zingle_progress_v1';

export default function App() {
  // Player Progress State
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<Record<number, { stars: number; solvedAt: number }>>({});
  const [hintsRemaining, setHintsRemaining] = useState<number>(25);
  const [brainIq, setBrainIq] = useState<number>(70);
  const [soundActive, setSoundActive] = useState<boolean>(getSoundEnabled());

  // In-level state
  const [usedHintThisLevel, setUsedHintThisLevel] = useState<boolean>(false);
  const [stageResetKey, setStageResetKey] = useState<number>(0);

  // Modals
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isChaptersOpen, setIsChaptersOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentLevel) setCurrentLevel(Math.min(TOTAL_LEVELS, Math.max(1, parsed.currentLevel)));
        if (parsed.highestUnlockedLevel) setHighestUnlockedLevel(Math.min(TOTAL_LEVELS, Math.max(1, parsed.highestUnlockedLevel)));
        if (parsed.completedLevels) setCompletedLevels(parsed.completedLevels);
        if (typeof parsed.hintsRemaining === 'number') setHintsRemaining(parsed.hintsRemaining);
        if (typeof parsed.brainIq === 'number') setBrainIq(parsed.brainIq);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save progress helper
  const saveProgress = (
    nextCurrent: number,
    nextUnlocked: number,
    nextCompleted: Record<number, { stars: number; solvedAt: number }>,
    nextHints: number,
    nextIq: number
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentLevel: nextCurrent,
          highestUnlockedLevel: nextUnlocked,
          completedLevels: nextCompleted,
          hintsRemaining: nextHints,
          brainIq: nextIq
        })
      );
    } catch {
      // Ignore storage errors
    }
  };

  const levelData = getLevel(currentLevel);
  const chapterData = getChapterForLevel(currentLevel);

  // Handlers
  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  const handleResetLevel = () => {
    setStageResetKey((k) => k + 1);
  };

  const handleSkipLevel = () => {
    if (currentLevel < TOTAL_LEVELS) {
      const nextLvl = currentLevel + 1;
      const nextUnlocked = Math.max(highestUnlockedLevel, nextLvl);
      setCurrentLevel(nextLvl);
      setHighestUnlockedLevel(nextUnlocked);
      setUsedHintThisLevel(false);
      setStageResetKey((k) => k + 1);
      saveProgress(nextLvl, nextUnlocked, completedLevels, hintsRemaining, brainIq);
    }
  };

  const handleSolveLevel = (hintUsed: boolean) => {
    const stars = hintUsed ? 2 : 3;
    const isFirstTime = !completedLevels[currentLevel];
    const newIq = isFirstTime ? brainIq + 2 : brainIq;
    const newHints = hintsRemaining + 5; // Reward bonus hints for beating levels!

    const nextCompleted = {
      ...completedLevels,
      [currentLevel]: {
        stars: Math.max(stars, completedLevels[currentLevel]?.stars || 0),
        solvedAt: Date.now()
      }
    };

    const nextUnlocked = Math.min(TOTAL_LEVELS, Math.max(highestUnlockedLevel, currentLevel + 1));

    setCompletedLevels(nextCompleted);
    setBrainIq(newIq);
    setHintsRemaining(newHints);
    setHighestUnlockedLevel(nextUnlocked);
    setIsVictoryOpen(true);

    saveProgress(currentLevel, nextUnlocked, nextCompleted, newHints, newIq);
  };

  const handleNextLevel = () => {
    setIsVictoryOpen(false);
    if (currentLevel < TOTAL_LEVELS) {
      const next = currentLevel + 1;
      setCurrentLevel(next);
      setUsedHintThisLevel(false);
      setStageResetKey((k) => k + 1);
      saveProgress(next, highestUnlockedLevel, completedLevels, hintsRemaining, brainIq);
    }
  };

  const handleReplayLevel = () => {
    setIsVictoryOpen(false);
    setUsedHintThisLevel(false);
    setStageResetKey((k) => k + 1);
  };

  const handleSelectLevel = (lvlId: number) => {
    setCurrentLevel(lvlId);
    setUsedHintThisLevel(false);
    setStageResetKey((k) => k + 1);
    saveProgress(lvlId, highestUnlockedLevel, completedLevels, hintsRemaining, brainIq);
  };

  const handleUseHint = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining((prev) => Math.max(0, prev - 1));
      setUsedHintThisLevel(true);
      playHint();
    }
  };

  const completedCount = Object.keys(completedLevels).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 antialiased selection:bg-amber-200">
      {/* Top Bar following contract */}
      <TopNav
        onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
        onOpenChapters={() => setIsChaptersOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        currentLevel={currentLevel}
      />

      {/* Main Game Shell */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-4 flex flex-col justify-between">
        <div>
          {/* Level Header HUD */}
          <LevelHeader
            levelNumber={currentLevel}
            chapterTitle={`Chapter ${chapterData.id}: ${chapterData.title}`}
            hintsRemaining={hintsRemaining}
            brainIq={brainIq}
            soundEnabled={soundActive}
            onToggleSound={handleToggleSound}
            onOpenHint={() => setIsHintOpen(true)}
            onResetLevel={handleResetLevel}
            onSkipLevel={handleSkipLevel}
          />

          {/* Core Interactive Puzzle Stage */}
          <InteractiveStage
            key={`${currentLevel}-${stageResetKey}`}
            level={levelData}
            onSolveLevel={handleSolveLevel}
            usedHintThisLevel={usedHintThisLevel}
          />
        </div>

        {/* Bottom Progress Bar & Quick Stats */}
        <div className="w-full max-w-3xl mx-auto mt-6 pt-4 border-t border-amber-200/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5 px-1">
            <span className="flex items-center gap-1.5">
              <span>Overall Progress</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-bold">{completedCount} of {TOTAL_LEVELS} Solved</span>
            </span>
            <span className="font-mono text-amber-900 font-bold">
              {((completedCount / TOTAL_LEVELS) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <div
              className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(1, (completedCount / TOTAL_LEVELS) * 100)}%` }}
            />
          </div>

          {/* Mobile Navigation Buttons Bar */}
          <div className="flex md:hidden items-center justify-around mt-4 pt-2 border-t border-amber-200/40 text-xs font-bold text-slate-700">
            <button
              onClick={() => {
                playClick();
                setIsLevelSelectOpen(true);
              }}
              className="flex items-center gap-1 p-2 hover:text-amber-600 cursor-pointer"
            >
              <Grid className="w-4 h-4 text-amber-600" />
              <span>500 Levels</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setIsChaptersOpen(true);
              }}
              className="flex items-center gap-1 p-2 hover:text-amber-600 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Chapters</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setIsStatsOpen(true);
              }}
              className="flex items-center gap-1 p-2 hover:text-amber-600 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>IQ {brainIq}</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setIsRulesOpen(true);
              }}
              className="flex items-center gap-1 p-2 hover:text-amber-600 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Rules</span>
            </button>
          </div>
        </div>
      </main>

      {/* MODALS */}
      {isVictoryOpen && (
        <VictoryModal
          levelNumber={currentLevel}
          levelTitle={levelData.title}
          quip={levelData.quip}
          solutionExplanation={levelData.solutionExplanation}
          stars={usedHintThisLevel ? 2 : 3}
          onNextLevel={handleNextLevel}
          onReplayLevel={handleReplayLevel}
          hasNextLevel={currentLevel < TOTAL_LEVELS}
        />
      )}

      {isHintOpen && (
        <HintModal
          hint1={levelData.hint1}
          hint2={levelData.hint2}
          hintsRemaining={hintsRemaining}
          onUseHint={handleUseHint}
          onClose={() => setIsHintOpen(false)}
        />
      )}

      {isLevelSelectOpen && (
        <LevelSelectModal
          currentLevel={currentLevel}
          highestUnlockedLevel={highestUnlockedLevel}
          completedLevels={completedLevels}
          onSelectLevel={handleSelectLevel}
          onClose={() => setIsLevelSelectOpen(false)}
        />
      )}

      {isChaptersOpen && (
        <ChaptersModal
          highestUnlockedLevel={highestUnlockedLevel}
          completedLevels={completedLevels}
          onSelectLevel={handleSelectLevel}
          onClose={() => setIsChaptersOpen(false)}
        />
      )}

      {isStatsOpen && (
        <StatsModal
          brainIq={brainIq}
          completedLevels={completedLevels}
          hintsRemaining={hintsRemaining}
          onClose={() => setIsStatsOpen(false)}
        />
      )}

      {isRulesOpen && (
        <RulesModal onClose={() => setIsRulesOpen(false)} />
      )}
    </div>
  );
}
