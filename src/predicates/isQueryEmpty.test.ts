import { describe, expect, it } from "vitest";

import { isQueryEmpty } from "./isQueryEmpty";

type Case = Parameters<typeof isQueryEmpty>;

describe("isQueryPristine(query, options)", () => {
  it.each<Case>([
    [{ a: undefined }, undefined],
    [{ a: [] }, undefined],
    [{ a: [] }, { ignore: "" }],
    [{ a: [] }, { ignore: [] }],
    [{ a: "aaa" }, { ignore: "a" }],
    [{ a: "aaa" }, { ignore: ["a"] }],
    [{ a: "aaa" }, { ignore: ["a", "b"] }],
    [{ a: "aaa", b: "bbb" }, { ignore: ["a", "b"] }],
  ])("(%j, %j) === true", (query, options) => {
    expect(isQueryEmpty(query, options)).toEqual(true);
  });

  it.each<Case>([
    [{ a: "aaa" }, undefined],
    [{ a: "aaa" }, { ignore: "b" }],
    [{ a: "aaa", b: "bbb" }, { ignore: "a" }],
  ])("(%j, %j) === false", (query, options) => {
    expect(isQueryEmpty(query, options)).toEqual(false);
  });
});
