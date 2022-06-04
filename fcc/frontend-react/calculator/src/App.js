import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    display: 0
  }  
  
  numberClick = (e) => {
    if (this.state.display === 0) {
      this.setState({display: e.target.id});
    } else {
      this.setState((prev) => ({display: prev.display + e.target.id}));
    }
  }

  plusOperatorClick = (e) => {
    if (this.state.display === 0) {
      this.setState({display: e.target.name});
    } else if (!/[0-9]+$/.test(this.state.display) && this.state.display.slice(-1) !== '+') {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    } else if (/[0-9]+$/.test(this.state.display)) {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    }
  }

  minusOperatorClick = (e) => {
    if (this.state.display === 0) {
      this.setState({display: e.target.name});
    } else if (!/[0-9]+$/.test(this.state.display) && this.state.display.slice(-1) !== '-') {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    } else if (/[0-9]+$/.test(this.state.display)) {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    }
  }

  specialOperatorClick = (e) => {
    if (this.state.display !== 0 && /[0-9]+$/.test(this.state.display)) {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    } else if (!/[0-9]+$/.test(this.state.display[this.state.display.length - 1]))
      this.setState((prev) => ({display: prev.display.slice(0, -1).concat(e.target.name)}))
  }

  decimalClick = (e) => {
    if (/[0-9]+$/.test(this.state.display)) {
      this.setState((prev) => ({display: prev.display + e.target.name}));
    }
  }

  equalsClick = (e) => {
    
    if (/[0-9]+$/.test(this.state.display)) {
      // eslint-disable-next-line no-eval
      // using eval because in a hurry, I should find other ways for doing a calculator later.
      this.setState((prev) => ({display: eval(prev.display)}));
    }
  }

  clearClick = (e) => {
    this.setState({display: 0});
  }
  render() {
    const { display } = this.state;
    return (
      <div className="App">
        <div id="display">{ display }</div>
        <div class="numbers">
          <button onClick = { this.numberClick }type="button" class="num" id="1">1</button>
          <button onClick = { this.numberClick }type="button" class="num" id="2">2</button>
          <button onClick = { this.numberClick }type="button" class="num" id="3">3</button>
          <button onClick = { this.numberClick }type="button" class="num" id="4">4</button>
          <button onClick = { this.numberClick }type="button" class="num" id="5">5</button>
          <button onClick = { this.numberClick }type="button" class="num" id="6">6</button>
          <button onClick = { this.numberClick }type="button" class="num" id="7">7</button>
          <button onClick = { this.numberClick }type="button" class="num" id="8">8</button>
          <button onClick = { this.numberClick }type="button" class="num" id="9">9</button>
          <button onClick = { this.numberClick }type="button" class="num" id="0">0</button>
        </div>
        <div class="operators">
          <button onClick={ this.plusOperatorClick } type="button" name="+" id="add">+</button>
          <button onClick={ this.minusOperatorClick } type="button" name="-" id="subtract">-</button>
          <button onClick={ this.specialOperatorClick } type="button" name="*" id="multiply">*</button>
          <button onClick={ this.specialOperatorClick } type="button" name="/" id="divide">/</button>
          <button onClick={ this.decimalClick } type="button" name="." id="decimal">.</button>
          <button onClick={ this.equalsClick } type="button" name="=" id="equals">=</button>
          <button onClick={ this.clearClick } type="button" name="clear" id="clear">clear</button>
        </div>
      </div>
    );
  }
}

export default App;


// User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).

// User Story #14: Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.

// User Story #15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).

// Note On Calculator Logic: It should be noted that there are two main schools of thought on calculator input logic: immediate execution logic and formula logic. Our example utilizes formula logic and observes order of operation precedence, immediate execution does not. Either is acceptable, but please note that depending on which you choose, your calculator may yield different results than ours for certain equations (see below example). As long as your math can be verified by another production calculator, please do not consider this a bug.



