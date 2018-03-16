import React from 'react';
import {connect} from 'react-redux';
import { Button, Modal, Tab, Tabs  } from 'react-bootstrap';
import LoginForm from './loginform'
import RegisterForm from './registerform'


export  class ModalHome extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      render() {
        
    
        return (
            <div>
              <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
              Login / Register
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
              
              <Modal.Body>
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Login">
                        <LoginForm 
                        
                        />
                    </Tab>
                    <Tab eventKey={2} title="Register">
                        <RegisterForm />
                    </Tab>
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
  }

  export default connect()(ModalHome);


  