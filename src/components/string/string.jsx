"use strict";

import React from 'react';

import Config from '../../config.js';
import Scale from '../../modules/music-utilities/scale';
import GuitarFretboardNote from '../note/note.jsx';

export default function(props) {
  const stringNotes = Scale.getChromaticScaleNotesStartingWith(props.openNote[0], Config.numberOfFrets);

  return (
    <div className="guitar-string-wrapper">
      <div className="guitar-string" style={{height: Config.stringThickness + Config.stringThickness * props.index * 0.25}}></div>

      {stringNotes.map((note, fretIndex) => {
        const isOpenNote = fretIndex == 0;
        const shouldRenderNote = isOpenNote || props.scale.notes.includes(note);
      
        if(!shouldRenderNote) return;
    
        const left = Config.fretWidth - Config.fretWidth * 1 / 100;
    
        return (
          <GuitarFretboardNote
            name={note}
            positionInScale={props.scale.notes.indexOf(note) + 1}
            stringNote={props.openNote}
            isOpen={isOpenNote}
            fretIndex={fretIndex}
            leftOffset={isOpenNote ? -31 : left * fretIndex - left / 1.45}
            key={fretIndex}
          />
        );
      })}
    </div>
  );
}