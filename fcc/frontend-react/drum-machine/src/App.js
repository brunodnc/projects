import logo from './logo.svg';
import './App.css';
import React from 'react';
import Pad from './Pad';

// audio source from: https://codepen.io/freeCodeCamp/pen/MJyNMd

const padArr = [
  {
    keyTrigger: 'Q',
    keyCode: 81,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyTrigger: 'W',
    keyCode: 87,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyTrigger: 'E',
    keyCode: 69,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyTrigger: 'A',
    keyCode: 65,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyTrigger: 'S',
    keyCode: 83,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyTrigger: 'D',
    keyCode: 68,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyTrigger: 'Z',
    keyCode: 90,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyTrigger: 'X',
    keyCode: 88,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyTrigger: 'C',
    keyCode: 67,
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
]

class App extends React.Component {
  state = {
    clickedBtn: ''
  }

  handleClick = (e) => {
    console.log(e.target);
    this.setState({clickedBtn: e.target.id})
  }

  render(){
    return(
      <div className="App" id="drum-machine">
        <header className="App-header">
          <h1>Drum Machine</h1>
        </header>
        <section id="display">
          {padArr.map((p) => <Pad key={p.audio}
          keyTrigger={p.keyTrigger} 
          audio={p.audio}
          keyCode={p.keyCode}
          handleClick={this.handleClick}/>)}
        </section>
     </div>
    );
  } 
}

export default App;
