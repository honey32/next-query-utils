import { QueryMutation, queryMutation } from "./_internal/queryMutation";

/**
 * Resets the query (into empty object).
 *
 * Keys specified in `ignore` option **will not** be deleted.
 *
 * Falsy value or *boolean value*s in the array will be discarded.
 *
 * ---
 *
 * クエリをリセットして、空のオブジェクトにします。
 *
 * `ignore` オプションに指定したキーについては **リセットされず** に残ります。
 *
 * Falsy な値(偽値)や、**真偽値** は無視されます。
 * ```
 * const query = { a: "aaa", b: "bbb" }
 * resetQuery({ ignore: "a" })(query) // -> { a: "aaa" }
 * resetQuery({ ignore: ["a", "meaningless"] }) // -> { a: "aaa" }
 *
 * resetQuery({ ignore: ["a", true, false, 0, null] })(query) // -> { a: "aaa" }
 * ```
 */
export const resetQuery = (
  options: {
    /**
     * keys not to delete.
     * Falsy value or `true` will be discarded.
     */
    ignore?:
      | string
      | (string | undefined | null | boolean | number)[]
      | undefined;
  } = {},
): QueryMutation => {
  const ignoredKeys = (() => {
    const { ignore } = options;
    if (!ignore) return [];
    if (Array.isArray(ignore))
      return ignore.filter((k): k is string => !!k && k !== true);
    return [ignore];
  })();

  return queryMutation((q) => {
    const entries = ignoredKeys
      .map((key) => [key, q[key]] as const)
      .filter(([k, v]) => !!v);

    return Object.fromEntries(entries);
  });
};
