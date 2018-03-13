import React from 'react';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
// import {addAnnotation} from '../actions';
import  FormNewAnnot  from './formnewannot';


export  class ModalNewAnnot extends React.Component {
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

    //   addAnnotation(title, annotation){
    //     console.log(this.props.bookIndex);
    //     this.props.dispatch(addAnnotation(title,annotation,this.props.bookIndex));
    // }
    
      render() {
        
    
        return (
            <div>
              <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
      New Annotation
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <FormNewAnnot
        
        // onAdd={(title, annotation) => this.addAnnotation(title, annotation)}

        annotations = {this.props.annotations}
        idEditBook = {this.props.idEditBook}
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

  export default connect()(ModalNewAnnot);


  