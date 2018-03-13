import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import BookPage from './bookpage';
import Book from './book';
import {addBook} from '../actions';

// import ReactModal from 'react-modal';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import NewBook from './newbook'
 import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
 import {fetchProtectedData} from '../actions/protected-data';
 import ModalNewBook from './modalnewbook';


export class BookShelf extends React.Component  {

    constructor(props, context) {
        super(props, context);
    
      this.props.dispatch(fetchProtectedData());
    
      }

    render() {
      let books = [];
        if(this.props.books){
       
          books = this.props.books.map((book, index) => (
         
            <Book 
                index={index}
                key = {index}
                {...book}
               
            /> 
      ));
        }
      
        return (
            <main className="container">

                <div className="newBook">
                    <div className="newBook__new">

                    <ModalNewBook 
        
                    authToken= {this.props.authToken}
                      />
          
    
                    
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


// const mapStateToProps = (state, props) => {
//   const {currentUser} = state.auth;
//   return {
     
//       books: state.protectedData.data
//   };
// };

const mapStateToProps = (state, props) => {

  console.log(state.protectedData.data);
    
   return{
            books: state.protectedData.data,
            authToken: state.auth.authToken
            
        }
   ;
    
};

export default connect(mapStateToProps)(BookShelf);


