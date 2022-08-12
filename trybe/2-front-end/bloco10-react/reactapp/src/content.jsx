import React from 'react';

const conteudos = [
    {
      conteudo: 'High Order Functions',
      bloco: 8,
      status: 'Aprendido'
    },
    {
      conteudo: 'Composicao de Componentes',
      bloco: 11,
      status: 'Aprendendo',
    },
    {
      conteudo: 'Composicao de Estados',
      bloco: 12,
      status: 'Aprenderei'
    },
    {
      conteudo: 'Redux',
      bloco: 16,
      status: 'Aprenderei'
    },
  ];

class Content extends React.Component {
    render() {
        return (
            <li key='lista'>{conteudos.map((item) => {
                return (<p>O conteúdo é: {item.conteudo}
                Status: {item.status}
                Bloco: {item.bloco}</p>)
            })}</li>
        )
    }
}

export default Content