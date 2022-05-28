import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

/**
 * Returns the first value for the specified *key* in the query object.
 * If `pred` specified, returns the first value *that meets it*.
 *
 * @example
 * ```
 * getSingleQuery("id")({}) === undefined
 * getSingleQuery("id")({ id: "aaa" }) === "aaa"
 *
 * // with pred specified
 * const is_a = (s: string) => s === "a"
 * getSingleQuery("id", is_a)({ id: "a" }) === "a"
 * getSingleQuery("id", is_a)({}) === undefined
 * getSingleQuery("id", is_a)({ id: "b" }) === undefined
 * getSingleQuery("id", is_a)({ id: ["a", "a"] }) === "a"
 * getSingleQuery("id", is_a)({ id: ["b", "a"] }) === "a"
 * ```
 *
 * @param pred *optional*. the first value *that fits this predicate* will be returned.
 */
const getSingleQuery = (
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

export default getSingleQuery;
