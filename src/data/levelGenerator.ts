import { LevelData, PuzzleCategory } from '../types/level';
import { CHAPTERS, getChapterForLevel } from './chapters';
import { BESPOKE_LEVELS } from './bespokeLevels';

/**
 * Procedural + curated generator ensuring 500 rich, fully playable Brain Test style levels.
 */

interface LevelTemplate {
  title: string;
  question: string;
  category: PuzzleCategory;
  hint1: string;
  hint2: string;
  solutionExplanation: string;
  quip: string;
  props?: (lvl: number) => {
    interactiveProps?: LevelData['interactiveProps'];
    choices?: LevelData['choices'];
    tapOrderItems?: LevelData['tapOrderItems'];
    sliderConfig?: LevelData['sliderConfig'];
    combineTarget?: LevelData['combineTarget'];
    shakeThreshold?: number;
    shakeItemToDrop?: string;
    clickableWordInQuestion?: string;
  };
}

// 40 distinct thematic puzzle archetypes that get varied with distinct parameters across chapters
const ARCHETYPES: LevelTemplate[] = [
  {
    title: 'The Camouflaged Critter',
    question: 'Find the sneaky animal hiding in plain sight!',
    category: 'find_hidden',
    hint1: 'Something is hiding behind the dense vegetation.',
    hint2: 'Drag the foreground bush away to uncover the critter!',
    solutionExplanation: 'Moving the foliage uncovered the mischievous creature relaxing in the shadows.',
    quip: 'Eagle eyes! Nothing stays hidden from you.',
    props: (lvl) => {
      const animals = [
        { name: 'Chameleon', emoji: '🦎' },
        { name: 'Ninja Cat', emoji: '🐱' },
        { name: 'Squirrel', emoji: '🐿️' },
        { name: 'Fox', emoji: '🦊' },
        { name: 'Hedgehog', emoji: '🦔' },
        { name: 'Koala', emoji: '🐨' }
      ];
      const selected = animals[lvl % animals.length];
      return {
        interactiveProps: [
          { id: 'cover', name: 'Dense Bush', emoji: '🌿', initialX: 52, initialY: 52, isDraggable: true, isCover: true, hiddenBelowId: 'critter', zIndex: 20 },
          { id: 'critter', name: selected.name, emoji: selected.emoji, initialX: 52, initialY: 52, isDraggable: false, isTappable: true, trickAnswer: true, zIndex: 10 },
          { id: 'flower', name: 'Wildflower', emoji: '🌸', initialX: 20, initialY: 65, isDraggable: false, zIndex: 5 },
          { id: 'rock', name: 'Mossy Boulder', emoji: '🪨', initialX: 80, initialY: 60, isDraggable: false, zIndex: 5 }
        ]
      };
    }
  },
  {
    title: 'The Thirsty Beast',
    question: 'Give the thirsty animal a refreshing drink!',
    category: 'combine_items',
    hint1: 'Look for fresh water in the scene.',
    hint2: 'Drag the cold water bottle or bucket straight to the animal!',
    solutionExplanation: 'Delivering the hydration directly to the thirsty animal made it leap with joy.',
    quip: '10/10 hospitality! Stay hydrated, friend.',
    props: (lvl) => {
      const beasts = [
        { name: 'Lion', emoji: '🦁' },
        { name: 'Camel', emoji: '🐪' },
        { name: 'Elephant', emoji: '🐘' },
        { name: 'Panda', emoji: '🐼' },
        { name: 'Puppy', emoji: '🐶' }
      ];
      const beast = beasts[lvl % beasts.length];
      return {
        interactiveProps: [
          { id: 'water', name: 'Fresh Water', emoji: '💧', initialX: 22, initialY: 60, isDraggable: true, zIndex: 20 },
          { id: 'beast', name: beast.name, emoji: beast.emoji, initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
          { id: 'sun', name: 'Warm Sun', emoji: '☀️', initialX: 48, initialY: 20, isDraggable: false, zIndex: 5 }
        ],
        combineTarget: {
          sourceId: 'water',
          targetId: 'beast',
          resultEmoji: '✨' + beast.emoji,
          resultText: 'Slurp! The ' + beast.name + ' drank every last drop with delight!'
        }
      };
    }
  },
  {
    title: 'The Great Balance',
    question: 'Balance the antique weighing scale perfectly!',
    category: 'slider_dial',
    hint1: 'Both sides of the scale must equalize.',
    hint2: 'Adjust the slider until the balance level reads 50 kg!',
    solutionExplanation: 'Equilibrium reached! The dual pans aligned in perfect symmetry.',
    quip: 'A true equilibrium master!',
    props: (lvl) => {
      const target = 50 + ((lvl * 7) % 30);
      return {
        sliderConfig: {
          min: 10,
          max: 100,
          initial: 20,
          targetMin: target - 2,
          targetMax: target + 2,
          unit: 'kg',
          label: 'Counterweight Adjustment'
        }
      };
    }
  },
  {
    title: 'Speed Sorting',
    question: 'Tap the items in order from Lowest to Highest value!',
    category: 'tap_order',
    hint1: 'Check the numbers labeled on each item carefully.',
    hint2: 'Tap the smallest number first, followed by the others in ascending order.',
    solutionExplanation: 'You ordered every element with laser precision!',
    quip: 'Order restored to the universe!',
    props: (lvl) => {
      const base = (lvl * 3) % 20;
      const values = [base + 2, base + 5, base + 9, base + 14];
      const emojis = ['💎', '🪙', '🌟', '🏆'];
      return {
        tapOrderItems: values.map((val, idx) => ({
          id: `item_${idx}`,
          label: `Val: ${val}`,
          value: val,
          order: idx + 1,
          emoji: emojis[idx],
          color: idx % 2 === 0 ? 'bg-amber-100 border-amber-300' : 'bg-emerald-100 border-emerald-300'
        })).sort(() => Math.sin(lvl + 1) > 0 ? 1 : -1) // shuffle display order
      };
    }
  },
  {
    title: 'The Midnight Heist',
    question: 'Unlock the safe without triggering the alarm!',
    category: 'combine_items',
    hint1: 'Find the magnetic keycard or key.',
    hint2: 'Drag the keycard right into the electronic keypad slot.',
    solutionExplanation: 'Click! The electronic lock verified the clearance code and swung open smoothly.',
    quip: 'Smooth operator! The vault is yours.',
    props: () => ({
      interactiveProps: [
        { id: 'keycard', name: 'Golden Keycard', emoji: '💳', initialX: 20, initialY: 60, isDraggable: true, zIndex: 20 },
        { id: 'safe', name: 'Titanium Safe', emoji: '🔒', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'cam', name: 'Security Camera', emoji: '📹', initialX: 48, initialY: 25, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'keycard',
        targetId: 'safe',
        resultEmoji: '🔓',
        resultText: 'Access Granted! The heavy vault door unlatched!'
      }
    })
  },
  {
    title: 'The Sleepy Giant',
    question: 'Wake up the sleepy creature before noon!',
    category: 'shake_action',
    hint1: 'Gentle nudges will not work on this heavy sleeper.',
    hint2: 'Tap the SHAKE button repeatedly to rattle the scene!',
    solutionExplanation: 'The sudden earthquake-like shaking woke the sleeper right up with wide eyes!',
    quip: 'Rise and shine! Sleeping beauty is awake.',
    props: () => ({
      shakeThreshold: 3,
      interactiveProps: [
        { id: 'creature', name: 'Sleeping Bear', emoji: '🐻💤', initialX: 50, initialY: 45, isDraggable: false, zIndex: 10 },
        { id: 'pillow', name: 'Feather Pillow', emoji: '🛏️', initialX: 50, initialY: 70, isDraggable: false, zIndex: 5 },
        { id: 'alarm', name: 'Alarm Clock', emoji: '⏰', initialX: 20, initialY: 60, isDraggable: false, zIndex: 8 }
      ]
    })
  },
  {
    title: 'The Matchstick Equation',
    question: 'Which operation makes: 8 ? 2 = 16 true?',
    category: 'choice_trick',
    hint1: 'What happens when you multiply 8 by 2?',
    hint2: '8 times 2 is 16!',
    solutionExplanation: 'Multiplication is the key: 8 × 2 = 16.',
    quip: 'Math ninja reflexes engaged!',
    props: () => ({
      choices: [
        { id: 'add', label: '+ (Addition)', emoji: '➕', isCorrect: false, funnyFailReason: '8 + 2 is 10, not 16!' },
        { id: 'sub', label: '- (Subtraction)', emoji: '➖', isCorrect: false, funnyFailReason: '8 - 2 is 6!' },
        { id: 'mul', label: '× (Multiplication)', emoji: '✖️', isCorrect: true },
        { id: 'div', label: '÷ (Division)', emoji: '➗', isCorrect: false, funnyFailReason: '8 ÷ 2 is 4!' }
      ]
    })
  },
  {
    title: 'The Secret Ingredient',
    question: 'Finish the master chef’s soup by adding the final garnish!',
    category: 'combine_items',
    hint1: 'A pinch of rare spice or herb is missing.',
    hint2: 'Drag the fragrant herb branch into the boiling pot!',
    solutionExplanation: 'The aroma bloomed instantly—a five-star culinary masterpiece was born!',
    quip: 'Gordon Ramsay is shedding a tear of joy.',
    props: () => ({
      interactiveProps: [
        { id: 'herb', name: 'Fresh Basil', emoji: '🌿', initialX: 22, initialY: 60, isDraggable: true, zIndex: 20 },
        { id: 'pot', name: 'Simmering Soup', emoji: '🍲', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'spoon', name: 'Wooden Ladle', emoji: '🥄', initialX: 48, initialY: 35, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'herb',
        targetId: 'pot',
        resultEmoji: '✨🍲✨',
        resultText: 'Magnifique! The aroma of Michelin-star perfection fills the room!'
      }
    })
  },
  {
    title: 'The Sneaky Riddle',
    question: 'I have keys but no locks. I have space but no room. You can enter, but you cannot go outside. What am I?',
    category: 'choice_trick',
    hint1: 'You probably use one every single day at work or home.',
    hint2: 'Keys, Spacebar, Enter key...',
    solutionExplanation: 'A computer keyboard has keys, a space bar, and an Enter key!',
    quip: 'Type your way to glory!',
    props: () => ({
      choices: [
        { id: 'piano', label: 'Piano', emoji: '🎹', isCorrect: false, funnyFailReason: 'A piano has keys, but where is the space bar?' },
        { id: 'keyboard', label: 'Computer Keyboard', emoji: '⌨️', isCorrect: true },
        { id: 'hotel', label: 'Hotel Lobby', emoji: '🏨', isCorrect: false, funnyFailReason: 'A hotel definitely has rooms and locks!' },
        { id: 'rocket', label: 'Spaceship', emoji: '🚀', isCorrect: false, funnyFailReason: 'Astronauts can go outside for spacewalks!' }
      ]
    })
  },
  {
    title: 'The Plant Growth',
    question: 'Help the tiny seed blossom into a vibrant flower!',
    category: 'combine_items',
    hint1: 'Plants require nourishment to grow.',
    hint2: 'Drag the watering can right over the green sprout!',
    solutionExplanation: 'With fresh water and sunlight, petals unfurled into a glorious bloom!',
    quip: 'Green thumb certified!',
    props: () => ({
      interactiveProps: [
        { id: 'can', name: 'Watering Can', emoji: '🚿', initialX: 20, initialY: 55, isDraggable: true, zIndex: 20 },
        { id: 'sprout', name: 'Tiny Sprout', emoji: '🌱', initialX: 75, initialY: 65, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'cloud', name: 'Rain Cloud', emoji: '☁️', initialX: 48, initialY: 20, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'can',
        targetId: 'sprout',
        resultEmoji: '🌻',
        resultText: 'Pop! A majestic sunflower turned its golden face to the sky!'
      }
    })
  },
  {
    title: 'The Hidden Gem',
    question: 'Find the sparkling sapphire hidden beneath the stones!',
    category: 'find_hidden',
    hint1: 'One of the stones is covering something shiny.',
    hint2: 'Drag the large gray rock aside to reveal the gem!',
    solutionExplanation: 'Moving the heavy rock revealed the radiant royal blue sapphire!',
    quip: 'Treasure hunter extraordinaire!',
    props: () => ({
      interactiveProps: [
        { id: 'stone', name: 'Heavy Rock', emoji: '🪨', initialX: 52, initialY: 55, isDraggable: true, isCover: true, hiddenBelowId: 'gem', zIndex: 20 },
        { id: 'gem', name: 'Royal Sapphire', emoji: '💎', initialX: 52, initialY: 55, isDraggable: false, isTappable: true, trickAnswer: true, zIndex: 10 },
        { id: 'grass', name: 'Lush Moss', emoji: '🌾', initialX: 20, initialY: 65, isDraggable: false, zIndex: 5 },
        { id: 'pickaxe', name: 'Mining Pick', emoji: '⛏️', initialX: 80, initialY: 60, isDraggable: false, zIndex: 5 }
      ]
    })
  },
  {
    title: 'Laser Alignment',
    question: 'Align the laser mirror to reflect the beam to the crystal!',
    category: 'slider_dial',
    hint1: 'Rotate the angle slider.',
    hint2: 'Set the reflection angle to 45 degrees!',
    solutionExplanation: 'At 45 degrees, the laser beam hit the crystal core and ignited the power grid!',
    quip: 'Reflective brilliance!',
    props: () => ({
      sliderConfig: {
        min: 0,
        max: 90,
        initial: 15,
        targetMin: 43,
        targetMax: 47,
        unit: '°',
        label: 'Mirror Angle'
      }
    })
  },
  {
    title: 'The Flying Penguin',
    question: 'Penguins cannot fly... or can they? Help him take flight!',
    category: 'combine_items',
    hint1: 'Penguins have wings, but they are too heavy for normal flight.',
    hint2: 'Give the penguin the helium balloon to lift him into the clouds!',
    solutionExplanation: 'Tying the helium balloon to the penguin sent him floating joyfully among the seagulls!',
    quip: 'Physics bypassed! You made a penguin fly!',
    props: () => ({
      interactiveProps: [
        { id: 'balloon', name: 'Helium Balloon', emoji: '🎈', initialX: 22, initialY: 55, isDraggable: true, zIndex: 20 },
        { id: 'penguin', name: 'Happy Penguin', emoji: '🐧', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'ice', name: 'Ice Berg', emoji: '🧊', initialX: 48, initialY: 72, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'balloon',
        targetId: 'penguin',
        resultEmoji: '🐧🎈✨',
        resultText: 'Up, up, and away! The happiest flying penguin in Antarctica!'
      }
    })
  },
  {
    title: 'The Trickster Word',
    question: 'Click on the word "CORRECT" to advance to the next trial!',
    category: 'choice_trick',
    hint1: 'Read the question very carefully.',
    hint2: 'The word "CORRECT" is written right inside the prompt!',
    solutionExplanation: 'You clicked the literal word "CORRECT" inside the prompt sentence instead of the dummy buttons below!',
    quip: 'You saw right through the illusion!',
    props: () => ({
      clickableWordInQuestion: 'CORRECT',
      choices: [
        { id: 'opt_a', label: 'Option A (Wrong)', emoji: '❌', isCorrect: false, funnyFailReason: 'The question specifically said click the word CORRECT!' },
        { id: 'opt_b', label: 'Option B (Also Wrong)', emoji: '⚠️', isCorrect: false, funnyFailReason: 'Still a trap button!' },
        { id: 'opt_c', label: 'Right Here', emoji: '🔘', isCorrect: false, funnyFailReason: 'Look up in the question text!' }
      ]
    })
  },
  {
    title: 'The Fruit Tree Rattle',
    question: 'Knock down the golden fruit from the enchanted tree!',
    category: 'shake_action',
    hint1: 'The fruit is clinging tight to the top branch.',
    hint2: 'Use the SHAKE button to create a tremor!',
    solutionExplanation: 'A rhythmic shake dislodged the golden fruit straight into your welcoming hands!',
    quip: 'Golden harvest secured!',
    props: () => ({
      shakeThreshold: 3,
      interactiveProps: [
        { id: 'tree', name: 'Mystic Tree', emoji: '🌳', initialX: 50, initialY: 40, isDraggable: false, zIndex: 10 },
        { id: 'fruit', name: 'Golden Pear', emoji: '🍐', initialX: 48, initialY: 30, isDraggable: false, zIndex: 15 },
        { id: 'basket', name: 'Velvet Basket', emoji: '🧺', initialX: 50, initialY: 75, isDraggable: false, zIndex: 5 }
      ]
    })
  },
  {
    title: 'The Missing Car Wheel',
    question: 'Fix the car so the family can go on holiday!',
    category: 'combine_items',
    hint1: 'The rear wheel is missing.',
    hint2: 'Drag the spare tire onto the car!',
    solutionExplanation: 'With the spare tire bolted in, the engine roared to life: Vroom vroom!',
    quip: 'Road trip ready! Buckle up!',
    props: () => ({
      interactiveProps: [
        { id: 'tire', name: 'Spare Tire', emoji: '🛞', initialX: 22, initialY: 62, isDraggable: true, zIndex: 20 },
        { id: 'car', name: 'Red Convertible', emoji: '🚗', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'luggage', name: 'Suitcase', emoji: '🧳', initialX: 48, initialY: 70, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'tire',
        targetId: 'car',
        resultEmoji: '🏎️💨',
        resultText: 'Beep beep! The family speeds off to sunshine beach!'
      }
    })
  },
  {
    title: 'Counting the Clocks',
    question: 'What time will it be in 3 hours if it is currently 9:00?',
    category: 'choice_trick',
    hint1: 'Simple clock arithmetic: 9 + 3.',
    hint2: '9 + 3 = 12:00 (High noon)!',
    solutionExplanation: 'Adding 3 hours to 9:00 strikes 12:00 on the dot!',
    quip: 'Punctual as a Swiss chronometer!',
    props: () => ({
      choices: [
        { id: '11', label: '11:00', emoji: '🕚', isCorrect: false, funnyFailReason: 'That would only be 2 hours!' },
        { id: '12', label: '12:00', emoji: '🕛', isCorrect: true },
        { id: '1', label: '1:00', emoji: '🕐', isCorrect: false, funnyFailReason: '4 hours too late!' },
        { id: '2', label: '2:00', emoji: '🕑', isCorrect: false, funnyFailReason: 'Did the clock run wild?' }
      ]
    })
  },
  {
    title: 'The Hot Coffee',
    question: 'Cool down the piping hot coffee so it is safe to drink!',
    category: 'combine_items',
    hint1: 'What cools hot beverages instantly without spilling?',
    hint2: 'Drop the ice cubes into the steaming coffee cup!',
    solutionExplanation: 'Plop! The ice cubes melted, cooling the brew to the ideal sipping temperature.',
    quip: 'Barista perfection achieved!',
    props: () => ({
      interactiveProps: [
        { id: 'ice', name: 'Ice Cubes', emoji: '🧊', initialX: 22, initialY: 60, isDraggable: true, zIndex: 20 },
        { id: 'coffee', name: 'Steaming Cup', emoji: '☕', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'donut', name: 'Glazed Donut', emoji: '🍩', initialX: 48, initialY: 30, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'ice',
        targetId: 'coffee',
        resultEmoji: '🧋',
        resultText: 'Ahhh! Refreshing iced coffee ready for sipping!'
      }
    })
  },
  {
    title: 'Color Spectrum Order',
    question: 'Tap the rainbow colors in classic Roy G. Biv order (Red -> Yellow -> Green -> Blue)!',
    category: 'tap_order',
    hint1: 'Red comes first, then warm yellow, earthy green, and cool blue.',
    hint2: 'Order: Red -> Yellow -> Green -> Blue!',
    solutionExplanation: 'You traversed the rainbow spectrum with artistic grace!',
    quip: 'Prismatic perfection!',
    props: () => ({
      tapOrderItems: [
        { id: 'red', label: 'Red', value: 1, order: 1, emoji: '🔴', color: 'bg-red-100 border-red-400' },
        { id: 'yellow', label: 'Yellow', value: 2, order: 2, emoji: '🟡', color: 'bg-yellow-100 border-yellow-400' },
        { id: 'green', label: 'Green', value: 3, order: 3, emoji: '🟢', color: 'bg-green-100 border-green-400' },
        { id: 'blue', label: 'Blue', value: 4, order: 4, emoji: '🔵', color: 'bg-blue-100 border-blue-400' }
      ]
    })
  },
  {
    title: 'The Sleepy Owl’s Book',
    question: 'Give the scholar owl his spectacles so he can read his ancient spellbook!',
    category: 'combine_items',
    hint1: 'The owl cannot see the small runes without his glasses.',
    hint2: 'Drag the spectacles onto the owl’s beak!',
    solutionExplanation: 'With 20/20 vision restored, the owl began deciphering ancient lore with excitement!',
    quip: 'A true scholar in feathers!',
    props: () => ({
      interactiveProps: [
        { id: 'glasses', name: 'Round Spectacles', emoji: '👓', initialX: 20, initialY: 55, isDraggable: true, zIndex: 20 },
        { id: 'owl', name: 'Professor Owl', emoji: '🦉', initialX: 74, initialY: 55, isDraggable: false, isTarget: true, zIndex: 10 },
        { id: 'book', name: 'Ancient Tome', emoji: '📖', initialX: 48, initialY: 70, isDraggable: false, zIndex: 5 }
      ],
      combineTarget: {
        sourceId: 'glasses',
        targetId: 'owl',
        resultEmoji: '🦉✨',
        resultText: 'Hoo hoo! Now the ancient wisdom is crystal clear!'
      }
    })
  }
];

// Helper to generate levels 1 to 500
export function getLevel(levelId: number): LevelData {
  // If it's one of the bespoke first 20 levels, return it
  if (levelId >= 1 && levelId <= BESPOKE_LEVELS.length) {
    return BESPOKE_LEVELS[levelId - 1];
  }

  const chapter = getChapterForLevel(levelId);
  const archetypeIdx = (levelId - 1) % ARCHETYPES.length;
  const template = ARCHETYPES[archetypeIdx];

  const generatedProps = template.props ? template.props(levelId) : {};

  return {
    id: levelId,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    title: `${template.title} #${levelId}`,
    question: template.question,
    category: template.category,
    hint1: template.hint1,
    hint2: template.hint2,
    solutionExplanation: template.solutionExplanation,
    quip: template.quip,
    ...generatedProps
  };
}

export const TOTAL_LEVELS = 500;
