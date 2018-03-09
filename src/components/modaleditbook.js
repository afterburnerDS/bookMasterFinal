import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import EditBookForm from './editbookform';

export default class ModalEditBook extends React.Component {
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
      Edit Book
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <EditBookForm
          title = {this.props.title}
          authorBook = {this.props.authorBook}
          cover = {this.props.cover}
          date = {this.props.date}       
          pages = {this.props.pages}
          description = {this.props.description}
          idBook = {this.props.idBook}
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