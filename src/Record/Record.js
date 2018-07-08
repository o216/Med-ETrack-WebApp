import React, { Component } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import './Record.css';
import axios from 'axios';


class Record extends Component{
  constructor(props, context) {
    super(props, context);

    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);

    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);

    this.updateInputValue = this.updateInputValue.bind(this);

    this.state = {
      showAdd: false,
      showEdit: false,
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({inputValue: evt.target.value});
  }

  handleShowAdd() {
    this.setState({ showAdd: true });
  }

  handleShowEdit() {
    this.setState({ showEdit: true });
  }

  handleCloseAdd() {
    console.log(this.state.inputValue);
     axios.post(`/`,
       { interactionId: {N: this.props.nextInteractionId.toString()},
         careTakerId: {N: '1'},
         lastTimeTaken: {S: Math.floor(Date.now()/1000).toString()},
         medicineName: {S: this.state.inputValue.toString()},
         patientId: {N: '1'},
         rate: {N: '3'}})
       .then(res => {
         console.log(res);
         console.log(res.data);
         window.location.reload();
     })
    this.setState({ showAdd: false });
  }

  handleCloseEdit() {
    axios.post(`/`,
      { interactionId: {N: this.props.nextInteractionId.toString()},
        careTakerId: {N: '1'},
        lastTimeTaken: {S: this.props.interaction.lastTimeTaken.S},
        medicineName: {S: this.props.interaction.medicineName.S},
        patientId: {N: '1'},
        rate: {N: this.state.inputValue.toString()}})
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
    })
    this.setState({ showEdit: false });
  }


  render() {
    return (
    <div className="me-patient">

        <h4 className="ui horizontal divider header">
          <i className="pills icon"></i>
          {new Date(parseInt(this.props.interaction.lastTimeTaken.S, 10)*1000).toLocaleDateString()
            +" @ "+new Date(parseInt(this.props.interaction.lastTimeTaken.S, 10)*1000).toLocaleTimeString()}
        </h4>

        <div className="me-patient-update">

          <div className="ui button dropdown button" tabIndex="0" onClick={this.handleShowAdd}>
              <i className="plus icon"></i>
          </div>

            <div className="ui button" tabIndex="0" onClick={this.handleShowEdit}>
                <div className="visible content"><i className="pencil alternate icon"></i></div>
            </div>
        </div>

        <div className="me-patient-status">Patient with patientId:
          <span> {this.props.interaction.patientId.N} </span>
          last took medication:
          <span> {this.props.interaction.medicineName.S} </span>
          at <span> {new Date(parseInt(this.props.interaction.lastTimeTaken.S, 10)*1000).toLocaleDateString()
            +" at "+new Date(parseInt(this.props.interaction.lastTimeTaken.S, 10)*1000).toLocaleTimeString()}. </span>
          Current plan is to take <span> {this.props.interaction.medicineName.S} </span>
          every <span> {this.props.interaction.rate.N} </span>hours.
        </div>

        <Modal show={this.state.showAdd} onHide={this.handleCloseAdd}>
          <Modal.Header>
            What did you give this patient?
          </Modal.Header>
          <Modal.Body className="me-centered">

            <FormControl type="text" placeholder="Enter amount" value={this.state.inputValue} onChange={this.updateInputValue} />
          </Modal.Body>

          <Modal.Footer>
           <Button onClick={this.handleCloseAdd}>Save</Button>
          </Modal.Footer>
       </Modal>

       <Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
         <Modal.Header>
             How many hours between patient dosages should happen?
         </Modal.Header>
         <Modal.Body className="me-centered">
           <FormControl type="text" placeholder="Enter amount" value={this.state.inputValue} onChange={this.updateInputValue} />
         </Modal.Body>

         <Modal.Footer>
          <Button onClick={this.handleCloseEdit}>Save</Button>
         </Modal.Footer>
      </Modal>

    </div>)
  };
}

export default Record;
