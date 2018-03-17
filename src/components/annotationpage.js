import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalDeleteAnnotation from "./modaldeleteannotation";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";

export class AnnotaionPage extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <main className="container">
        <div className="container__buttons">
          <div className="backBtn">
            {" "}
            <Link to={`/bookpage/${this.props.idBook}`}>Back </Link>
          </div>

          <div className="logoutBtn" onClick={() => this.logOut()}>
            <Link to={`/`}>Logout </Link>
          </div>
        </div>

        <div className="annotBtns">
          <div className="editBtn ">
            {" "}
            <Link
              className="editBtnLink btn btn-lg btn-primary"
              to={`/editannotation/${this.props.idBook}/${this.props.idAnnot}`}
            >
              Edit Annotation{" "}
            </Link>
          </div>

          <div className="delBtn ">
            <ModalDeleteAnnotation
              idEditBook={this.props.idEditBook}
              idBook={this.props.idBook}
              idAnnot={this.props.idAnnot}
              authToken={this.props.auhToken}
              annotations={this.props.annotations}
            />
          </div>
        </div>
        <div className="Annotation__container">
          <div className="title">{this.props.title}</div>
          <div className="annotation">
            <p>{this.props.annotation}</p>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  const book = state.protectedData.data.find(book => {
    return book.idBook === props.match.params.bookIndex;
  });

  const annotation = book.annotations.find(annot => {
    return annot.idAnnot === props.match.params.annotationId;
  });

  return {
    idBook: book.idBook,
    idEditBook: book._id,

    idAnnot: annotation ? annotation.idAnnot : "",
    title: annotation ? annotation.title : "",
    annotation: annotation ? annotation.annotation : "",

    annotations: book.annotations,
    bookIndex: props.match.params.bookIndex
  };
};

export default connect(mapStateToProps)(AnnotaionPage);
