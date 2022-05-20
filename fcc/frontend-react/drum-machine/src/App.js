import logo from './logo.svg';
import './App.css';
import React from 'react';
import Pad from './Pad';

const padArr = [
  {
    key: 'Q',
    audio: './data/beba.mp3',
  },
  {
    key: 'W',
    audio: './data/coca.mp3',
  },
  {
    key: 'E',
    audio: './data/babe.mp3',
  },
  {
    key: 'A',
    audio: './data/cola.mp3',
  },
  {
    key: 'S',
    audio: './data/caco.mp3',
  },
  {
    key: 'D',
    audio: './data/cloaca.mp3',
  },
  {
    key: 'Z',
    audio: './data/bebacoca.mp3',
  },
  {
    key: 'X',
    audio: './data/babecola.mp3',
  },
  {
    key: 'C',
    audio: './data/decio.mp3',
  },
]


class App extends React.Component {
  state = {
    clickedBtn: ''
  }

  handleClick = (e) => {
    this.setState({clickedBtn: e.target.id})
    this.audio.play();
  }

  render(){
    return(
      <div className="App" id="drum-machine">
        <header className="App-header">
          <h1>Drum Machine</h1>
        </header>
        <section id="display">
          {padArr.map((p) => <Pad key={p.audio}
          keyButton={p.key} audio={p.audio} handleClick={this.handleClick}/>)}
        </section>
     </div>
    );
  } 
}

export default App;
