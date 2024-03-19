import { describe, expect, it } from "vitest";

import type { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { removeQueryParams } from "./removeQueryParams";

describe("removeQueryParams(options)(query)", () => {
  type Case = [
    options: Parameters<typeof removeQueryParams>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];
  it.each<Case>([
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
  ])("(%j)(%j) === %j", (options, query, result) => {
    expect(removeQueryParams(options)(query)).toStrictEqual(result);
  });
});
