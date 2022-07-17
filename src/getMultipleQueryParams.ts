import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

/**
 * Returns an array of the values for the specified *key* in the query object.
 * If `pred` specified, returns the values *that meet it*.
 *
 * @example
 * ```
 * getMultipleQueryParams({},            "id") === []
 * getMultipleQueryParams({ id: "aaa" }, "id") === ["aaa"]
 *
 * // with pred specified
 * const is_a = (s: string) => s === "a"
 * getMultipleQueryParams({ id: "a" },        "id", is_a) === ["a"]
 * getMultipleQueryParams({},                 "id", is_a) === []
 * getMultipleQueryParams({ id: "b" },        "id", is_a) === []
 * getMultipleQueryParams({ id: ["b", "a"] }, "id", is_a) === ["a"]
 * ```
 *
 * @param pred *optional*. the values *that fit this predicate* will be returned.
 */
export const getMultipleQueryParams = (
  query: ParsedUrlQuery,
  key: string,
  pred: (s: string) => boolean = () => true
): string[] => {
  const _value = query[key];

  if (!_value) return [];

  if (Array.isArray(_value)) return _value.filter(pred);

  return pred(_value) ? [_value] : [];
};
