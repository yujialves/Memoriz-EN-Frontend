import { ShallowWrapper } from "enzyme";

/**
 * data-test属性によりShallowWrapper内のコンポーネントを取得する関数
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper
 * @param {string} val - date-test属性の属性値
 */
export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
  return wrapper.find(`[data-test="${val}"]`);
};
