import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/fetchAPI';
import { addInfo } from '../redux/actions';
import '../styles/login.css';

let ID = 0;

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    }

    handleClick = async () => {
      const { history, dispatch } = this.props;
      const { email, name } = this.state;
      const token = await getToken();
      localStorage.setItem('token', token);
      history.push('/game');
      ID += 1;
      dispatch(addInfo(email, name, ID));
    }

    render() {
      const { name, email } = this.state;
      return (
        <div className="login-body">
          <form>
            <h1>Trivia</h1>
            <label className="login-label" htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                data-testid="input-player-name"
                onChange={ (e) => this.setState({ name: e.target.value }) }
                value={ name }
              />
            </label>
            <label className="login-label" htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                data-testid="input-gravatar-email"
                onChange={ (e) => this.setState({ email: e.target.value }) }
                value={ email }
              />
            </label>
            <button
              className="login-btn play"
              type="button"
              data-testid="btn-play"
              disabled={ !(name && email) }
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              className="login-btn settings"
              data-testid="btn-settings"
              type="button"
              onClick={ () => {
                const { history } = this.props;
                history.push('/settings');
              } }
            >
              Settings
            </button>
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
