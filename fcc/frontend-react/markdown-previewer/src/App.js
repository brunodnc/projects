
import './App.css';
import React from 'react';
import { marked } from 'marked';
import Prism from 'prismjs'


// source from function below: https://codepen.io/freeCodeCamp/pen/GrZVVO

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {
      textInput: '',
    }
   this.handleOnChange = this.handleOnChange.bind(this); 
  }
  handleOnChange(e) {
      this.setState((prevState) => ({textInput: e.target.value}));
  }
  componentDidMount() {
    const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

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


1. And there are numbered lists too.
1. Use just 1s if you want!
1. nd last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
source from this text: [links](https://codepen.io/freeCodeCamp/full/GrZVVO)

`;
    this.setState({textInput: initialText})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Markdown Previewer</h1>
        </header>
        <main>
          <section className="editor"> 
            <h2>Text Editor</h2>
            <textarea id="editor" onChange={this.handleOnChange} value={this.state.textInput}></textarea>
          </section>
          <h2>Markdown Output</h2>
          <section className="result">
            <div id="preview" dangerouslySetInnerHTML={{
        __html: marked(this.state.textInput, { renderer: renderer })
      }}>
            </div>
          </section>
        </main>
        <br />
      </div>
      
    );
  } 
}

export default App;
