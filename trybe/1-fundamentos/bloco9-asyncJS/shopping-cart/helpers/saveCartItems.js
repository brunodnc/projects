const saveCartItems = () => {
  localStorage.clear();
  const arr = [];
  document.querySelectorAll('li').forEach((item) => arr.push([item.innerHTML, item.className]));
  localStorage.setItem('cartItems', JSON.stringify(arr));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
