import { queryMutation, QueryMutation } from "./queryMutation";

/**
 * Filters query parameters for the given `key` using the given `pred`.
 * If `limit` option is specified, the excess values will be ommited.
 *
 * Other parameters remain as they were.
 * @example
 * ```
 * const query = {
 *   a: ["abb", "axa", "aaa"],
 *   b: "bbb"
 * }
 * filterQueryParams("a", (s) => s.endsWith("a"), { limit: 1 })(query)
 * // -> { a: ["axa"], b: "bbb" }
 * ```
 */
export const filterQueryParams = (
  key: string,
  pred: (s: string) => boolean,
  options: { limit?: number } = {}
): QueryMutation => {
  const { limit = undefined } = options;

  return queryMutation((query) => {
    const _value = query[key];
    if (!_value) return query;

    const value: string[] = typeof _value === "string" ? [_value] : _value;

    type Predicate<V> = Parameters<Array<V>["filter"]>[0];
    const limitter: Predicate<string> =
      limit === undefined ? () => true : (_, index) => index < limit;
    return { ...query, [key]: value.filter(pred).filter(limitter) };
  });
};
