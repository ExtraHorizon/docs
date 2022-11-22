---
description: >-
  RQL is a Resource Query Language designed for use in URIs with object data
  structures. RQL can be thought as basically a set of nestable named operators
  which each have a set of arguments written in a
---

# Resource Query Language (RQL)

## Where is it used? <a href="#markdown-header-where-is-it-used" id="markdown-header-where-is-it-used"></a>

RQL is accepted on most of the endpoints that list multiple items. This is done to make querying large responses more manageable by filtering and sorting the requested data through RQL queries.

## How can it be used? <a href="#markdown-header-how-can-it-be-used" id="markdown-header-how-can-it-be-used"></a>

Let's say we're using the `localization service` for example. The `localization service` offers a `GET /` endpoint that allows us to pull all localizations the service has to offer. However, the response of this request might be a very large set of localizations of which we might not need all of the given localizations. This is where RQL steps in.

Let's now assume we only want to pull certain localizations with a specific key. We then make the following request, using RQL:

`GET /?key="mail_greeting"`

Which will in then return all localizations with the key `mail_greeting`. We can also use RQL to sort the results of a request. We might for example want to sort all the localizations we pull according to their `update_timestamp`. To perform this action, we make the following request:

`GET /?sort(-update_timestamp)`

This request will still respond with all the available localizations, but they will be sorted according to their updateTimestamp.

## Operators and their shorthands <a href="#markdown-header-operators-and-their-shorthands" id="markdown-header-operators-and-their-shorthands"></a>

|             Function             | Shorthand | Note                                                                                                                                                                                                                                            |
| :------------------------------: | :-------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|               `or`               |    `\|`   |                                                                                                                                                                                                                                                 |
|               `and`              |    `&`    |                                                                                                                                                                                                                                                 |
|       `eq(property, value)`      |    `=`    | Return records where `property` equals `value` or where `property` is an array which contains `value`. Only works for arrays containing simple types (number, boolean, string)                                                                  |
|               `ne`               |           |                                                                                                                                                                                                                                                 |
|               `gt`               |    `>`    |                                                                                                                                                                                                                                                 |
|               `ge`               |    `>=`   |                                                                                                                                                                                                                                                 |
|               `in`               |           |                                                                                                                                                                                                                                                 |
|               `out`              |           |                                                                                                                                                                                                                                                 |
| `contains(property, expression)` |           | Only return records where `property` is an array of objects and which contains an object that satisfies  `expression`. Eg `contains(myproperty, id=1)` returns all documents where the array `myproperty` contains an object `a` where `a.id=1` |
|                                  |           |                                                                                                                                                                                                                                                 |
|            `excludes`            |           | Only return records that don't have `field1`: `contains(field1)`                                                                                                                                                                                |
|                                  |           |                                                                                                                                                                                                                                                 |
|              `like`              |           |                                                                                                                                                                                                                                                 |
|              `limit`             |           | Only return `1` record: `limit(1)`                                                                                                                                                                                                              |
|                                  |           |                                                                                                                                                                                                                                                 |
|              `sort`              |           |                                                                                                                                                                                                                                                 |
|             `select`             |           | Only return `field1` and `field2` from the records: `select(field1, field2)`                                                                                                                                                                    |

## RQL Implementation Details on Extra Horizon <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

This section contains examples on how you can use RQL on Extra Horizon.

#### Users Service • Query users that are not in a specific timezone

```
/users/v1/?contains(time_zone)&out(time_zone,Europe%252FBrussels)
```

* To encode `Europe/Brussels` in the URL, use double encoding. `%252F` represents `%/`

## More Information <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

For more information on RQL, visit [persvr/rql on GitHub](https://github.com/persvr/rql).
