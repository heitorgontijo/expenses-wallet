import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    // currency: 'USD',
  }

  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

  render() {
    const { currencies } = this.props;
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
            {currencies.map((moeda) => (
              <option key={ moeda }>
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
  dispatchCurrency: () => dispatch(fetchCurrency()),
}
);
const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  // currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
