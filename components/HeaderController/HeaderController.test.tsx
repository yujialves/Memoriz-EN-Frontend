import React from "react";
import { findByTestAttr } from "../../utils/testUtils";
import { shallow, ShallowWrapper } from "enzyme";
import HeaderController from "./HeaderController";
import store from "../../App";

/**
 * HdeaderControllerのShallowWrapperを作成するFactory関数
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<HeaderController subject="test" grade="G100" />);
};

describe("HeaderController", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  beforeEach(() => {
    wrapper = setup();
  });
  test("科目名がレンダリングされているか", () => {
    const subject = findByTestAttr(wrapper, "subject");
    expect(subject.length).toBe(1);
  });
  test("終了ボタンがレンダリングされているか", () => {
    const endButton = findByTestAttr(wrapper, "end-button");
    expect(endButton.length).toBe(1);
  });
  test("終了ボタンのテキストがレンダリングされているか", () => {
    const endText = findByTestAttr(wrapper, "end-text");
    expect(endText.length).toBe(1);
  });
  test("音声再生ボタンがレンダリングされているか", () => {
    const playButton = findByTestAttr(wrapper, "play-button");
    expect(playButton.length).toBe(1);
  });
  test("音声再生ボタンの音符アイコンがレンダリングされているか", () => {
    const icon = findByTestAttr(wrapper, "icon");
    expect(icon.length).toBe(1);
  });
});
