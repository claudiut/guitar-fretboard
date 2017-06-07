module.exports = {
  scales: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
  
  modes: [
    ['Ionian',     [2, 2, 1, 2, 2, 2, 1]],
    ['Dorian',     [2, 1, 2, 2, 2, 1, 2]],
    ['Phrygian',   [1, 2, 2, 2, 1, 2, 2]],
    ['Lydian',     [2, 2, 2, 1, 2, 2, 1]],
    ['Mixolydian', [2, 2, 1, 2, 2, 1, 2]],
    ['Aeolian',    [2, 1, 2, 2, 1, 2, 2]],
    ['Locrian',    [1, 2, 2, 1, 2, 2, 2]],
  ],
  
  stringThickness: 2,
  
  fretWPercentages: [1, 10, 12, 14, 16, 18, 20, 22,   25, 28, 31, 34, 37, 40, 44, 50, 55, 60, 68, 76],
  
  numberOfFrets: 20,
  
  octaveOffset: 1,
}