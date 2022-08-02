// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const userLogin = (payload) => ({ type: 'EMAIL', payload });

export const WALLET_VALUE = 'WALLET_VALUE';
export const walletValue = (payload) => ({ type: 'WALLET_VALUE', payload });

export function fetchCurrency() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const moedas = Object.keys(data);
      const currencies = moedas.filter((moeda) => moeda !== 'USDT');
      dispatch(walletValue(currencies));
    } catch (error) {
      return (error);
    }
  };
}

export const WALLET_EXPENSES_VALUE = 'WALLET_EXPENSES_VALUE';
export const despesas = (payload) => ({
  type: 'WALLET_EXPENSES_VALUE', payload });

export const deleteExpense = (payload) => ({
  type: 'DELETE_EXPENSE',
  payload,
});
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const actionIdEdit = (idEdit) => ({
  type: 'EDIT_EXPENSE_ID',
  idEdit,
});
export const EDIT_EXPENSE_ID = 'EDIT_EXPENSE_ID';
