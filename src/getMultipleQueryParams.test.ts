/* eslint-disable camelcase */
import { getMultipleQueryParams } from "./getMultipleQueryParams";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("getMultipleQueryParams(key, pred)(query)", () => {
  type Case = [
    query: ParsedUrlQuery,
    pred: ((s: string) => boolean) | undefined,
    result: string[]
  ];

  const is_A = (s: string): boolean => s === "a";

  it.each<Case>([
    [{ key: "a" }, undefined, ["a"]],
    [{ key: [] }, undefined, []],
    [{}, undefined, []],
    [{ key: "a" }, is_A, ["a"]],
    [{ key: ["a"] }, is_A, ["a"]],
    [{ key: ["a", "b"] }, is_A, ["a"]],
    [{ key: ["b", "a"] }, is_A, ["a"]],
    [{}, is_A, []],
    [{ key: "b" }, is_A, []],
    [{ key: ["b"] }, is_A, []],
    [{ key: ["b", "c"] }, is_A, []],
  ])('("key", %p)(%j) === %s', (query, pred, result) => {
    expect(getMultipleQueryParams(query, "key", pred)).toEqual(result);
  });
});
