import React from 'react';

class Finish extends React.Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { fullname, email, cpf, phone, cep, address } = this.state;
    return (
      <div>
        <form>
          <input
            onChange={ this.onInputChange }
            type="text"
            data-testid="checkout-fullname"
            value={ fullname }
            name="fullname"
          />
          Nome
          <input
            onChange={ this.onInputChange }
            type="email"
            data-testid="checkout-email"
            value={ email }
            name="email"
          />
          Email
          <input
            onChange={ this.onInputChange }
            type="text"
            data-testid="checkout-cpf"
            value={ cpf }
            name="cpf"
          />
          CPF
          <input
            onChange={ this.onInputChange }
            type="text"
            data-testid="checkout-phone"
            value={ phone }
            name="phone"
          />
          Telefone
          <input
            onChange={ this.onInputChange }
            type="text"
            data-testid="checkout-cep"
            value={ cep }
            name="cep"
          />
          CEP
          <input
            onChange={ this.onInputChange }
            type="text"
            data-testid="checkout-address"
            value={ address }
            name="address"
          />
          Endereço
        </form>
      </div>
    );
  }
}

export default Finish;
