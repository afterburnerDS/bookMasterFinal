import React from 'react';
import './home.css';
import {connect} from 'react-redux';
import ModalHome from './modalhome';

export  class Home extends React.Component {

    
    render() {

        return (
            <main className="container">
            <div className="content_mainPage">

            <div className="content_mainPage--secondary">
                <p className="welcomeTitle">Welcome to Book Master ! </p>

                <p className="instructions">Here you will be able to create your own annotations from your favourite books. Never miss an interesting quote and or an inspiring thought, everything is saved in Book Master ! </p>

                <p className="happyCooking">Happy Readings !</p>


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
