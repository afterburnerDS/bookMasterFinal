import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {Link} from 'react-router-dom';
import Book from './book';
 import {fetchProtectedData} from '../actions/protected-data';
 import ModalNewBook from './modalnewbook';
 import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';


export class BookShelf extends React.Component  {

    constructor(props, context) {
        super(props, context);
    
      this.props.dispatch(fetchProtectedData());
    
      }

      logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
      let books = [];
        if(this.props.books){
       
          books = this.props.books.map((book, index) => (
         
            <Book 
                index={index}
                key = {index}
                {...book}
               
            /> 
      ));
        }
      
        return (
            <main className="container">
            <div className="logoutBtnBookshelf" onClick={() => this.logOut()}>
            <Link to={`/`}>Logout </Link>

            </div>
                <div className="newBook">
                    <div className="newBook__new">

                    <ModalNewBook 
        
                    authToken= {this.props.authToken}
                      />
          
    
                    
                    </div>
                </div>
                <div className="bookShelf">
                    <p className="bookShelf__title">BookShelf</p>
                    <div className="bookShelf__container">
                      
                        
                        
                        {books}
                      
                  </div>
                </div>
            </main>
    );
    }
}

BookShelf.defaultProps = {
    title: 'BookShelf'
};


// const mapStateToProps = (state, props) => {
//   const {currentUser} = state.auth;
//   return {
     
//       books: state.protectedData.data
//   };
// };

const mapStateToProps = (state, props) => {

    console.log(state.protectedData.data.length);
  
    
   return{
            books: state.protectedData.data,
            authToken: state.auth.authToken
            
        }
   ;
    
};

export default (connect(mapStateToProps)(BookShelf));

// requiresLogin()
// export default connect(mapStateToProps)(BookShelf);


