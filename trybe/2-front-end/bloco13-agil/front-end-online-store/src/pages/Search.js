import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

export default class Search extends React.Component {
  state = {
    category: [],
    searchInput: '',
    query: '',
    productList: [],
    radioId: '',
    cart: [],
    cart2: [],
    cartQtd: 0,
  };

  componentDidMount() {
    getCategories().then((obj) => this.setState({ category: obj }));
  }

  onInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onSearchClick = () => {
    const { radioId, query } = this.state;
    this.setState(
      (prev) => ({ query: prev.searchInput }),
      () => this.setState({ searchInput: '' }),
    );
    getProductsFromCategoryAndQuery(radioId, query)
      .then((arr) => this.setState({ productList: arr.results }));
  };

  funcaoVelha = (obj) => {
    this.setState(
      (previostate) => ({
        cart2: [...previostate.cart2, obj],
      }),
      () => {
        const { cart2 } = this.state;
        localStorage.setItem('CART2', JSON.stringify(cart2));
      },
    );
  };

  produtoRepetido = (obj) => {
    const { cart } = this.state;
    return cart.some((prod) => prod.id === obj.id);
  };

  buttonCart = (e, obj) => {
    if (this.produtoRepetido(obj)) {
      this.setState((previoustate) => ({ cartQtd: previoustate.cartQtd + 1 }));
    } else {
      this.setState(
        (previoustate) => ({
          cartQtd: previoustate.cartQtd + 1,
          cart: [...previoustate.cart, obj],
        }),
        () => {
          const { cart } = this.state;
          localStorage.setItem('CART', JSON.stringify(cart));
        },
      );
    }
    this.funcaoVelha(obj);
  };

  render() {
    const { category, searchInput, productList, cartQtd } = this.state;
    return (
      <section className="section__main">
        <aside>
          <h3>Categorias</h3>
          <ul>
            {category.map((cat) => (
              <li key={ cat.id }>
                <label
                  htmlFor={ cat.id }
                  data-testid="category"
                  className="category__products"
                >
                  {cat.name}

                  <input
                    name="category"
                    id={ cat.id }
                    type="radio"
                    value={ cat.name }
                    onChange={ (e) => this.setState({ radioId: e.target.id }, () => {
                      const { query, radioId } = this.state;
                      getProductsFromCategoryAndQuery(radioId, query).then(
                        (arr) => this.setState({ productList: arr.results }),
                      );
                    }) }
                  />
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <div className="input__products">
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <div className="input__">
            <div className="input__button">
              <input
                data-testid="query-input"
                type="text"
                value={ searchInput }
                onChange={ this.onInputChange }
                className="input__query"
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ this.onSearchClick }
              >
                Search
              </button>
            </div>
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
              className="my-cart"
            >
              {`Cart - ${cartQtd}`}
            </Link>
          </div>
          <section className="section__product__list">
            {productList.length === 0 ? (
              <h2 className="h2__section">Nenhum produto foi encontrado</h2>
            ) : (
              productList.map((product) => (
                <div
                  className="product__list"
                  data-testid="product"
                  key={ product.id }
                >
                  <Link
                    data-testid="product-detail-link"
                    to={ `/cart/${product.id}` }
                  >
                    Link
                  </Link>
                  <img
                    src={ product.thumbnail }
                    alt={ product.title }
                    width="100px"
                  />
                  <span className="spam__title">{`${product.title}`}</span>
                  <hr />
                  <span>
                    {`${product.price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}`}
                  </span>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ (e) => this.buttonCart(e, product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
            )}
          </section>
        </div>
      </section>
    );
  }
}
