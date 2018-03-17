import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "./input";
import { required, nonEmpty } from "../validators";
import { fetchProtectedData } from "../actions/protected-data";
import { editBook } from "../actions/index";
import { withRouter } from "react-router-dom"; // 4.0.0

export class EditBookForm extends React.Component {
  componentDidMount() {
    this.props.initialize({
      title: `${this.props.title}`,
      authorBook: `${this.props.authorBook}`,
      url: `${this.props.url}`,
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
    const title = values.title.trim();
    const url = values.url.trim();
    const authorBook = values.authorBook.trim();
    const date = values.date.trim();
    const pages = values.pages.trim();
    const description = values.description.trim();
    const idEditBook = this.props.idEditBook;

    return this.props
      .dispatch(
        editBook(idEditBook, title, url, authorBook, date, pages, description)
      )
      .then(() => this.props.dispatch(fetchProtectedData()))
      .then(() => this.props.history.push(`/bookpage/${this.props.idBook}`));
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">Book saved successfully</div>
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
          value={this.props.url}
          label="Cover (URL)"
          validate={[required, nonEmpty]}
        />

        <Field
          name="authorBook"
          type="text"
          component={Input}
          value={this.props.authorBook}
          label="Author"
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
          name="pages"
          type="text"
          component={Input}
          value={this.props.pages}
          label="Pages"
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
          disabled={
            this.props.pristine ||
            this.props.submitting ||
            this.props.submitSucceeded
          }
        >
          Save Book
        </button>
      </form>
    );
  }
}

export const routedForm = withRouter(EditBookForm);

export const form = reduxForm({
  form: "editform",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("editform", Object.keys(errors)[0]))
})(EditBookForm);

export default withRouter(form);
