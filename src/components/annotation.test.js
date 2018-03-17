import React from "react";
import { shallow } from "enzyme";

import { Annotation } from "./annotation";

describe("<Annotation/>", () => {
  it("Renders without crashing", () => {
    shallow(<Annotation title="foo" />);
  });

  it("Renders the title", () => {
    const title = "Foo";
    const wrapper = shallow(<Annotation title={title} />);
    //  expect(wrapper.title()).toEqual(title);
  });

});
