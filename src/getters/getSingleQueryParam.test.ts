import type { ParsedUrlQuery } from "../types/ParsedUrlQuery";
import { getSingleQueryParam } from "./getSingleQueryParam";

describe("getSingleQueryParam(key, pred)(query)", () => {
	type Case = [query: ParsedUrlQuery, result: string | undefined];

	it.each<Case>([
		[{ key: "a" }, "a"],
		[{ key: [] }, undefined],
		[{}, undefined],
	])('(%p, "key") === %s', (query, result) => {
		expect(getSingleQueryParam(query, "key")).toEqual(result);
	});

	it.each<Case>([
		[{ key: "a" }, "a"],
		[{ key: ["a"] }, "a"],
		[{ key: ["a", "b"] }, "a"],
		[{ key: ["b", "a"] }, "a"],
		[{}, undefined],
		[{ key: "b" }, undefined],
		[{ key: ["b"] }, undefined],
		[{ key: ["b", "c"] }, undefined],
	])('(%p, "key", (s) => s === "a") === %s', (query, result) => {
		expect(getSingleQueryParam(query, "key", (s) => s === "a")).toEqual(result);

		// strictly typed
		expect<"a" | undefined>(
			getSingleQueryParam(query, "key", (s): s is "a" => s === "a"),
		).toEqual(result);
	});
});
