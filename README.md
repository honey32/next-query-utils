# Next Query Utils

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!NOTE]
>
> This lib no longer updates _in npm_. latest:
> [![npm version](https://badge.fury.io/js/next-query-utils.svg)](https://badge.fury.io/js/next-query-utils)
>
> Instead, use
> [JSR where it's published as v2.x or later](https://jsr.io/@honey32/next-query-utils)

This library provides utility functions to deal with **Parsed Query Objects**
(especially of Next.js)

このライブラリには、**Parsed Query Object** （特に Next.js
のもの）を取り扱うためのユーティリティ関数群が含まれます。

## Links &mdash; リンク集

- [API Documentions &mdash; APIドキュメント](https://honey32.github.io/next-query-utils/)

# Install

```sh
// with npm
npm i next-query-utils

// with yarn
yarn add next-query-utils
```

# Usages &mdash; 使い方

## Getting single value &mdash; 単独の値を取得する

`?id=aaa` or `?id=aaa&id=other` -> `"aaa"`

```ts
// before
const _id = router.query["id"];
const id = Array.isArray(id) ? id[0] : id;

// after
const id = getSingleQueryParam(router.query, "id");
```

## Removing some params &mdash; 値を取り除く

`?start_on=2022-03-02&item_type=stationary&item_type=book` ->
`?start_on=2022-03-02&item_type=stationary`

### Before

<details><summary>Code (I don't want to write such an annoying code any more.)<br/>二度と書きたくないひどいコード </summary><div>

```ts
// before
const removeQuery = (
  query: ParsedUrlQuery,
  key: string,
  pred: string,
) => {
  const value = query[key];

  // if empty, leave query as it is.
  if (!value) return query;
  if (Array.isArray(value)) {
    if (value.length === 0) return query;

    // if non-empty array of string
    return { ...acc, [key]: value.filter((s) => s !== pred) };
  }

  // if single string (not empty)
  return { ...acc, [key]: (s !== value) ? value : [] };
};
```

</div>
</details>

### After

```ts
// after
router.push(
  removeQueryParam({
    item_type: "book",
  })(router.query),
);
```

## Keeping some params (or Next.js's dynamic routes) from being reset <br/> &mdash; （Next.js's の動的ルートや）パラメータを残して他を削除する

`/[postId]?other=value&other2=value` -> `/[postId]`

---

In pages with
[Next.js's dynamic routes](https://nextjs.org/docs/routing/dynamic-routes),
`router.query` include them (in this example, `.postId`). so they **MUST be kept
from resetting**.

In this case, use `resetQuery()` with `ignore` option.

---

[Next.js の動的ルート](https://nextjs.org/docs/routing/dynamic-routes)があるページでは、それが
`router.query` に含まれる。（この例では `.postId`） なので、それらは
**削除してはいけない**。

このようなケースでは `resetQuery()` と `ignore` オプションを使いましょう。

---

```ts
// before
router.push({ postId: router.query["postId"] });

// after
router.push(resetQuery({ ignore: "postId" })(router.query));
```

## Checking if query is empty ignoring some params (e.g. dynamic routes)<br/>&mdash; （動的ルートのような）パラメータ幾つかを無視して、クエリが空であるか確かめる

- _True_ if `/items/[postId]`
- _False_ if `/items/[postId]?param1=aa`

---

Likewise, you need to ignore _dynamic routes_ in order to check if the query is
empty.

In this case, use `isQueryEmpty()` with `ignore` option.

---

前の例と同じように、クエリが空であるか確かめるためには、 _動的ルート_
を無視する必要があります。

このようなケースでは、`isQueryEmpty()` と `ignore` オプションを使いましょう。

---

```ts
isQueryEmpty(router.query, { ignore: "postId" });
```

# License

This library is licensed under the terms of [MIT License](/license)
