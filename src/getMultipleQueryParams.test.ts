import { getMultipleQueryParams } from "./getMultipleQueryParams";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("getMultipleQueryParams(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery, result: string[]];

  it.each<Case>([
    [{ key: "a" }, ["a"]],
    [{ key: [] }, []],
    [{} /*    */, []],
  ])('(%p, "key") === %s', (query, result) => {
    expect(getMultipleQueryParams(query, "key")).toEqual(result);
  });

  it.each<Case>([
    [{ key: "a" }, ["a"]],
    [{ key: ["a"] }, ["a"]],
    [{ key: ["a", "b"] }, ["a"]],
    [{ key: ["b", "a"] }, ["a"]],
    [{} /*     */, []],
    [{ key: "b" }, []],
    [{ key: ["b"] }, []],
    [{ key: ["b", "c"] }, []],
  ])('(%p, "key", (s) => s === "a") === %s', (query, result) => {
    expect(getMultipleQueryParams(query, "key", (s) => s === "a")).toEqual(
      result
    );
  });
});
