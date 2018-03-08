import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import EditAnnotationForm from  './editannotationform'

export  class  EditAnnotation extends React.Component {

    slugify(title) {
        return title
            .toString()
            .toLowerCase()
            .replace(/[\s\W-]+/g, '-');
    }
    
    render() {

        const slugifyTtitleAnnot = this.slugify(this.props.title);
        const slugifyTtitleBook = this.slugify(this.props.bookIndex);

        return (
            <main className="container">
                <div className="backBtn"> <Link to={`/bookpage/${this.props.bookIndex}`}>back </Link></div>

                <EditAnnotationForm 
                    title={this.props.title}
                    annotation={this.props.annotation}
                />

                </main>
        
     );
    }
}

const mapStateToProps = (state, props) => {
    console.log(props.match.params.bookIndex);

    console.log(state.books);


    
    const book = state.bookReducer.books.find((book) => {
        return book.title.replace(/ /g, "-") === props.match.params.bookIndex
    })

    console.log(book);

    const annotation = book.annotations.find((annot) => {
        return annot.title.replace(/ /g, "-") === props.match.params.annotationId
    })

    return {
        title: annotation.title,
        annotation: annotation.annotation,
        bookIndex: props.match.params.bookIndex
        
    };
    
};

export default connect(mapStateToProps)(EditAnnotation);