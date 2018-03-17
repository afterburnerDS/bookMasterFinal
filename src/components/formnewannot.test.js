import React from "react";
import { shallow, mount } from "enzyme";
import { FormNewAnnot } from "./formnewannot";
import { newAnnotation } from "../actions/index";
import store from "../store";

const mockNewAnnotation = {
  type: "NEW_ANNOTATION"
};

jest.mock("../actions/index", () =>
  Object.assign({}, require.requireActual("../actions/index"), {
    newAnnotation: jest.fn().mockImplementation(() => {
      return mockNewAnnotation;
    })
  })
);

describe("<FormNewAnnot />", () => {
  it("Renders without crashing", () => {
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    shallow(
      <FormNewAnnot handleSubmit={handleSubmit} initialize={initialize} />
    );
  });

  it("Should dispatch editBook when the form is submitted", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    const onSubmit = jest.fn();
    const history = {
      push: jest.fn()
    };
    const wrapper = shallow(
      <FormNewAnnot
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
        expect(dispatch).toHaveBeenCalledWith(mockNewAnnotation);
      });
  });
});
