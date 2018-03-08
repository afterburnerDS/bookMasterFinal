import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';

export class AnnotationForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        console.log(values.title);
        event.preventDefault();
       
        const title = values.title.trim();
        const cover = values.cover.trim();
        const author = values.author.trim(); 
        const pages = values.pages.trim();
        const date = values.date.trim();
        const description = values.description.trim();

        if (title && author && this.props.onAdd) {
            this.props.onAdd(title, author);
        }

        // return fetch('/api/messages', {
        //     method: 'POST',
        //     body: JSON.stringify(values),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             if (
        //                 res.headers.has('content-type') &&
        //                 res.headers
        //                     .get('content-type')
        //                     .startsWith('application/json')
        //             ) {
        //                 // It's a nice JSON error returned by us, so decode it
        //                 return res.json().then(err => Promise.reject(err));
        //             }
        //             // It's a less informative error returned by express
        //             return Promise.reject({
        //                 code: res.status,
        //                 message: res.statusText
        //             });
        //         }
        //         return;
        //     })
        //     .then(() => console.log('Submitted with values', values))
        //     .catch(err => {
        //         const {reason, message, location} = err;
        //         if (reason === 'ValidationError') {
        //             // Convert ValidationErrors into SubmissionErrors for Redux Form
        //             return Promise.reject(
        //                 new SubmissionError({
        //                     [location]: message
        //                 })
        //             );
        //         }
        //         return Promise.reject(
        //             new SubmissionError({
        //                 _error: 'Error submitting message'
        //             })
        //         );
        //     });
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
                <Field
                    name="title"
                    type="text"
                    component={Input}
                    label="Title"
                    validate={[required, nonEmpty]}
                />
                <Field
                    name="cover"
                    type="text"
                    component={Input}
                    label="Cover (URL)"
                    validate={[required, nonEmpty]}
                />
               
                <Field
                    name="author"
                    type="text"
                    component={Input}
                    label="Author"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="pages"
                    type="text"
                    component={Input}
                    label="Pages"
                    validate={[required, nonEmpty]}
                />

                  <Field
                    name="date"
                    type="text"
                    component={Input}
                    label="Date of Publication"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="description"
                    element="textarea"
                    component={Input}
                    label="Description"
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Add Book
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'contact',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(AnnotationForm);