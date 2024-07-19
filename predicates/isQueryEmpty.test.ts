import { assert, assertFalse, describe, it } from "../test/index.ts";
import { isQueryEmpty } from "./isQueryEmpty.ts";

type Case = Parameters<typeof isQueryEmpty>;

describe("isQueryPristine(query, options)", () => {
  ([
    [{ a: undefined }, undefined],
    [{ a: [] }, undefined],
    [{ a: [] }, { ignore: "" }],
    [{ a: [] }, { ignore: [] }],
    [{ a: "aaa" }, { ignore: "a" }],
    [{ a: "aaa" }, { ignore: ["a"] }],
    [{ a: "aaa" }, { ignore: ["a", "b"] }],
    [{ a: "aaa", b: "bbb" }, { ignore: ["a", "b"] }],
  ] satisfies Case[]).forEach(([query, options]) => {
    it(`(${JSON.stringify(query)}, ${JSON.stringify(options)}) === true`, () => {
      assert(isQueryEmpty(query, options));
    });
  });

  ([
    [{ a: "aaa" }, undefined],
    [{ a: "aaa" }, { ignore: "b" }],
    [{ a: "aaa", b: "bbb" }, { ignore: "a" }],
  ] satisfies Case[]).forEach(([query, options]) => {
    it(`(${JSON.stringify(query)}, ${JSON.stringify(options)}) === false`, () => {
      assertFalse(isQueryEmpty(query, options));
    });
  });
});
