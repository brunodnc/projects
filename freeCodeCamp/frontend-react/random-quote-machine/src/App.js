import './App.css';
import React from 'react';



const Quotes = require("randomquote-api");


class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
    this.grq = this.grq.bind(this);
  }

 grq() {
  const randomquote = Quotes.randomQuote();
  this.setState({
    quote: randomquote.quote,
    author: randomquote.author
  });
 }
  componentDidMount() {
    this.grq();
  }
   render() {
    return (
      <div id="quote-box">
        <header className="App-header">
          <h1>Random Quote Box!</h1>
        </header>
        <main>
          <h2 id="text">
              {this.state.quote}
          </h2>
          <p id="author">
              {this.state.author}
          </p>
          </main>
          <footer>
          <button id="new-quote" onClick={this.grq}>new quote</button>
          <a rel="noreferrer" className="twitter-share-button" id="tweet-quote" target="_blank" href={`https://twitter.com/intent/tweet?text=${this.state.quote.replaceAll(' ', '%20')}`}>tweet quote</a>
          </footer>
      </div>
    );
  }  
}

export default QuoteBox;
