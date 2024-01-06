import { ParsedUrlQuery } from "../types/ParsedUrlQuery";

export function getSingleQueryParam<T extends string>(
  query: ParsedUrlQuery,
  key: string,
  pred?: (s: string) => s is T,
): T | undefined;
export function getSingleQueryParam<T extends string>(
  query: ParsedUrlQuery,
  key: string,
  pred?: (s: string) => boolean,
): T | undefined;

/**
 * Returns the first value for the specified *key* in the query object.
 * If `pred` specified, returns the first value *that meets it*.
 *
 * ---
 *
 * 返り値は、指定した `key` に対応するパラメータのうち最初の値。
 * もし `pred` が指定されている場合は、**その関数に合格した**値のうち最初のものが返る。
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
export function getSingleQueryParam(
  query: ParsedUrlQuery,
  key: string,
  pred: (s: string) => boolean = () => true,
): string | undefined {
  const _value = query[key];

  if (!_value) return undefined;

  if (Array.isArray(_value)) return _value.filter(pred)[0];

  return pred(_value) ? _value : undefined;
}
