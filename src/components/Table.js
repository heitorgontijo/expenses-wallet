import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, actionIdEdit } from '../redux/actions/index';

class Table extends Component {
  delete = (id) => {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

edit = (id) => {
  const { idEdit } = this.props;
  idEdit(id);
}

render() {
  const { expenses } = this.props;
  return (
    <section className="section-table-wallet">
      <table className="table-head-wallet">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
      </table>
      <table className="table-info-wallet">
        <tbody className="table-info-wallet">
          {expenses.map(({ id, description, tag, method,
            value, currency, exchangeRates }) => {
            const cambio = Number(exchangeRates[currency].ask);
            const valorConvertido = Number(value) * (cambio);
            return (
              <tr key={ id } className="table-info-wallet">
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ cambio.toFixed(2) }</td>
                <td>{ valorConvertido.toFixed(2) }</td>
                <td>Real</td>
                <td className="td-button">
                  <button
                    className="table-btn-delete"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.delete(id) }
                  >
                    Excluir
                  </button>
                  <button
                    className="table-btn-edit"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.edit(id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
  idEdit: (id) => dispatch(actionIdEdit(id)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
