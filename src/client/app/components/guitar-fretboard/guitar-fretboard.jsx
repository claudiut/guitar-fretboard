"use strict";

import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Config from '../../config.js'
import Scale from '../../../../modules/music-utilities/scale';
import GuitarFretboardNote from '../note/note.jsx';

// styles
import styles from './guitar-fretboard.scss';

class GuitarFretboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {}
    
    this.fretWidth = (document.getElementsByTagName("body")[0].clientWidth - 28) / Config.numberOfFrets;
    
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    Soundfont.instrument(this.audioContext, 'acoustic_guitar_steel', {gain: 15}).then(instrument => {
      this.setState({instrument: instrument});
    });
  }
  
  render() {
    return (
      <div id="guitar-fretboard-wrapper">
      
        <div id="guitar-fretboard-1" className="guitar-fretboard">
          <div className="guitar-nut"></div>
  
          <div className="guitar-fret-wrapper">
            {Config.fretWPercentages.map((pr, index) => {
              return (
                <div className="guitar-fret" style={{width: this.fretWidth - this.fretWidth * 1 / 100}} key={index}>
                  <div className="guitar-fret-bar"></div>
                </div>
              );
            })}
          </div>

          {Config.strings.map((string, index) => {
            return (
              <div className="guitar-string-wrapper" key={index}>
                <div className="guitar-string" style={{height: Config.stringThickness + Config.stringThickness * index * 0.25}}></div>

                {this.props.scale.getChromaticScaleNotesStartingWith(string[0], Config.numberOfFrets).map((note, fretIndex) => {
                  const isOpenNote = fretIndex == 0;
                  const shouldRenderNote = isOpenNote || this.props.scale.notes.includes(note);
                
                  if(!shouldRenderNote) return;
              
                  const left = this.fretWidth - this.fretWidth * 1 / 100;
              
                  return (
                    <GuitarFretboardNote
                      name={note}
                      positionInScale={this.props.scale.notes.indexOf(note) + 1}
                      string={string}
                      fretIndex={fretIndex}
                      isOpen={isOpenNote}
                      instrument={this.state.instrument}
                      audioContext={this.audioContext}
                      leftOffset={isOpenNote ? -31 : left * fretIndex - left / 1.45}
                      
                      key={fretIndex}
                    />
                  );
                })}
              </div>
            );
          })}  
        </div>
      
      </div>
    );
  }
}

export default GuitarFretboard;