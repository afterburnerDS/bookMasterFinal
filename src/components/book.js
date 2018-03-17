import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Book extends React.Component {
  render() {
    return (
      <div className="annot divider">
        <Link to={`/bookpage/${this.props.idBook}`}>
          <ul>
            <li className="page page3" />
            <li className="page page2" />
            <li className="page page1" />
            <li className="cover">
              <img src={this.props.url} alt={this.props.title} />
            </li>
          </ul>
        </Link>
      </div>
    );
  }
}

export default connect()(Book);
