import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletValue } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    // currency: 'USD',
  }

  componentDidMount() {
    this.consultaMoedas();
  }

  consultaMoedas = async () => {
    const getApiCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await getApiCurrency.json();
    const { dispatchCurrency } = this.props;
    // console.log(currency);
    dispatchCurrency(currency);
    // this.setState({ currency });
  }

  render() {
    const { currency } = this.props;
    console.log(currency);

    // const { currency } = this.state;
    // const moedas = Object.keys(currency);
    // const moedasFilter = moedas.filter((moeda) => moeda !== 'USDT');
    return (
      <div className="input-info-wallet">
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="text"
            name="valor"
            onChange={ this.handleChange }
            id="valor"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
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
          >
            {/* {moedasFilter.map((moeda) => (
              <option key={ moeda }>
                {moeda}
              </option>
            )) } */}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (state) => dispatch(walletValue(state)),
}
);
const mapStateToProps = ({ wallet }) => ({ currencies: wallet.currencies });
WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
//   currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
