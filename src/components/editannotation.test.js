import React from 'react';
import {shallow, mount,render} from 'enzyme';
import store from '../store';
import {EditAnnotation} from './editannotation';

describe('<EditAnnotation/>', () => {


    it('Renders without crashing', () => {
       
        shallow(<EditAnnotation />);
    });
    

});
