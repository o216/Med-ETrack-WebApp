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
     axios.post(`/fakeEndpoint`,
       { careTakerId: 1,
         lastTimeTaken: Math.floor(Date.now()/1000),
         medicineName: this.state.inputValue,
         patientId: 1,
         rate: 3})
       .then(res => {
         console.log(res);
         console.log(res.data);
     })
    this.setState({ showAdd: false });
  }

  handleCloseEdit() {
    axios.post(`/fakeEndpoint`,
      { careTakerId: 1,
        lastTimeTaken: Math.floor(Date.now()/1000),
        medicineName: 'Tylenol 500g',
        patientId: 1,
        rate: this.state.inputValue})
      .then(res => {
        console.log(res);
        console.log(res.data);
    })
    this.setState({ showEdit: false });
  }


  render() {
    return (
    <div className="me-patient">

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
          last took medication
          <span> {this.props.interaction.medicineName.S} </span>
          at <span> {this.props.interaction.lastTimeTaken.S}. </span>
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
