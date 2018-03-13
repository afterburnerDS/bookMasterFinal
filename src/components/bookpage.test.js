import React from 'react';
import {shallow, mount,render} from 'enzyme';
import store from '../store';
import Annotation from './annotation';
import {BookPage} from './bookpage'



describe('<BookPage/>', () => {

it('Renders without crashing', () => {
    const dispatch = jest.fn();
    shallow(<BookPage annotations ={[]}  />);
});


let seedAnnotations = [];
    beforeAll(() => {
        for (let i=0; i<10; i++) {
            seedAnnotations.push({
                title: `Annot ${i}`,
                annotation: 'hello hello'
            })
        }
    });

it('Renders the annotations', () => {
      
    // const dispatch = jest.fn();
    const wrapper = shallow(<BookPage annotations={seedAnnotations} />);
    const annotations = wrapper.find(Annotation);
    expect(annotations.length).toEqual(seedAnnotations.length);
    const firstAnnotation = annotations.first();
    expect(firstAnnotation.prop('title')).toEqual(seedAnnotations[0].title);
});

});

