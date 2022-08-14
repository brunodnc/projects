import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  state = {
    productList: [],
    carrinhoQtd: [],
  };

  componentDidMount() {
    this.setState({ productList: JSON.parse(localStorage.getItem('CART')) });
    this.setState({ carrinhoQtd: JSON.parse(localStorage.getItem('CART2')) });
  }

  adicao = (e, obj) => {
    this.setState(
      (prev) => ({
        carrinhoQtd: [...prev.carrinhoQtd, obj],
      }),
      () => {
        const { carrinhoQtd } = this.state;
        localStorage.setItem('CART2', JSON.stringify(carrinhoQtd));
      },
    );
  };

  removeCart = (obj) => {
    const { productList } = this.state;
    const i = productList.indexOf(obj);
    productList.splice(i, 1);
    this.setState(
      { productList },
      localStorage.setItem('CART', JSON.stringify(productList)),
    );
  };

  subtracao = (e) => {
    const { carrinhoQtd } = this.state;
    const meuObj = carrinhoQtd.find((product) => product.id === e.target.id);
    if (carrinhoQtd.filter((cur) => cur.id === e.target.id).length === 1) {
      this.removeCart(meuObj);
      carrinhoQtd.splice(carrinhoQtd.indexOf(meuObj), 1);
      this.setState({ carrinhoQtd }, () => {
        localStorage.setItem('CART2', JSON.stringify(carrinhoQtd));
      });
    } else {
      carrinhoQtd.splice(carrinhoQtd.indexOf(meuObj), 1);
      this.setState({ carrinhoQtd }, () => {
        localStorage.setItem('CART2', JSON.stringify(carrinhoQtd));
      });
    }
  };

  // const { carrinhoQtd } = this.state;
  // const i = carrinhoQtd.indexOf(obj);
  // console.log(i);
  // if (carrinhoQtd.includes(obj)) {
  //   carrinhoQtd.splice(i, 1);
  // } if (!carrinhoQtd.includes(obj)) {
  //   // this.removeCart(obj);
  // }
  // this.setState({ carrinhoQtd },
  //   localStorage.setItem('CART2', JSON.stringify(carrinhoQtd)));

  render() {
    const { productList, carrinhoQtd } = this.state;
    return (
      <div>
        <section className="section__product__list">
          {productList === null || productList.length === 0 ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>
          ) : (
            productList.map((product) => (
              <div
                className="product__list"
                data-testid="product"
                key={ product.id }
              >
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                  width="100px"
                />
                <span
                  data-testid="shopping-cart-product-name"
                  className="spam__title"
                >
                  {`${product.title}`}
                </span>
                <hr />
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ (e) => this.adicao(e, product) }
                >
                  +
                </button>
                <span data-testid="shopping-cart-product-quantity">
                  {carrinhoQtd.filter((cur) => cur.id === product.id).length}
                </span>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ this.subtracao }
                  id={ product.id }
                >
                  -
                </button>
                <span>
                  {`${product.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}`}
                </span>
                <Link to="/finish" data-testid="checkout-products">
                  Finalizar compra
                </Link>
              </div>
            ))
          )}
        </section>
      </div>
    );
  }
}

export default Cart;
