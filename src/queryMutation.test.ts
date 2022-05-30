import { queryMutation } from "./queryMutation";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("queryMutation()", () => {
  type Case = [
    f0: (query: ParsedUrlQuery) => ParsedUrlQuery,
    f1: (query: ParsedUrlQuery) => ParsedUrlQuery,
    base: ParsedUrlQuery,

    result: ParsedUrlQuery
  ];

  it.each<Case>([
    [
      (q) => ({ ...q, a: "aaa" }),
      (q) => ({ ...q, b: "bbb" }),
      {},
      { a: "aaa", b: "bbb" },
    ],
    [
      ({ a, ...rest }) => rest,
      ({ b, ...rest }) => rest,
      { a: "aaa", b: "bbb" },
      {},
    ],
  ])("(%p).andThen(%p)(%j) === %j", (f0, f1, base, result) => {
    expect(queryMutation(f0).andThen(f1)(base)).toStrictEqual(result);
  });
});
