import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import EditAnnotationForm from  './editannotationform';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export  class  EditAnnotation extends React.Component {

    logOut() {

        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    
    render() {

        return (
            <main className="container">


                 <div className="container__buttons">
                    <div className="backBtn"> <Link to={`/bookpage/${this.props.idBook}`}>Back </Link></div>
                    <div className="logoutBtn" onClick={() => this.logOut()}>
                        <Link to={`/`}>Logout </Link>
                    </div>
     
     
                </div>

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
    const book = state.protectedData.data.find((book) => {
        return book.idBook === props.match.params.bookIndex
    })

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