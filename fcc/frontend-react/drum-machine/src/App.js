import logo from './logo.svg';
import './App.css';
import React from 'react';
import Pad from './Pad';

// audio source from: https://codepen.io/freeCodeCamp/pen/MJyNMd

const padArr = [
  {
    keyTrigger: 'Q',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyTrigger: 'W',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyTrigger: 'E',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyTrigger: 'A',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyTrigger: 'S',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyTrigger: 'D',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyTrigger: 'Z',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyTrigger: 'X',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyTrigger: 'C',
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
          <h1>Audio Samples</h1>
        </header>
        <section id="display"> {this.state.clickedBtn}</section>
        <div className="drummachine">
          {padArr.map((p) => <Pad key={p.audio}
          keyTrigger={p.keyTrigger} 
          audio={p.audio}
          handleClick={this.handleClick}/>)}
        </div>
     </div>
    );
  } 
}

export default App;
