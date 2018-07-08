import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Record from './Record/Record.js';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
     super(props);

     this.state = {
        data: []
     }
     this.handleClick = this.handleClick.bind(this);
  };

  handleClick(){
    alert("Hello World!")
  }

  componentDidMount() {
    axios.get(`https://medi-etrack-db.herokuapp.com/`)
      .then(res => {
        this.setState({ data: res.data.Items });
        console.log(res.data.Items);
      })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fas fa-prescription-bottle fa-2x me-logo"></i>
          <h1 className="App-title">Welcome to Med-ETrack</h1>
        </header>

        {this.state.data.map((interaction, i) => <Record interaction={interaction} key={i} />)}

      </div>
    );
  }
}

export default App;
