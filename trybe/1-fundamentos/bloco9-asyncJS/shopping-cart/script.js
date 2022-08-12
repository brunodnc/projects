// const { fetchProducts } = require('./helpers/fetchProducts');
// const getSavedCartItems = require('./helpers/getSavedCartItems');
// const saveCartItems = require('./helpers/saveCartItems');
// const { fetchItem } = require('./helpers/fetchItem');

// const saveCartItems = require("./helpers/saveCartItems");

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// boa adição dessa função aqui, trybe wp
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function AttPrice() {
  const parent = document.getElementsByClassName('total-price')[0];
  const child = document.getElementsByClassName('tp')[0];
  let totalprice = 0;
  if (document.querySelectorAll('li').length === 0) {
    child.innerText = 0;
  } else {
    document.querySelectorAll('li').forEach((item) => {
      const price = item
      .innerText.slice(item.innerText.indexOf('$') + 1, item.innerText.length);
      totalprice += Number(price);
      console.log(price);
    });
    child.innerText = totalprice;
    parent.appendChild(child);
  }
}

function cartItemClickListener(event) {
document.getElementsByClassName('cart__items')[0].removeChild(event.target);
saveCartItems();
AttPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function generateClickFunc() {
  document.querySelectorAll('.item').forEach(async (item, i) => {
    const id = getSkuFromProductItem(item);
    const obj = await fetchItem(id);
    document.querySelectorAll('.item__add')[i].addEventListener(
      'click', () => {
 document.getElementsByClassName('cart__items')[0]
 .appendChild(createCartItemElement({ sku: obj.id, name: obj.title, salePrice: obj.price }));
  saveCartItems();
  AttPrice();
},
);
  });
}

document.querySelector('.empty-cart').addEventListener('click', () => {
    document.getElementsByClassName('cart__items')[0].innerHTML = '';
    saveCartItems();
    AttPrice();
  });

  function invisibleLoad() {
    document.getElementsByClassName('container')[0]
    .removeChild(document.getElementsByClassName('loading')[0]);
  }

window.onload = async () => {
  const produtos = await fetchProducts('computador');
  invisibleLoad();
  produtos.forEach((item) => document.querySelector('.items')
 .appendChild(createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail })));
  (await generateClickFunc());  
  if (localStorage) {
    getSavedCartItems();
    AttPrice();
    document.querySelectorAll('.cart__items')
    .forEach((item) => item.addEventListener('click', cartItemClickListener));
  }
};
