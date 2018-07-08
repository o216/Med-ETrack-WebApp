import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Record from './Record/Record.js';
import './App.css';

class App extends Component {
  constructor(props) {
     super(props);

     this.state = {
        data: 'Initial data...'
     }
     this.handleClick = this.handleClick.bind(this);
  };

  handleClick(){
    alert("Hello World!")
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fas fa-prescription-bottle fa-2x me-logo"></i>
          <h1 className="App-title">Welcome to Med-ETrack</h1>
        </header>
        <Button onClick = {this.handleClick.bind(null, "Hello World")}>Do Contract Stuff</Button>
        <Record name="USER"/>
      </div>
    );
  }
}

export default App;
