import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getSingleQueryParam } from "./getSingleQueryParam.ts";
import { getSingleQueryParamCurried } from "./getSingleQueryParamCurried.ts";

describe("getSingleQueryParamCurried(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery];

  ([
    [{ key: "a" }], //
    [{ key: [] }],
    [{}],
  ] satisfies Case[]).forEach(([query]) => {
    it(`(${JSON.stringify(query)}, "key")`, () => {
      const getKey = getSingleQueryParamCurried("key");
      assertEquals(getKey(query), getSingleQueryParam(query, "key"));
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
    it(`("key", (s) => s === "a")(${JSON.stringify(query)}) matches non-curried version's result`, () => {
      const result = getSingleQueryParam(query, "key", (s) => s === "a");
      const getKeyLoose = getSingleQueryParamCurried("key", (s) => s === "a");
      assertEquals(getKeyLoose(query), result);

      // strictly typed
      const isA = (s: string): s is "a" => s === "a";
      const getKeyStrict = getSingleQueryParamCurried("key", isA);
      assertEquals(getKeyStrict(query) satisfies "a" | undefined, result);
    });
  });
});
