import { ParsedUrlQuery } from "../types/ParsedUrlQuery";

export function getMultipleQueryParams<T extends string>(
  query: ParsedUrlQuery,
  key: string,
  pred?: (s: string) => s is T
): T[];
export function getMultipleQueryParams(
  query: ParsedUrlQuery,
  key: string,
  pred?: (s: string) => boolean
): string[];

/**
 *
 * Returns an array of the values for the specified *key* in the query object.
 * If `pred` specified, returns the values *that meet it*.
 *
 * ---
 *
 * 返り値は、指定した `key` に対応するパラメータの値の配列。
 * もし `pred` が指定されている場合は、その関数によって返り値の配列が filter される。
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
export function getMultipleQueryParams(
  query: ParsedUrlQuery,
  key: string,
  pred: (s: string) => boolean = () => true
): string[] {
  const _value = query[key];

  if (!_value) return [];

  if (Array.isArray(_value)) return _value.filter(pred);

  return pred(_value) ? [_value] : [];
}
