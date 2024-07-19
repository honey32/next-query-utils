import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { resetQuery } from "./resetQuery.ts";

describe("resetQuery(options)(query)", () => {
  type Case = [
    options: Parameters<typeof resetQuery>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];

  ([
    [{}, /*       */ { a: "aaa" }, {}],
    [{ ignore: "" }, { a: "aaa" }, {}],
    [{ ignore: [] }, { a: "aaa" }, {}],
    [{ ignore: [false] }, { a: "aaa" }, {}],
    [{ ignore: ["b"] }, { a: "aaa" }, {}],
    [{ ignore: "a" }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a"] }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a", "b"] }, { a: "aaa" }, { a: "aaa" }],
    [{ ignore: ["a", "b"] }, { a: "aaa", b: "bbb" }, { a: "aaa", b: "bbb" }],
    [{ ignore: ["a", false] }, { a: "aaa", b: "bbb" }, { a: "aaa" }],
  ] satisfies Case[]).forEach(([options, query, result]) => {
    it(`(${JSON.stringify(options)})(${JSON.stringify(query)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(resetQuery(options)(query), result);
    });
  });
});
