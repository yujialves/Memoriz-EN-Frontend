import React from "react";
import { findByTestAttr } from "../../utils/testUtils";
import { shallow } from "enzyme";
import Spinner from "./Spinner";

/**
 * SpinnerのShallowWrapperを作成するFactory関数
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<Spinner height={40} width={40} />);
};

describe("Spinner", () => {
  test("画像が設定されているか", () => {
    const wrapper = setup();
    const spinner = findByTestAttr(wrapper, "spinner");
    expect(spinner.length).toBe(1);
  });
});
