import React from "react";
import { findByTestAttr } from "../../utils/testUtils";
import { shallow } from "enzyme";
import GradesTransitionView from "./GradesTransitionView";

/**
 * GradeTransitionViewのShallowWrapperを作成するFactory関数
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  return shallow(<GradesTransitionView gradeUp={10} gradeDown={20} />);
};

describe("Spinner", () => {
  test("タイトルがレンダリングされているか", () => {
    const wrapper = setup();
    const title = findByTestAttr(wrapper, "title");
    expect(title.length).toBe(2);
  });
  test("正解数、不正解数がレンダリングされているか", () => {
    const wrapper = setup();
    const gradeChanges = findByTestAttr(wrapper, "grade-changes");
    expect(gradeChanges.length).toBe(2);
  });
});
