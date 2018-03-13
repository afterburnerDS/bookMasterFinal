import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';
import {API_BASE_URL} from '../config';
import {fetchProtectedData} from '../actions/protected-data';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
// import InputField from './inputfield'; 

export class FormNewAnnot extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
    onSubmit(values) {
        console.log(values.annotation);
      
        const idAnnot = this.guid(); 
        const title = values.title.trim();
        const annotation = values.annotation.trim();

        // if (title && annotation && this.props.onAdd) {
        //     this.props.onAdd(title, annotation);
        // }

        return fetch(`${API_BASE_URL}/books/${this.props.idEditBook}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: this.props.idEditBook,
                annotations: [...this.props.annotations, {
                    idAnnot,
                    title,
                    annotation
                }]
            }


            ),
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
                this.props.dispatch(fetchProtectedData());
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
                <Field
                    name="title"
                    type="text"
                    component={Input}
                    className ="inputTitleAnnot"
                    label="Title"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="annotation"
                    element="textarea"
                    className="inputTextAnnot"
                    component={Input}
                    label="Annotation"
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
})(FormNewAnnot);
