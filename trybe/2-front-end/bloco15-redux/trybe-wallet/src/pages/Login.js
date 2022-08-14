import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state;
    const { history, saveData } = this.props;
    const SIX = 6;
    return (
      <form>
        <label htmlFor="emailInput">
          Email:
          <input
            id="emailInput"
            data-testid="email-input"
            required
            type="email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />
        </label>
        <label htmlFor="passwordInput">
          Password:
          <input
            id="passwordInput"
            data-testid="password-input"
            type="password"
            onChange={ (e) => this.setState({ password: e.target.value }) }
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            saveData(email);
            console.log(`store.getState().user.email = ${store.getState().user.email} `);
            history.push('/carteira');
          } }
          disabled={ email.split('').filter((char) => char === '@').length !== 1
           || password.length < SIX || email.endsWith('@') || email.endsWith('.') }
        >
          Entrar
        </button>
      </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveData: (email) => dispatch({ type: 'ADD_EMAIL', email }),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  saveData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
