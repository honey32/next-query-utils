import { type QueryMutation, queryMutation } from "./_internal/queryMutation";

/**
 * Sets values of query parameters.
 *
 * for each key in `params` object,
 *
 * - if value is *falsy*
 *   ... resets the values for the key.
 * - *otherwise*
 *   ... replace old values for the key
 *       with the given value
 *
 * ---
 *
 * クエリに値をセットします。
 *
 * `params` オブジェクトの各キーについて、
 *
 * - 値が *falsy* (偽値)の場合
 *   ... そのキーの値をリセットします。
 * - *それ以外の場合*
 *   ... そのキーに対して、古い値は捨てて新しい値をセットします。
 *
 * @example
 * ```
 * const query = { a: "aaa" }
 *
 * setQueryParams({ a: "abc" })(query) // -> { a: "abc" }
 * setQueryParams({ b: "bbb" })(query) // -> { a: "aaa", b: "bbb" }
 * setQueryParams({})(query) // -> { a: "aaa" }
 *
 * // falsy values like: 0 | null | undefined | false | ""
 * setQueryParams({ a: null })(query) // -> { a: [] }
 * ```
 */
export const setQueryParams = (
	params: Record<string, string | string[] | undefined | null | 0 | false>,
): QueryMutation => {
	return queryMutation((query) =>
		Object.entries(params).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: !value ? [] : value,
			}),
			query,
		),
	);
};
