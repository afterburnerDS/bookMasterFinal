import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';
import {API_BASE_URL} from '../config';
import { withRouter } from "react-router-dom";

export class DeleteBookForm extends React.Component {


    componentDidMount() {
        this.props.initialize({ title: `${this.props.title}`,
        authorBook: `${this.props.authorBook}`,
        url: `${this.props.cover}`,
        pages: `${this.props.pages}`,
        date: `${this.props.date}`,
        description: `${this.props.description}`
    });
        // set the value individually
        // this.props.dispatch(change('myFormName', 'anotherField', 'value'));
      }

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {

        console.log(this.props.authToken);

        return fetch(`${API_BASE_URL}/books/${this.props.idEditBook}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: this.props.idEditBook,
                title: this.props.title,
                cover: this.props.cover,
                authorBook: this.props.authorBook,
                pages: this.props.pages,
                date: this.props.date,
                description: this.props.description
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.authToken}`
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
                
                console.log('Submitted with values', values);
                this.props.history.push(`/bookshelf`);

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

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Message submitted successfully
                </div>
            );
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }

        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {successMessage}
                {errorMessage}
               <div>
                   Are you sure you want to delete this book ?
                </div>
                <button
                    type="submit">
                    Delete Book
                </button>
            </form>
        );
    }
}

const form = reduxForm({
    form: 'contact',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(DeleteBookForm);


export default withRouter(form);
