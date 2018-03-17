import React from "react";
import { shallow, mount } from "enzyme";
import { DeleteBookForm } from "./deletebookform";
import { MemoryRouter, Router, withRouter } from "react-router-dom"; // 4.0.0

// import { deleteBook } from '../actions/index';
import store from "../store";

const mockDeleteBook = {
  type: "DELETE_BOOK"
};

jest.mock("../actions/index", () =>
  Object.assign({}, require.requireActual("../actions/index"), {
    deleteBook: jest.fn().mockImplementation(() => {
      return mockDeleteBook;
    })
  })
);

describe("<DeleteBookForm />", () => {
  it("Renders without crashing", () => {
    const handleSubmit = jest.fn();
    shallow(<DeleteBookForm handleSubmit={handleSubmit} />);
  });

  it("Should dispatch deleteBook when the form is submitted", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const handleSubmit = jest.fn();
    const history = {
      push: jest.fn()
    };
    const wrapper = mount(
      <DeleteBookForm
        dispatch={dispatch}
        handleSubmit={handleSubmit}
        history={history}
      />
    );
    // const value = '10';
    wrapper.simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
    return wrapper
      .instance()
      .onSubmit()
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith(mockDeleteBook);
        expect(history.push).toHaveBeenCalled();
      });
  });
});
