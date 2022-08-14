import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/fetchAPI';
import QuestionCard from '../components/QuestionCard';
import '../styles/game.css';

class Game extends React.Component {
    state = {
      questions: [],
      loading: true,
      index: 0,
      clicks: 0,
    }

    async componentDidMount() {
      const { history } = this.props;
      const questions = await getQuestions(localStorage.getItem('token'));
      if (questions) {
        this.setState({ questions, loading: false });
      } else {
        history.push('/');
        localStorage.removeItem('token');
      }
    }

    addClicks = () => {
      const { history, playerName, score, email, dispatch, id, assertions } = this.props;
      const { clicks } = this.state;
      const quatro = 4;

      this.setState((prevState) => ({ clicks: prevState.clicks + 1 }));

      if (clicks === quatro) {
        history.push('/feedback');
        const playerObj = {
          name: playerName,
          score,
          id,
          assertions,
          picture: this.getGravatar(email),
        };
        let rankingArr = JSON.parse(localStorage.getItem('ranking'));
        if (rankingArr) {
          rankingArr = [...rankingArr, playerObj];
        } else {
          rankingArr = [playerObj];
        }
        localStorage.setItem('ranking', JSON.stringify(rankingArr));
        dispatch({ type: 'ZERAR_SCORE' });
      }
    };

    getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

    nextQuestion = () => {
      const quatro = 4;

      this.setState((prevState) => ({
        index: prevState.index === quatro
          ? 0
          : prevState.index + 1,
      }));

      this.addClicks();
    }

    geraQuestoesAleatorias = (allQuestions) => {
      const allAnswer = [
        { answer: allQuestions.correct_answer,
          correct: true,
          difficulty: allQuestions.difficulty },
        ...allQuestions.incorrect_answers
          .map((item) => ({ answer: item,
            correct: false,
            dificulty: allQuestions.difficulty })),
      ];

      const teste = [...allAnswer];
      const questoesAleatorias = [];

      for (let index = 0; teste.length; index += 1) {
        const randomNumber = Number(Math.random() * teste.length);
        const removeIndice = teste.splice(randomNumber, 1);
        questoesAleatorias.push(removeIndice[0]);
      }

      return questoesAleatorias;
    }

    render() {
      const { playerName, score, email } = this.props;
      const { questions, loading, index } = this.state;

      return (
        <div className="game-container">
          <header>
            <img
              data-testid="header-profile-picture"
              src={ this.getGravatar(email) }
              alt="gravatar"
            />
            <h2 className="player-name" data-testid="header-player-name">{playerName}</h2>
            <h3 className="score" data-testid="header-score">{score}</h3>
          </header>
          {!loading ? (
            <QuestionCard
              allQuestions={ this.geraQuestoesAleatorias(questions[index]) }
              nextQuestion={ this.nextQuestion }
              questionCurrent={ questions[index] }
              key={ index }
            />
          ) : <h1 className="loading">Loading...</h1> }
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  playerName: state.player.name,
  score: state.player.score,
  id: state.player.id,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Game);
