import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {addAnnotation} from '../actions';
import Annotation from './annotation';
import Input from './input';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import NewBook from './newbook';
import ModalEditBook from './modaleditbook';
import ModalNewAnnot from './modalnewannot';
import ModalDeleteBook from './modaldeletebook';
import {fetchProtectedData} from '../actions/protected-data';

export class BookPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    
      }
    
    render() {
        
        const annotations = this.props.annotations.map((annotation, index) => (
         
            <Annotation 
                index={index}
                key = {index}
                idBook = {this.props.idBook}
                url = {this.props.url}
                {...annotation}
            /> 
    ));

        return (

    <main className="container__bookPage">
     <div className="backBtn">
     <Link to="/bookshelf">Back </Link></div>
     <div className="editBtn">
            <ModalEditBook 
            
            title = {this.props.title}
            authorBook = {this.props.authorBook}
            url = {this.props.url}
            date = {this.props.date}       
            pages = {this.props.pages}
            description = {this.props.description}
            idBook = {this.props.idBook}  
            idEditBook = {this.props.idEditBook} 
            authToken= {this.props.authToken}      
        />
     </div>
     <div className="delBtn">
            <ModalDeleteBook 
            
                idEditBook = {this.props.idEditBook}
                title = {this.props.title}
            authorBook = {this.props.authorBook}
            url = {this.props.url}
            date = {this.props.date}       
            pages = {this.props.pages}
            description = {this.props.description}  
            authToken= {this.props.authToken}    
          
            />
     </div>
     
     <div className="bookPage">
         <div className="bookPage__technical">
             <div className="basicDetails">
                     <div className="coverBook">
                        <img src={this.props.url} />
                     </div>
                     <div className="technicalDetails">
                         <p className="titleBook">{this.props.title}</p>
                         <p className="authorBook">{this.props.authorBook}</p>
                         <p className="dateBook">Year:
                             <span className="dateBook__span">{this.props.date}</span>
                         </p>
                         <p className="pagesBook">Pages:
                             <span className="pagesBook__span">{this.props.pages}</span>
                         </p>           
                     </div>  
             </div>  
             
             <p className="resumeBook">{this.props.description}</p>
         

         </div>
         <div className="bookPate__annotations">
            <div className="newBook__new">
                   
                    {/* <AddAnnotation
                           onAdd={text => this.addAnnotation(text)}
                        /> */}

                        

                        <ModalNewAnnot 
                        annotations = {this.props.annotations}
                        idEditBook = {this.props.idEditBook}
                        authToken= {this.props.authToken}   />
                    
                    </div>
            <div className="annot__container">
             {annotations}

             </div>
         </div>
     </div>
 </main>

     );
    }

}

const mapStateToProps = (state, props) => {
    
    console.log(state.protectedData.data);
    const book = state.protectedData.data.find((book) => {
        return book.idBook === props.match.params.bookIndex
    })

    

    console.log(book);

    // const book = Object.assign(
    //     {},
    //     {
    //         annotations: []
    //     },
    //     state.books[props.match.params.bookIndex]
    // );
    return {
        title: book.title,
        authorBook: book.authorBook,
        url: book.url,
        date: book.date,
        pages: book.pages,
        description: book.description,
        annotations: book.annotations,
        idBook: book.idBook,
        idEditBook: book._id,
        authToken: state.auth.authToken
    };
    
};

export default connect(mapStateToProps)(BookPage);