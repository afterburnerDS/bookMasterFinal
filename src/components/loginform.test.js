import React from 'react';
import { shallow, mount } from 'enzyme';
import {LoginForm} from './loginform';
import { MemoryRouter, Router, withRouter } from 'react-router-dom' // 4.0.0

// import { deleteBook } from '../actions/index';
import store from '../store';

const mockLogin = {
  type: 'LOGIN'
};

jest.mock('../actions/auth', () => Object.assign({},
  require.requireActual('../actions/auth'),
  {
      login: jest.fn().mockImplementation(() => {
          return mockLogin;
      })
  }
));



describe('<LoginForm />', () => {
    it('Renders without crashing', () => {

      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      shallow(
        
        <LoginForm handleSubmit= {handleSubmit} initialize= {initialize} />

        
    
    
    );
    });

 
    it('Should dispatch login when the form is submitted', () => {
      const dispatch = jest.fn().mockImplementation( () => Promise.resolve());
      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      const onSubmit = jest.fn();
      const history = {
        push: jest.fn()

      }
      const wrapper = shallow(
        
      <LoginForm  dispatch={ dispatch }    
      handleSubmit={handleSubmit} initialize= {initialize}
      history={history} onSubmit ={onSubmit}/>
      
      
      );
      // const value = '10';
      wrapper.simulate('submit');
      expect(handleSubmit).toHaveBeenCalled();
     return wrapper.instance().onSubmit({
       
      email: "daniel",
      password: "capi",

  }
    
    ).then(() => {

        
        expect(dispatch).toHaveBeenCalledWith(mockLogin);
        expect(history.push).toHaveBeenCalled();
      })
  
 
  });
  
 
  });