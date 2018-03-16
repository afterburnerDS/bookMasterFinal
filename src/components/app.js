import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Home from './home';
import Bookshelf from './bookshelf';
import BookPage from './bookpage';
import AnnotationPage from './annotationpage';
import EditAnnotation from './editannotation';
import {refreshAuthToken} from '../actions/auth';


import './app.css';

export class App extends React.Component {

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.loggedIn && !this.props.loggedIn) {
    //         // When we are logged in, refresh the auth token periodically
    //         this.startPeriodicRefresh();
    //     } else if (!nextProps.loggedIn && this.props.loggedIn) {
    //         // Stop refreshing when we log out
    //         this.stopPeriodicRefresh();
    //     }
    // }

    // componentWillUnmount() {
    //     this.stopPeriodicRefresh();
    // }

    // startPeriodicRefresh() {
    //     this.refreshInterval = setInterval(
    //         () => this.props.dispatch(refreshAuthToken()),
    //         60 * 60 * 1000 // One hour
    //     );
    // }

    // stopPeriodicRefresh() {
    //     if (!this.refreshInterval) {
    //         return;
    //     }

    //     clearInterval(this.refreshInterval);
    // }
    
    
    render() {

        return (
            <Router>
                <div className="app">
                 <header className="header">
                    <h1 className="titleApp">
                    
                        Book Master
                    
                    </h1>
                    <div className="imgHeader">
                        <img src="imgs/book_PNG2116.png" alt="logo"></img>
                    </div>
                </header>
                    {/* <header>
                        <h1><Link to="/">Trelloish</Link></h1>
                    </header> */}
                   
                        <Route exact path="/" component={Home} />
                        <Route exact path="/bookshelf" component={Bookshelf} />
                        <Route exact path="/bookpage/:bookIndex" component={BookPage} />
                        <Route exact path="/annotation/:bookIndex/:annotationId" component={AnnotationPage} />
                        <Route exact path="/annotation" component={AnnotationPage} />
                        <Route exact path="/editannotation/:bookIndex/:annotationId" component={EditAnnotation} />
                    
                </div>
            </Router>
        );
    }
    
}



const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps)(App);