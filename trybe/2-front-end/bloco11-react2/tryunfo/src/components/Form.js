import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  // Max input length number function source:
  // https://stackoverflow.com/questions/49443954/how-to-limit-the-text-filed-length-with-input-type-number-in-react-js-and-preven

  maxLengthCheck = ({ target }) => {
    if (target.value.length > target.maxLength) {
      target.value = target.value.slice(0, target.maxLength);
    }
  }

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form className="createCard">
        <h2>Create Card</h2>
        <label htmlFor="cardName">
          Name
          <input
            id="cardName"
            name="cardName"
            type="text"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
            maxLength="30"
          />
        </label>
        <label htmlFor="cardDescription">
          Description
          <textarea
            id="cardDescription"
            name="cardDescription"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
            maxLength="50"
          />
        </label>
        <label htmlFor="cardAttr1">
          Aim:
          <input
            id="cardAttr1"
            name="cardAttr1"
            type="number"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
            maxLength="2"
            onInput={ this.maxLengthCheck }
          />
        </label>
        <label htmlFor="cardAttr2">
          Utility
          <input
            id="cardAttr2"
            name="cardAttr2"
            type="number"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
            maxLength="2"
            onInput={ this.maxLengthCheck }
          />
        </label>
        <label htmlFor="cardAttr3">
          Clutch
          <input
            id="cardAttr3"
            name="cardAttr3"
            type="number"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
            maxLength="2"
            onInput={ this.maxLengthCheck }
          />
        </label>
        <label htmlFor="cardImage">
          Image
          <input
            id="cardImage"
            name="cardImage"
            type="text"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          Rarity
          <select
            id="cardRare"
            name="cardRare"
            type="select"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">N</option>
            <option value="raro">R</option>
            <option value="muito raro">SR</option>
          </select>
        </label>
        {hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
          <label htmlFor="cardTrunfo">
            Trunfo
            <input
              id="cardTrunfo"
              name="cardTrunfo"
              type="checkbox"
              checked={ cardTrunfo }
              onChange={ onInputChange }
              data-testid="trunfo-input"
              value="trunfo"
              className="trunfoCheckbox"
            />
          </label>) }
        <button
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar

        </button>
      </form>);
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
