import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import expenseImg from '../expense.png';

class Header extends Component {
  totalDespesas = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask) + acc
    ), 0);
    return total;
  }

  render() {
    const { email } = this.props;
    const name = email.split('@');
    return (
      <header>
        <img src={ expenseImg } alt="expense" width="100" />
        <p>
          {`Bem-vindo(a) ${name[0]}`}
        </p>
        <p data-testid="email-field">
          {`Email: ${email}`}
        </p>
        <p>
          {`Total de suas despesas: R$${this.totalDespesas().toFixed(2)}`}
        </p>
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
