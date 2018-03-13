import React from 'react';
import {API_BASE_URL} from '../config';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import { withRouter } from "react-router-dom";
import {Link, Redirect} from 'react-router-dom';



// export const ADD_BOOK = 'ADD_BOOK';
// export const addBook = (title, author) => ({
//     type: ADD_BOOK,
//     title,
//     author
// });

// export const ADD_ANNOTATION = 'ADD_ANNOTATION';
// export const addAnnotation = (title, annotation,bookIndex) => ({
//     type: ADD_ANNOTATION,
//     title,
//     annotation,
//     bookIndex
// });



export const deleteBook = (idBook = "5aa337568b048e0f7cad5b5a" ) => (dispatch, getState) => {
    console.log("delete first");
    console.log(idBook);
    const authToken = getState().auth.authToken;
    console.log(authToken);

    return fetch(`${API_BASE_URL}/books/${idBook}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id:idBook
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => {

            console.log("delete");
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        })

};


// export default withRouter();



