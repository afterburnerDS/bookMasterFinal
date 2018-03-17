import React from "react";
import { reduxForm, focus } from "redux-form";
import { withRouter } from "react-router-dom";
import { editAnnotation } from "../actions/index";
import { fetchProtectedData } from "../actions/protected-data";

export class FormDeleteAnnotation extends React.Component {
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
    // this.props.dispatch(change('myFormName', 'anotherField', 'value'));
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    let newAnnotations = this.props.annotations;

    for (let i = 0; i < newAnnotations.length; i++) {
      if (newAnnotations[i].idAnnot === this.props.idAnnot) {
        newAnnotations.splice(i, 1);
      }
    }

    const idEditBook = this.props.idEditBook;

    return this.props
      .dispatch(editAnnotation(idEditBook, newAnnotations))

      .then(() => this.props.dispatch(fetchProtectedData()))
      .then(() => this.props.history.push(`/bookpage/${this.props.idBook}`));
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit())}>
        <div>Are you sure you want to delete this annotation ?</div>
        <button type="submit">Delete Annotation</button>
      </form>
    );
  }
}

const form = reduxForm({
  form: "deleteAnnotation",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("contact", Object.keys(errors)[0]))
})(FormDeleteAnnotation);

export default withRouter(form);
