/* eslint-disable max-lines */
import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';
import deckDatabase from './components/database';

class App extends React.Component {
  state = {
    className: 'card',
    cardName: '',
    filterName: '',
    cardDescription: '',
    cardAttr1: '00',
    cardAttr2: '00',
    cardAttr3: '00',
    cardImage: '',
    cardRare: 'normal',
    disabled: false,
    filterRare: 'todas',
    cardTrunfo: false,
    filterTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    hasDelete: false,
    deleteFunc: ({ target }) => {
      const { value } = target;
      this.trunfoCheck(value); // verifica se tem trunfo no baralho
      this.setState(
        (prev) => ({ deck: prev.deck.filter((card) => card.cardName !== value) }),
      );
    },
    attFunc: ({ target }) => { // função pra colocar os atributos no Form de volta, e deletar essa carta do baralho, funcionando como um botão de atualização
      const { value } = target;
      const { deck, deleteFunc } = this.state;
      const cardo = deck.filter((card) => card.cardName !== value);
      this.setState({ cardName: cardo.cardName,
        cardDescription: cardo.cardDescription,
        cardAttr1: cardo.cardAttr1,
        cardAttr2: cardo.cardAttr2,
        cardAttr3: cardo.cardAttr3,
        cardImage: cardo.cardImage,
        cardRare: cardo.cardRare,
        cardTrunfo: cardo.cardTrunfo,
        className: cardo.className }, deleteFunc(target));
    },
    deck: deckDatabase,
    onInputChange: ({ target }) => { // onChange genérico
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      }, this.checkSaveButtonChange); // verifica depois de cada alteração do onChange deveria estar clicável ou não
    },
    onSaveButtonClick: () => {
      const { cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        className,
      } = this.state;
      this.setState((prev) => ({ deck: [...prev.deck, { cardName, // salve no deck a carta atual
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        hasDelete: true,
        className,
      }],
      }), () => {
        if (cardTrunfo === true) {
          this.setState({ hasTrunfo: true }); // avisa pro estado que existe um trunfo no deck
        }
        this.setState({ cardName: '', // reseta depois de salvar
          cardDescription: '',
          cardAttr1: '00',
          cardAttr2: '00',
          cardAttr3: '00',
          cardImage: '',
          hasDelete: false,
          cardRare: 'normal',
          cardTrunfo: false }, this.checkSaveButtonChange);
      });
    },
  } // fim do state

  trunfoCheck = (value) => {
    const { deck } = this.state;
    const card = deck.find((carta) => carta.cardName === value);
    if (card.cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
  }

  // função pra mudar o BG da card com base na raridade
  rareCheck = () => {
    const { className, cardRare, cardTrunfo } = this.state;
    const cardTrunfoBg = 'card trunfoBg';

    if (cardTrunfo) {
      this.setState({ className: cardTrunfoBg });
    } else {
      if (cardRare === 'raro'
        && className !== 'card muitoRaroBg') {
        this.setState({ className: 'card raroBg' });
      }

      if (cardRare === 'muito raro') {
        this.setState({ className: 'card muitoRaroBg' });
      }

      if (cardRare === 'normal') {
        this.setState({ className: 'card' });
      }
    }
  };

  checkSaveButtonChange = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      deck,
    } = this.state;
    const mNumber = 90;
    const mNumber2 = 210;
    const mNumber3 = -1;
    if (cardName
        && deck.findIndex((card) => card.cardName === cardName) === mNumber3 // verifica se já tem uma carta com o mesmo nome, já que a key pra lista de carta é o nome da carta, não pode repetir.
        && cardDescription
        && cardRare
        && cardImage
        && Number(cardAttr1) >= 0 && Number(cardAttr1) <= mNumber
        && Number(cardAttr2) >= 0 && Number(cardAttr2) <= mNumber
        && Number(cardAttr3) >= 0 && Number(cardAttr3) <= mNumber
        && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= mNumber2) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
    this.DisableCheck();
    this.rareCheck();
  };

  DisableCheck = () => {
    const { filterTrunfo } = this.state;
    if (filterTrunfo) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
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
      disabled,
      filterTrunfo,
      hasTrunfo,
      hasDelete,
      deleteFunc,
      attFunc,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
      deck,
      filterName,
      filterRare,
      className,
    } = this.state;
    return (
      <div className="flexbox">
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <section className="cardPreview">
          <h2>Card Preview</h2>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ onInputChange }
            onSaveButtonClick={ onSaveButtonClick }
            hasDelete={ hasDelete }
            deleteFunc={ deleteFunc }
            className={ className }
            attFunc={ attFunc }
          />
        </section>
        <section className="deckCards">
          <h2>Deck Cards</h2>
          <h3>Filters:</h3>
          <label htmlFor="filterName">
            Name:
            <input
              id="filterName"
              name="filterName"
              type="text"
              data-testid="name-filter"
              value={ filterName }
              onChange={ onInputChange }
              disabled={ disabled }
            />
          </label>
          <label htmlFor="filterRare">
            Rarity
            <select
              id="filterRare"
              name="filterRare"
              type="select"
              data-testid="rare-filter"
              value={ filterRare }
              onChange={ onInputChange }
              disabled={ disabled }
            >
              <option value="todas"> E </option>
              <option value="normal">N</option>
              <option value="raro">R</option>
              <option value="muito raro">SR</option>
            </select>
          </label>
          <label htmlFor="filterTrunfo">
            Trunfo
            <input
              id="filterTrunfo"
              name="filterTrunfo"
              type="checkbox"
              checked={ filterTrunfo }
              onChange={ onInputChange }
              data-testid="trunfo-filter"
              value="filterTrunfo"
            />
          </label>
        </section>
        <section className="deck">
          {deck.filter((carta) => carta.cardName.includes(filterName))
            .filter((carta) => (filterRare === 'todas'
              ? true : carta.cardRare === filterRare))
            .filter((carta) => (filterTrunfo === false
              ? true : carta.cardTrunfo === true))
            .map((carta) => (
              <Card
                key={ carta.cardName }
                cardName={ carta.cardName }
                cardDescription={ carta.cardDescription }
                cardAttr1={ carta.cardAttr1 }
                cardAttr2={ carta.cardAttr2 }
                cardAttr3={ carta.cardAttr3 }
                cardImage={ carta.cardImage }
                cardRare={ carta.cardRare }
                cardTrunfo={ carta.cardTrunfo }
                hasDelete={ carta.hasDelete }
                deleteFunc={ deleteFunc }
                attFunc={ attFunc }
                className={ carta.className }
              />))}
        </section>
      </div>
    );
  }
}

export default App;
