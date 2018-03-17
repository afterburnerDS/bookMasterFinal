import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "./input";
import { required, nonEmpty } from "../validators";
import { fetchProtectedData } from "../actions/protected-data";
import { newBook } from "../actions/index";
import { withRouter } from "react-router-dom"; // 4.0.0

export class NewBook extends React.Component {
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
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  onSubmit(values) {
    const idBook = this.guid();
    const title = values.title.trim();
    const url = values.url.trim();
    const authorBook = values.authorBook.trim();
    const pages = values.pages.trim();
    const date = values.date.trim();
    const description = values.description.trim();

    return this.props
      .dispatch(
        newBook(idBook, title, url, authorBook, pages, date, description)
      )
      .then(() => this.props.dispatch(fetchProtectedData()))
      .then(() => this.props.history.push(`/bookshelf`));
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">Book added successfully</div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }

    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {/* {loadingMessage} */}
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
          name="url"
          type="text"
          component={Input}
          label="Cover (URL)"
          validate={[required, nonEmpty]}
        />

        <Field
          name="authorBook"
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
          disabled={
            this.props.pristine ||
            this.props.submitting ||
            this.props.submitSucceeded
          }
        >
          Add Book
        </button>
      </form>
    );
  }
}

export const routedForm = withRouter(NewBook);

export const form = reduxForm({
  form: "newbook",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("contact", Object.keys(errors)[0]))
})(NewBook);

export default withRouter(form);
