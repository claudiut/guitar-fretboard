"use strict";

import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Config from '../../config.js'
import Scale from '../../modules/music-utilities/scale';
import GuitarFretboardString from '../string/string.jsx';
import GuitarFretboardFrets from '../frets/frets.jsx';

// styles
import styles from './guitar-fretboard.scss';

class GuitarFretboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {}
  }
  
  render() {
    return (
      <div id="guitar-fretboard-wrapper">
      
        <div id="guitar-fretboard-1" className="guitar-fretboard">
          <div className="guitar-nut"></div>
  
          <GuitarFretboardFrets />

          {Config.strings.map((note, index) => {
            return (
              <GuitarFretboardString
                scale={this.props.scale}
                openNote={note}
                index={index}
                key={index}
              />
            );
          })}  
        </div>
      
      </div>
    );
  }
}

export default GuitarFretboard;