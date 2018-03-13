import React from 'react';
import {Field, reduxForm, focus, SubmissionError} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

import { withRouter } from "react-router-dom";
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegisterForm extends React.Component {
    onSubmit(values) {
        const {email, password, name} = values;
        const user = {email, password, name};
       
        return this.props
        .dispatch(registerUser(user))
        .then(() => this.props.dispatch(login(email, password)).then(() => {

            this.props.history.push("/bookshelf");
        } )
    
    );
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <Field
                    name="name"
                    type="text"
                    component={Input}
                    label="Name"
                    validate={[required, nonEmpty]}
                />
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
                    Register
                </button>
            </form>
        );
    }
}
const form =  reduxForm({
    form: 'registerform',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('contact', Object.keys(errors)[0]))
})(RegisterForm);


export default withRouter(form);
