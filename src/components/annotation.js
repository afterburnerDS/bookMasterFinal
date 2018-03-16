import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class  Annotation extends React.Component {

    
    render() {
        return (
            <div className="annot">
                     <Link to={`/annotation/${this.props.idBook}/${this.props.idAnnot}`}>
                     
                     <ul>
                        <li className="page page3"></li>
                         <li className="page page2"></li>
                        <li className="page page1"></li>
                        <li className="cover"> 
                        
                       { this.props.title} 
                        </li>
                    </ul>
                     
                     </Link>
                </div>
         
     );
    }
}

export default connect()(Annotation);