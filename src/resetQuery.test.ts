import { resetQuery } from "./resetQuery";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("resetQuery(options)(query)", () => {
  type Case = [
    options: Parameters<typeof resetQuery>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery
  ];

  it.each<Case>([
    [{} /*       */, { a: "aaa" }, {}],
    [{ ignore: "" }, { a: "aaa" }, {}],
    [{ ignore: [] }, { a: "aaa" }, {}],
    [{ ignore: [false] }, { a: "aaa" }, {}],
    [{ ignore: ["b"] }, { a: "aaa" }, {}],
    [{ ignore: "a" }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a"] }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a", "b"] }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a", "b"] }, { a: "aaa", b: "bbb" }, { a: "aaa", b: "bbb" }],
    [{ ignore: ["a", false] }, { a: "aaa", b: "bbb" }, { a: "aaa" }],
  ])("(%j)(%j) === %j", (options, query, result) => {
    expect(resetQuery(options)(query)).toStrictEqual(result);
  });
});
