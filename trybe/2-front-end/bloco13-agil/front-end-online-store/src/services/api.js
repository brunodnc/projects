export async function getCategories() {
  const getCategoriesAPI = 'https://api.mercadolibre.com/sites/MLB/categories';

  const APIResponse = await fetch(getCategoriesAPI);

  const results = await APIResponse.json();

  return results;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // const queryURL = encodeURI(query).replaceAll('%20', '+');

  const getProductAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${query}&category=${categoryId}`;

  const APIResponse = await fetch(getProductAPI);

  const results = await APIResponse.json();

  return results;
}
