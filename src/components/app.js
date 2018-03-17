import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Home from "./home";
import Bookshelf from "./bookshelf";
import BookPage from "./bookpage";
import AnnotationPage from "./annotationpage";
import EditAnnotation from "./editannotation";
import { refreshAuthToken } from "../actions/auth";

import "./app.css";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header className="header">
            <h1 className="titleApp">Book Master</h1>
            <div className="imgHeader">
              <img
                src="http://pngimg.com/uploads/book/book_PNG2116.png"
                alt="logo"
              />
            </div>
          </header>

          <Route exact path="/" component={Home} />
          <Route exact path="/bookshelf" component={Bookshelf} />
          <Route exact path="/bookpage/:bookIndex" component={BookPage} />
          <Route
            exact
            path="/annotation/:bookIndex/:annotationId"
            component={AnnotationPage}
          />
          <Route exact path="/annotation" component={AnnotationPage} />
          <Route
            exact
            path="/editannotation/:bookIndex/:annotationId"
            component={EditAnnotation}
          />
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
