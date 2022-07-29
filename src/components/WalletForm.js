import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, despesas } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  }

  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

   handleChange = ({ target }) => {
     const { name, value } = target;
     this.setState({ [name]: value });
   }

  handleClick = async () => {
    const getApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await getApi.json();
    this.setState((prevState) => ({
      id: prevState.id + 1,
      exchangeRates: [...prevState.exchangeRates, exchangeRates],
    }));
    const { currencies } = this.props;
    const { id, value,
      currency = currencies,
      description, method, tag } = this.state;
    const arrExpanse = [({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    })];
    const { submitState } = this.props;
    submitState(arrExpanse);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value,
      currency = currencies,
      description, method, tag } = this.state;
    return (
      <form className="input-info-wallet">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            placeholder="digite seu gasto"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            placeholder="descrição do gasto"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
              >
                {moeda}
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          className="btn-despesas"
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesas
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: () => dispatch(fetchCurrency()),
  submitState: (expenses) => dispatch(despesas(expenses)),
}
);
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses });

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  submitState: PropTypes.func.isRequired,
  // currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
