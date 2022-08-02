import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trybeWallet from '../trybeWallet.png';

class Header extends Component {
  totalDespesas = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const total = expenses.reduce((acc, curr) => (
      Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask) + acc
    ), 0);
    return total;
    // const values = expenses.map((e) => {
    //   const arrExchange = Object.entries(e.exchangeRates);
    //   const currencyCurrent = arrExchange.find((el) => el[0] === e.currency);
    //   return Number(e.value) * Number(currencyCurrent[1].ask);
    // });
    // return values.reduce((partialSum, a) => partialSum + a, 0);
  }

  render() {
    const { email } = this.props;
    // const name = email.split('@');
    return (
      <header>
        <img src={ trybeWallet } alt="trybeWallet" width="200" />
        {/* <p>{`Usuário: ${name[0]}`}</p> */}
        <p data-testid="email-field">
          {`Email: ${email}`}
        </p>
        <p>Suas despesas R$</p>
        <p data-testid="total-field">
          {this.totalDespesas().toFixed(2)}
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
