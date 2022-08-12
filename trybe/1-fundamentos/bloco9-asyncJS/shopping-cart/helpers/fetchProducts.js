const fetchProducts = async (busca) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${busca}`;
  try {
    const res = await fetch(url);
    const data = (await res.json()).results; 
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
