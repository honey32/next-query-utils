/* eslint-disable camelcase */
import { getSingleQueryParam } from "./getSingleQueryParam";
import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

describe("getSingleQueryParam(key, pred)(query)", () => {
  type Case = [
    pred: ((s: string) => boolean) | undefined,
    query: ParsedUrlQuery,
    result: string | undefined
  ];

  const is_A = (s: string): boolean => s === "a";

  it.each<Case>([
    [undefined, { key: "a" }, "a"],
    [undefined, { key: [] }, undefined],
    [undefined, {}, undefined],
    [is_A, { key: "a" }, "a"],
    [is_A, { key: ["a"] }, "a"],
    [is_A, { key: ["a", "b"] }, "a"],
    [is_A, { key: ["b", "a"] }, "a"],
    [is_A, {}, undefined],
    [is_A, { key: "b" }, undefined],
    [is_A, { key: ["b"] }, undefined],
    [is_A, { key: ["b", "c"] }, undefined],
  ])('("key", %p)(%j) === %s', (pred, query, result) => {
    expect(getSingleQueryParam("key", pred)(query)).toEqual(result);
  });
});
