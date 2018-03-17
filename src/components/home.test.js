import React from "react";
import { shallow, mount, render } from "enzyme";
import store from "../store";
import { Home } from "./home";

describe("<Home/>", () => {
  it("Renders without crashing", () => {
    shallow(<Home />);
  });
});
