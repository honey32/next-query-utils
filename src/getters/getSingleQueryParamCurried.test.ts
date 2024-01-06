import { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { getSingleQueryParam } from "./getSingleQueryParam";
import { getSingleQueryParamCurried } from "./getSingleQueryParamCurried";

describe("getSingleQueryParamCurried(key, pred)(query)", () => {
  type Case = [query: ParsedUrlQuery];

  it.each<Case>([[{ key: "a" }], [{ key: [] }], [{}]])(
    '(%p, "key") matches non-curreid version\'s result',
    (query) => {
      const getKey = getSingleQueryParamCurried("key");
      expect(getKey(query)).toEqual(getSingleQueryParam(query, "key"));
    }
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
      const result = getSingleQueryParam(query, "key", (s) => s === "a");
      const getKeyLoose = getSingleQueryParamCurried("key", (s) => s === "a");
      expect(getKeyLoose(query)).toEqual(result);

      // strictly typed
      const isA = (s: string): s is "a" => s === "a";
      const getKeyStrict = getSingleQueryParamCurried("key", isA);
      expect<"a" | undefined>(getKeyStrict(query)).toEqual(result);
    }
  );
});
