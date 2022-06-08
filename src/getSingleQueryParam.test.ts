/* eslint-disable camelcase */
import { getSingleQueryParam } from "./getSingleQueryParam";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("getSingleQueryParam(key, pred)(query)", () => {
  type Case = [
    query: ParsedUrlQuery,
    pred: ((s: string) => boolean) | undefined,
    result: string | undefined
  ];

  const is_A = (s: string): boolean => s === "a";

  it.each<Case>([
    [{ key: "a" }, undefined, "a"],
    [{ key: [] }, undefined, undefined],
    [{}, undefined, undefined],
    [{ key: "a" }, is_A, "a"],
    [{ key: ["a"] }, is_A, "a"],
    [{ key: ["a", "b"] }, is_A, "a"],
    [{ key: ["b", "a"] }, is_A, "a"],
    [{}, is_A, undefined],
    [{ key: "b" }, is_A, undefined],
    [{ key: ["b"] }, is_A, undefined],
    [{ key: ["b", "c"] }, is_A, undefined],
  ])('("key", %p)(%j) === %s', (query, pred, result) => {
    expect(getSingleQueryParam(query, "key", pred)).toEqual(result);
  });
});
