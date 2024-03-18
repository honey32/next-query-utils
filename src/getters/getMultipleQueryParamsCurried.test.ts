import type { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { getMultipleQueryParams } from "./getMultipleQueryParams";
import { getMultipleQueryParamsCurried } from "./getMultipleQueryParamsCurried";

describe("getMultipleQueryParamsCurried(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery];

  it.each<Case>([[{ key: "a" }], [{ key: [] }], [{}]])(
    '("key")(%p) matches non-curreid version\'s result',
    (query) => {
      const getKeys = getMultipleQueryParamsCurried("key");
      expect(getKeys(query)).toEqual(getMultipleQueryParams(query, "key"));
    },
  );

  it.each<Case>([
    [{ key: "a" }],
    [{ key: ["a"] }],
    [{ key: ["a", "b"] }],
    [{ key: ["b", "a"] }],
    [{}],
    [{ key: "b" }],
    [{ key: ["b"] }],
    [{ key: ["b", "c"] }],
  ])(
    '("key", (s) => s === "a")(%p) matches non-curreid version\'s result',
    (query) => {
      const result = getMultipleQueryParams(query, "key", (s) => s === "a");
      const getKeysLoose = getMultipleQueryParamsCurried(
        "key",
        (s) => s === "a",
      );
      expect(getKeysLoose(query)).toEqual(result);

      // strictly typed
      const getKeysStrict = getMultipleQueryParamsCurried(
        "key",
        (s): s is "a" => s === "a",
      );
      expect<"a"[]>(getKeysStrict(query)).toEqual(result);
    },
  );
});
