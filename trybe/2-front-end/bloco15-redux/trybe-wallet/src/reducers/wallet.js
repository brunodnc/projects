// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCY':
    return { ...state, currencies: action.currencies };
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, action.expense] };
  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== Number(action.id)) };
  case 'EDIT_EXPENSE':
    return { ...state,
      expenses: state.expenses.map(
        (item) => (item.id === action.expense.id ? action.expense : item),
      ) };
  default:
    return state;
  }
};

export default wallet;
