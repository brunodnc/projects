const link = 'https://economia.awesomeapi.com.br/json/all';

// Coloque aqui suas actions
const thunkAction = (expense) => (dispatch) => fetch(link)
  .then((raw) => raw.json())
  .then((num) => {
    dispatch(
      { type: 'ADD_EXPENSE',
        expense: { ...expense,
          exchangeRates: num,
        } },
    );
  })
  .catch((err) => console.log(err));

const editThunkAction = (expense) => (dispatch) => fetch(link)
  .then((raw) => raw.json())
  .then((num) => dispatch({ type: 'EDIT_EXPENSE',
    expense: { ...expense,
      exchangeRates: num,
    } }))
  .catch((err) => console.log(err));

const currenciesDispatch = () => (dispatch) => fetch(link).then((raw) => raw.json())
  .then((data) => {
    dispatch({ type: 'GET_CURRENCY',
      currencies: Object.keys(data).filter((item) => item !== 'USDT') });
  }).catch((err) => console.log(err));

export { thunkAction, editThunkAction, currenciesDispatch };
