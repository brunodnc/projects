import './App.css';
import HelloWorld from './HelloWorld';
import Header from './header'
import Content from './content'
import Footer from './footer';

const Task = (value) => {
  return (
    <li>{value}</li>
  )
}

const compromissos = [1, 2, 3, 4, 5];

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <Header />
      </header>
      <main>
        <section>
          <HelloWorld />
        </section>
        <section>
          <Content />
        </section>
        <ol>
          {compromissos.map((compro) => Task(compro))}
        </ol>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
