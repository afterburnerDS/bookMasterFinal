import React from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty, email} from '../validators';

export class LoginForm extends React.Component {

    onSubmit(values) {
        console.log("heelo");
        return this.props.dispatch(login(values.email, values.password));

    }

    render() {

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
                {errorMessage}
                <Field
                    name="email"
                    type="text"
                    component={Input}
                    label="Email"
                    validate={[required, nonEmpty]}
                />
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    label="Password"
                    validate={[required, nonEmpty]}
                />
               
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Log In
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'contact',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);