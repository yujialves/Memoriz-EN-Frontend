import React from "react";
import { findByTestAttr } from "../../utils/testUtils";
import { shallow, ShallowWrapper } from "enzyme";
import StartButton from "./StartButton";

/**
 *StartButtonrのShallowWrapperを作成するFactory関数
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<StartButton />);
};

describe("Spinner", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  beforeEach(() => {
    wrapper = setup();
  });
  test("ボタンがレンダリングされているか", () => {
    const button = findByTestAttr(wrapper, "button");
    expect(button.length).toBe(1);
  });
  test("ボタンのテキストがレンダリングされているか", () => {
    const text = findByTestAttr(wrapper, "text");
    expect(text.length).toBe(1);
  });
});
