import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, despesas, deleteExpense } from '../redux/actions/index';

const alimentação = 'Alimentação';
class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentação,
    exchangeRates: [],
    // btnEdit: false,
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
    const arrExpanse = ({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    const { submitState } = this.props;
    submitState(arrExpanse);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    });
  };

  editClick= () => {
    const { expenses, idToEdit, removeExpense } = this.props;
    const expensesFind = expenses.find((item) => item.id === idToEdit);
    const { exchangeRates } = expensesFind;
    // const saveExchange = exchangeRates;
    const { value, currency,
      description, method, tag } = this.state;
    const newInput = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    removeExpense(idToEdit);
    const { submitState } = this.props;
    submitState(newInput);
  }

  render() {
    const { currencies, edit } = this.props;
    // currencies é meu ARRAY DE MOEDAS
    // currency é minha MOEDA SELECIONADA
    const { value,
      currency = currencies,
      description, method, tag } = this.state;
    console.log(currency);
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
            {currencies.map((moeda, index) => (
              <option
                key={ index }
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
          onClick={ edit ? this.editClick : this.handleClick }
        >
          { edit ? 'Editar despesa' : 'Adicionar Despesas'}
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: () => dispatch(fetchCurrency()),
  submitState: (expenses) => dispatch(despesas(expenses)),
  removeExpense: (id) => dispatch(deleteExpense(id)),
}
);
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func,
  submitState: PropTypes.func,
  currencies: PropTypes.array,
  // currency: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
