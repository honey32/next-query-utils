import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { pushQueryParams } from "./pushQueryParams.ts";

describe("pushQueryParams(params)", () => {
  type Params = Parameters<typeof pushQueryParams>[0];
  type Case = [params: Params, query: ParsedUrlQuery, result: ParsedUrlQuery];

  ([
    [{}, {}, {}],
    [{ a: "a" }, {}, { a: ["a"] }],
    [{}, { a: "a" }, { a: "a" }],
    [{ a: ["a"] }, {}, { a: ["a"] }],
    [{}, { a: ["a"] }, { a: ["a"] }],
    [{ a: "b" }, { a: "a" }, { a: ["a", "b"] }],
    [{ a: ["b"] }, { a: "a" }, { a: ["a", "b"] }],
    [{ a: "b" }, { a: ["a"] }, { a: ["a", "b"] }],
    [{ a: ["b"] }, { a: ["a"] }, { a: ["a", "b"] }],
  ] satisfies Case[]).forEach(([params, query, result]) => {
    it(`(${JSON.stringify(params)})(${JSON.stringify(query)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(pushQueryParams(params)(query), result);
    });
  });

  ([
    [{ a: "a" }, { b: "b" }, { a: ["a"], b: "b" }],
    [
      { a: "a", b: "b" },
      { a: "aa", b: "bb" },
      { a: ["aa", "a"], b: ["bb", "b"] },
    ],
  ] satisfies Case[]).forEach(([params, query, result]) => {
    it(`(${JSON.stringify(params)})(${JSON.stringify(query)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(pushQueryParams(params)(query), result);
    });
  });
});
