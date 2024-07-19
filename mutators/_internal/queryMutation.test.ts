import { assertEquals, describe, it } from "../../test/index.ts";
import type { ParsedUrlQuery } from "../../types/ParsedUrlQuery.ts";
import { queryMutation } from "./queryMutation.ts";

describe("queryMutation()", () => {
  type Case = [
    f0: (query: ParsedUrlQuery) => ParsedUrlQuery,
    f1: (query: ParsedUrlQuery) => ParsedUrlQuery,
    base: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];

  ([
    [
      (q) => ({ ...q, a: "aaa" }),
      (q) => ({ ...q, b: "bbb" }),
      {},
      { a: "aaa", b: "bbb" },
    ],
    [
      ({ a: _, ...rest }) => rest,
      ({ b: _, ...rest }) => rest,
      { a: "aaa", b: "bbb" },
      {},
    ],
  ] satisfies Case[]).forEach(([f0, f1, base, result]) => {
    it(`(f0).andThen(f2)(${JSON.stringify(base)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(queryMutation(f0).andThen(f1)(base), result);
    });
  });
});
