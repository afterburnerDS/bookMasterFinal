import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "./input";
import { login } from "../actions/auth";
import { required, nonEmpty } from "../validators";
import { withRouter } from "react-router-dom";

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props
      .dispatch(login(values.email, values.password))
      .then(() => this.props.history.push("/bookshelf"));
  }

  render() {
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }

    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {errorMessage}
        <Field
          name="email"
          type="text"
          component={Input}
          label="Email"
          id="emailLogin"
          validate={[required, nonEmpty]}
        />
        <Field
          name="password"
          type="password"
          component={Input}
          label="Password"
          id="passwordLogin"
          validate={[required, nonEmpty]}
        />

        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log In
        </button>
      </form>
    );
  }
}

export const routedform = withRouter(LoginForm);

export const form = reduxForm({
  form: "loginform",
  onSubmitFail: (errors, dispatch) => dispatch(focus("login", "email"))
})(LoginForm);

export default withRouter(form);
