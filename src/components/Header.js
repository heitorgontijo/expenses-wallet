import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trybeWallet from '../trybeWallet.png';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <img src={ trybeWallet } alt="trybeWallet" width="200" />
        <p data-testid="email-field">
          {`Email:${email}`}
        </p>
        <p data-testid="total-field">
          {`Despesas: R$ ${0}`}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}
const mapStateToProps = ({ user }) => ({ email: user.email });

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
