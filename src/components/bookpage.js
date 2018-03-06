import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {addAnnotation} from '../actions';
import AddAnnotation from './add-annotation';
import Annotation from './annotation';
import Input from './input';
import ContactForm from './contactform'
 import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Tooltip, OverlayTrigger  } from 'react-bootstrap';
import { AnnotationForm } from './annotationform';

export class BookPage extends React.Component {

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

    addAnnotation(title, annotation){
        this.props.dispatch(addAnnotation(title,annotation,this.props.match.params.bookIndex));
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

                         <div>
    
    <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
      New Annotation
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <ContactForm
        
        onAdd={(title, annotation) => this.addAnnotation(title, annotation)}/>
      
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
                    
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