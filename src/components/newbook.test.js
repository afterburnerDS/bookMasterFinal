import React from 'react';
import { shallow, mount } from 'enzyme';
import {NewBook} from './newbook';
import {newBook} from '../actions/index'; 
import { MemoryRouter, Router, withRouter } from 'react-router-dom' // 4.0.0 

// import { deleteBook } from '../actions/index';
import store from '../store';
const mockNewBook = {
  type: 'NEW_BOOK'
};

jest.mock('../actions/index', () => Object.assign({},
  require.requireActual('../actions/index'),
  {
      newBook: jest.fn().mockImplementation(() => {
          return mockNewBook;
      })
  }
));

describe('<NewBook />', () => {
    it('Renders without crashing', () => {

      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      shallow(<NewBook handleSubmit= {handleSubmit} initialize= {initialize} />);
    });

 
    it.only('Should dispatch newBook when the form is submitted', () => {
      const dispatch = jest.fn().mockImplementation( () => Promise.resolve());
      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      const onSubmit = jest.fn();
      const history = {
        push: jest.fn()

      }
      const wrapper = shallow(
        
      <NewBook  dispatch={ dispatch }    
      handleSubmit={handleSubmit} 
      history={history} onSubmit ={onSubmit}/>
      
      
      );
      // const value = '10';
      wrapper.simulate('submit');
      expect(handleSubmit).toHaveBeenCalled();
      wrapper.instance().onSubmit({
       
      
      title: "daniel",
      url: "capi",
      authorBook: "daniel silba",
      pages:  "214",
      date: "2015",
      description: "daniel e seus alibis",
      idEditBook: "2134"
    }
    
    ).then(() => {

        expect(dispatch).toHaveBeenCalledWith(mockNewBook);
        expect(history.push).toHaveBeenCalled();
      })
  
 
  });
  
 
  });