import React from 'react';
import {shallow, mount,render} from 'enzyme';
import store from '../store';
import {AnnotaionPage} from './annotationpage';

describe('<AnnotationPage/>', () => {


    it('Renders without crashing', () => {
       
        shallow(<AnnotaionPage idBook = {"book1"} idAnnot = {"annot2"} title={"anot 1"} annotation={"hello hello"} />);
    });
    

});


