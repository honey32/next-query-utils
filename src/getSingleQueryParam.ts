import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

/**
 * Returns the first value for the specified *key* in the query object.
 * If `pred` specified, returns the first value *that meets it*.
 *
 * @example
 * ```
 * getSingleQueryParam({},            "id") === undefined
 * getSingleQueryParam({ id: "aaa" }, "id") === "aaa"
 *
 * // with pred specified
 * const is_a = (s: string) => s === "a"
 * getSingleQueryParam({ id: "a" },        "id", is_a) === "a"
 * getSingleQueryParam({},                 "id", is_a) === undefined
 * getSingleQueryParam({ id: "b" },        "id", is_a) === undefined
 * getSingleQueryParam({ id: ["b", "a"] }, "id", is_a) === "a"
 * ```
 *
 * @param pred *optional*. the first value *that fits this predicate* will be returned.
 */
export const getSingleQueryParam = (
  query: ParsedUrlQuery,
  key: string,
  pred: (s: string) => boolean = () => true
): string | undefined => {
  const _value = query[key];

  if (!_value) return undefined;

  if (Array.isArray(_value)) return _value.filter(pred)[0];

  return pred(_value) ? _value : undefined;
};
