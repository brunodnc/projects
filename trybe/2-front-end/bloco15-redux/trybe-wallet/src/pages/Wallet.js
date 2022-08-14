import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import { thunkAction, editThunkAction,
  currenciesDispatch } from '../actions';

const COUNT = [];
const ALIMENTAÇÃO = 'Alimentação';
class Wallet extends React.Component {
  state = {
    ourCurrency: 'BRL',
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTAÇÃO,
    editing: false,
    id: 0,
  }

  async componentDidMount() {
    const { cDispatch } = this.props;
    cDispatch();
  }

  genericHandle = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { user: { email }, wallet: { currencies, expenses },
      getExchangeRates, editExchangeRates, deleteExpense } = this.props;
    const { ourCurrency, value, description, currency,
      method, tag, editing, id } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{email}</h2>
          <h2 data-testid="total-field">
            {(expenses.reduce((total, item) => total + (Number(item.value)
            * Number(item.exchangeRates[item.currency].ask)), 0)).toFixed(2)}
          </h2>
          <h2 data-testid="header-currency-field">{ourCurrency}</h2>
        </header>
        <form>
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            onChange={ this.genericHandle }
            value={ value }
          />
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ this.genericHandle }
            value={ description }
          />
          <label htmlFor="currency">
            Moeda :
            <select
              id="currency"
              name="currency"
              onChange={ this.genericHandle }
              value={ currency }
            >
              {currencies.map((cur) => (
                <option value={ cur } key={ cur }>
                  {cur}
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.genericHandle }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Classificação:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.genericHandle }
              value={ tag }
            >
              <option value={ ALIMENTAÇÃO }>{ALIMENTAÇÃO}</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {!editing ? (
            <button
              type="button"
              onClick={ () => {
                store.dispatch(async () => {
                  const expense = {
                    id: COUNT.length,
                    value,
                    description,
                    currency,
                    method,
                    tag,
                  };
                  getExchangeRates(expense);
                });
                COUNT.push('length+1');
                this.setState({ value: 0,
                  description: '',
                  currency: 'USD',
                  method: 'Dinheiro',
                  tag: ALIMENTAÇÃO });
              } }
            >
              Adicionar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ () => {
                  const expense = {
                    id,
                    value,
                    description,
                    currency,
                    method,
                    tag };
                  editExchangeRates(expense);
                  this.setState({ value: 0,
                    description: '',
                    currency: 'USD',
                    method: 'Dinheiro',
                    tag: 'Alimentação' });
                  this.setState({ editing: false });
                } }
              >
                Editar despesa
              </button>) }
        </form>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>
                  {item.exchangeRates[item.currency].name.split('/')[0]}
                </td>
                <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(item.value)
                   * Number(item.exchangeRates[item.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    id={ item.currency }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => {
                      this.setState({ value: Number(item.value),
                        description: item.description,
                        currency: item.currency,
                        method: item.method,
                        tag: item.tag,
                        editing: true,
                        id: item.id });
                    } }
                  >
                    Editar
                  </button>
                  <button
                    id={ item.id }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ (e) => {
                      deleteExpense(e.target.id);
                    } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>);
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  cDispatch: () => dispatch(currenciesDispatch()),
  getExchangeRates: (expense) => dispatch(thunkAction(expense)),
  editExchangeRates: (expense) => dispatch(editThunkAction(expense)),
  deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSE', id }),
});
Wallet.propTypes = {
  user: PropTypes.shape(
    { email: PropTypes.string.isRequired },
  ).isRequired,
  wallet: PropTypes.shape(
    { currencies: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    expenses: PropTypes.arrayOf(
      PropTypes.shape().isRequired,
    ).isRequired },
  ).isRequired,
  cDispatch: PropTypes.func.isRequired,
  getExchangeRates: PropTypes.func.isRequired,
  editExchangeRates: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
