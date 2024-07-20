import { assertEquals, describe, it } from "../test/index.ts";

import type { ParsedUrlQuery } from "../types/ParsedUrlQuery.ts";
import { filterQueryParams } from "./filterQueryParams.ts";

describe("filterQueryParams(options)(query)", () => {
  type Case = [
    options: { limit?: number } | undefined,
    query: ParsedUrlQuery,
    result: ParsedUrlQuery,
  ];

  ([
    [undefined, {}, /*              */ {}],
    [undefined, { a: "aaa" }, /*    */ { a: ["aaa"] }],
    [undefined, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
    [{ limit: 4 }, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
    [{ limit: 1 }, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
  ] satisfies Case[]).forEach(([options, query, result]) => {
    const _options = JSON.stringify(options);
    const _query = JSON.stringify(query);
    const _result = JSON.stringify(result);
    it(
      `('a', () => true, ${_options})(${_query}) === ${_result}`,
      () => {
        assertEquals(
          filterQueryParams("a", () => true, options)(query),
          result,
        );
      },
    );
  });

  ([
    [undefined, { a: ["aaa", "axa"] }, { a: ["aaa", "axa"] }],
    [undefined, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
    [{ limit: 1 }, { a: ["aab", "axa", "aaa"] }, { a: ["axa"] }],
  ] satisfies Case[]).forEach(([options, query, result]) => {
    const _options = JSON.stringify(options);
    const _query = JSON.stringify(query);
    const _result = JSON.stringify(result);
    it(
      `('a', (s) => s.endsWith('a'), ${_options})(${_query}) === ${_result}`,
      () => {
        assertEquals(
          filterQueryParams("a", (s) => s.endsWith("a"), options)(query),
          result,
        );
      },
    );
  });

  it("testing the whole feature", () => {
    const query = {
      a: ["axx", "axa", "abb"],
      b: "bbb",
    };
    const result = {
      a: ["axa"],
      b: "bbb",
    };
    assertEquals(
      filterQueryParams("a", (s) => s.endsWith("a"), { limit: 1 })(query),
      result,
    );
  });
});
