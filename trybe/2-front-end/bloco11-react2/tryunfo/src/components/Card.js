import PropTypes from 'prop-types';
import React from 'react';

class Card extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasDelete,
      deleteFunc,
      attFunc,
      className,
    } = this.props;

    return (
      <div className={ className }>
        <h3 data-testid="name-card" className="cardName">{cardName}</h3>
        <img
          src={ cardImage }
          data-testid="image-card"
          className="cardImage"
          alt={ cardName }
        />
        <p
          data-testid="description-card"
          className="cardDescription"
        >
          <em>{cardDescription}</em>
        </p>
        <ul id="attr" className="attr">
          <li data-testid="attr1-card">
            Aim:
            { cardAttr1 }
          </li>
          <li data-testid="attr2-card">
            Utility:
            {cardAttr2}
          </li>
          <li data-testid="attr3-card">
            Clutch:
            {cardAttr3}
          </li>
        </ul>
        <h4 data-testid="rare-card" className="cardRare">{cardRare}</h4>
        {cardTrunfo ? (
          <h3
            data-testid="trunfo-card"
            className="cardTrunfo"
          >
            Trunfo
          </h3>) : null }
        {hasDelete ? (
          <>
            <button
              type="button"
              data-testid="delete-button"
              onClick={ deleteFunc }
              value={ cardName }
            >
              Excluir
            </button>
            <button
              type="button"
              data-testid="att-button"
              onClick={ attFunc }
              value={ cardName }
            >
              Update
            </button>

          </>)
          : null }
      </div>);
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasDelete: PropTypes.bool.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  attFunc: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Card;
