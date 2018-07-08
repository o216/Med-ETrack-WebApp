import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Record from './Record/Record.js';
import './App.css';
import Web3 from "web3";

const assert = require('assert');
const web3 = new Web3("http://localhost:8545");
const json = require("./../../Med_ETracker/build/contracts/Med_ETrack.json");


class App extends Component {

    constructor(props) {
	super(props);

	this.state = {
            data: 'Initial data...',
	    accounts: {},
	    med_E: {},
	    manager: {}
	}
	this.handleClick = this.handleClick.bind(this);
    };
    
    handleClick(){
	alert("Hello World!");
	this.state.med_E.methods.newPatient("pat", {from: "0x627306090abab3a6e1400e9345bc60c78a8bef57"})
    };
    
    componentDidMount(){

	const interfac = json["abi"];
	const bytecode = json["bytecode"];

	beforeEach(async () => {
	    this.setState({accounts: await web3.eth.getAccounts()});
	    this.setState({manager: this.state.accounts[0]});
	    this.setState({med_E: await new web3.eth.Contract(interfac)
		.deploy({ data: bytecode })
		.send({ from: this.state.manager, gas: "10000" })
			  })});
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
