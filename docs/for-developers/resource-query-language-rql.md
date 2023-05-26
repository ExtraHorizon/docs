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

<table><thead><tr><th width="359.0083026218489" align="center">Function</th><th width="106" align="center">Shorthand</th><th width="298.416149068323">Note</th></tr></thead><tbody><tr><td align="center"><code>or</code></td><td align="center"><code>|</code></td><td></td></tr><tr><td align="center"><code>and</code></td><td align="center"><code>&#x26;</code></td><td></td></tr><tr><td align="center"><code>eq(property, value)</code></td><td align="center"><code>=</code></td><td>Return records where <code>property</code> equals <code>value</code> or where <code>property</code> is an array which contains <code>value</code>. Only works for arrays containing simple types (number, boolean, string)</td></tr><tr><td align="center"><code>ne</code></td><td align="center"></td><td></td></tr><tr><td align="center"><code>gt</code></td><td align="center"><code>></code></td><td></td></tr><tr><td align="center"><code>ge</code></td><td align="center"><code>>=</code></td><td></td></tr><tr><td align="center"><code>in</code></td><td align="center"></td><td></td></tr><tr><td align="center"><code>out</code></td><td align="center"></td><td></td></tr><tr><td align="center"><code>contains(property, expression)</code></td><td align="center"></td><td>Only return records where <code>property</code> is an array of objects and which contains an object that satisfies  <code>expression</code>. Eg <code>contains(myproperty, id=1)</code> returns all documents where the array <code>myproperty</code> contains an object <code>a</code> where <code>a.id=1</code></td></tr><tr><td align="center"></td><td align="center"></td><td></td></tr><tr><td align="center"><code>excludes</code></td><td align="center"></td><td>Only return records that don't have <code>field1</code>: <code>contains(field1)</code></td></tr><tr><td align="center"></td><td align="center"></td><td></td></tr><tr><td align="center"><code>like</code></td><td align="center"></td><td></td></tr><tr><td align="center"><code>limit(:limit,:offset=0)</code></td><td align="center"></td><td><ul><li>Only return <code>1</code> record: <code>limit(1)</code></li><li><code>limit(2,0)</code> returns the two resources in positions 0 and 1</li><li><code>limit(10)</code> returns up to 10 resources starting from position 0</li><li><code>limit(2,2)</code> returns the two resources in positions 2 and 3</li></ul></td></tr><tr><td align="center"></td><td align="center"></td><td></td></tr><tr><td align="center"></td><td align="center"></td><td></td></tr><tr><td align="center"><code>sort</code></td><td align="center"></td><td></td></tr><tr><td align="center"><code>select</code></td><td align="center"></td><td>Only return <code>field1</code> and <code>field2</code> from the records: <code>select(field1, field2)</code></td></tr></tbody></table>

## RQL Implementation Details on Extra Horizon <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

This section contains examples on how you can use RQL on Extra Horizon.

#### Users Service • Query users that are not in a specific timezone

```
/users/v1/?contains(time_zone)&out(time_zone,Europe%252FBrussels)
```

* To encode `Europe/Brussels` in the URL, use double encoding. `%252F` represents `%/`

#### Events Service • List all events from a specific user <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

Use `like` instead of `eq`

```
/events/v1/?like(content.user_id,569544b142cfbb000460aa61)
```

## More Information <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

For more information on RQL, visit [persvr/rql on GitHub](https://github.com/persvr/rql).
