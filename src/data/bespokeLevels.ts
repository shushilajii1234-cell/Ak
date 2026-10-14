import { LevelData } from '../types/level';

export const BESPOKE_LEVELS: LevelData[] = [
  {
    id: 1,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Real Giant',
    question: 'Which one is the BIGGEST animal in real life?',
    category: 'choice_trick',
    hint1: 'Do not look at the size of the drawings on screen.',
    hint2: 'Think about reality: who is the true titan of the animal kingdom?',
    solutionExplanation: 'The drawing of the lion was made huge on screen, but an Elephant is by far the biggest animal in reality!',
    quip: 'Never trust pixels over biology!',
    choices: [
      { id: 'ant', label: 'Ant', emoji: '🐜', isCorrect: false, funnyFailReason: 'Even with giant zoom, it is still an ant!' },
      { id: 'lion', label: 'Lion', emoji: '🦁', isCorrect: false, funnyFailReason: 'Drawn huge on screen, but not the biggest in real life!' },
      { id: 'elephant', label: 'Elephant', emoji: '🐘', isCorrect: true },
      { id: 'mouse', label: 'Mouse', emoji: '🐭', isCorrect: false, funnyFailReason: 'A mouse? Not unless it ate radioactive cheese!' },
    ]
  },
  {
    id: 2,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Morning Sunshine',
    question: 'Wake up the sleepy owl!',
    category: 'interactive_scene',
    hint1: 'Owls are nocturnal creatures—they sleep in daylight.',
    hint2: 'Drag the sun behind the mountain to bring the night!',
    solutionExplanation: 'Owls only wake up when darkness falls! By dragging the bright sun behind the mountains, night arrived and the owl opened its eyes.',
    quip: 'Hoo-ray! Night owls gonna night owl.',
    interactiveProps: [
      { id: 'sun', name: 'Bright Sun', emoji: '☀️', initialX: 75, initialY: 15, isDraggable: true, zIndex: 10 },
      { id: 'mountain', name: 'Mountain', emoji: '⛰️', initialX: 20, initialY: 55, isDraggable: false, isTarget: true, zIndex: 20 },
      { id: 'tree', name: 'Oak Tree', emoji: '🌳', initialX: 68, initialY: 45, isDraggable: false, zIndex: 15 },
      { id: 'owl', name: 'Sleeping Owl', emoji: '🦉', initialX: 72, initialY: 48, isDraggable: false, zIndex: 18 }
    ],
    combineTarget: {
      sourceId: 'sun',
      targetId: 'mountain',
      resultEmoji: '🌙',
      resultText: 'The sun set behind the peaks, welcoming the starry night!'
    }
  },
  {
    id: 3,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Cat Feast',
    question: 'Feed the hungry kitty!',
    category: 'combine_items',
    hint1: 'Cats love delicious fresh fish.',
    hint2: 'Drag the fish straight to the hungry kitty’s mouth!',
    solutionExplanation: 'Cats will not walk to the food if you can deliver it directly to their face like royalty!',
    quip: 'Purr-fect delivery service!',
    interactiveProps: [
      { id: 'fish', name: 'Delicious Fish', emoji: '🐟', initialX: 20, initialY: 60, isDraggable: true, zIndex: 20 },
      { id: 'cat', name: 'Whiskers Cat', emoji: '🐱', initialX: 75, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'bowl', name: 'Empty Bowl', emoji: '🥣', initialX: 72, initialY: 72, isDraggable: false, zIndex: 5 },
      { id: 'mouse_toy', name: 'Yarn Ball', emoji: '🧶', initialX: 45, initialY: 65, isDraggable: true, zIndex: 8 }
    ],
    combineTarget: {
      sourceId: 'fish',
      targetId: 'cat',
      resultEmoji: '😻',
      resultText: 'Nom nom nom! Whiskers is purring happily!'
    }
  },
  {
    id: 4,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Great Sprint',
    question: 'You pass the runner in 2nd place. What place are you in now?',
    category: 'choice_trick',
    hint1: 'If you take the spot of the person who was 2nd...',
    hint2: 'You do not become 1st yet! 1st is still ahead of you.',
    solutionExplanation: 'When you overtake the person in second place, you take their place—so you are now in 2nd place!',
    quip: 'Classic runner trap! Keep sprinting for 1st!',
    choices: [
      { id: '1st', label: '1st Place', emoji: '🥇', isCorrect: false, funnyFailReason: 'Who is ahead of you then? The original 1st runner!' },
      { id: '2nd', label: '2nd Place', emoji: '🥈', isCorrect: true },
      { id: '3rd', label: '3rd Place', emoji: '🥉', isCorrect: false, funnyFailReason: 'You passed them, you did not drop behind!' },
      { id: 'Last', label: 'Last Place', emoji: '🐢', isCorrect: false, funnyFailReason: 'Not unless you tripped over your shoelaces.' },
    ]
  },
  {
    id: 5,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Apple Harvest',
    question: 'Collect the apples from the tree!',
    category: 'shake_action',
    hint1: 'Apples do not jump down on their own.',
    hint2: 'Give the tree a vigorous SHAKE using the shake button!',
    solutionExplanation: 'When you shook the tree with gusto, gravity did the rest and ripe apples tumbled down!',
    quip: 'Sir Isaac Newton would be proud!',
    shakeThreshold: 3,
    shakeItemToDrop: 'apple',
    interactiveProps: [
      { id: 'tree', name: 'Apple Tree', emoji: '🌳', initialX: 50, initialY: 35, isDraggable: false, zIndex: 10 },
      { id: 'apple1', name: 'High Apple', emoji: '🍎', initialX: 42, initialY: 28, isDraggable: false, zIndex: 12 },
      { id: 'apple2', name: 'Juicy Apple', emoji: '🍎', initialX: 56, initialY: 25, isDraggable: false, zIndex: 12 },
      { id: 'apple3', name: 'Sweet Apple', emoji: '🍎', initialX: 50, initialY: 38, isDraggable: false, zIndex: 12 },
      { id: 'basket', name: 'Woven Basket', emoji: '🧺', initialX: 50, initialY: 75, isDraggable: false, zIndex: 8 }
    ]
  },
  {
    id: 6,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Birthday Candle',
    question: 'Light the birthday candle on the cupcake!',
    category: 'combine_items',
    hint1: 'There is an unlit matchstick on the desk.',
    hint2: 'Drag the flaming matchstick to the candle wick!',
    solutionExplanation: 'Striking and bringing the burning flame straight to the candle brings birthday cheer!',
    quip: 'Make a wish before the frosting melts!',
    interactiveProps: [
      { id: 'match', name: 'Flaming Match', emoji: '🔥', initialX: 22, initialY: 62, isDraggable: true, zIndex: 20 },
      { id: 'cupcake', name: 'Cupcake with Candle', emoji: '🧁', initialX: 72, initialY: 62, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'gift', name: 'Gift Box', emoji: '🎁', initialX: 48, initialY: 70, isDraggable: false, zIndex: 5 }
    ],
    combineTarget: {
      sourceId: 'match',
      targetId: 'cupcake',
      resultEmoji: '🎂',
      resultText: 'Tada! The candle is glowing brightly!'
    }
  },
  {
    id: 7,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Tap in Order',
    question: 'Tap the fruits in order: Smallest to Largest!',
    category: 'tap_order',
    hint1: 'Which fruit is tiny? Which one is massive?',
    hint2: 'Order: Blueberry -> Strawberry -> Orange -> Watermelon!',
    solutionExplanation: 'Starting from the tiny blueberry up to the colossal watermelon was the true path of fruit scales.',
    quip: 'A master of fresh proportions!',
    tapOrderItems: [
      { id: 'berry', label: 'Blueberry', value: 1, order: 1, emoji: '🫐', color: 'bg-indigo-100 border-indigo-400' },
      { id: 'straw', label: 'Strawberry', value: 2, order: 2, emoji: '🍓', color: 'bg-red-100 border-red-400' },
      { id: 'orange', label: 'Orange', value: 3, order: 3, emoji: '🍊', color: 'bg-amber-100 border-amber-400' },
      { id: 'melon', label: 'Watermelon', value: 4, order: 4, emoji: '🍉', color: 'bg-emerald-100 border-emerald-400' }
    ]
  },
  {
    id: 8,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Hidden Puppy',
    question: 'Where is the puppy hiding?',
    category: 'find_hidden',
    hint1: 'Puppies love hiding behind thick green shrubs.',
    hint2: 'Drag the green bush to the left to reveal the sneaky pup!',
    solutionExplanation: 'Moving the bush revealed the adorable puppy sitting comfortably in the dirt.',
    quip: 'Busted! Found the master of hide and seek!',
    interactiveProps: [
      { id: 'bush', name: 'Green Bush', emoji: '🌿', initialX: 52, initialY: 55, isDraggable: true, isCover: true, hiddenBelowId: 'puppy', zIndex: 20 },
      { id: 'puppy', name: 'Spotted Puppy', emoji: '🐶', initialX: 52, initialY: 55, isDraggable: false, isTappable: true, trickAnswer: true, zIndex: 10 },
      { id: 'flower', name: 'Tulip', emoji: '🌷', initialX: 20, initialY: 65, isDraggable: false, zIndex: 5 },
      { id: 'fence', name: 'Garden Fence', emoji: '🪵', initialX: 82, initialY: 60, isDraggable: false, zIndex: 5 }
    ]
  },
  {
    id: 9,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Odd Cloud',
    question: 'Find the odd cloud that is hiding a thunderbolt!',
    category: 'choice_trick',
    hint1: 'Look closely at each cloud.',
    hint2: 'Cloud C has a faint dark rumble to it!',
    solutionExplanation: 'Cloud C was charged with electric mischief! One tap discharged the spark.',
    quip: 'Shockingly brilliant deduction!',
    choices: [
      { id: 'c1', label: 'Fluffy Cloud A', emoji: '☁️', isCorrect: false, funnyFailReason: 'Just pure fluffy vapor here.' },
      { id: 'c2', label: 'Gentle Cloud B', emoji: '⛅', isCorrect: false, funnyFailReason: 'Just basking in morning rays.' },
      { id: 'c3', label: 'Dark Cloud C', emoji: '🌩️', isCorrect: true },
      { id: 'c4', label: 'Wispy Cloud D', emoji: '💨', isCorrect: false, funnyFailReason: 'That is just a gust of wind!' }
    ]
  },
  {
    id: 10,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Thermometer',
    question: 'Warm up the room to exactly 25°C!',
    category: 'slider_dial',
    hint1: 'Drag the thermostat slider up from cold to comfortable.',
    hint2: 'Set it right at 25°C for the cozy sweet spot.',
    solutionExplanation: '25°C is the golden standard of room comfort! Neither freezing nor roasting.',
    quip: 'Cozy and calibrated!',
    sliderConfig: {
      min: 0,
      max: 40,
      initial: 10,
      targetMin: 24,
      targetMax: 26,
      unit: '°C',
      label: 'Thermostat Temperature'
    }
  },
  {
    id: 11,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Literal Thinking',
    question: 'Tap on the smallest DOT on this screen.',
    category: 'choice_trick',
    hint1: 'Look around carefully, including the question text itself!',
    hint2: 'Notice the period dot "." at the end of the question?',
    solutionExplanation: 'The smallest dot wasn’t among the colored circles—it was the tiny typographic period "." at the end of the sentence!',
    quip: 'Your attention to detail is off the charts!',
    clickableWordInQuestion: '.',
    choices: [
      { id: 'red', label: 'Red Dot', emoji: '🔴', isCorrect: false, funnyFailReason: 'Quite big compared to a punctuation mark!' },
      { id: 'blue', label: 'Blue Dot', emoji: '🔵', isCorrect: false, funnyFailReason: 'Too large! Look elsewhere.' },
      { id: 'yellow', label: 'Yellow Dot', emoji: '🟡', isCorrect: false, funnyFailReason: 'That is the biggest dot on the board!' }
    ]
  },
  {
    id: 12,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Unlock the Treasure',
    question: 'Open the locked treasure chest!',
    category: 'combine_items',
    hint1: 'The key is lying under the pile of gold coins.',
    hint2: 'Drag the golden key into the padlock keyhole!',
    solutionExplanation: 'Matching the shiny key to the iron lock released the sparkling ancient gemstones!',
    quip: 'Loot acquired! You have the master touch.',
    interactiveProps: [
      { id: 'key', name: 'Golden Key', emoji: '🗝️', initialX: 25, initialY: 65, isDraggable: true, zIndex: 20 },
      { id: 'chest', name: 'Iron Chest', emoji: '🧰', initialX: 72, initialY: 65, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'skull', name: 'Pirate Flag', emoji: '🏴‍☠️', initialX: 48, initialY: 30, isDraggable: false, zIndex: 5 }
    ],
    combineTarget: {
      sourceId: 'key',
      targetId: 'chest',
      resultEmoji: '💎',
      resultText: 'Click! The chest swings open with dazzling diamonds!'
    }
  },
  {
    id: 13,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Tortoise vs Hare',
    question: 'Help the slow tortoise win the championship race!',
    category: 'interactive_scene',
    hint1: 'The speedy rabbit will sprint ahead unless something distracts him.',
    hint2: 'Drag the delicious juicy carrot in front of the rabbit to make him stop and munch!',
    solutionExplanation: 'The rabbit stopped dead in his tracks to feast on the carrot, letting the steady tortoise cruise past the finish line!',
    quip: 'Slow and steady, especially with vegetables!',
    interactiveProps: [
      { id: 'carrot', name: 'Juicy Carrot', emoji: '🥕', initialX: 18, initialY: 65, isDraggable: true, zIndex: 20 },
      { id: 'hare', name: 'Speedy Hare', emoji: '🐇', initialX: 48, initialY: 45, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'tortoise', name: 'Tortoise', emoji: '🐢', initialX: 80, initialY: 65, isDraggable: false, zIndex: 12 },
      { id: 'flag', name: 'Finish Line', emoji: '🏁', initialX: 88, initialY: 40, isDraggable: false, zIndex: 8 }
    ],
    combineTarget: {
      sourceId: 'carrot',
      targetId: 'hare',
      resultEmoji: '🏆',
      resultText: 'The hare is busy snacking! The tortoise crosses the finish ribbon!'
    }
  },
  {
    id: 14,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Matchstick Fix',
    question: 'How many triangles are there in this pyramid?',
    category: 'choice_trick',
    hint1: 'Count the small ones first, then remember the overarching big one.',
    hint2: '3 small triangles inside + 1 big overarching triangle = 4 or maybe more?',
    solutionExplanation: 'With 3 small inner sections and 1 encompassing outer boundary, there are 4 triangles total!',
    quip: 'Geometry wizardry at its finest!',
    choices: [
      { id: '3', label: '3', emoji: '📐', isCorrect: false, funnyFailReason: 'Did you forget the big triangle containing them all?' },
      { id: '4', label: '4', emoji: '🔺', isCorrect: true },
      { id: '5', label: '5', emoji: '✨', isCorrect: false, funnyFailReason: 'A bit too ambitious with phantom triangles!' },
      { id: '6', label: '6', emoji: '🌟', isCorrect: false, funnyFailReason: 'Counting shadows now, are we?' }
    ]
  },
  {
    id: 15,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Extinguish the Fire',
    question: 'Put out the campfire before it spreads!',
    category: 'combine_items',
    hint1: 'Water extinguishes open flame.',
    hint2: 'Drag the water bucket right on top of the fiery campfire!',
    solutionExplanation: 'Pouring the splash bucket directly over the flame safely extinguished the coals with a hiss of steam.',
    quip: 'Smokey Bear approves your quick action!',
    interactiveProps: [
      { id: 'bucket', name: 'Water Bucket', emoji: '🪣', initialX: 20, initialY: 60, isDraggable: true, zIndex: 20 },
      { id: 'fire', name: 'Roaring Campfire', emoji: '🔥', initialX: 74, initialY: 60, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'marshmallow', name: 'Marshmallow on Stick', emoji: '🍢', initialX: 48, initialY: 30, isDraggable: false, zIndex: 8 }
    ],
    combineTarget: {
      sourceId: 'bucket',
      targetId: 'fire',
      resultEmoji: '💨',
      resultText: 'Ssssshhhh! The fire is completely extinguished with cool water!'
    }
  },
  {
    id: 16,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Catch the Star',
    question: 'Tap the twinkling stars in ascending order of brightness (1 to 5)!',
    category: 'tap_order',
    hint1: 'Follow the numbers clearly labeled on each star.',
    hint2: 'Tap 1, then 2, then 3, then 4, and finally 5!',
    solutionExplanation: 'You carefully tracked each celestial spark in perfect chronological order!',
    quip: 'A stellar performance indeed!',
    tapOrderItems: [
      { id: 's1', label: 'Star 1', value: 1, order: 1, emoji: '⭐', color: 'bg-yellow-50 border-yellow-300' },
      { id: 's2', label: 'Star 2', value: 2, order: 2, emoji: '🌟', color: 'bg-amber-100 border-amber-400' },
      { id: 's3', label: 'Star 3', value: 3, order: 3, emoji: '✨', color: 'bg-orange-100 border-orange-400' },
      { id: 's4', label: 'Star 4', value: 4, order: 4, emoji: '💫', color: 'bg-rose-100 border-rose-400' },
      { id: 's5', label: 'Star 5', value: 5, order: 5, emoji: '🌠', color: 'bg-purple-100 border-purple-400' },
    ]
  },
  {
    id: 17,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Cool Snowman',
    question: 'The snowman is feeling too plain. Make him look super cool!',
    category: 'combine_items',
    hint1: 'What accessory makes anyone instantly cool?',
    hint2: 'Drag the sleek dark sunglasses onto the snowman’s face!',
    solutionExplanation: 'Putting sunglasses on the snowman transformed him into the chillest dude on the winter slope!',
    quip: 'Ice cold swagger unlocked!',
    interactiveProps: [
      { id: 'shades', name: 'Cool Sunglasses', emoji: '🕶️', initialX: 20, initialY: 55, isDraggable: true, zIndex: 20 },
      { id: 'snowman', name: 'Snowman', emoji: '⛄', initialX: 72, initialY: 55, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'scarf', name: 'Winter Scarf', emoji: '🧣', initialX: 46, initialY: 70, isDraggable: false, zIndex: 8 }
    ],
    combineTarget: {
      sourceId: 'shades',
      targetId: 'snowman',
      resultEmoji: '😎',
      resultText: 'Now that is one frosty VIP!'
    }
  },
  {
    id: 18,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Heavy Balloon',
    question: 'Which balloon is the HEAVIEST?',
    category: 'choice_trick',
    hint1: 'Which balloon is struggling against gravity instead of floating up?',
    hint2: 'The red balloon is filled with water, not helium!',
    solutionExplanation: 'Helium balloons float high, but a water-filled balloon rests heavily on the floor!',
    quip: 'Gravity wins over party gas!',
    choices: [
      { id: 'blue', label: 'Floating Blue Balloon', emoji: '🎈', isCorrect: false, funnyFailReason: 'Filled with light helium, floating upwards!' },
      { id: 'red', label: 'Water-Filled Red Balloon', emoji: '🎈💧', isCorrect: true },
      { id: 'green', label: 'Floating Green Balloon', emoji: '🎈', isCorrect: false, funnyFailReason: 'Drifting into the clouds!' },
      { id: 'gold', label: 'Floating Golden Balloon', emoji: '✨🎈', isCorrect: false, funnyFailReason: 'Light as a feather!' }
    ]
  },
  {
    id: 19,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'Pop the Balloon',
    question: 'Pop the balloon to reveal the confetti surprise!',
    category: 'combine_items',
    hint1: 'There is a sharp sewing needle nearby.',
    hint2: 'Drag the needle right into the balloon!',
    solutionExplanation: 'POP! The needle punctured the rubber and a shower of rainbow confetti exploded!',
    quip: 'A burst of pure satisfaction!',
    interactiveProps: [
      { id: 'needle', name: 'Sharp Pin', emoji: '📍', initialX: 22, initialY: 60, isDraggable: true, zIndex: 20 },
      { id: 'balloon', name: 'Purple Balloon', emoji: '🎈', initialX: 74, initialY: 55, isDraggable: false, isTarget: true, zIndex: 10 },
      { id: 'ribbon', name: 'Party Streamer', emoji: '🎉', initialX: 48, initialY: 30, isDraggable: false, zIndex: 5 }
    ],
    combineTarget: {
      sourceId: 'needle',
      targetId: 'balloon',
      resultEmoji: '🎊',
      resultText: 'BANG! Confetti everywhere!'
    }
  },
  {
    id: 20,
    chapterId: 1,
    chapterTitle: 'The Spark of Trickery',
    title: 'The Graduation Exam',
    question: 'Tap the green button 3 times, then the blue button 1 time!',
    category: 'choice_trick',
    hint1: 'Watch carefully: does the color of the buttons change?',
    hint2: 'Tap the button labeled "Green Button" three times!',
    solutionExplanation: 'You kept track of the colors even when they swapped positions!',
    quip: 'Chapter 1 Conquered! Your brain is firing on all cylinders!',
    choices: [
      { id: 'btn_green', label: 'Green Button', emoji: '🟢', isCorrect: true },
      { id: 'btn_blue', label: 'Blue Button', emoji: '🔵', isCorrect: false, funnyFailReason: 'Follow the sequence: tap the green one first!' },
      { id: 'btn_red', label: 'Red Button', emoji: '🔴', isCorrect: false, funnyFailReason: 'Red was not even invited to this party!' }
    ]
  }
];
