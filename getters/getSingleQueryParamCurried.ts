import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getSingleQueryParam } from "./getSingleQueryParam.ts";

/**
 * "data-last" Curried version of {@link getSingleQueryParam}.
 *
 * @example
 * ```
 * const isValidSortOrder = (input: string): input is "asc" | "desc" => input === "asc" || input === "desc"
 * const getSingleSortOrder = getSingleQueryParamCurreid("order", isValidSortOrder)
 * ```
 */
export function getSingleQueryParamCurried<T extends string>(
  key: string,
  pred: (s: string) => s is T,
): (query: ParsedUrlQuery) => T | undefined;

/**
 * "data-last" Curried version of {@link getSingleQueryParam}.
 *
 * @example
 * ```
 * const isValidSortOrder = (input: string): input is "asc" | "desc" => input === "asc" || input === "desc"
 * const getSingleSortOrder = getSingleQueryParamCurreid("order", isValidSortOrder)
 * ```
 */
export function getSingleQueryParamCurried(
  key: string,
  pred?: (s: string) => boolean,
): (query: ParsedUrlQuery) => string | undefined;

export function getSingleQueryParamCurried(
  key: string,
  pred?: (s: string) => boolean,
): (query: ParsedUrlQuery) => string | undefined {
  return (query) => getSingleQueryParam(query, key, pred);
}
