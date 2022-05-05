
import './App.css';
import React from 'react';
import marked from 'marked'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textInput: '',
      markdown: ''
    }
   this.handleOnChange = this.handleOnChange.bind(this); 
  }
  handleOnChange(e) {
      this.setState((prevState) => ({textInput: e.target.value,
        markdown: marked(e.target.value)}));
  }
  componentDidMount() {
    this.setState({textInput: `# Welcome to my React Markdown Previewer!

    ## This is a sub-heading...
    ### And here's some other cool stuff:
    
    Heres some code, "<div></div>", between 2 backticks.
    
    // this is multi-line code:
    
    function anotherExample(firstLine, lastLine) {
      if (firstLine == 'crase' && lastLine == 'crase') {
        return multiLineCode;
      }
    }
    
    
    You can also make text **bold**... whoa!
    Or _italic_.
    Or... wait for it... **_both!_**
    And feel free to go crazy ~~crossing stuff out~~.
    
    There's also [links](https://www.freecodecamp.org), and
    > Block Quotes!
    
    And if you want to get really crazy, even tables:
    
    Wild Header | Crazy Header | Another Header?
    ------------ | ------------- | -------------
    Your content can | be here, and it | can be here....
    And here. | Okay. | I think we get it.
    
    - And of course there are lists.
      - Some are bulleted.
         - With different indentation levels.
            - That look like this.

    source from this text: [links](https://codepen.io/freeCodeCamp/full/GrZVVO)
    `})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Markdown Previewer</h1>
        </header>
        <main>
          <section> 
            <h2>Text Editor</h2>
            <textarea id="editor" onChange={this.handleOnChange} value={this.state.textInput}></textarea>
          </section>
          <section>
            <h2>Marked Down or Markdowned?</h2>
            <div id="preview">
              {this.state.markdown}
            </div>
          </section>
        </main>
      </div>
    );
  } 
}

export default App;
