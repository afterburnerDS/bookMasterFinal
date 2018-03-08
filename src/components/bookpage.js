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

export class BookPage extends React.Component {

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
            author = {this.props.author}/>
     <div>
  </div>
     
     </div>
     
     <div className="bookPage">
         <div className="bookPage__technical">
             <div className="basicDetails">
                     <div className="coverBook"></div>
                     <div className="technicalDetails">
                         <p className="titleBook">{this.props.title}</p>
                         <p className="authorBook">{this.props.author}</p>
                         <p className="dateBook">Year:
                             <span className="dateBook__span">2014</span>
                         </p>
                         <p className="pagesBook">Pages:
                             <span className="pagesBook__span">340</span>
                         </p>           
                     </div>  
             </div>  
             
             <p className="resumeBook">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat, voluptatibus?</p>
         

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
    
    
    const book = state.bookReducer.books.find((book) => {
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
        author: book.author,
        annotations: book.annotations
    };
    
};

export default connect(mapStateToProps)(BookPage);