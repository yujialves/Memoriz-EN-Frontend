import React from "react";
import { findByTestAttr } from "../../utils/testUtils";
import { shallow } from "enzyme";
import HomeNavigation from "./HomeNavigation";

/**
 * HomeNavigationのShallowWrapperを作成するFactory関数
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<HomeNavigation />);
};

describe("HomeNavigation", () => {
  test("スクリーンが一つレンダリングされている", () => {
    const wrapper = setup();
    const screens = findByTestAttr(wrapper, "screen");
    expect(screens.length).toBe(1);
  });
});
