const INITIAL_STATE = {
  name: 'nome-da-pessoa',
  assertions: 0,
  score: 0,
  gravatarEmail: 'email' };

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_INFO':
    return { ...state, ...action.payload };
  case 'ADD_SCORE':
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1 };
  case 'ZERAR_SCORE':
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
