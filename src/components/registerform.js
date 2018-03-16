import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, length, email} from '../validators';
import { withRouter } from "react-router-dom";

const passwordLength = length({min: 10, max: 72});

export  class RegisterForm extends React.Component {
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
                    validate={[required, nonEmpty, email]}
                />
               
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    label="Password"
                    validate={[required, nonEmpty, passwordLength]}
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

export const  routedForm =  withRouter(RegisterForm);

export const form =  reduxForm({
    form: 'registerform',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('contact', Object.keys(errors)[0]))
})(RegisterForm);


export default withRouter(form);


