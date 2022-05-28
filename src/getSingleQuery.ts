import { ParsedUrlQuery } from "./types/ParsedUrlQuery";

/**
 * Returns the first value for the specified *key* in the query object.
 *
 * @param pred if specified, returns the first value *that fits this predicate*. Defaults to "allow all"
 */
const getSingleQuery = (
  key: string,
  pred: (s: string) => boolean = () => true
) => {
  return (query: ParsedUrlQuery): string | undefined => {
    const _value = query[key];

    if (!_value) return undefined;

    if (Array.isArray(_value)) return _value.filter(pred)[0];

    return pred(_value) ? _value : undefined;
  };
};

export default getSingleQuery;
