/* eslint-disable camelcase */
import { filterQueryParams } from "./filterQueryParams";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("filterQueryParams(options)(query)", () => {
  type Case = [
    key: string,
    predicate: (s: string) => boolean,
    options: { limit?: number } | undefined,
    query: ParsedUrlQuery,
    result: ParsedUrlQuery
  ];

  const all = () => true;
  const endsWith_a = (s: string) => s.endsWith("a");

  it.each<Case>([
    ["a", all, undefined, {}, {}],
    ["a", all, undefined, { a: "aaa" }, { a: ["aaa"] }],
    ["a", all, undefined, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
    ["a", all, { limit: 4 }, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
    ["a", all, { limit: 1 }, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
    ["a", endsWith_a, undefined, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
    ["a", endsWith_a, undefined, { a: ["aaa", "axa"] }, { a: ["aaa", "axa"] }],
    [
      "a",
      endsWith_a,
      { limit: 1 },
      { a: ["aab", "axa", "aaa"] },
      { a: ["axa"] },
    ],
  ])("(%s, %p, %p)(%p) === (%p)", (key, predicate, options, query, result) => {
    expect(filterQueryParams(key, predicate, options)(query)).toStrictEqual(
      result
    );
  });

  it("testing the whole feature", () => {
    const query = {
      a: ["axx", "axa", "abb"],
      b: "bbb",
    };
    const result = {
      a: ["axa"],
      b: "bbb",
    };
    expect(
      filterQueryParams("a", endsWith_a, { limit: 1 })(query)
    ).toStrictEqual(result);
  });
});
