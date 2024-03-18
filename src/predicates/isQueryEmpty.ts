import type { ParsedUrlQuery } from "../types/ParsedUrlQuery";

/**
 * Returns true if the query is *empty* while
 * `undefined`, `""`, and `[]` value will be ignored.
 *
 * If `ignore` option is specified, the keys will be ignored.
 *
 * ---
 *
 * クエリが *空* であるかどうかの真偽値を返す。
 * ただし、`undefined`, `""`, and `[]` があっても無視する。
 *
 * もし `ignore` オプションが指定されている場合、指定したキーの値があっても無視する。
 * @example
 * ```
 * isQueryPristine({}) // -> true
 * isQueryPristine({ id: "a" }, { ignore: "id" }) // -> true
 * ```
 *
 */
export const isQueryEmpty = (
	query: ParsedUrlQuery,
	options: {
		ignore?: string | string[] | undefined | null;
	} = {},
) => {
	const keysToIgnore = toArrayKeysToIgnore(options.ignore);
	return Object.entries(query).every(([k, v]) => {
		if (keysToIgnore.includes(k)) return true;
		if (Array.isArray(v)) return v.length === 0;
		return !v;
	});
};

const toArrayKeysToIgnore = (
	ignore: string | string[] | null | undefined,
): string[] => {
	if (Array.isArray(ignore)) return ignore;
	if (!ignore) return [];
	return [ignore];
};
