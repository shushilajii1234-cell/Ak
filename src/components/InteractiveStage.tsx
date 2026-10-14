import React, { useState, useEffect, useRef } from 'react';
import { LevelData, InteractiveProp } from '../types/level';
import { playPop, playSuccess, playWrong, playShake, playClick } from '../utils/sound';
import { Sparkles, Check, Vibrate, CheckCircle2 } from 'lucide-react';

interface InteractiveStageProps {
  level: LevelData;
  onSolveLevel: (usedHint: boolean) => void;
  usedHintThisLevel: boolean;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  level,
  onSolveLevel,
  usedHintThisLevel
}) => {
  // Draggable props positions state (in percentage of stage width/height)
  const [propPositions, setPropPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // For choice puzzles
  const [failedChoiceId, setFailedChoiceId] = useState<string | null>(null);
  const [failReason, setFailReason] = useState<string | null>(null);

  // For tap sequence puzzles
  const [currentOrderIndex, setCurrentOrderIndex] = useState<number>(1);
  const [tappedItemIds, setTappedItemIds] = useState<string[]>([]);

  // For slider puzzles
  const [sliderVal, setSliderVal] = useState<number>(level.sliderConfig?.initial || 0);

  // For shake puzzles
  const [shakeCount, setShakeCount] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // For combine success animation
  const [combinedResult, setCombinedResult] = useState<{ emoji?: string; text?: string } | null>(null);

  // Reset stage state whenever level changes
  useEffect(() => {
    const initPos: Record<string, { x: number; y: number }> = {};
    level.interactiveProps?.forEach((p) => {
      initPos[p.id] = { x: p.initialX, y: p.initialY };
    });
    setPropPositions(initPos);
    setActiveDragId(null);
    setFailedChoiceId(null);
    setFailReason(null);
    setCurrentOrderIndex(1);
    setTappedItemIds([]);
    setSliderVal(level.sliderConfig?.initial || 0);
    setShakeCount(0);
    setIsShaking(false);
    setCombinedResult(null);
  }, [level.id]);

  // Pointer drag handling
  const handlePointerDown = (propId: string, e: React.PointerEvent) => {
    const prop = level.interactiveProps?.find((p) => p.id === propId);
    if (!prop?.isDraggable || !stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const current = propPositions[propId] || { x: prop.initialX, y: prop.initialY };

    // Calculate mouse position relative to stage in percentage
    const pointerPercentX = ((e.clientX - rect.left) / rect.width) * 100;
    const pointerPercentY = ((e.clientY - rect.top) / rect.height) * 100;

    dragStartOffset.current = {
      x: pointerPercentX - current.x,
      y: pointerPercentY - current.y
    };

    setActiveDragId(propId);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    playPop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragId || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();

    const pointerPercentX = ((e.clientX - rect.left) / rect.width) * 100;
    const pointerPercentY = ((e.clientY - rect.top) / rect.height) * 100;

    const newX = Math.max(5, Math.min(92, pointerPercentX - dragStartOffset.current.x));
    const newY = Math.max(5, Math.min(92, pointerPercentY - dragStartOffset.current.y));

    setPropPositions((prev) => ({
      ...prev,
      [activeDragId]: { x: newX, y: newY }
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeDragId) return;
    const draggedId = activeDragId;
    setActiveDragId(null);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Check collision with combine target
    if (level.combineTarget && level.combineTarget.sourceId === draggedId) {
      const targetProp = level.interactiveProps?.find((p) => p.id === level.combineTarget?.targetId);
      if (targetProp) {
        const draggedPos = propPositions[draggedId];
        const targetPos = propPositions[targetProp.id] || { x: targetProp.initialX, y: targetProp.initialY };

        // Distance formula in percentage space
        const dist = Math.hypot(draggedPos.x - targetPos.x, draggedPos.y - targetPos.y);

        if (dist < 22) {
          // Success combine!
          playSuccess();
          setCombinedResult({
            emoji: level.combineTarget.resultEmoji,
            text: level.combineTarget.resultText
          });
          setTimeout(() => {
            onSolveLevel(usedHintThisLevel);
          }, 1100);
          return;
        }
      }
    }

    // Check if dragging revealed a hidden target
    const draggedProp = level.interactiveProps?.find((p) => p.id === draggedId);
    if (draggedProp?.isCover && draggedProp.hiddenBelowId) {
      const initCoverX = draggedProp.initialX;
      const curX = propPositions[draggedId]?.x || initCoverX;
      // If moved significantly away from origin
      if (Math.abs(curX - initCoverX) > 18) {
        playPop();
      }
    }
  };

  // Click on hidden item (e.g. puppy, gem, critter)
  const handlePropClick = (prop: InteractiveProp) => {
    if (prop.trickAnswer) {
      playSuccess();
      setTimeout(() => {
        onSolveLevel(usedHintThisLevel);
      }, 700);
    } else {
      playPop();
    }
  };

  // Choice click
  const handleChoiceClick = (isCorrect: boolean, failText?: string, choiceId?: string) => {
    if (isCorrect) {
      playSuccess();
      setFailedChoiceId(null);
      setFailReason(null);
      setTimeout(() => {
        onSolveLevel(usedHintThisLevel);
      }, 600);
    } else {
      playWrong();
      if (choiceId) setFailedChoiceId(choiceId);
      setFailReason(failText || 'Not quite! Think differently.');
      setTimeout(() => {
        setFailedChoiceId(null);
      }, 1500);
    }
  };

  // Tap sequence handler
  const handleTapOrderItem = (order: number, id: string) => {
    if (tappedItemIds.includes(id)) return;

    if (order === currentOrderIndex) {
      playPop();
      const nextTapped = [...tappedItemIds, id];
      setTappedItemIds(nextTapped);

      if (level.tapOrderItems && nextTapped.length === level.tapOrderItems.length) {
        playSuccess();
        setTimeout(() => {
          onSolveLevel(usedHintThisLevel);
        }, 700);
      } else {
        setCurrentOrderIndex((prev) => prev + 1);
      }
    } else {
      playWrong();
      setFailReason('Oops! Order broke. Try again from 1!');
      setTappedItemIds([]);
      setCurrentOrderIndex(1);
      setTimeout(() => setFailReason(null), 1500);
    }
  };

  // Shake trigger
  const handleShake = () => {
    playShake();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const nextCount = shakeCount + 1;
    setShakeCount(nextCount);

    const needed = level.shakeThreshold || 3;
    if (nextCount >= needed) {
      playSuccess();
      setTimeout(() => {
        onSolveLevel(usedHintThisLevel);
      }, 900);
    }
  };

  // Question click trick (e.g. clicking "." or "CORRECT")
  const renderQuestionWithTrick = () => {
    const trickWord = level.clickableWordInQuestion;
    if (!trickWord) {
      return <span>{level.question}</span>;
    }

    const parts = level.question.split(trickWord);
    return (
      <span>
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx < parts.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSuccess();
                  setTimeout(() => {
                    onSolveLevel(usedHintThisLevel);
                  }, 600);
                }}
                title="Trick word"
                className="inline-block text-amber-700 hover:text-amber-500 font-black underline decoration-wavy decoration-amber-400 cursor-pointer hover:scale-110 active:scale-95 transition-transform px-0.5"
              >
                {trickWord}
              </button>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Question Prompt Card */}
      <div className="w-full bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-900 shadow-[0_6px_0_#0f172a] mb-5 text-center relative overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
          {renderQuestionWithTrick()}
        </h2>

        {failReason && (
          <div className="mt-2.5 text-xs sm:text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 py-1 px-3 rounded-lg inline-block animate-bounce">
            ⚠️ {failReason}
          </div>
        )}
      </div>

      {/* Main Interactive Stage Canvas (App Bundle Console) */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full h-84 sm:h-96 bg-linear-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FEF3C7]/40 border-4 border-slate-900 rounded-3xl relative overflow-hidden select-none touch-none shadow-[0_10px_0_#0f172a,0_20px_25px_-5px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/10 flex items-center justify-center transition-shadow ${
          isShaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''
        }`}
      >
        {/* App Bundle Console Top Bezel Header */}
        <div className="absolute top-0 inset-x-0 h-8 bg-slate-900/5 border-b border-slate-900/10 px-4 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase text-amber-950/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-xs" />
            <span>App Bundle · Ch. {level.chapterId}</span>
          </div>

          {/* Console Speaker Slit & Sensor */}
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60" />
            <span className="w-8 h-1 rounded-full bg-slate-400/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/60" />
          </div>

          <div className="text-[10px] font-mono font-bold text-amber-900/70">
            L{level.id}/500
          </div>
        </div>

        {/* Diagonal Screen Gloss Sheen */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-linear-to-br from-white/40 via-white/10 to-transparent rounded-full blur-xs pointer-events-none z-10" />

        {/* Background decorative subtle dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* COMBINED RESULT DISPLAY */}
        {combinedResult && (
          <div className="absolute z-50 flex flex-col items-center justify-center inset-0 bg-white/80 backdrop-blur-xs animate-in zoom-in-75 duration-300">
            <span className="text-7xl mb-2 animate-bounce">{combinedResult.emoji}</span>
            <p className="text-base font-extrabold text-amber-950 text-center px-4 max-w-sm">
              {combinedResult.text}
            </p>
          </div>
        )}

        {/* 1. INTERACTIVE PROPS (Draggable & Tappable Items) */}
        {level.interactiveProps &&
          level.interactiveProps.map((prop) => {
            const pos = propPositions[prop.id] || { x: prop.initialX, y: prop.initialY };
            const isDraggingThis = activeDragId === prop.id;

            // If it's a shake puzzle and we're dropping items
            let displayY = pos.y;
            if (level.shakeThreshold && prop.id.includes('apple') && shakeCount >= 2) {
              displayY = 75; // dropped to basket!
            }

            return (
              <div
                key={prop.id}
                onPointerDown={(e) => handlePointerDown(prop.id, e)}
                onClick={() => handlePropClick(prop)}
                style={{
                  left: `${pos.x}%`,
                  top: `${displayY}%`,
                  zIndex: isDraggingThis ? 40 : prop.zIndex || 10,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute transition-all duration-75 select-none ${
                  prop.isDraggable
                    ? 'cursor-grab active:cursor-grabbing hover:scale-110 active:scale-105'
                    : prop.isTappable
                    ? 'cursor-pointer hover:scale-110 active:scale-95'
                    : ''
                } ${
                  prop.isTarget && activeDragId
                    ? 'ring-4 ring-amber-400 ring-offset-2 animate-pulse bg-amber-100/30 rounded-2xl p-1'
                    : ''
                }`}
              >
                <div className="flex flex-col items-center group">
                  <span className="text-5xl sm:text-6xl drop-shadow-md transition-transform">
                    {prop.emoji}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 bg-white/90 px-1.5 py-0.5 rounded-md border border-slate-200 mt-1 shadow-xs pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {prop.name}
                  </span>
                </div>
              </div>
            );
          })}

        {/* 2. CHOICE TRICK OPTIONS */}
        {level.choices && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 w-full max-w-md z-10">
            {level.choices.map((choice) => {
              const isFailed = failedChoiceId === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice.isCorrect, choice.funnyFailReason, choice.id)}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 border-slate-900 bg-white font-extrabold text-sm sm:text-base transition-all shadow-[0_4px_0_#0f172a] active:translate-y-1 active:shadow-none cursor-pointer ${
                    isFailed
                      ? 'bg-rose-100 border-rose-500 animate-[shake_0.4s_ease-in-out]'
                      : 'hover:bg-amber-50'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl mb-1.5">{choice.emoji}</span>
                  <span className="text-slate-800 text-center leading-tight">
                    {choice.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. TAP ORDER PUZZLE */}
        {level.tapOrderItems && (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 z-10">
            {level.tapOrderItems.map((item) => {
              const isTapped = tappedItemIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleTapOrderItem(item.order, item.id)}
                  disabled={isTapped}
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-2 border-slate-900 flex flex-col items-center justify-center p-2 transition-all shadow-[0_4px_0_#0f172a] active:translate-y-1 active:shadow-none cursor-pointer ${
                    isTapped
                      ? 'bg-emerald-100 border-emerald-500 opacity-60 scale-95'
                      : item.color || 'bg-white hover:scale-105'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl mb-1">{item.emoji}</span>
                  <span className="text-xs font-black text-slate-800">{item.label}</span>
                  {isTapped && <Check className="w-4 h-4 text-emerald-600 mt-1" />}
                </button>
              );
            })}
          </div>
        )}

        {/* 4. SLIDER / DIAL PUZZLE */}
        {level.sliderConfig && (
          <div className="flex flex-col items-center gap-4 p-6 bg-white/95 backdrop-blur-xs rounded-3xl border-2 border-slate-900 shadow-[0_4px_0_#0f172a] max-w-sm w-full mx-4 z-10">
            <span className="text-sm font-extrabold text-slate-700">
              {level.sliderConfig.label}
            </span>
            <div className="text-4xl font-black text-amber-600 font-mono">
              {sliderVal} {level.sliderConfig.unit}
            </div>

            <input
              type="range"
              min={level.sliderConfig.min}
              max={level.sliderConfig.max}
              value={sliderVal}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSliderVal(val);
                playPop();
              }}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            <button
              onClick={() => {
                const conf = level.sliderConfig!;
                if (sliderVal >= conf.targetMin && sliderVal <= conf.targetMax) {
                  playSuccess();
                  setTimeout(() => {
                    onSolveLevel(usedHintThisLevel);
                  }, 600);
                } else {
                  playWrong();
                  setFailReason(`Target range is around ${conf.targetMin} - ${conf.targetMax} ${conf.unit}!`);
                  setTimeout(() => setFailReason(null), 1500);
                }
              }}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm rounded-xl border-2 border-slate-900 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 transition-all cursor-pointer"
            >
              Set & Verify
            </button>
          </div>
        )}

        {/* 5. SHAKE ACTION BUTTON */}
        {level.category === 'shake_action' && (
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={handleShake}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs sm:text-sm rounded-2xl border-2 border-slate-900 shadow-[0_3px_0_#0f172a] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Vibrate className="w-5 h-5 text-slate-900" />
              <span>SHAKE! ({shakeCount}/{level.shakeThreshold || 3})</span>
            </button>
          </div>
        )}
      </div>

      {/* Subtle Hint Under Stage */}
      <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Try dragging, tapping, shaking, or inspecting the question text!</span>
      </div>
    </div>
  );
};
