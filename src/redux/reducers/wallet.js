// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_VALUE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_VALUE:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
