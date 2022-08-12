import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    display: 0
  }  
  
  numberClick = (e, n) => {
    if (this.state.display === 0) {
      this.setState({display: n});
    } else if (this.state.display === "0" && n === "0") {
      return undefined
    } else {
      this.setState((prev) => ({display: prev.display + n}));
    }
  }

  plusOperatorClick = (e) => {
    if (this.state.display === 0) {
      this.setState({display: "+"});
    } else if (/[+ | * | \- | /][+ | * | \- | /]$/.test(this.state.display)) {
        this.setState((prev => ({display: prev.display.slice(0,-2) + "+"})));
      } else if (this.state.display.slice(-1) === '-') {
        this.setState((prev) => ({display: prev.display.slice(0, -1) + "+"}));
      } else if (/[0-9]+$/.test(this.state.display)) {
        this.setState((prev) => ({display: prev.display + "+"}));
      }
  }

  minusOperatorClick = (e) => {
    if (this.state.display === 0) {
      this.setState({display: "-"});
    } else if (/[+ | * | \- | /][+ | * | \- | /]$/.test(this.state.display)) {
        this.setState((prev => ({display: prev.display.slice(0,-2) + "-"})));
      } else if (this.state.display.slice(-1) === '+') {
        this.setState((prev) => ({display: prev.display.slice(0, -1) + "-"}));
      } else if (this.state.display.slice(-1) !== '-') {
        this.setState((prev) => ({display: prev.display + "-"}));
      } else if (/[0-9]+$/.test(this.state.display)) {
        this.setState((prev) => ({display: prev.display + "-"}));
      }
    } 

  specialOperatorClick = (e, n) => {
    if (this.state.display === 0 ) {
      this.setState((prev) => ({display: prev.display + n}));
    } else if (/[+ | * | \- | /][+ | * | \- | /]$/.test(this.state.display)) {
        this.setState((prev => ({display: prev.display.slice(0,-2) + n})));
      } else if (this.state.display !== 0 && /[0-9]+$/.test(this.state.display)) {
        this.setState((prev) => ({display: prev.display + n}));
      } else if (this.state.display !== 0 && !/[0-9]+$/.test(this.state.display[this.state.display.length - 1])) {
        this.setState((prev) => ({display: prev.display.slice(0, -1).concat(n)}))}
    }

  decimalClick = (e) => {
    if (this.state.display === 0) {
      this.setState((prev) => ({display: prev.display + "."}));
    } else {
    const decimalSplit = this.state.display.split(/[+ | * | \- | /]/);
    const cantDecimal = decimalSplit.every((item) => item.includes('.'))
    if (/[0-9]+$/.test(this.state.display) && !cantDecimal) {
      this.setState((prev) => ({display: prev.display + "."}));
    }
  }
  }

  equalsClick = (e) => {
    if (/[0-9]+$/.test(this.state.display)) {
      // eslint-disable-next-line no-eval
      // using eval because in a hurry, I should find other ways for doing a calculator later.
      this.setState((prev) => ({display: eval(prev.display).toString()}));
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
        <div className="numbers">
          <button onClick = { (e) => this.numberClick(e, "1") }type="button" className="num" id="one" name="1">1</button>
          <button onClick = { (e) => this.numberClick(e, "2") }type="button" className="num" id="two" name="2">2</button>
          <button onClick = { (e) => this.numberClick(e, "3") }type="button" className="num" id="three" name="3">3</button>
          <button onClick = { (e) => this.numberClick(e, "4") }type="button" className="num" id="four" name="4">4</button>
          <button onClick = { (e) => this.numberClick(e, "5") }type="button" className="num" id="five" name="5">5</button>
          <button onClick = { (e) => this.numberClick(e, "6") }type="button" className="num" id="six" name="6">6</button>
          <button onClick = { (e) => this.numberClick(e, "7") }type="button" className="num" id="seven" name="7">7</button>
          <button onClick = { (e) => this.numberClick(e, "8") }type="button" className="num" id="eight" name="8">8</button>
          <button onClick = { (e) => this.numberClick(e, "9") }type="button" className="num" id="nine" name="9">9</button>
          <button onClick = { (e) => this.numberClick(e, "0") }type="button" className="num" id="zero" name="0">0</button>
          <button onClick = { this.decimalClick } type="button" className="num" name="." id="decimal">.</button>
          <button onClick = { this.clearClick } type="button" className="num" name="clear" id="clear">clear</button>
        </div>
        <div className="operators">
          <button onClick={ this.plusOperatorClick } type="button" name="+" id="add">+</button>
          <button onClick={ this.minusOperatorClick } type="button" name="-" id="subtract">-</button>
          <button onClick={ (e) => this.specialOperatorClick(e, "*") } type="button" name="*" id="multiply">*</button>
          <button onClick={ (e) => this.specialOperatorClick(e, "/") } type="button" name="/" id="divide">/</button>
        </div>
        <button onClick={ this.equalsClick } type="button" name="=" id="equals">=</button>
      </div>
    );
  }
}

export default App;


// User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).

// User Story #14: Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.

// User Story #15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).

// Note On Calculator Logic: It should be noted that there are two main schools of thought on calculator input logic: immediate execution logic and formula logic. Our example utilizes formula logic and observes order of operation precedence, immediate execution does not. Either is acceptable, but please note that depending on which you choose, your calculator may yield different results than ours for certain equations (see below example). As long as your math can be verified by another production calculator, please do not consider this a bug.



