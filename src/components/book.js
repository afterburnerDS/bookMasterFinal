import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class  Book extends React.Component {

    

    render() {
console.log(this.props.url);
   
 
        return (


            // <Link className = "linkBook" to={`/bookpage/${this.props.idBook}`}>
            
                     
            //          <div className="book">
                      
            //                 <img src ={ this.props.url} />

                      
            //         </div>

                    
            //         </Link> 


            <div className="annot divider">
            <Link to={`/bookpage/${this.props.idBook}`}>
            
            <ul>
               <li className="page page3"></li>
                <li className="page page2"></li>
               <li className="page page1"></li>
               <li className="cover"> 
               
               <img src ={ this.props.url} />
               </li>
           </ul>
            
            </Link>
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