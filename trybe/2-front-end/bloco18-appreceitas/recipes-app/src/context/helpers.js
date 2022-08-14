export const oneCharacterCheck = (inputSearch, selectedRadio) => {
  if (selectedRadio === 'first-letter' && inputSearch.length > 1) {
    const alert = global.alert('Your search must have only 1 (one) character');
    return alert;
  }
};

export const recipesNotFound = () => {
  const alert = global
    .alert('Sorry, we haven\'t found any recipes for these filters.');
  return alert;
};

export const linkCopiedAlert = () => {
  const alert = global
    .alert('Link copied!');
  return alert;
};
