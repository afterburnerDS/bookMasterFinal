import React from "react";
import { shallow } from "enzyme";

import { Book } from "./book";

describe("<Book/>", () => {
  it("Renders without crashing", () => {
    shallow(<Book title="foo" />);
  });

  it("Renders the title", () => {
    const title = "Foo";
    const wrapper = shallow(<Book title={title} />);
  });
});
