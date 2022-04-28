import React from 'react';
import ReactDOM from 'react-dom/client';

function tick() {

    const textJSX = "Hello, JSX"
  
    const element = (
      <div>
        <h1>{textJSX}</h1>
        <h2>It is {new Date().toLocaleTimeString('pt', { hour12: true})}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }


  class HelloWorld  extends React.Component {
      render() {
          return (
          <>
          <h1>Hello World</h1>
          <div>{setInterval(tick, 1000)}</div>
          </>
            )
      }
  }

export default HelloWorld
