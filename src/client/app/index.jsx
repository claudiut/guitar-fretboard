"use strict";

//  paths are relative to index.js which is in the 'app' folder

// Stylesheets
// import styles from './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import GFConfig from './config.js';
import Scale from '../../modules/music-utilities/scale';
import GuitarFretboard from './components/guitar-fretboard/guitar-fretboard.jsx';

class App extends React.Component {  
  constructor(props) {
    super(props);
    
    this.state = {
      scale: 'C',
      mode: 'Ionian'
    }
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <SelectField
              floatingLabelText="Scale"
              value={this.state.scale}
              onChange={(event, index, value) => this.setState({scale: value})}
            >
              {Scale.chromaticNotes.map(s => {
                return <MenuItem value={s} primaryText={s} key={s} />
              })}
            </SelectField>
              
            <SelectField
              floatingLabelText="Mode"
              value={this.state.mode}
              onChange={(event, index, value) => this.setState({mode: value})}
            >
              {Scale.modes.map(m => {
                return <MenuItem value={m[0]} primaryText={m[0]} key={m[0]} />
              })}
            </SelectField>
          </div>
      
          <GuitarFretboard scale={Scale(this.state.scale, this.state.mode)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))