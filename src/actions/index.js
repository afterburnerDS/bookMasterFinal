import React from 'react';
import {API_BASE_URL} from '../config';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import { withRouter } from "react-router-dom";
import {Link, Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/protected-data';

export const deleteBook = (idBook ) => (dispatch, getState) => {
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


export const editAnnotation = (idBook, newAnnotations) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/books/${idBook}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: idBook,
            annotations: newAnnotations
        }


        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => {
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
        .then(() => { 
            console.log('Submitted with values');
          
            

            // this.props.history.push(`/annotation/${this.props.idBook}/${this.props.idAnnot}`);
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
        });

}


export const newAnnotation = (idEditBook, annotations, idAnnot, title, annotation) => (dispatch,getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/books/${idEditBook}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: idEditBook,
            annotations: [...annotations, {
                idAnnot,
                title,
                annotation
            }]
        }


        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => {
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
        .then(() => { 
            console.log('Submitted with values');
            
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
        });
}



