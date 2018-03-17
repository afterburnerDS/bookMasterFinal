import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Annotation from "./annotation";
import ModalEditBook from "./modaleditbook";
import ModalNewAnnot from "./modalnewannot";
import ModalDeleteBook from "./modaldeletebook";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";

export class BookPage extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    const annotations = this.props.annotations.map((annotation, index) => (
      <Annotation
        index={index}
        key={index}
        idBook={this.props.idBook}
        url={this.props.url}
        {...annotation}
      />
    ));

    return (
      <main className="container__bookPage">
        <div className="container__buttons">
          <div className="backBtn">
            <Link to="/bookshelf"> Back </Link>
          </div>
          <div className="logoutBtn" onClick={() => this.logOut()}>
            <Link to={`/`}>Logout </Link>
          </div>
        </div>

        <div className="bookPage">
          <div className="bookPage__technical">
            <div className="editDelBtns">
              <div className="editBtn">
                <ModalEditBook
                  title={this.props.title}
                  authorBook={this.props.authorBook}
                  url={this.props.url}
                  date={this.props.date}
                  pages={this.props.pages}
                  description={this.props.description}
                  idBook={this.props.idBook}
                  idEditBook={this.props.idEditBook}
                  authToken={this.props.authToken}
                />
              </div>
              <div className="delBtn">
                <ModalDeleteBook
                  idEditBook={this.props.idEditBook}
                  title={this.props.title}
                  authorBook={this.props.authorBook}
                  url={this.props.url}
                  date={this.props.date}
                  pages={this.props.pages}
                  description={this.props.description}
                  authToken={this.props.authToken}
                />
              </div>
            </div>
            <div className="basicDetails">
              <div className="coverBook">
                <img src={this.props.url} alt="cover of book" />
              </div>
              <div className="technicalDetails">
                <p className="titleBook">{this.props.title}</p>
                <p className="authorBook">{this.props.authorBook}</p>
                <p className="dateBook">
                  Date of Publication:&nbsp;
                  <span className="dateBook__span">{this.props.date}</span>
                </p>
                <p className="pagesBook">
                  Pages:&nbsp;
                  <span className="pagesBook__span">{this.props.pages}`</span>
                </p>
              </div>
            </div>

            <p className="resumeBook">{this.props.description}</p>
          </div>
          <div className="bookPate__annotations">
            <div className="newBook__new">
              <ModalNewAnnot
                annotations={this.props.annotations}
                idEditBook={this.props.idEditBook}
                idBook={this.props.idBook}
                authToken={this.props.authToken}
              />
            </div>
            <div className="annot__container">{annotations}</div>
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

  return {
    title: book.title,
    authorBook: book.authorBook,
    url: book.url,
    date: book.date,
    pages: book.pages,
    description: book.description,
    annotations: book.annotations,
    idBook: book.idBook,
    idEditBook: book._id,
    authToken: state.auth.authToken
  };
};

export default connect(mapStateToProps)(BookPage);
