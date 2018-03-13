import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';
import {API_BASE_URL} from '../config';
import { withRouter } from "react-router-dom";
import {deleteBook} from '../actions/index';
import {Redirect} from 'react-router-dom';

export class DeleteBookForm extends React.Component {

    componentDidMount() {
        this.props.initialize({ title: `${this.props.title}`,
        authorBook: `${this.props.authorBook}`,
        url: `${this.props.url}`,
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
    onSubmit() {
        console.log(this.props.dispatch);
        // console.log(this.props.authToken);

        const id =this.props.idEditBook
        console.log("before dispatching");

        this.props.dispatch(deleteBook(id)).then(
            () => {
                console.log("here");
                window.location.href = '/bookshelf'

            }
        );

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
                    this.onSubmit()
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
    form: 'deleteBook',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(DeleteBookForm);


// export default connect () (form);

export default form;
