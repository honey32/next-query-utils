import { ParsedUrlQuery } from "../../types/ParsedUrlQuery";

export type QueryMutation = ((query: ParsedUrlQuery) => ParsedUrlQuery) & {
  andThen(next: (query: ParsedUrlQuery) => ParsedUrlQuery): QueryMutation;
};

/**
 * Composes [[`QueryMutation`]] to enable function composition.
 *
 * ---
 *
 * 関数合成を可能にするため、[[`QueryMutation`]] を作成する。
 *
 */
export const queryMutation = (
  fn: (query: ParsedUrlQuery) => ParsedUrlQuery
): QueryMutation => {
  type AndThen = Pick<QueryMutation, "andThen">;

  return Object.assign(fn, {
    andThen: (next) => queryMutation((query) => next(fn(query))),
  } as AndThen);
};
