# Next Query Utils

This library provides utility functions to deal with **Parsed Query Objects** (especially of Next.js)

## Getting single value

> `?id=aaa` -> `"aaa"`

```ts

// before
// const _id = router.query["id"]
// const id = Array.isArray(id) ? id[0] : id

// after
const id = getSingleQueryParam("id")(router.query)
```




## Remove some params

> `?start_on=2022-03-02&item_type=stationary&item_type=book`
>
> -> `?start_on=2022-03-02&item_type=stationary`

```ts
// before
// I don't want to write such an annoying code any more.

// after
router.push(
  removeQueryParam({ 
    item_type: "book"
  })(router.query)
)
```

## Keep some params from resetting

> `?id=aaa&other=value&other2=value`
>
> -> `?id=aaa`

```ts
// before
// router.push({ id: router.query["id"] })

// after
router.push(resetQuery({ ignore: "id" })(router.query))
```