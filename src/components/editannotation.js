import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import EditAnnotationForm from  './editannotationform'

export  class  EditAnnotation extends React.Component {

    
    
    render() {

        return (
            <main className="container">
                <div className="backBtn"> <Link to={`/bookpage/${this.props.idBook}`}>back </Link></div>

                <EditAnnotationForm
                 
                    title={this.props.title}
                    annotation={this.props.annotation}
                    idBook = {this.props.idBook}
                    idEditBook = {this.props.idEditBook}
                    idAnnot = {this.props.idAnnot}
                    authToken = {this.props.authToken}
                    annotations = {this.props.annotations}
                />

                </main>
        
     );
    }
}

const mapStateToProps = (state, props) => {
    console.log(props.match.params.bookIndex);

    


    
    const book = state.protectedData.data.find((book) => {
        return book.idBook === props.match.params.bookIndex
    })

    console.log(book);
    console.log(props.match.params.annotationId);

    const annotation = book.annotations.find((annot) => {
        return annot.idAnnot === props.match.params.annotationId
    })

    return {
        annotations: book.annotations,
        idAnnot: annotation.idAnnot,
        title: annotation.title,
        annotation: annotation.annotation,
        bookIndex: props.match.params.bookIndex,
        idBook: book.idBook,
        idEditBook: book._id,
        authToken: state.auth.authToken 
        
    };
    
};

export default connect(mapStateToProps)(EditAnnotation);