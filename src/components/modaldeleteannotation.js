import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FormDeleteAnnotation from './formdeleteannot';


export default class ModalDeleteAnnotation extends React.Component {
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
      Delete Annotation
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Annotation</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <FormDeleteAnnotation
          idEditBook = {this.props.idEditBook}
          idBook = {this.props.idBook}
          idAnnot = {this.props.idAnnot}
          annotations = {this.props.annotations}
          authToken= {this.props.authToken}    
          />
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
          </div>
        );
      }
  }