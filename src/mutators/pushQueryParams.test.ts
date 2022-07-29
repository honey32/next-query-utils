import { pushQueryParams } from "./pushQueryParams";
import { ParsedUrlQuery } from "../types/ParsedUrlQuery";

describe("pushQueryParams(params)", () => {
  type Params = Parameters<typeof pushQueryParams>[0];
  type Case = [params: Params, query: ParsedUrlQuery, result: ParsedUrlQuery];

  it.each<Case>([
    [{}, {}, {}],
    [{ a: "a" }, {}, { a: ["a"] }],
    [{}, { a: "a" }, { a: "a" }],
    [{ a: ["a"] }, {}, { a: ["a"] }],
    [{}, { a: ["a"] }, { a: ["a"] }],
    [{ a: "b" }, { a: "a" }, { a: ["a", "b"] }],
    [{ a: ["b"] }, { a: "a" }, { a: ["a", "b"] }],
    [{ a: "b" }, { a: ["a"] }, { a: ["a", "b"] }],
    [{ a: ["b"] }, { a: ["a"] }, { a: ["a", "b"] }],
  ])("(%p)(%p) === %p", (params, query, result) => {
    expect(pushQueryParams(params)(query)).toStrictEqual(result);
  });

  it.each<Case>([
    [{ a: "a" }, { b: "b" }, { a: ["a"], b: "b" }],
    [
      { a: "a", b: "b" },
      { a: "aa", b: "bb" },
      { a: ["aa", "a"], b: ["bb", "b"] },
    ],
  ])("(%p)(%p) === %p", (params, query, result) => {
    expect(pushQueryParams(params)(query)).toStrictEqual(result);
  });
});
