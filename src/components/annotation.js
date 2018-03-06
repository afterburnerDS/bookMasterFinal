import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class  Annotation extends React.Component {

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
            <div className="annot">
                     <Link to={`/annotation/${slugifyTtitleBook}/${slugifyTtitleAnnot}`}>{this.props.title} </Link>
                </div>
         
     );
    }
}



export default connect()(Annotation);