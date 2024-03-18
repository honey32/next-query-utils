import { type QueryMutation, queryMutation } from "./_internal/queryMutation";

/**
 * By passing `({ key0: predicate0, key1: predicate1, ... })` style object,
 * removes values for key from query object.
 *
 * You can pass predicates from one of them;
 *
 * ---
 *
 * `({ key0: 述語_0, key1: 述語_1, ... })` の形のオブジェクトを渡すことで
 * それらの key に対応する値をクエリオブジェクトから取り除きます。
 *
 * 渡すことのできる *述語* は次の通り;
 *
 * ---
 *
 * 1\. `true` &mdash; to remove all for the key<br/>
 * (すべての値を取り除く)
 *
 * ```
 * const query = { a: ["aaa", "abb"] }
 * removeQueryParams({ a: true })(query)
 * // -> { a: [] }
 * ```
 *
 * 2\. `false`, `undefined`, `null`, or `""` &mdash; **not** to remove anything for the key<br/>
 * (なにも取り除かない)
 *
 * ```
 * const query = { a: ["aaa", "abb"] }
 * removeQueryParams({ a: false })(query)
 * // -> { a: ["aaa", "abb"] }
 * ```
 *
 * 3\. *single string* &mdash; to remove it<br/>
 * (その値を取り除く)
 *
 * ```
 * const query = { a: ["aaa", "abb"] }
 * removeQueryParams({ a: "aaa" })(query)
 * // -> { a: ["abb"] }
 * ```
 *
 * 4\. *array of string* &mdash; to remove all of them<br/>
 * (全て取り除く)
 * ```
 * const query = { a: ["aaa", "abb", "acc"] }
 * removeQueryParams({ a: ["aaa", "abb"] })(query)
 * // -> { a: ["acc"] }
 * ```
 *
 */
export const removeQueryParams = (
	options: Record<string, string | string[] | true | false | undefined | null>,
): QueryMutation => {
	return queryMutation((query) =>
		Object.entries(options).reduce((acc, [key, pred]) => {
			const value = acc[key];

			// if empty, leave query as it is.
			if (!value) return acc;
			if (Array.isArray(value) && value.length === 0) return acc;

			const predFn = toFn(pred);

			// if array of string
			if (Array.isArray(value)) return { ...acc, [key]: value.filter(predFn) };

			// if single string (not empty)
			return { ...acc, [key]: predFn(value) ? value : [] };
		}, query),
	);
};

type RemovingPredicate = Parameters<typeof removeQueryParams>[0][string];

/**
 * convert shorthand predicate into function
 *
 * @internal
 */
const toFn = (p: RemovingPredicate): ((s: string) => boolean) => {
	if (!p) return () => true;
	if (p === true) return () => false;
	if (Array.isArray(p)) return (s) => !p.includes(s);
	return (s) => s !== p;
};
