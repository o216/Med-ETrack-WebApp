import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './Record.css';


function Record(props) {


  return (
    <div className="me-patient">
        <div className="me-patient-update">

          <div className="ui button dropdown button" tabIndex="0">
              <i className="plus icon"></i>

          </div>

            <div className="ui animated button" tabIndex="0">
                <div className="visible content"><i className="pencil alternate icon"></i></div>
                <div className="hidden content">
                  Edit
                </div>
            </div>
        </div>
        <div className="me-patient-status">USER last took AMOUNT UNIT of MEDICATION at TIME</div>
    </div>);
}

export default Record;
