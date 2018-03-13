import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export  class  AnnotaionPage extends React.Component {

    render() {

        return (
            <main className="container">
                <div className="backBtn"> <Link to={`/bookpage/${this.props.idBook}`}>back </Link></div>

                <div className="editBtn"> <Link to={`/editannotation/${this.props.idBook}/${this.props.idAnnot}`}>edit </Link></div>

                    <div className="title">
                        {this.props.title}
                    </div>
                    <div className="annotation">
                        {this.props.annotation}
                    </div>
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
        idBook: book.idBook,
        idAnnot: annotation.idAnnot,
        title: annotation.title,
        annotation: annotation.annotation,
        bookIndex: props.match.params.bookIndex
        
    };
    
};

export default connect(mapStateToProps)(AnnotaionPage);