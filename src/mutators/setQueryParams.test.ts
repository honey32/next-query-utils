import { setQueryParams } from "./setQueryParams";
import { ParsedUrlQuery } from "../types/ParsedUrlQuery";

describe("setQueryParams(other)(query)", () => {
  type Case = [
    params: Parameters<typeof setQueryParams>[0],
    query: ParsedUrlQuery,
    result: ParsedUrlQuery
  ];

  it.each<Case>([
    [{ a: "aaa" }, { b: "bbb" }, { a: "aaa", b: "bbb" }],
    [{ a: "aaa" }, { a: "abb" }, { a: "aaa" }],
    [{ a: undefined }, { a: "abb" }, { a: [] }],
    [{ a: "" } /*  */, { a: "abb" }, { a: [] }],
    [{ a: null } /**/, { a: "abb" }, { a: [] }],
    [{ a: 0 } /*   */, { a: "abb" }, { a: [] }],
    [{} /*         */, { a: "aaa" }, { a: "aaa" }],
    [{ a: ["abb", "acc"] }, { a: "aaa" }, { a: ["abb", "acc"] }],
  ])("(%p)(%j) === %s", (params, query, result) => {
    expect(setQueryParams(params)(query)).toEqual(result);
  });
});
