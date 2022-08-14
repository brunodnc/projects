import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import recipesContext from '../context/context';

function Login() {
  const { email, setEmail } = useContext(recipesContext);
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateEmailAndPassword = () => {
    const MIN_LENGTH_PASSWORD = 6;
    const regex = /[\w.-]+@[\w-]+\.[\w.-]+/gi;
    const validateSenha = password.length <= MIN_LENGTH_PASSWORD;
    const validate = (email.match(regex) && !validateSenha);
    return !validate;
  };

  const saveEmailandTokenAtLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validateEmailAndPassword() }
        onClick={ saveEmailandTokenAtLocalStorage }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.node,
}.isRequired;

export default Login;
