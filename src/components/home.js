import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './home.css';
import {connect} from 'react-redux';
import ModalHome from './modalhome';

export  class Home extends React.Component {

  

    constructor(props, context) {
        super(props, context);
    
        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);
    
        // this.state = {
        //   show: false
        // };
      }
    
    //   handleClose() {
    //     this.setState({ show: false });
    //   }
    
    //   handleShow() {
    //     this.setState({ show: true });
    //   }

    render() {

        // if (this.props.loggedIn) {
        //     return <Redirect to="/bookshelf" />;
        // }
        return (
            <main className="container">
            <div className="content_mainPage">

            <div className="content_mainPage--secondary">
                <p className="welcomeTitle">Welcome to Book Master ! </p>

                <p className="instructions">Here you will be able to create your own recipes, and choose ingredients from our database of more than 300.000
                    foods from all around the world ! You can also edit, delete, and also filter your recipes by ingredient
                    used or tag inserted.</p>

                <p className="happyCooking">Happy Cooking !</p>


                <div className="loginCredentials">
                    <p>Test Login Credentials</p>
                    <p>username: test@test.com</p>
                    <p>password: testthinkful2018</p>
                </div>
                
             
                {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
              Login
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
              
              <Modal.Body>
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Login">
                        <LoginForm 
                        
                        />
                    </Tab>
                    <Tab eventKey={2} title="Register">
                        <RegisterForm />
                    </Tab>
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal> */}

            <ModalHome />

                {/* <div className="button"><Link to="/bookshelf"> Login</Link></div> */}
 

            </div>
            </div>

            </main>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);
