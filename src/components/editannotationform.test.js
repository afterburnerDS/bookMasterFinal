import React from 'react';
import { shallow, mount } from 'enzyme';
import EditAnnotationForm from './editannotationform';
import {editAnnotation} from '../actions/index'; 

// import { deleteBook } from '../actions/index';
import store from '../store';

const mockEditAnnotation = {
  type: 'EDIT_ANNOTATION'
};

jest.mock('../actions/index', () => Object.assign({},
  require.requireActual('../actions/index'),
  {
      editAnnotation: jest.fn().mockImplementation(() => {
          return mockEditAnnotation;
      })
  }
));

describe('<EditAnnotationForm />', () => {
    it('Renders without crashing', () => {
      shallow(<EditAnnotationForm />);
    });

  
    it.only('Should dispatch editAnnotation when the form is submitted', () => {
      const dispatch = jest.fn();
      const wrapper = mount(<EditAnnotationForm  dispatch={() => {}} />);
      wrapper.simulate('submit');
      expect(dispatch).toHaveBeenCalledWith(mockEditAnnotation);
    });
  
 
  });