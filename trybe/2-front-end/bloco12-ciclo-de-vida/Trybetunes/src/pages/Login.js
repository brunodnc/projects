import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const MIN_NAME_LENGTH = 3;
class Login extends React.Component {
  state = {
    loginInput: '',
    loading: false,
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  buttonClickHandle = ({ target }) => { // começa o estado de loading, chama o função createUser, e depois muda o estado do App pai para logado.
    const { loginFunction } = this.props;
    this.setState({ loading: true }, () => {
      createUser({ name: target.value }).then(loginFunction);
    });
  }

  render() {
    const { loginInput, loading } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        {loading ? <Loading /> : null }
        <label htmlFor="login">
          Login:
          <input
            id="loginInput"
            type="text"
            data-testid="login-name-input"
            onChange={ (e) => this.setState({ loginInput: e.target.value }) }
          />
        </label>
        <button
          type="button"
          onClick={ this.buttonClickHandle }
          value={ loginInput }
          disabled={ loginInput.length < MIN_NAME_LENGTH }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>);
  }
}

Login.propTypes = {
  loginFunction: PropTypes.func.isRequired,
};

export default Login;
