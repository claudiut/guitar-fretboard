"use strict";

import React from 'react';

import Config from '../../config.js';

export default function(props) {
  // document.getElementsByTagName("body")[0].clientWidth

  return (
    <div className="guitar-fret-wrapper">
      {Config.fretWPercentages.map((pr, index) => {
        return (
          <div className="guitar-fret" style={{width: Config.fretWidth - Config.fretWidth * 1 / 100}} key={index}>
            <div className="guitar-fret-bar"></div>
          </div>
        );
      })}
    </div>
  );
}