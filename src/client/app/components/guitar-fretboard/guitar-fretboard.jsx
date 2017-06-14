import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Config from './config.js'

// styles
import styles from './guitar-fretboard.scss';
import GuitarFretboardNote from './note.jsx';

class GuitarFretboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      strings: [['E', 52], ['B', 47], ['G', 43], ['D', 38], ['A', 33], ['E', 28]],
      scaleNotes: this.getScaleNotesForMode(props.scale, props.mode),
      audioContext: new AudioContext(),
    }
    
    this.state.fretWidth = (document.getElementsByTagName("body")[0].clientWidth - 28) / Config.numberOfFrets;
    
    Soundfont.instrument(this.state.audioContext, 'acoustic_guitar_steel').then(instrument => {
      this.setState({instrument: instrument});
    });
  }

  // events
  componentWillReceiveProps(nextProps) {
    this.setState({
      scaleNotes: this.getScaleNotesForMode(
        nextProps.scale || this.state.scale,
        nextProps.mode || this.state.mode,
      ),
    })
  }
  
  chromaticScaleNotesForRoot(rootNoteName, numberOfNotes) {
    const rootNoteIndex = Config.scales.indexOf(rootNoteName);
    const chrScaleNotes = Config.scales.slice(rootNoteIndex).concat(Config.scales.slice(0, rootNoteIndex));
    
    if(numberOfNotes && numberOfNotes < chrScaleNotes.length) {
      return chrScaleNotes.slice(0, numberOfNotes);
    }
    else if(numberOfNotes && numberOfNotes > chrScaleNotes.length) {
      // repeat the chromatic notes array to cover the numberOfNotes needed
      const repeatArrayNTimes = Math.ceil(numberOfNotes / chrScaleNotes.length);
      const arr = Array(repeatArrayNTimes).fill(chrScaleNotes);
      // flatten the array and slice it to how many notes we need
      return arr.reduce((acc, arr) => acc.concat(arr)).slice(0, numberOfNotes);
    }
    
    return chrScaleNotes;
  }

  getNotesForString(stringNoteName) {
    var stringNoteIndex = Config.scales.indexOf(stringNoteName);
    var notes = [];
    for(var i = stringNoteIndex; i < Config.numberOfFrets + stringNoteIndex; i++)
      notes.push(Config.scales[i % Config.scales.length]);

    return notes;
  }
  
  // for the given mode (interval list), pluck the notes
  selectNotesForScaleIntervals(notesInOrder, mode) {
    // get the mode intervals from the modes array, given the mode's name
    const modeIntervals = Config.modes.filter(function(mArr) { return mArr[0] == mode; })[0][1];
    const complementedModeIntervals = [0, ...modeIntervals];
    
    // we remote the last element which is undefined (because the notes don't contain the last/repeating-first note)
    return complementedModeIntervals.map((intervalInSemitones, index) => {
      // calculate the sum of intervals in the left of the current one (including the current one)
      const semitonesUntilNow = complementedModeIntervals.slice(0, index + 1).reduce((acc, currentVal) => acc + currentVal);
      
      return notesInOrder[semitonesUntilNow];
    }).slice(0, -1);
  }

  getScaleNotesForMode(rootNote, mode) {
    return this.selectNotesForScaleIntervals(this.chromaticScaleNotesForRoot(rootNote), mode);
  }

  render() {
    return (
      <div id="guitar-fretboard-wrapper">
      
        <div id="guitar-fretboard-1" className="guitar-fretboard">
          <div className="guitar-nut"></div>
  
          <div className="guitar-fret-wrapper">
            {Config.fretWPercentages.map((pr, index) => {
              return (
                <div className="guitar-fret" style={{width: this.state.fretWidth - this.state.fretWidth * 1 / 100}} key={index}>
                  <div className="guitar-fret-bar"></div>
                </div>
              );
            })}
          </div>

          {this.state.strings.map((string, index) => {
            return (
              <div className="guitar-string-wrapper" key={index}>
                <div className="guitar-string" style={{height: Config.stringThickness + Config.stringThickness * index * 0.25}}></div>

                {this.chromaticScaleNotesForRoot(string[0], Config.numberOfFrets).map((note, fretIndex) => {
                  const isOpenNote = fretIndex == 0;
                  const shouldRenderNote = isOpenNote || this.state.scaleNotes.includes(note);
                
                  if(!shouldRenderNote) return;
              
                  const left = this.state.fretWidth - this.state.fretWidth * 1 / 100;
              
                  return (
                    <GuitarFretboardNote
                      name={note}
                      positionInScale={this.state.scaleNotes.indexOf(note) + 1}
                      string={string}
                      fretIndex={fretIndex}
                      isOpen={isOpenNote}
                      instrument={this.state.instrument}
                      audioContext={this.state.audioContext}
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