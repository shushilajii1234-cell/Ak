import { ChapterInfo } from '../types/level';

export const CHAPTERS: ChapterInfo[] = [
  { id: 1, title: 'The Spark of Trickery', startLevel: 1, endLevel: 20, badgeEmoji: '⚡', description: 'Warm-up lateral thinking brain teasers to rewire your brain.' },
  { id: 2, title: 'Animals Gone Wild', startLevel: 21, endLevel: 40, badgeEmoji: '🦁', description: 'Clever animal mischief where things are never what they seem.' },
  { id: 3, title: 'Physics & Illusions', startLevel: 41, endLevel: 60, badgeEmoji: '🧲', description: 'Defy gravity, tilt expectations, and shift visual perspectives.' },
  { id: 4, title: 'Number Ninja & Matches', startLevel: 61, endLevel: 80, badgeEmoji: '🔢', description: 'Tricky math riddles, matchstick equations, and counting stunts.' },
  { id: 5, title: 'Everyday Shenanigans', startLevel: 81, endLevel: 100, badgeEmoji: '☕', description: 'Ordinary household situations with wildly extraordinary solutions.' },
  { id: 6, title: 'Detective Zingle Mysteries', startLevel: 101, endLevel: 120, badgeEmoji: '🕵️', description: 'Find the culprit, spot imposters, and crack locked vaults.' },
  { id: 7, title: 'Culinary Chaos', startLevel: 121, endLevel: 140, badgeEmoji: '🍳', description: 'Food puzzles, fiery stoves, runaway popcorn, and secret recipes.' },
  { id: 8, title: 'Galactic Mind Benders', startLevel: 141, endLevel: 160, badgeEmoji: '🚀', description: 'Outer space mysteries, planetary orbits, and extraterrestrial tricks.' },
  { id: 9, title: 'Visual Camouflage', startLevel: 161, endLevel: 180, badgeEmoji: '🦎', description: 'Spotting hidden creatures, camouflaged ninjas, and stealth items.' },
  { id: 10, title: 'Logic Paradoxes & Vaults', startLevel: 181, endLevel: 200, badgeEmoji: '🗝️', description: 'Ancient philosophical paradoxes with delightfully cheeky answers.' },
  { id: 11, title: 'Clockwork Enigmas', startLevel: 201, endLevel: 220, badgeEmoji: '⚙️', description: 'Turning gears, resetting pendulum clocks, and mastering timing.' },
  { id: 12, title: 'Secret Codes & Runes', startLevel: 221, endLevel: 240, badgeEmoji: '📜', description: 'Unraveling cyphers, ancient symbols, and hieroglyphic riddles.' },
  { id: 13, title: 'Trickster Carnival', startLevel: 241, endLevel: 260, badgeEmoji: '🎪', description: 'Fairground games, rigged shell tricks, and funhouse mirrors.' },
  { id: 14, title: 'Gravity Defiers', startLevel: 261, endLevel: 280, badgeEmoji: '🎈', description: 'Inverted water, floating boulders, and magnetic levitation.' },
  { id: 15, title: 'Elemental Alchemy', startLevel: 281, endLevel: 300, badgeEmoji: '🧪', description: 'Transmuting elements, brewing potions, and mixing storms.' },
  { id: 16, title: 'Jungle Safari Secrets', startLevel: 301, endLevel: 320, badgeEmoji: '🌴', description: 'Navigating crocodile rivers, swinging vines, and monkey treats.' },
  { id: 17, title: 'Deep Sea Riddles', startLevel: 321, endLevel: 340, badgeEmoji: '🐙', description: 'Underwater pressure, glowing lantern fish, and pirate sunken chests.' },
  { id: 18, title: "Time Traveler's Dilemma", startLevel: 341, endLevel: 360, badgeEmoji: '⏳', description: 'Hatching dinosaur eggs, ancient scrolls, and future portals.' },
  { id: 19, title: "Master Thief's Vault", startLevel: 361, endLevel: 380, badgeEmoji: '💎', description: 'Dodging laser grids, silent alarms, and swapping priceless gems.' },
  { id: 20, title: 'Optical Illusions Lab', startLevel: 381, endLevel: 400, badgeEmoji: '👁️', description: 'Size illusions, ambiguous shapes, and tricks of the human eye.' },
  { id: 21, title: 'Witty Wordplay & Puns', startLevel: 401, endLevel: 420, badgeEmoji: '💡', description: 'Literal thinking, clever word traps, and linguistic gymnastics.' },
  { id: 22, title: 'Castle Siege & Strategy', startLevel: 421, endLevel: 440, badgeEmoji: '🏰', description: 'Lowering medieval drawbridges, catapult launches, and royal puzzles.' },
  { id: 23, title: 'Grandmaster Mind Trials', startLevel: 441, endLevel: 460, badgeEmoji: '♟️', description: 'Tactical moves, chess board traps, and pattern extrapolation.' },
  { id: 24, title: "Zingle's Quantum Maze", startLevel: 461, endLevel: 480, badgeEmoji: '🌌', description: 'Schrodinger boxes, entangled photons, and teleportation coils.' },
  { id: 25, title: 'The Ultimate Ascension', startLevel: 481, endLevel: 500, badgeEmoji: '👑', description: 'The pinnacle 20 trials to claim the legendary Brain Zingle Crown!' }
];

export function getChapterForLevel(levelId: number): ChapterInfo {
  const chapter = CHAPTERS.find(c => levelId >= c.startLevel && levelId <= c.endLevel);
  return chapter || CHAPTERS[0];
}
