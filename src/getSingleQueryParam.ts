import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

/**
 * Returns the first value for the specified *key* in the query object.
 * If `pred` specified, returns the first value *that meets it*.
 *
 * @example
 * ```
 * getSingleQueryParam("id")({}) === undefined
 * getSingleQueryParam("id")({ id: "aaa" }) === "aaa"
 *
 * // with pred specified
 * const is_a = (s: string) => s === "a"
 * getSingleQueryParam("id", is_a)({ id: "a" }) === "a"
 * getSingleQueryParam("id", is_a)({}) === undefined
 * getSingleQueryParam("id", is_a)({ id: "b" }) === undefined
 * getSingleQueryParam("id", is_a)({ id: ["a", "a"] }) === "a"
 * getSingleQueryParam("id", is_a)({ id: ["b", "a"] }) === "a"
 * ```
 *
 * @param pred *optional*. the first value *that fits this predicate* will be returned.
 */
export const getSingleQueryParam = (
  key: string,
  pred: (s: string) => boolean = () => true
) => {
  return (query: ParsedUrlQuery): string | undefined => {
    const _value = query[key];

    if (!_value) return undefined;

    if (Array.isArray(_value)) return _value.filter(pred)[0];

    return pred(_value) ? _value : undefined;
  };
};
