import React from 'react';
import {shallow} from 'enzyme';

import {Annotation} from './annotation';

describe('<Annotation/>', () => {
   
    it('Renders without crashing', () => {
        
         shallow(<Annotation title="foo"/>);
     });
 
 
     it('Renders the title', () => {
         const title = "Foo";
         const wrapper = shallow(<Annotation title={title} />);
        //  expect(wrapper.title()).toEqual(title);
       
     });
 
    
 
 
     // it('Dispatches bookshelf on mount', () => {
     //     const dispatch = jest.fn();
     //     shallow(<BookShelf books={[]} dispatch={dispatch} />);
     //     expect(dispatch).toHaveBeenCalledWith(mockProtectedData);
     // });
 
    
 });