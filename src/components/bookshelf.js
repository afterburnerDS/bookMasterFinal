import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import BookPage from './bookpage';
import Book from './book';
import {addBook} from '../actions';
import AddBook from './add-book';
// import ReactModal from 'react-modal';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import ContactForm from './contactform'
 import MySmallModal from './mysmallmodal';
 import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';


export class BookShelf extends React.Component  {

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

    addBook(title){
        this.props.dispatch(addBook(title));
    }

    render() {

        const popover = (
            <Popover id="modal-popover" title="popover">
              very popover. such engagement
            </Popover>
          );

          const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
        
        const books = this.props.books.map((book, index) => (
         
                <Book 
                    index={index}
                    {...book}
                   
                /> 
            
        ));

        return (
            <main className="container">

                <div className="newBook">
                    <div className="newBook__new">

    
                 <div>
    
            <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
              Launch demo modal
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <ContactForm />
              
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
    
                    
                    </div>
                </div>
                <div className="bookShelf">
                    <p className="bookShelf__title">BookShelf</p>
                    <div className="bookShelf__container">
                        {books}
                     </div>
                </div>
            </main>
    );
    }
}

BookShelf.defaultProps = {
    title: 'BookShelf'
};

const mapStateToProps = (state, props) => {

    console.log(state.books);
   return{
            books: state.books
            
        }
   ;
    
};

export default connect(mapStateToProps)(BookShelf);


