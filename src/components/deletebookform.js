import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';
import {API_BASE_URL} from '../config';

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
        console.log(values.title);
       
        const title = values.title.trim();
        const cover = values.url.trim();
        const authorBook = values.authorBook.trim(); 
        const pages = values.pages.trim();
        const date = values.date.trim();
        const description = values.description.trim();

        // if (title && author && this.props.onAdd) {
        //     this.props.onAdd(title, author);
        // }

        return fetch(`${API_BASE_URL}/books/${this.props.idBook}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: this.props.idBook,
                title: title,
                cover: cover,
                authorBook: authorBook,
                pages: pages,
                date: date,
                description: description
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
            .then(() => console.log('Submitted with values', values))
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
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Delete Book
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'contact',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(DeleteBookForm);
