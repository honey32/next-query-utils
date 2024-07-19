import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { removeQueryParams } from "./removeQueryParams.ts";

describe("removeQueryParams(options)(query)", () => {
  type Case = [
    options: Parameters<typeof removeQueryParams>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];
  ([
    [{}, {}, {}],
    [{ a: true }, { a: "aaa" }, { a: [] }],
    [{ a: true }, { a: ["aaa", "bbb"] }, { a: [] }],
    [{ a: false }, { a: "aaa" }, { a: "aaa" }],
    [{ a: false }, { a: ["aaa", "bbb"] }, { a: ["aaa", "bbb"] }],
    [{ a: [] }, { a: ["aaa", "bbb"] }, { a: ["aaa", "bbb"] }],
    [{ a: "" }, { a: ["aaa", "bbb"] }, { a: ["aaa", "bbb"] }],
    [{ a: "aaa" }, { a: ["aaa", "bbb"] }, { a: ["bbb"] }],
    [{ a: ["aaa"] }, { a: ["aaa", "bbb"] }, { a: ["bbb"] }],
    [
      { a: ["aaa"] },
      { a: ["aaa", "bbb"], other: "ccc" },
      { a: ["bbb"], other: "ccc" },
    ],
    [{ a: "aaa" }, { other: "ccc" }, { other: "ccc" }],
  ] satisfies Case[]).forEach(([options, query, result]) => {
    it(`(${JSON.stringify(options)})(${JSON.stringify(query)}) === ${JSON.stringify(result)}`, () => {
      assertEquals(removeQueryParams(options)(query), result);
    });
  });
});
