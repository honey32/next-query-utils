import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { getMultipleQueryParams } from "./getMultipleQueryParams.ts";

/**
 * "data-last" Curried version of {@link getMultipleQueryParams}.
 *
 * @example
 * ```
 * type Char = ...;
 * const isChar = (input: string): input is Char => input.length === 0;
 * const getKeys = getMultipleQueryParamsCurried("key", isChar)
 * ```
 */
export function getMultipleQueryParamsCurried<T extends string>(
  key: string,
  pred: (s: string) => s is T,
): (query: ParsedUrlQuery) => T[];

/**
 * "data-last" Curried version of {@link getMultipleQueryParams}.
 *
 * @example
 * ```
 * type Char = ...;
 * const isChar = (input: string): input is Char => input.length === 0;
 * const getKeys = getMultipleQueryParamsCurried("key", isChar)
 * ```
 */
export function getMultipleQueryParamsCurried(
  key: string,
  pred?: (s: string) => boolean,
): (query: ParsedUrlQuery) => string[];

export function getMultipleQueryParamsCurried(
  key: string,
  pred?: (s: string) => boolean,
): (query: ParsedUrlQuery) => string[] {
  return (query) => getMultipleQueryParams(query, key, pred);
}
