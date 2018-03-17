import React from "react";
import { shallow, mount } from "enzyme";
import { EditAnnotationForm } from "./editannotationform";
import { editAnnotation } from "../actions/index";
import { MemoryRouter, Router, withRouter } from "react-router-dom"; // 4.0.0

// import { deleteBook } from '../actions/index';
import store from "../store";

const mockEditAnnotation = {
  type: "EDIT_ANNOTATION"
};

jest.mock("../actions/index", () =>
  Object.assign({}, require.requireActual("../actions/index"), {
    editAnnotation: jest.fn().mockImplementation(() => {
      return mockEditAnnotation;
    })
  })
);

describe("<EditAnnotationForm />", () => {
  it("Renders without crashing", () => {
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    shallow(
      <EditAnnotationForm handleSubmit={handleSubmit} initialize={initialize} />
    );
  });

  it("Should dispatch edit annotation when the form is submitted", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    const onSubmit = jest.fn();
    const history = {
      push: jest.fn()
    };
    const wrapper = shallow(
      <EditAnnotationForm
        dispatch={dispatch}
        handleSubmit={handleSubmit}
        initialize={initialize}
        history={history}
        onSubmit={onSubmit}
        annotations={[]}
      />
    );
    // const value = '10';
    wrapper.simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
    return wrapper
      .instance()
      .onSubmit({
        title: "daniel",
        annotation: "capi"
      })
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith(mockEditAnnotation);
        expect(history.push).toHaveBeenCalled();
      });
  });
});
