"use strict";

function Scale(scaleRootName, scaleMode) {
  let scale = Object.create(ScalePrototype);

  // scale.name = scaleRootName || 'C';
  // scale.mode = scaleMode || 'Ionian';
  scale.notes = scale.getNotes(scaleRootName || 'C', scaleMode || 'Ionian');
  
  return scale;
}

const ScalePrototype = {
  chromaticNotes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
  
  modes: [
    ['Ionian',     [2, 2, 1, 2, 2, 2, 1]],
    ['Dorian',     [2, 1, 2, 2, 2, 1, 2]],
    ['Phrygian',   [1, 2, 2, 2, 1, 2, 2]],
    ['Lydian',     [2, 2, 2, 1, 2, 2, 1]],
    ['Mixolydian', [2, 2, 1, 2, 2, 1, 2]],
    ['Aeolian',    [2, 1, 2, 2, 1, 2, 2]],
    ['Locrian',    [1, 2, 2, 1, 2, 2, 2]],
  ],
  
  // for the given mode (interval list), pluck the notes
  getNotes: function(scaleRootName, scaleMode, noOfNotes) {
    const notesInOrder = this.getChromaticScaleNotesStartingWith(scaleRootName, noOfNotes);

    // get the mode intervals from the modes array, given the mode's name
    const modeIntervals = this.modes.filter(function(mArr) { return mArr[0] == scaleMode; }, this)[0][1];
    const complementedModeIntervals = [0, ...modeIntervals];
    
    // we remote the last element which is undefined (because the notes don't contain the last/repeating-first note)
    return complementedModeIntervals.map((intervalInSemitones, index) => {
      // calculate the sum of intervals in the left of the current one (including the current one)
      const semitonesUntilNow = complementedModeIntervals.slice(0, index + 1).reduce((acc, currentVal) => acc + currentVal);
      
      return notesInOrder[semitonesUntilNow];
    }).slice(0, -1);
  },
  
  getChromaticScaleNotesStartingWith: function(rootNoteName, numberOfNotes) {
    const rootNoteIndex = this.chromaticNotes.indexOf(rootNoteName);
    // notes of the chromatic <rootNoteName> scale, 
    const chrScaleNotesInOrder = this.chromaticNotes.slice(rootNoteIndex).concat(this.chromaticNotes.slice(0, rootNoteIndex));
    
    // limit or keep repeating the notes to return as many as we need
    if(numberOfNotes && numberOfNotes < chrScaleNotesInOrder.length) {
      return chrScaleNotesInOrder.slice(0, numberOfNotes);
    }
    else if(numberOfNotes && numberOfNotes > chrScaleNotesInOrder.length) {
      // repeat the chromatic notes array to cover the numberOfNotes needed
      const repeatArrayNTimes = Math.ceil(numberOfNotes / chrScaleNotesInOrder.length);
      const arr = Array(repeatArrayNTimes).fill(chrScaleNotesInOrder);
      // flatten the array and slice it to how many notes we need
      return arr.reduce((acc, arr) => acc.concat(arr)).slice(0, numberOfNotes);
    }
    
    return chrScaleNotesInOrder;
  },
};

// I don't know how correct this is. TODO: read Object.assign
Object.assign(Scale, ScalePrototype);

export default Scale;