import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getMultipleQueryParams } from "./getMultipleQueryParams.ts";

describe("getMultipleQueryParams(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery, result: string[]];

  ([
    [{ key: "a" }, ["a"]],
    [{ key: [] }, []],
    [{}, /*    */ []],
  ] satisfies Case[]).forEach(([query, result]) => {
    it(`(${JSON.stringify(query)}, "key") === ${JSON.stringify(result)}`, () => {
      assertEquals(getMultipleQueryParams(query, "key"), result);
    });
  });

  ([
    [{ key: "a" }, ["a"]],
    [{ key: ["a"] }, ["a"]],
    [{ key: ["a", "b"] }, ["a"]],
    [{ key: ["b", "a"] }, ["a"]],
    [{}, /*     */ []],
    [{ key: "b" }, []],
    [{ key: ["b"] }, []],
    [{ key: ["b", "c"] }, []],
  ] satisfies Case[]).forEach(([query, result]) => {
    it(`(${JSON.stringify(query)}, "key", (s) => s === "a") === ${JSON.stringify(result)}`, () => {
      assertEquals(
        getMultipleQueryParams(query, "key", (s) => s === "a"),
        result,
      );

      // strictly typed
      assertEquals(
        getMultipleQueryParams(
          query,
          "key",
          (s): s is "a" => s === "a",
        ) satisfies "a"[],
        result,
      );
    });
  });
});
