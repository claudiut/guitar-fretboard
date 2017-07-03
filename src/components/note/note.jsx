"use strict";

import React from 'react';
import SoundFond from 'soundfont-player';

import Config from '../../config.js';

// styles
import styles from './note.scss';

export default function(props) {;
  var handleClick = () => {
    if(!window.GuitarFretboard.instrument) return;
    
    // https://github.com/danigb/soundfont-player
    // http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm
    // lowest E is number 28. Octaves go n + 12
    window.GuitarFretboard.instrument.play(props.fretIndex + props.stringNote[1] + Config.octaveOffset * 12).stop(window.GuitarFretboard.audioContext.currentTime + 1);
  }
  
  return (
    <span
      className={`note-bullet note-number-${props.positionInScale} ${props.isOpen ? "open-note" : ""}`}
      style={{left: props.leftOffset}}
      onClick={handleClick}
    >
      <span className="note-name">{props.positionInScale}</span>
      <span className="note-number">{props.name}</span>
    </span>
  );
}