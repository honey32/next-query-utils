import { assertEquals } from "@std/assert";
import { describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getMultipleQueryParams } from "./getMultipleQueryParams.ts";
import { getMultipleQueryParamsCurried } from "./getMultipleQueryParamsCurried.ts";

describe("getMultipleQueryParamsCurried(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery];

  ([
    [{ key: "a" }], //
    [{ key: [] }],
    [{}],
  ] satisfies Case[]).forEach(([query]) => {
    it(`("key")(${JSON.stringify(query)}) matches non-curreid version's result`, () => {
      const getKeys = getMultipleQueryParamsCurried("key");
      assertEquals(getKeys(query), getMultipleQueryParams(query, "key"));
    });
  });

  ([
    [{ key: "a" }],
    [{ key: ["a"] }],
    [{ key: ["a", "b"] }],
    [{ key: ["b", "a"] }],
    [{}],
    [{ key: "b" }],
    [{ key: ["b"] }],
    [{ key: ["b", "c"] }],
  ] satisfies Case[]).forEach(([query]) => {
    it(`("key", (s) => s === "a")(${JSON.stringify(query)}) matches non-curreid version's result`, () => {
      const result = getMultipleQueryParams(query, "key", (s) => s === "a");
      const getKeysLoose = getMultipleQueryParamsCurried(
        "key",
        (s) => s === "a",
      );
      assertEquals(getKeysLoose(query), result);

      // strictly typed
      const getKeysStrict = getMultipleQueryParamsCurried(
        "key",
        (s): s is "a" => s === "a",
      );
      assertEquals(getKeysStrict(query) satisfies "a"[], result);
    });
  });
});
