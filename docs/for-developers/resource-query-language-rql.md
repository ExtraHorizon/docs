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

<table data-full-width="true"><thead><tr><th width="393.0083026218489" align="center">Function</th><th width="532.416149068323">Note</th></tr></thead><tbody><tr><td align="center"><code>or(&#x3C;condition>,&#x3C;condition>,...)</code></td><td>Returns records that satisfy at least one of the specified conditions.</td></tr><tr><td align="center"><code>and(&#x3C;expression>,&#x3C;expression>,...)</code></td><td>Returns records that satisfy all specified conditions.<br>In addition to combining conditions, this operator can be used to combine algorithmic operators.</td></tr><tr><td align="center"><code>eq(&#x3C;property>,&#x3C;value>)</code></td><td><p>Filters records where <code>&#x3C;property></code> exactly matches <code>&#x3C;value></code>. If <code>&#x3C;property></code> is an array, it must contain <code>&#x3C;value></code>.<br></p><p>Note: Object comparisons are not supported.</p></td></tr><tr><td align="center"><code>ne(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> does not match <code>&#x3C;value></code>. If <code>&#x3C;property></code> is an array, it should not contain <code>&#x3C;value></code>.<br><br>Note: Object comparisons are not supported.</td></tr><tr><td align="center"><code>gt(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is greater than <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>ge(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is greater than or equal to <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>lt(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is less than <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>le(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> is less than or equal to <code>&#x3C;value></code>.</td></tr><tr><td align="center"><code>in(&#x3C;property>,&#x3C;value>,&#x3C;value>,...)</code></td><td>Filters records where <code>&#x3C;property></code> matches any of the listed <code>value</code>s. If <code>&#x3C;property></code> is an array, only one element needs to match.</td></tr><tr><td align="center"><code>out(&#x3C;property>,&#x3C;value>,&#x3C;value>,...)</code></td><td>Filters records where <code>&#x3C;property></code> matches none of the listed <code>value</code>s. If <code>&#x3C;property></code> is an array, no element can match any of the listed <code>&#x3C;value></code>s.</td></tr><tr><td align="center"><code>contains(&#x3C;property>)</code><br><code>contains(&#x3C;property>,&#x3C;condition>)</code></td><td>Filters records where <code>&#x3C;property></code>, assumed to be an array of objects, contains at least one object that satisfies <code>&#x3C;condition></code>.<br><br>When <code>&#x3C;condition></code> is not provided, objects which contain <code>&#x3C;property></code> are returned. </td></tr><tr><td align="center"><code>excludes(&#x3C;property>)</code><br><code>excludes(&#x3C;property>,&#x3C;condition>)</code></td><td>Filters records where <code>&#x3C;property></code>, assumed to be an array of objects, does not contain any object that satisfies <code>&#x3C;condition></code>.<br><br>When <code>&#x3C;condition></code> is not provided, objects which do not have <code>&#x3C;property></code> are returned. </td></tr><tr><td align="center"><code>like(&#x3C;property>,&#x3C;value>)</code></td><td>Filters records where <code>&#x3C;property></code> contains <code>&#x3C;value></code> as a substring. This applies to strings or arrays of strings.<br><br>Unsupported data types will yield no records.</td></tr><tr><td align="center"><code>limit(&#x3C;limit>,&#x3C;offset>)</code></td><td><p>Limits the number of returned records and optionally offsets the starting position in the result set.</p><ul><li><code>limit(1)</code> returns only <code>1</code> record: </li><li><code>limit(2,0)</code> returns the two resources in positions 0 and 1</li><li><code>limit(10)</code> returns up to 10 resources starting from position 0</li><li><code>limit(2,2)</code> returns the two resources in positions 2 and 3</li></ul></td></tr><tr><td align="center"><code>sort(&#x3C;property>)</code><br><code>sort(-&#x3C;property>)</code></td><td>Sorts the returned records by <code>&#x3C;property></code>. Ascending sort is the default. For descending order, prepend <code>-</code> to <code>&#x3C;property></code>.</td></tr><tr><td align="center"><code>select(&#x3C;property>,&#x3C;property>,...)</code></td><td>Trims the returned records to only include the specified properties.</td></tr><tr><td align="center"><p><code>skipCount()</code> </p><p><code>skip_count()</code></p></td><td>Skips the record counting step of a request to increase performance. As a result, the page object in a response will not include the <code>total</code> field.</td></tr></tbody></table>

## Advanced use cases <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

#### **Filtering by array length**

To filter a field of type array by it's length, for example the following syntax will return users with 0 - 5 roles assigned to them.

```http
GET /users/v1/?excludes(roles.5)
```

## Limitations <a href="#markdown-header-more-information" id="markdown-header-more-information"></a>

Every tool has its constraints, and RQL is no exception. Understanding these limitations helps you use RQL more effectively.

### Casting values

RQL automatically tries to guess the type of the values you provide. Most of the time this works well, but not always. For instance, searching for a number which is stored as a string can cause issues.&#x20;

For example, the user service can store phone numbers and these are stored as strings. When searching for a specific phone number you'll have to tell RQL your looking for a string value. The following query **won't work**:

```http
GET /users/v1/?eq(phone_number,12345678)
```

You'll have to tell RQL you're searching for a string by "casting" your value with a `string:` prefix:

```http
GET /users/v1/?eq(phone_number,string:12345678)
```

The same happens for values which look like dates. For instance, querying like this for a birthday in the profile service like this **won't work**:

```http
GET /profiles/v1/?eq(birthday,1970-01-01)
```

The value also needs to be prefixed by the `string:` casting mechanism:

```http
GET /profiles/v1/?eq(birthday,string:1970-01-01)
```

### Double Encoding of Special Characters

Imagine a scenario where you need to filter records based on a description that includes the string `a)a`:

```http
GET /data/v1/?like(description,a)a)
```

Executing the above query without any modifications results in an `INVALID_RQL_EXCEPTION`. The problem lies with the special character `)`. RQL can't discern whether the `)` marks the end of the argument list or is part of the string value `a)a`.

You might think of solving this by URL encoding the special character `)` as `%29`:

```http
GET /data/v1/?like(description,a%29a)
```

Unfortunately, this approach still triggers an `INVALID_RQL_EXCEPTION`. The reason lies in RQL's automatic decoding of incoming requests, a design choice to accommodate HTTP clients that perform automatic URL encoding. Consequently the encoded `%29` gets decoded back to `)`, leaving us with the initial problem.

To effectively handle special characters, RQL mandates double encoding for such string values. This means that the special character should be encoded twice. Here's how you would apply double encoding to the initial query:

```http
GET /data/v1/?like(description,a%2529a)
```

It is highly recommended to use our SDK if you are building a JavaScript or Typescript application. Our SDK will automatically double encode string values.

{% hint style="info" %}
Double encoding is not limited to parentheses. RQL requires all special characters to be double encoded:

* Simple symbols like `/`, `(`, `]`, `"`.
* Accents such as `é`, `à`, `ö`.
* Whitespace characters including spaces, newlines, and tabs.&#x20;
{% endhint %}

### Services with the skip count RQL operator

The skip count RQL operator is currently supported in select services, and efforts are underway to make it available for all services in the near future. Attempting to use the skip count on a service that does not yet support it may result in an `INVALID_RQL_EXCEPTION`.

Services currently supporting the skip count operator:

* Data Service
* Events Service
* Profiles Service
* Tasks Service
* Users Service
* Notification Service

