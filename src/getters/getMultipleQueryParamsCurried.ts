import { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { getMultipleQueryParams } from "./getMultipleQueryParams";

export function getMultipleQueryParamsCurried<T extends string>(
  key: string,
  pred: (s: string) => s is T,
): (query: ParsedUrlQuery) => T[];

export function getMultipleQueryParamsCurried(
  key: string,
  pred?: (s: string) => boolean,
): (query: ParsedUrlQuery) => string[];

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
): (query: ParsedUrlQuery) => string[] {
  return (query) => getMultipleQueryParams(query, key, pred);
}
