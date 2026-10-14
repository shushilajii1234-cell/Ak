/**
 * Types and interfaces for Brain Zingle 500-level game
 */

export type PuzzleCategory =
  | 'interactive_scene'
  | 'choice_trick'
  | 'tap_order'
  | 'slider_dial'
  | 'combine_items'
  | 'find_hidden'
  | 'math_trick'
  | 'shake_action';

export interface InteractiveProp {
  id: string;
  name: string;
  emoji?: string;
  svgIcon?: string;
  initialX: number; // percentage or px
  initialY: number;
  width?: number;
  height?: number;
  isDraggable?: boolean;
  isTappable?: boolean;
  canDropOn?: string[]; // IDs of props this can be dropped on
  isTarget?: boolean;
  isCover?: boolean; // Covers a hidden item beneath it
  hiddenBelowId?: string;
  zIndex?: number;
  rotation?: number;
  scale?: number;
  customStyle?: string;
  trickAnswer?: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
  emoji?: string;
  isCorrect: boolean;
  funnyFailReason?: string;
}

export interface TapOrderItem {
  id: string;
  label: string;
  value: number;
  order: number; // 1, 2, 3...
  emoji?: string;
  color?: string;
}

export interface LevelData {
  id: number;
  chapterId: number;
  chapterTitle: string;
  title: string;
  question: string;
  category: PuzzleCategory;
  hint1: string;
  hint2: string;
  solutionExplanation: string;
  quip: string;
  
  // Specific data depending on category:
  interactiveProps?: InteractiveProp[];
  choices?: ChoiceOption[];
  tapOrderItems?: TapOrderItem[];
  
  // For slider puzzles:
  sliderConfig?: {
    min: number;
    max: number;
    initial: number;
    targetMin: number;
    targetMax: number;
    unit?: string;
    label: string;
  };

  // For combine items:
  combineTarget?: {
    sourceId: string;
    targetId: string;
    resultEmoji?: string;
    resultText?: string;
  };

  // For shake mechanics:
  shakeThreshold?: number; // clicks needed on shake or device shake
  shakeItemToDrop?: string;

  // Question click trick: clicking a word inside the question triggers victory!
  clickableWordInQuestion?: string;
}

export interface PlayerProgress {
  currentLevel: number;
  highestUnlockedLevel: number;
  completedLevels: Record<number, { stars: number; solvedAt: number }>;
  hintsRemaining: number;
  brainIq: number;
  soundEnabled: boolean;
}

export interface ChapterInfo {
  id: number;
  title: string;
  startLevel: number;
  endLevel: number;
  badgeEmoji: string;
  description: string;
}
