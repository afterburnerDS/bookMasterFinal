import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class  Book extends React.Component {

    

    render() {

   
 
        return (
            <div className="book">
                    <Link to={`/bookpage/${this.props.idBook}`}>{this.props.title} </Link>
            </div>
         
     );

    };
}

// Book.defaultProps = {
//     title: ''
// };


const mapStateToProps = (state, props) => {

    console.log(state.books);
   return{
            books: state.books
            
        }
   ;
    
};
export default connect()(Book);