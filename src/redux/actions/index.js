// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const userLogin = (payload) => ({ type: 'EMAIL', payload });
export const errorMoedas = (error) => ({ type: 'ERROR_MOEDAS', error });

export const WALLET_VALUE = 'WALLET_VALUE';
export const walletValue = (payload) => ({ type: 'WALLET_VALUE', payload });
export const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const objResult = Object.keys(data);
    return dispatch(walletValue(objResult));
  } catch (error) {
    dispatch(errorMoedas(error));
  }
};
