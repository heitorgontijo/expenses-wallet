import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/index';
import loginWallet from '../loginWallet.png';

class Login extends React.Component {
  state= {
    email: '',
    password: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // target.name
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatchSetLogin } = this.props;
    dispatchSetLogin(email);
    history.push('/carteira');
  }

  condicaoDisabled = () => {
    const { email, password } = this.state;
    const CHARACTER_PASSWORD = 6;
    const checkPass = password.length < CHARACTER_PASSWORD;
    const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // fonte: https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
    const check = !checkEmail.test(email) || checkPass;
    return check;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <h1>Trybe</h1>
        <h2>Wallet</h2>
        <br />
        <input
          className="input-login"
          data-testid="email-input"
          type="email"
          placeholder="example@email.com"
          onChange={ this.handleChange }
          value={ email }
          name="email"
        />
        <input
          className="input-login"
          data-testid="password-input"
          type="password"
          placeholder="******"
          onChange={ this.handleChange }
          value={ password }
          name="password"
        />
        <button
          className="login-btn"
          disabled={ this.condicaoDisabled() }
          type="button"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        <br />
        <br />
        <img src={ loginWallet } alt="imagem-wallet" width="150" />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetLogin: (state) => dispatch(userLogin(state)),
}
);

Login.propTypes = {
  dispatchSetLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
