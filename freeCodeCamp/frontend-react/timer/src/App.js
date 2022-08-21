import { clear } from '@testing-library/user-event/dist/clear';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function Timer() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [ss, setss] = useState(0);
  const [mm, setmm] = useState(sessionLength);
  const [started, setStarted] = useState(false);
  const [inSession, setInSession] = useState(true);
  const beep = useRef();


  useEffect(() => {
    setmm(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
      clearInterval(timer);
      if (ss <= 0) {
        if (mm !== 0) {
          setss(59);
          setmm(mm - 1);
        }
        else {
          beep.current.load();
          beep.current.play();
          setInSession(!inSession);
          if (!inSession) {
            setmm(sessionLength) ;
            setss(1);
          } else {
            setmm(breakLength);
            setss(1);
          }
        }
      } else {
        setss(ss - 1);
        }
      }, 10);
    }
  }, [started, ss]);

  const startStop = (e) => {
    let s = ss;
    if (started) {
      setss(s);
      setStarted(false);
      setTimeout(() => setss(s), 500);
      setTimeout(() => setss(s), 1000);
    } else {
      setStarted(true);
    }
  }

  const resetFunc = () => {
    beep.current.pause();
    beep.current.load();
    setStarted(false);
    setmm(25)
    setss(0);
    setInSession(true);  
    setBreakLength(5);
    setSessionLength(25);
    setTimeout(() => {
      setmm(25)
      setss(0);
    }, 1000);
  }

  const displaymm = mm < 10 ? `0${mm}` : mm;
  const displayss = ss < 10 ? `0${ss}` : ss;
  
  return (
    <div className="App">
      <label id="break-label">
        Break Length:
        <br />
        <button type="button" id="break-increment" onClick={() => !started && breakLength < 60 ? setBreakLength(breakLength + 1): console.log(`can't go above 60`) }>+</button>
        <p id="break-length">{breakLength}</p>
        <button type="button" id="break-decrement" onClick={() => !started && breakLength > 1 ? setBreakLength(breakLength - 1) : console.log(`can't go below 1`) }>-</button>
      </label>
      <br />
      <label id="session-label">
        Session Length: 
        <br />
        <button type="button" id="session-increment" onClick={() => !started && sessionLength < 60 ? setSessionLength(sessionLength + 1) : console.log(`can't go above 60`)}>+</button>
        <p id="session-length">{sessionLength}</p>
        <button type="button" id="session-decrement" onClick={() => !started && sessionLength > 1 ? setSessionLength(sessionLength - 1) : console.log(`can't go below 1`)}>-</button>
      </label>
      <br />
      <label id="timer-label"> {inSession ? 'In session' : 'In pause'} <p id="time-left">{`${displaymm}:${displayss}`}</p></label>
      <button type="button" id="start_stop" onClick={startStop}> {started ? "Stop" : "Start"} </button>
      <button type="button" id="reset" onClick={resetFunc}>Reset</button>
      <audio id='beep' ref={beep}  src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav">You Browser does not support HTML audio element!</audio>
    </div>
  );
}

export default Timer;
