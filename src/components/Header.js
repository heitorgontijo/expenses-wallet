import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trybeWallet from '../trybeWallet.png';

class Header extends Component {
  totalDespesas() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc
      + (parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask))
    ), 0);
    console.log(total);
    return total;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <img src={ trybeWallet } alt="trybeWallet" width="200" />
        <p data-testid="email-field">
          {`Email:${email}`}
        </p>
        <p data-testid="total-field">
          {`Despesas: R$ ${this.totalDespesas().toFixed(2)}`}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}
const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses });

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
