import { assertEquals, describe, it } from "../test/index.ts";
import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getSingleQueryParam } from "./getSingleQueryParam.ts";

describe("getSingleQueryParam(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery, result: string | undefined];

  ([
    [{ key: "a" }, "a"],
    [{ key: [] }, undefined],
    [{}, undefined],
  ] satisfies Case[]).forEach(([query, result]) => {
    it(`(${JSON.stringify(query)}, "key") === ${JSON.stringify(result)}`, () => {
      assertEquals(getSingleQueryParam(query, "key"), result);
    });
  });

  ([
    [{ key: "a" }, "a"],
    [{ key: ["a"] }, "a"],
    [{ key: ["a", "b"] }, "a"],
    [{ key: ["b", "a"] }, "a"],
    [{}, undefined],
    [{ key: "b" }, undefined],
    [{ key: ["b"] }, undefined],
    [{ key: ["b", "c"] }, undefined],
  ] satisfies Case[]).forEach(([query, result]) => {
    it(`(${JSON.stringify(query)}, "key", (s) => s === "a") === ${JSON.stringify(result)}`, () => {
      assertEquals(getSingleQueryParam(query, "key", (s) => s === "a"), result);

      // strictly typed
      assertEquals(
        getSingleQueryParam(query, "key", (s): s is "a" => s === "a") satisfies
          | "a"
          | undefined,
        result,
      );
    });
  });
});
