import {
  type QueryMutation,
  queryMutation,
} from "./_internal/queryMutation.ts";

/**
 * Appends given parameters.
 *
 * 末尾にパラメータを追加する。
 *
 * @example
 * ```
 * const query = {
 *   a: "a",
 *   b: "b"
 * }
 * pushQueryParams({ a: "aa", c: "c" })(query)
 * // -> { a: ["a", "aa"], b: "b", c: "c" }
 * ```
 */
export const pushQueryParams = (
  params: Record<string, string | string[] | undefined | null | 0 | false>,
): QueryMutation => {
  return queryMutation((query) =>
    Object.entries(params).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: safeConcat(acc[key], value) }),
      query,
    )
  );
};

type ParamToAdd = Parameters<typeof pushQueryParams>[0][string];

const safeConcat = (
  left: string | string[] | undefined,
  right: ParamToAdd,
): string[] => [...toFlatArray(left), ...toFlatArray(right)];

const toFlatArray = (v: ParamToAdd): string[] =>
  !v ? [] : typeof v === "string" ? [v] : v;
