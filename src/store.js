import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import {bookReducer} from './reducers';
console.log(bookReducer);

export default createStore(
    combineReducers({
        form: formReducer,
        bookReducer
    })
);