# Next Query Utils

This library provides utility functions to deal with **Parsed Query Objects** (especially of Next.js)

## Links

- [API Documentions](https://honey32.github.io/next-query-utils/)

# Install

```sh
// with npm
npm i next-query-utils

// with yarn
yarn add next-query-utils
```

# Usages

## Getting single value

`?id=aaa` or `?id=aaa&id=other` -> `"aaa"`

```ts

// before
const _id = router.query["id"]
const id = Array.isArray(id) ? id[0] : id

// after
const id = getSingleQueryParam(router.query, "id")
```




## Removing some params

`?start_on=2022-03-02&item_type=stationary&item_type=book`
-> `?start_on=2022-03-02&item_type=stationary`

<details><summary>Before (I don't want to write such an annoying code any more.) </summary><div>

```ts
// before
const removeQuery = (
  query: ParsedUrlQuery, 
  key: string,
  pred: string
) => {
  const value = query[key]

  // if empty, leave query as it is.
  if (!value) return query;
  if (Array.isArray(value)) {
    if(value.length === 0) return query;

    // if non-empty array of string
    return { ...acc, [key]: value.filter(s => s !== pred) };
  }

  // if single string (not empty)
  return { ...acc, [key]: (s !== value) ? value : [] };
}
```

</div>
</details>

<hr/>

```ts
// after
router.push(
  removeQueryParam({ 
    item_type: "book"
  })(router.query)
)
```

## Keeping some params (or Next.js's dynamic routes) from being reset

`/[postId]?other=value&other2=value`
-> `/[postId]`

In pages with [Next.js's dynamic routes](https://nextjs.org/docs/routing/dynamic-routes), `router.query` include them.

(in this example, `router.query.postId`)

```ts
// before
router.push({ postId: router.query["postId"] })

// after
router.push(resetQuery({ ignore: "postId" })(router.query))
```

## Checking if query is empty ignoring some params (e.g. dynamic routes)

- *True* if `/items/[postId]`
- *False* if `/items/[postId]?param1=aa`

Likewise, if you want to check if query is empty, *with dynamic routes*, you should ignore them.

```ts
isQueryEmpty(router.query, { ignore: "postId" })
```

# License

This library is licensed under the terms of [MIT License](/license)