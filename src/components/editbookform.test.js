import React from 'react';
import { shallow, mount } from 'enzyme';
import {EditBookForm} from './editbookform';
import {editBook} from '../actions/index'; 
import { MemoryRouter, Router, withRouter } from 'react-router-dom' // 4.0.0 

// import { deleteBook } from '../actions/index';
import store from '../store';

const mockEditBook = {
  type: 'EDIT_BOOK'
};

jest.mock('../actions/index', () => Object.assign({},
  require.requireActual('../actions/index'),
  {
      editBook: jest.fn().mockImplementation(() => {
          return mockEditBook;
      })
  }
));

describe('<EditBookForm />', () => {
    it('Renders without crashing', () => {

      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      shallow(
     
          <EditBookForm handleSubmit= {handleSubmit} initialize= {initialize} />
      
      );
    });


    it('Should dispatch editBook when the form is submitted', () => {
      const dispatch = jest.fn().mockImplementation( () => Promise.resolve());
      const handleSubmit = jest.fn();
      const initialize = jest.fn();
      const onSubmit = jest.fn();
      const history = {
        push: jest.fn()

      }
      const wrapper = shallow(
        
      <EditBookForm  dispatch={ dispatch }    
      handleSubmit={handleSubmit} initialize= {initialize}
      history={history} onSubmit ={onSubmit} annotations={[]}/>
      
      
      );
      // const value = '10';
      wrapper.simulate('submit');
      expect(handleSubmit).toHaveBeenCalled();
     return wrapper.instance().onSubmit({
       
      title: "daniel",
      url: "capi",
      authorBook: "daniel silba",
      pages:  "214",
      date: "2015",
      description: "daniel e seus alibis",
      idEditBook: "2134"



  }
    
    ).then(() => {

        
        expect(dispatch).toHaveBeenCalledWith(mockEditBook);
        expect(history.push).toHaveBeenCalled();
      })
  
 
  });

 
   
  
 
  });