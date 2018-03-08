import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';

export class EditAnnotationForm extends React.Component {

    componentDidMount() {
        this.props.initialize({ title: `${this.props.title}`,
    annotation: `${this.props.annotation}` });
        // set the value individually
        // this.props.dispatch(change('myFormName', 'anotherField', 'value'));
      }

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(values) {
        console.log(values.title);
        event.preventDefault();
       
        // const title = values.title.trim();
        // const annotation = values.annotation.trim();

        // if (title && annotation && this.props.onAdd) {
        //     this.props.onAdd(title, annotation);
        // }

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
                    value={this.props.title}
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="annotation"
                    element="textarea"
                    component={Input}
                    label="Annotation"
                    value={this.props.annotation}
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
    form: 'edit',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(EditAnnotationForm);