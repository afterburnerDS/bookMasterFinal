import React from "react";
import { shallow, mount } from "enzyme";
import { RegisterForm } from "./registerform";
import { MemoryRouter, Router, withRouter } from "react-router-dom"; // 4.0.0

// import { deleteBook } from '../actions/index';
import store from "../store";

const mockRegister = {
  type: "REGISTER_USER"
};

jest.mock("../actions/users", () =>
  Object.assign({}, require.requireActual("../actions/users"), {
    registerUser: jest.fn().mockImplementation(() => {
      return mockRegister;
    })
  })
);

describe("<RegisterForm />", () => {
  it("Renders without crashing", () => {
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    shallow(
      <RegisterForm handleSubmit={handleSubmit} initialize={initialize} />
    );
  });

  it("Should dispatch registerUser when the form is submitted", () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const handleSubmit = jest.fn();
    const initialize = jest.fn();
    const onSubmit = jest.fn();
    const history = {
      push: jest.fn()
    };
    const wrapper = shallow(
      <RegisterForm
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
        email: "daniel",
        password: "capi",
        name: "danielsilba"
      })
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith(mockRegister);
        expect(history.push).toHaveBeenCalled();
      });
  });
});
