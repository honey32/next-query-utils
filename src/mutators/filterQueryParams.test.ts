import type { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { filterQueryParams } from "./filterQueryParams";

describe("filterQueryParams(options)(query)", () => {
	type Case = [
		options: { limit?: number } | undefined,
		query: ParsedUrlQuery,
		result: ParsedUrlQuery,
	];

	it.each<Case>([
		[undefined, {} /*              */, {}],
		[undefined, { a: "aaa" } /*    */, { a: ["aaa"] }],
		[undefined, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
		[{ limit: 4 }, { a: ["aaa", "aab"] }, { a: ["aaa", "aab"] }],
		[{ limit: 1 }, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
	])("('a', () => true, %p)(%p) === (%p)", (options, query, result) => {
		expect(filterQueryParams("a", () => true, options)(query)).toStrictEqual(
			result,
		);
	});

	it.each<Case>([
		[undefined, { a: ["aaa", "axa"] }, { a: ["aaa", "axa"] }],
		[undefined, { a: ["aaa", "aab"] }, { a: ["aaa"] }],
		[{ limit: 1 }, { a: ["aab", "axa", "aaa"] }, { a: ["axa"] }],
	])(
		"('a', (s) => s.endsWith('a'), %p)(%p) === (%p)",
		(options, query, result) => {
			expect(
				filterQueryParams("a", (s) => s.endsWith("a"), options)(query),
			).toStrictEqual(result);
		},
	);

	it("testing the whole feature", () => {
		const query = {
			a: ["axx", "axa", "abb"],
			b: "bbb",
		};
		const result = {
			a: ["axa"],
			b: "bbb",
		};
		expect(
			filterQueryParams("a", (s) => s.endsWith("a"), { limit: 1 })(query),
		).toStrictEqual(result);
	});
});
