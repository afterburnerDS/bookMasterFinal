import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteBookForm from './deletebookform'

// import { deleteBook } from '../actions/index';
import store from '../store';

const mockDeleteBook = {
  type: 'DELETE_BOOK'
};

jest.mock('../actions/index', () => Object.assign({},
  require.requireActual('../actions/index'),
  {
      deleteBook: jest.fn().mockImplementation(() => {
          return mockDeleteBook;
      })
  }
));

describe('<DeleteBookForm />', () => {
    it('Renders without crashing', () => {
      shallow(<DeleteBookForm />);
    });

  
    it('Should dispatch deleteBook when the form is submitted', () => {
      const dispatch = jest.fn();
      const wrapper = mount(<DeleteBookForm  dispatch={() => {} } store={store}/>);
      wrapper.simulate('submit');
      expect(dispatch).toHaveBeenCalledWith(mockDeleteBook);
    });
  
 
  });