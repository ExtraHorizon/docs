# Resource Query Language (RQL)

RQL, or Resource Query Language, is a query language used for querying and manipulating resources through the URI. RQL provides the ability to filter, sort, paginate, and project data. It is straightforward to use, yet it offers flexibility to address complex scenarios.

For applications written in JavaScript or TypeScript, we highly recommend using our [SDK](https://docs.extrahorizon.com/javascript-sdk/) to build RQL queries.

## Using RQL <a href="#markdown-header-where-is-it-used" id="markdown-header-where-is-it-used"></a>

RQL is composed of a set of operators. These operators can be broadly classified into three categories:

* **Comparison Operators**: These operators perform comparison operators, such as equals, greater than, etc.
* **Logical Operators**: Used to combine multiple conditions
* **Algorithmic Operators**: These operators pertain to functionalities like sorting and pagination.

Operators are represented in the format `operator(arg1,arg2,...)`. Everything can be expressed as a set of such operators by means of nesting .

### Practical Examples

Lets say you want to host a web page that features a table listing all users of a specific medical device application. Implementing filtering is crucial. This is where RQL enter the picture.

{% hint style="info" %}
Try It Yourself

You can test the following examples in real-time by going to [Extra Horizon's Control Center](https://app.extrahorizon.com/users/users). Our Control Center offers a user table for your medical device application that supports RQL queries.
{% endhint %}

***

#### Basic Filtering

To display users with the first name "Adam" in the table, your GET request would look like:

```http
GET /users/v1/?eq(first_name,Adam)
```

#### **Sorting**

To sort users based on their creation timestamp:

```http
GET /users/v1/?sort(creation_timestamp)
```

#### **Pagination**

To paginate your results with a limit of 10 users and to retrieve the third page:

```http
GET /users/v1/?limit(10,20)
```

* First parameter `10` expresses the number of users to return
* Second parameter `20` offsets the starting position in the result set. The first 20 users will be skipped.

#### **Projection**

To request only specific fields such as `first_name`, `last_name`, and `creation_timestamp`:

```http
GET /users/v1/?select(first_name,last_name,creation_timestamp)
```

#### Combining Operators

Logical operators can be used to combine multiple operators. For example, to filter users with first name "Adam" and last name "Smith":

```http
GET /users/v1/?and(eq(first_name,Adam),eq(last_name,Smith))
```

Algorithmic operators can be added in the same fashion:

```
GET /users/v1/?and(eq(first_name,Adam),select(first_name))
```

## Operators <a href="#markdown-header-operators-and-their-shorthands" id="markdown-header-operators-and-their-shorthands"></a>

<table data-full-width="true"><thead><tr><th width="393.0083026218489" align="center">Function</th><th width="532.416149068323">Note</th></tr></thead><tbody><tr><td align="center"><code>or(&#x3C;condition>,&#x3C;condition>,...)</code></td><td>Returns records that satisfy at least one of the specified conditions.</td></tr><tr><td align="center"><code>and(&#x3C;condition>,&#x3C;condition>,...)</code></td><td>Returns records that satisfy all specified conditions.</td></tr><tr><td align="center"><code>eq(&#x3C;property>,&#x3C;value>)</code></td><td><p>Filters records where <code>&#x3C;property></code> exactly matches <code>&#x3C;value></code>. If <code>&#x3C;property></code> is an array, it must contain <code>&#x3C;value></code>.<br></p><p>Note: Object comparisons are not supported.</p></td></tr><tr><td align="center"><code>ne(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> does not match <code>&#x3C;value></code>. If <code>&#x3C;property></code> is an array, it should not contain <code>&#x3C;value></code>.<br><br>Note: Object comparisons are not supported.</td></tr><tr><td align="center"><code>gt(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is greater than <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>ge(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is greater than or equal to <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>lt(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is less than <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>le(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is less than or equal to <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>in(&#x3C;property>,&#x3C;value>,&#x3C;value>,...)</code></td><td>Filters records where <code>&#x3C;property></code> matches any of the listed <code>value</code>s. If <code>&#x3C;property></code> is an array, only one element needs to match.</td></tr><tr><td align="center"><code>out(&#x3C;property>,&#x3C;value>,&#x3C;value>,...)</code></td><td>Filters records where <code>&#x3C;property></code> matches none of the listed <code>value</code>s. If <code>&#x3C;property></code> is an array, no element can match any of the listed <code>&#x3C;value></code>s.</td></tr><tr><td align="center"><code>contains(&#x3C;property>)</code><br><code>contains(&#x3C;property>,&#x3C;expression>)</code></td><td>Filters records where <code>&#x3C;property></code>, assumed to be an array of objects, contains at least one object that satisfies <code>&#x3C;expression></code>.<br><br>When <code>&#x3C;expression></code> is not provided, objects which contain <code>&#x3C;property></code> are returned. </td></tr><tr><td align="center"><code>excludes(&#x3C;property>)</code><br><code>excludes(&#x3C;property>,&#x3C;expression>)</code></td><td>Filters records where <code>&#x3C;property></code>, assumed to be an array of objects, does not contain any object that satisfies <code>&#x3C;expression></code>.<br><br>When <code>&#x3C;expression></code> is not provided, objects which do not have <code>&#x3C;property></code> are returned. </td></tr><tr><td align="center"><code>like(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> contains <code>&#x3C;value></code> as a substring. This applies to strings or arrays of strings.<br><br>Unsupported data types will yield no records.</td></tr><tr><td align="center"><code>limit(&#x3C;limit>,&#x3C;offset>)</code></td><td><p>Limits the number of returned records and optionally offsets the starting position in the result set.</p><ul><li><code>limit(1)</code> returns only <code>1</code> record: </li><li><code>limit(2,0)</code> returns the two resources in positions 0 and 1</li><li><code>limit(10)</code> returns up to 10 resources starting from position 0</li><li><code>limit(2,2)</code> returns the two resources in positions 2 and 3</li></ul></td></tr><tr><td align="center"><code>sort(&#x3C;property>)</code><br><code>sort(-&#x3C;property>)</code></td><td>Sorts the returned records by <code>&#x3C;property></code>. Ascending sort is the default. For descending order, prepend <code>-</code> to <code>&#x3C;property></code>.</td></tr><tr><td align="center"><code>select(&#x3C;property>,&#x3C;property>,...)</code></td><td>Trims the returned records to only include the specified properties.</td></tr></tbody></table>

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



