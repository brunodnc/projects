export const getToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((raw) => raw.json())
  .then((data) => data.token);

const TRES = 3;
export const getQuestions = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((raw) => raw.json())
  .then((data) => (data.response_code === TRES ? false : data.results));
