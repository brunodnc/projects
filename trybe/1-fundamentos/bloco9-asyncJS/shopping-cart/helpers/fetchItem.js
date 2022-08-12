const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const res = await fetch(url).then((resp) => (resp.json()))
  .catch(() => new Error('You must provide an url'));
  return res;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
