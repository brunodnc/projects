import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions/index';

class QuestionCard extends React.Component {
  state = {
    respondido: false,
    nextEnable: false,
    timer: 30,
  }

  componentDidMount = () => {
    const interval = setInterval(() => {
      const { timer } = this.state;
      if (timer === 1) {
        clearInterval(interval);
        this.setState({ respondido: true, nextEnable: true });
      }
      this.setState((prev) => ({ timer: prev.timer - 1 }));
    }, '1000');
  };

  handleClick = ({ target }, difficulty) => {
    const { dispatch } = this.props;

    const green = 'green-border';
    this.setState({ respondido: true }, () => {
      const { timer } = this.state;

      const razao = {
        hard: 3,
        medium: 2,
        easy: 1,
      };

      const dez = 10;

      if (target.className === green) {
        const score = dez + (timer * razao[difficulty]);
        dispatch(addScore(score));
      } else {
        console.log('errou');
      }
    });

    this.setState({
      respondido: true,
      nextEnable: true,
      timer: 30,
    });
  }

  decodeHtml = (string) => {
    const newstr = string.split('&quot;').join('"');
    const newstr2 = newstr.split('&ldquo').join('"');
    const newstr3 = newstr2.split('&rdquo').join('"');
    return newstr3.split('&#039;').join('\'');
  }

  render() {
    const { allQuestions, nextQuestion, questionCurrent } = this.props;
    const { respondido, timer, nextEnable } = this.state;

    return (
      <section className="game-question">
        <div className="timer">{timer}</div>
        <p className="question" data-testid="question-text">
          {this.decodeHtml(questionCurrent.question)}
        </p>
        <div className="answers" data-testid="answer-options">
          { allQuestions.map(({ answer, correct, difficulty }, i) => (
            <button
              disabled={ timer === 0 || respondido }
              className={ (respondido && correct)
                ? 'green-border'
                : (respondido && !correct) && 'red-border' }
              onClick={ (e) => this.handleClick(e, difficulty) }
              type="button"
              data-testid={ correct
                ? 'correct-answer' : `wrong-answer-${i}` }
              key={ answer }
            >
              { this.decodeHtml(answer) }
            </button>
          )) }
        </div>
        <p
          className="category"
          data-testid="question-category"
        >
          {questionCurrent.category}
        </p>
        { nextEnable && (
          <button
            className="btn-next"
            data-testid="btn-next"
            type="button"
            onClick={ nextQuestion }
          >
            Next
          </button>
        ) }
      </section>
    );
  }
}

QuestionCard.propTypes = {
  allQuestions: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  questionCurrent: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(QuestionCard);
