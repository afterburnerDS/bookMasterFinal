import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {addAnnotation} from '../actions';
import AddAnnotation from './add-annotation';
import Annotation from './annotation';
import Input from './input';
 import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import  AnnotationForm  from './annotationform';
import NewBook from './newbook';
import ModalEditBook from './modaleditbook';
import ModalNewAnnot from './modalnewannot';
import ModalDeleteBook from './modaldeletebook';
import {fetchProtectedData} from '../actions/protected-data';

export class BookPage extends React.Component {

    componentDidUpdate() {
        this.props.dispatch(fetchProtectedData());
      }

    // componentWillUpdate() {
    //     this.props.dispatch(fetchProtectedData());
    //   }

    constructor(props, context) {
        super(props, context);
    
    
        this.state = {
          show: false
        };
      }
    
    render() {

        const annotations = this.props.annotations.map((annotation, index) => (
         
            <Annotation 
                index={index}
                bookIndex = {this.props.match.params.bookIndex}
                {...annotation}
            /> 
    ));

    console.log(annotations);
        return (

    <main className="container__bookPage">
     <div className="backBtn">
     <Link to="/bookshelf">Back </Link></div>
     <div className="editBtn">
            <ModalEditBook 
            
            title = {this.props.title}
            authorBook = {this.props.authorBook}
            cover = {this.props.cover}
            date = {this.props.date}       
            pages = {this.props.pages}
            description = {this.props.description}  
            idBook = {this.props.idBook} 
            authToken= {this.props.authToken}      
        />
     </div>
     <div className="delBtn">
            <ModalDeleteBook 
            
                idBook = {this.props.idBook} 
          
            />
     </div>
     
     <div className="bookPage">
         <div className="bookPage__technical">
             <div className="basicDetails">
                     <div className="coverBook">
                        {/* <img src={this.props.cover} /> */}
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
                        
                        bookIndex = {this.props.match.params.bookIndex}/>
                    
                    </div>
             {annotations}
         </div>
     </div>
 </main>

     );
    }

}

const mapStateToProps = (state, props) => {
    
    
    const book = state.protectedData.data.find((book) => {
        return book.title.replace(/ /g, "-") === props.match.params.bookIndex
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
        cover: book.url,
        date: book.date,
        pages: book.pages,
        description: book.description,
        annotations: book.annotations,
        idBook: book._id,
        authToken: state.auth.authToken
    };
    
};

export default connect(mapStateToProps)(BookPage);