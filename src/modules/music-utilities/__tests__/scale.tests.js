const path = require('path');
let assert = require('assert');
let should = require('should');

import MusicUtilities from '../';
const Scale = MusicUtilities.Scale;

describe('MusicUtilities', function() {
  describe('Scale', function() {
    it('should return a scale in the given scale notes in the given mode', function() {
      const scale = Scale("D", "Aeolian");
      //
      // scale.name.should.equal('D');
      // scale.mode.should.equal('Aeolian');
      //
      scale.notes.should.have.lengthOf(7);
      scale.notes.should.deepEqual(['D', 'E', 'F', 'G', 'A', 'Bb', 'C']);
    });
    
    it('should return a chromatic scale in with a lower number of notes', function() {
      const chromaticScale = Scale().getChromaticScaleNotesStartingWith('E', 4);
      
      chromaticScale.should.have.lengthOf(4);
      chromaticScale.should.deepEqual(['E', 'F', 'F#', 'G']);
    });
    
    it('should return a chromatic scale with a higher number of notes', function() {
      const chromaticScale = Scale().getChromaticScaleNotesStartingWith('F#', 26);
      
      chromaticScale.should.have.lengthOf(26);
      chromaticScale.should.deepEqual(['F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G']);
    });
    
    it('should have the prototype directly available under the Scale \'class\'', function() {
      Scale.modes.should.deepEqual(Scale('C', 'Dorian').modes);
      Scale.chromaticNotes.should.deepEqual(Scale().chromaticNotes);
    });
  });
});