import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductCart extends React.Component {
    state = {
      product: [],
      cart: [],
      email: '',
      evaluationRadio: '',
      evaluation: '',
      saveEvaluation: [],
      cart2: [],
      cartQtd: 0,
    }

    async componentDidMount() {
      const { match } = this.props;
      const saveItem = match.params.id;
      const getProducts = JSON.parse(localStorage.getItem(saveItem));
      if (getProducts !== null) {
        this.setState({ saveEvaluation: getProducts });
      }
      const url = `https://api.mercadolibre.com/items/${match.params.id}`;
      const a = await fetch(url);
      const jsonA = await a.json();
      this.setState({ product: jsonA });
      if (localStorage.length > 0) {
        this.setState({ cart: JSON.parse(localStorage.getItem('CART')) });
      }
    }

    funcaoVelha = (obj) => {
      this.setState((previostate) => ({
        cart2: [...previostate.cart2, obj],
      }), () => {
        const { cart2 } = this.state;
        localStorage.setItem('CART2', JSON.stringify(cart2));
      });
    }

    produtoRepetido = (obj) => {
      const { cart } = this.state;
      return cart.some((prod) => prod.id === obj.id);
    }

    buttonCart = (e, obj) => {
      if (this.produtoRepetido(obj)) {
        this.setState((previoustate) => ({ cartQtd: previoustate.cartQtd + 1 }));
      } else {
        this.setState((previoustate) => (
          { cartQtd:
            previoustate.cartQtd + 1,
          cart: [...previoustate.cart, obj] }), () => {
          const { cart } = this.state;
          localStorage.setItem('CART', JSON.stringify(cart));
        });
      }
      this.funcaoVelha(obj);
    }

      handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
      }

      handleSubmit = () => {
        const { email, evaluationRadio, evaluation } = this.state;
        const saveEvaluation2 = {
          email,
          evaluation,
          evaluationRadio,
        };
        const { match } = this.props;
        const saveItem = match.params.id;
        this.setState((prevState) => (
          { saveEvaluation: [...prevState.saveEvaluation, saveEvaluation2] }
        ), () => {
          // this.setState(email);
          const { saveEvaluation } = this.state;
          localStorage.setItem(saveItem, JSON.stringify(saveEvaluation));
        });
      }

      submit() {

      }

      render() {
        const { product, saveEvaluation } = this.state;
        if (product.length === 0) return <h1>Carregando...</h1>;
        return (
          <section
            className="section__product__details"
            key={ product.category_id }
          >
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
              className="my-cart"
            >
              {`Cart - ${localStorage.length}`}
            </Link>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ (e) => this.buttonCart(e, product) }
            >
              AddCart
            </button>
            <div className="product__main">
              <div className="title_icon">

                <h1 data-testid="product-detail-name">
                  {`${product.title}`}
                  {' '}
                  <br />
                  {`${product.price.toLocaleString('pt-br',
                    { style: 'currency', currency: 'BRL' })}`}
                  {' '}

                </h1>

                <img
                  src={ product.secure_thumbnail }
                  alt="Product"
                  width="130px"
                />
              </div>
              <div className="products__details">
                <div className="details">
                  <h2>Especificações Técnicas</h2>
                  <ul>
                    {product.attributes.map((atributo) => (
                      <li key={ atributo.id }>
                        <b>{`${atributo.name}:`}</b>
                        {' '}
                        {`${atributo.value_name}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <section className="avaliations">
              <h2>Avaliações</h2>
              <fieldset>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    data-testid="product-detail-email"
                    onChange={ this.handleChange }
                  />
                  <input
                    type="radio"
                    data-testid="1-rating"
                    value="1"
                    name="evaluationRadio"
                    onChange={ this.handleChange }
                  />
                  1
                  <input
                    type="radio"
                    data-testid="2-rating"
                    value="2"
                    name="evaluationRadio"
                    onChange={ this.handleChange }
                  />
                  2
                  <input
                    type="radio"
                    data-testid="3-rating"
                    value="3"
                    name="evaluationRadio"
                    onChange={ this.handleChange }
                  />
                  3
                  <input
                    type="radio"
                    data-testid="4-rating"
                    value="4"
                    name="evaluationRadio"
                    onChange={ this.handleChange }
                  />
                  4
                  <input
                    type="radio"
                    data-testid="5-rating"
                    value="5"
                    name="evaluationRadio"
                    onChange={ this.handleChange }
                  />
                  5

                  <textarea
                    data-testid="product-detail-evaluation"
                    name="evaluation"
                    placeholder="Evaluation"
                    onChange={ this.handleChange }
                  />
                  <button
                    data-testid="submit-review-btn"
                    type="submit"
                    name="btnSubmit"
                    onClick={ () => this.handleSubmit() }
                  >
                    Avaliar
                  </button>

                </div>
              </fieldset>
              <fieldset>
                {saveEvaluation && saveEvaluation.map((item) => (
                  <div key={ item.email } className="evaluation__">
                    <p>{`Email: ${item.email}`}</p>
                    <p>{`Avaliação: ${item.evaluationRadio}`}</p>
                    <p>{`Comentário: ${item.evaluation}`}</p>
                  </div>
                ))}
              </fieldset>
            </section>
          </section>
        );
      }
}

ProductCart.propTypes = {
  match: PropTypes.string.isRequired,
};
