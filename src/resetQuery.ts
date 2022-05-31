import { queryMutation } from "./queryMutation";

export type ResetQueryOptions = {
  /**
   * keys not to delete.
   * Falsy value in `ignore` array will be discarded.
   */
  ignore?:
    | string
    | (string | undefined | null | boolean | number)[]
    | undefined;
};

/**
 * Resets the query (into empty object).
 *
 * Keys specified in `ignore` option **will not** be deleted.
 *
 * ```
 * const query = { a: "aaa", b: "bbb" }
 * resetQuery({ ignore: "a" })(query) // -> { a: "aaa" }
 * resetQuery({ ignore: ["a", "meaningless"] }) // -> { a: "aaa" }
 * ```
 * Falsy value or *boolean value*s in the array will be discarded.
 * ```
 * resetQuery({ ignore: ["a", true, false, 0, null] })(query) // -> { a: "aaa" }
 * ```
 */
export const resetQuery = (options: ResetQueryOptions = {}) => {
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
