# Helpers in Templates

Our Template Service is built on top of Handlebars and extends its core functionality with a set of additional helpers.

On this page, you’ll find an overview of the available helpers, including their purpose, expected parameters, and usage examples.

For more information about standard Handlebars syntax and built-in helpers, refer to the official documentation: [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/)&#x20;

```hbs
<h2>{{t 'greeting' name=@inputs.first_name}}</h2>

{{#if (or (and @inputs.has_permission @inputs.is_logged_in) (not @inputs.authentication))}}
  <p>{{t 'dashboard_access_granted'}}</p>
  <p>{{t 'balance'}}: {{number @inputs.balance}}</p>
{{else}}
  <p>{{t 'dashboard_access_denied'}}</p>
{{/if}}
```

## Translation and internationalization

The `t`, `number`, `currency`, `datetime`, and `relativetime` helpers are language and time zone aware, using the template rendering context to determine formatting behavior.

```hbs
{{t 'greeting' name=@inputs.first_name}}
{{t 'balance'}}: {{number @inputs.balance}}
```

### Language and time zone resolution

All formatting helpers use the `language` property from the resolve input:

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const resolvedTemplate = await exh.templatesV2.resolve(templateName, {
  inputs: {
    first_name: "John"
  },
  language: "EN",
  timeZone: "UTC"
});
```
{% endtab %}

{% tab title="HTTP API" %}
{% code title="POST /templates/v2/{templateName}/resolve " %}
```json
{
    "inputs" : {
        "first_name": "John"
    },
    "language": "EN",
    "timeZone": "UTC"
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

The `language` is passed to the `t` helper (supported by [i18next](https://www.i18next.com/translation-function/essentials)) to determine to which language the supplied localization key needs to be translated. A deeper explanation on how to localize strings in templates can be found in on the [Localizations in Templates page](localizations.md).

This `language` is also passed internally to the corresponding `Intl.*` formatter and determines:

* Number formatting (decimal separators, grouping) via `number`
* Currency formatting (symbol placement, spacing) via `currency`
* Date and time formatting (month names, ordering, 12/24h clock) via `datetime`
* Relative time phrasing (e.g., “1 day ago”) via `relativetime`

If no `language` is provided, `"EN"` is used.

The `datetime` helper additionally respects the `timeZone` property from the resolve input.\
If provided, it is passed to `Intl.DateTimeFormat`.\
If omitted, the time zone `"UTC"` is used.

## Combining helpers&#x20;

[Subexpressions](https://handlebarsjs.com/guide/expressions.html#subexpressions) can be used to combine multiple helpers:

```handlebars
{{#le (sum @inputs.price @inputs.tax) @inputs.cash}}
    Buy
{{else}}
    Don't buy
}}
```

In this example, `sum` is used as a subexpression and is evaluated first inside round brackets `(...)`, after which its result is passed as an argument to `le`.

This can also be used to construct if cases with combined `and` ,`or` and `not`

```handlebars
{{#if (or (and @inputs.has_permission @inputs.is_logged_in) (not @inputs.authentication))}}
    Show me the page
{{else}}
    Please authenticate first
{{/if}}
```

## API reference

### Translation and internationalization helpers

<table><thead><tr><th width="148.84765625">Name</th><th width="283.74609375">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>t</code></td><td>Translates a key using the current language (supports interpolation) See more in <a href="localizations.md">Localizations in Templates page</a>.</td><td><p><strong>Input:</strong> </p><pre class="language-handlebars"><code class="lang-handlebars">{{t 'greeting'}}
</code></pre><p><strong>Output</strong>: <code>Dear,</code> </p></td></tr><tr><td><code>number</code></td><td>Formats a number using locale-aware formatting (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat"><code>Intl.NumberFormat</code></a>) </td><td><p><strong>Input:</strong> </p><pre class="language-handlebars"><code class="lang-handlebars">{{number 1234.56 style='decimal' maximumSignificantDigits=3 }}
</code></pre><p><strong>Output</strong>: <code>1.230</code></p></td></tr><tr><td><code>currency</code></td><td>Formats a number as localized currency (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat"><code>Intl.NumberFormat</code></a>)</td><td><p><strong>Input</strong>: </p><pre class="language-handlebars"><code class="lang-handlebars">{{currency 1234,56 currency="EUR"}}
</code></pre><p><strong>Output</strong>: <code>1 234,56 €</code></p></td></tr><tr><td><code>datetime</code></td><td>Formats a date/time using locale and timezone (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat"><code>Intl.DateTimeFormat</code></a>)</td><td><p><strong>Input</strong>:</p><pre class="language-handlebars"><code class="lang-handlebars">{{datetime 0 weekday="short" year="numeric" month="long" day="2-digit" hour="2-digit"}}
</code></pre><p><strong>Output</strong>: <code>Thu, January 01, 1970 at 12 AM</code></p></td></tr><tr><td><code>relativetime</code></td><td>Formats relative time (e.g. “1 day ago”) (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat"><code>Intl.RelativeTimeFormat</code></a>)</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{relativetime -1 range='days' style='long'}}
</code></pre><p><strong>Output</strong>: <code>1 day ago</code></p></td></tr></tbody></table>

### Logical helpers

<table><thead><tr><th width="100.76171875">Name</th><th width="208.7109375">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>and</code></td><td>Logical AND<br>(<code>arg1 &#x26;&#x26; arg2</code>)</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#and @inputs.isActive @inputs.isVerified}}
    Valid
{{else}}
    Invalid
{{/and}}
</code></pre></td></tr><tr><td><code>or</code></td><td>Logical OR <br>(<code>arg1 || arg2</code>)</td><td><pre class="language-handlebars"><code class="lang-handlebars"><strong>{{#or @inputs.isAdmin @inputs.isEditor}}
</strong>    Has access
{{else}}
    No access
{{/or}}
</code></pre></td></tr><tr><td><code>not</code></td><td><p>Logical NOT </p><p>(<code>!arg1</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#not @inputs.isDeleted}}
    Visible
{{else}}
    Deleted
{{/not}}
</code></pre></td></tr></tbody></table>

### Comparison helpers

<table><thead><tr><th width="93.58984375">Name</th><th width="227.42578125">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>eq</code></td><td><p>Checks equality </p><p>(<code>arg1 == arg2</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#eq @inputs.status "active"}}
<strong>    Active
</strong>{{else}}
    Inactive
{{/eq}}
</code></pre></td></tr><tr><td><code>ne</code></td><td><p>Checks inequality </p><p>(<code>arg1 != arg2</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#ne @inputs.status "active"}}
<strong>    Inactive
</strong>{{else}}
    Active
{{/eq}}
</code></pre></td></tr><tr><td><code>gt</code></td><td><p>Greater than </p><p>(<code>arg1 > arg2</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#gt @inputs.score 50}}
    Passed
{{else}}
    Failed
{{/gt}}
</code></pre></td></tr><tr><td><code>ge</code></td><td>Greater than or equal<br>(<code>arg1 >= arg2</code>)</td><td><pre class="language-handlebars"><code class="lang-handlebars"><strong>{{#ge @inputs.age 18}}
</strong>    Adult
{{else}}
    Minor
{{/ge}}
</code></pre></td></tr><tr><td><code>lt</code></td><td><p>Less than </p><p>(<code>arg1 &#x3C; arg2</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#lt @inputs.stock 1}}
    Out of stock
{{else}}
    Available
{{/lt}}
</code></pre></td></tr><tr><td><code>le</code></td><td><p>Less than or equal </p><p>(<code>arg1 &#x3C;= arg2</code>)</p></td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#le @inputs.attempts 3}}
    Allowed
{{else}}
    Blocked
{{/le}}
</code></pre></td></tr></tbody></table>

### Math helpers

<table><thead><tr><th width="123.19140625">Name</th><th>Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>sum</code></td><td>Adds all arguments together</td><td><strong>Input:</strong> <code>{{sum 2 3 4}}</code> <br><strong>Output:</strong> 9</td></tr><tr><td><code>subtract</code></td><td>Subtracts each next argument from the first</td><td><strong>Input:</strong> <code>{{subtract 10 3 2}}</code> <br><strong>Output:</strong> 5</td></tr><tr><td><code>multiply</code></td><td>Multiplies all arguments</td><td><strong>Input:</strong> <code>{{multiply 2 3 4}}</code> <br><strong>Output:</strong> 24</td></tr><tr><td><code>divide</code></td><td>Divides the first argument by the rest sequentially</td><td><strong>Input:</strong> <code>{{divide 20 2 2}}</code> <br><strong>Output:</strong> 5</td></tr><tr><td><code>mod</code></td><td>Returns remainder of a division (<code>arg1 % arg2</code>)</td><td><strong>Input:</strong> <code>{{mod 10 3}}</code> <br><strong>Output:</strong> 1</td></tr><tr><td><code>floor</code></td><td>Rounds a number down</td><td><strong>Input:</strong> <code>{{floor 4.8}}</code> <br><strong>Output:</strong> 4</td></tr><tr><td><code>ceil</code></td><td>Rounds a number up</td><td><strong>Input:</strong> <code>{{ceil 4.2}}</code> <br><strong>Output:</strong> 5</td></tr><tr><td><code>round</code></td><td>Rounds to the nearest integer</td><td><strong>Input:</strong> <code>{{round 4.5}}</code> <br><strong>Output:</strong> 5</td></tr></tbody></table>

### Array helpers

<table><thead><tr><th width="113.1796875">Name</th><th width="280.72265625">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>length</code></td><td>Returns the length of an array</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{length items}}
</code></pre></td></tr><tr><td><code>includes</code></td><td>Checks whether an array contains a value</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#includes @inputs.tags "tag_1"}}
    Has the tag
{{else}}
    Doesn't have the tag
{{/includes}}
</code></pre></td></tr><tr><td><code>join</code></td><td>Joins array elements using a separator</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{join @inputs.tags sep=', '}}
</code></pre></td></tr></tbody></table>

### String helpers

<table><thead><tr><th width="109.45703125">Name</th><th width="261.97265625">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>includes</code></td><td>Checks whether a string contains a substring</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{#includes title "Admin"}}
    Contains Admin
{{else}}
    Does not contain Admin
{{/includes}}
</code></pre></td></tr><tr><td><code>length</code></td><td>Returns the length of a string</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{length @inputs.title}}
</code></pre></td></tr><tr><td><code>join</code></td><td>Joins multiple arguments using a separator (default <code>", "</code>)</td><td><pre class="language-handlebars"><code class="lang-handlebars">{{join "apple" "banana" "orange" sep=' - ' }} 
</code></pre></td></tr></tbody></table>

### Object helpers

<table><thead><tr><th width="133.9609375">Name</th><th width="346.953125">Behaviour</th><th>Example</th></tr></thead><tbody><tr><td><code>toJsonString</code></td><td><p>Serializes data into a JSON string. Because JSON may contain special characters, the way you render the output depends on the context.</p><p></p><p>If used in plain text or in HTML within a <code>&#x3C;script></code>  tag, use triple braces (<code>{{{ }}}</code>) to prevent HTML escaping. Any mention of <code>&#x3C;/script</code> will also be replaced by <code>&#x3C;\/script</code> to prevent the JSON from accidentally breaking out of the <code>&#x3C;script></code> tag.</p><p></p><p>Double braces (<code>{{ }}</code>) can be used if you want to render the JSON as text in HTML.</p></td><td><pre class="language-handlebars"><code class="lang-handlebars"><strong>{{{toJsonString @inputs}}}
</strong></code></pre></td></tr></tbody></table>





