// const saveCartItems = require('./saveCartItems');

const getSavedCartItems = () => {
  const arr = JSON.parse(localStorage.getItem('cartItems'));
  arr.forEach((item) => {
    const li = document.createElement('li');
    const [html, name] = item;
    li.innerHTML = html;
    li.className = name;
    document.querySelector('.cart__items').appendChild(li);
  }); 
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
