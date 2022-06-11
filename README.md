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




## Remove some params

`?start_on=2022-03-02&item_type=stationary&item_type=book`
-> `?start_on=2022-03-02&item_type=stationary`

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
  if (Array.isArray(value) && value.length === 0) return query;

  // if array of string
  if (Array.isArray(value))
  return { ...acc, [key]: value.filter(s => s !== pred) };

  // if single string (not empty)
  return { ...acc, [key]: (s !== value) ? value : [] };
}
// I don't want to write such an annoying code any more.

// after
router.push(
  removeQueryParam({ 
    item_type: "book"
  })(router.query)
)
```

## Keep some params from being reset

`?id=aaa&other=value&other2=value`
-> `?id=aaa`

```ts
// before
router.push({ id: router.query["id"] })

// after
router.push(resetQuery({ ignore: "id" })(router.query))
```

# License

This library is licensed under the terms of [MIT License](/license)