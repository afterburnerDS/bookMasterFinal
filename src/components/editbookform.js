import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, email} from '../validators';
import {API_BASE_URL} from '../config';
import {fetchProtectedData} from '../actions/protected-data';

export class EditBookForm extends React.Component {


    componentDidMount() {
        this.props.initialize({ title: `${this.props.title}`,
        authorBook: `${this.props.authorBook}`,
        url: `${this.props.cover}`,
        pages: `${this.props.pages}`,
        date: `${this.props.date}`,
        description: `${this.props.description}`
    });
        // set the value individually
     
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
            method: 'PUT',
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
            .then(() =>{
                console.log('Submitted with values', values);
                this.props.dispatch(fetchProtectedData())

            } )
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

            this.props.dispatch(fetchProtectedData());
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
                    value={this.props.title}
                    label="Title"
                    validate={[required, nonEmpty]}
                />
                <Field
                    name="url"
                    type="text"
                    component={Input}
                    value={this.props.cover}
                    label="Cover (URL)"
                    validate={[required, nonEmpty]}
                />
               
                <Field
                    name="authorBook"
                    type="text"
                    component={Input}
                    value={this.props.author}
                    label="Author"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="pages"
                    type="text"
                    component={Input}
                    value={this.props.pages}
                    label="Pages"
                    validate={[required, nonEmpty]}
                />

                  <Field
                    name="date"
                    type="text"
                    component={Input}
                    value={this.props.date}
                    label="Date of Publication"
                    validate={[required, nonEmpty]}
                />

                 <Field
                    name="description"
                    element="textarea"
                    component={Input}
                    value={this.props.description}
                    label="Description"
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Save Book
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'contact',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('contact', Object.keys(errors)[0]))
})(EditBookForm);
