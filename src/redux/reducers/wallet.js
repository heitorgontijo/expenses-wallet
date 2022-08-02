// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_VALUE, WALLET_EXPENSES_VALUE,
  DELETE_EXPENSE, EDIT_EXPENSE_ID } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_VALUE:
    return { ...state, currencies: action.payload };
  case WALLET_EXPENSES_VALUE:
    return { ...state,
      expenses: [...state.expenses, action.payload].sort((a, b) => a.id - b.id),
      editor: false };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses].filter((item) => item.id !== action.payload) };
  case EDIT_EXPENSE_ID:
    return {
      ...state,
      idToEdit: action.idEdit,
      editor: true,
    };
  default:
    return state;
  }
};

export default wallet;
