import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { setQueryParams } from "./setQueryParams.ts";

describe("setQueryParams(other)(query)", () => {
  type Case = [
    params: Parameters<typeof setQueryParams>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];

  ([
    [{ a: "aaa" }, { b: "bbb" }, { a: "aaa", b: "bbb" }],
    [{ a: "aaa" }, { a: "abb" }, { a: "aaa" }],
    [{ a: undefined }, { a: "abb" }, { a: [] }],
    [{ a: "" }, /*  */ { a: "abb" }, { a: [] }],
    [{ a: null }, /**/ { a: "abb" }, { a: [] }],
    [{ a: 0 }, /*   */ { a: "abb" }, { a: [] }],
    [{}, /*         */ { a: "aaa" }, { a: "aaa" }],
    [{ a: ["abb", "acc"] }, { a: "aaa" }, { a: ["abb", "acc"] }],
  ] satisfies Case[]).forEach(([params, query, result]) => {
    it(`(${JSON.stringify(params)})(${JSON.stringify(query)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(setQueryParams(params)(query), result);
    });
  });
});
