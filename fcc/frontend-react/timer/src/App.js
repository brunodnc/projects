import React, { useEffect, useState } from 'react';
import './App.css';

function Timer() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [ss, setss] = useState('00');
  const [mm, setmm] = useState(sessionLength.toString());
  
  const [started, setStarted] = useState(false);
  const [inSession, setInSession] = useState(false);
  
  return (
    <div className="App">
      <label id="break-label">
        Break Length: 
        <button type="button" id="break-increment">+</button>
        <p id="break-length">{breakLength}</p>
        <button type="button" id="break-decrement">-</button>
      </label>
      <label id="session-label">
        Session Length: 
        <button type="button" id="session-increment">+</button>
        <p id="session-length">{sessionLength}</p>
        <button type="button" id="session-decrement">-</button>
      </label>
      <label id="timer-label"> {inSession ? 'In session' : 'Not in session'} <p id="time-left">{`${mm}:${ss}`}</p></label>
      <button type="button" id="start_stop"> {started ? "Start" : "Stop"} </button>
      <button type="button" id="reset">Reset</button>
    </div>
  );
}

export default Timer;
