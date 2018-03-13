import React from 'react';
import {shallow, mount,render} from 'enzyme';
import store from '../store';

import {BookShelf} from './bookshelf';
import Book  from './book';


// Mock the async fetchBoard action
const mockProtectedData = {
    type: 'FETCH_PROTECTED_DATA'
};

jest.mock('../actions/protected-data', () => Object.assign({},
    require.requireActual('../actions/protected-data'),
    {
        fetchProtectedData: jest.fn().mockImplementation(() => {
            return mockProtectedData;
        })
    }
));

describe('<BookShelf/>', () => {

    let seedBooks = [];
    beforeAll(() => {
        for (let i=0; i<10; i++) {
            seedBooks.push({
                title: `Book ${i}`,
                url: 'sfasdf'
            })
        }
    });

    it('Renders without crashing', () => {
        const dispatch = jest.fn();
        shallow(<BookShelf books={[]} dispatch={dispatch} />);
    });


    it('Dispatches fetchProtectedData on mount', () => {
        const dispatch = jest.fn();
        shallow(<BookShelf books={[]} dispatch={dispatch} />);
        expect(dispatch).toHaveBeenCalledWith(mockProtectedData);
    });

    it('Renders the books', () => {
      
        const dispatch = jest.fn();
        const wrapper = shallow(<BookShelf books={seedBooks} dispatch={dispatch} />);
        const books = wrapper.find(Book);
        expect(books.length).toEqual(seedBooks.length);
        const firstBook = books.first();
        expect(firstBook.prop('title')).toEqual(seedBooks[0].title);
    });
});