export const addInfo = (gravatarEmail, name, id) => ({
  type: 'ADD_INFO',
  payload: {
    gravatarEmail,
    name,
    id,
  },
});

export const addScore = (score) => ({
  type: 'ADD_SCORE',
  payload: score,
});
