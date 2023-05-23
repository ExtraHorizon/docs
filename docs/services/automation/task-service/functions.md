# Functions

{% hint style="success" %}
Available since [v1.1.0](broken-reference)
{% endhint %}

A task represents a planned or scheduled piece of code. The code definition is a function in Extra Horizon.

## Create a new function

Functions can be created through the CLI and the API. A function is uniquely defined by its name. You at least have to provide a `name`, `description`,`timeLimit`,`memoryLimit` and `environmentVariables`.

{% tabs %}
{% tab title="CLI" %}
```
exh tasks create <options>
```

See the [extrahorizon cli documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

#### Tutorials

* Checkout our [hello world task](https://docs.extrahorizon.com/extrahorizon-cli/tasks/hello-world-task) example.

#### Supported runtimes

Extra Horizon currently supports the following runtimes:&#x20;

|        | Runtime versions                |
| ------ | ------------------------------- |
| NodeJs | nodejs12.x, nodejs14.x          |
| Python | python3.7, python3.8, python3.9 |
| Ruby   | ruby2.7,                        |
| Java   | java8, java11                   |
| Go     | go1.x                           |
| .Net   | dotnetcore3.1                   |

When using NodeJS, our open-source [ExtraHorizon JavaScript SDK](https://extrahorizon.github.io/javascript-sdk/#/) can be used within the tasks to easily interface with other services.

### Function Properties&#x20;

#### `retryPolicy` - Automatically retry a task when it fails

{% hint style="success" %}
Available since v1.3.0
{% endhint %}

Using the `retryPolicy` property you can define what should happen when a task fails. If enabled, the policy is fixed and set to a maximum of 3 retries with an increasing timeout of 2, 5 and 10 seconds respectively. You can restrict the retry mechanism to a specific set of errors using the `errorsToRetry` property.

The retry policy is disabled by default.



<figure><img src="../../../.gitbook/assets/Group 1-2.png" alt=""><figcaption><p>Visual representation of the fixed retry policy</p></figcaption></figure>

The following code snippet shows an example how to configure the policy:

```json
{
  "retryPolicy": {
    "enabled": false,
    "errorsToRetry": [
      "CONNECTION_ERROR",
      "DATABASE_ERROR"
    ]
  }
}
```

## List functions

{% tabs %}
{% tab title="CLI" %}
```
exh tasks list <options>
```

See the [extrahorizon cli documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

## Update a function

{% tabs %}
{% tab title="CLI" %}
```
exh tasks functions update <functionName> <options>
```

See the [Extra Horizon CLI documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

Then you can make a `PUT` call to `<your_endpoint>`.

Every property except for the name can be updated, therefore all properties in the request are **optional**, but at least one needs to be :

```json
{
    "code": "UEsDBAoAAAAAAIdEilMAAAAAAAAAAAAAAAAOABwAdGVzdC1mdW5jdGlvbi9VVAkAA20Ds2F4A7NhdXgLAAEE9QEAAAQUAAAAUEsDBAoAAAAAAGJEilNnlP2NHwAAAB8AAAAWABwAdGVzdC1mdW5jdGlvbi9pbmRleC5qc1VUCQADJwOzYW8Ds2F1eAsAAQT1AQAABBQAAABjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBFeEgnKTsKUEsBAh4DCgAAAAAAh0SKUwAAAAAAAAAAAAAAAA4AGAAAAAAAAAAQAO1BAAAAAHRlc3QtZnVuY3Rpb24vVVQFAANtA7NhdXgLAAEE9QEAAAQUAAAAUEsBAh4DCgAAAAAAYkSKU2eU/Y0fAAAAHwAAABYAGAAAAAAAAQAAAKSBSAAAAHRlc3QtZnVuY3Rpb24vaW5kZXguanNVVAUAAycDs2F1eAsAAQT1AQAABBQAAABQSwUGAAAAAAIAAgCwAAAAtwAAAAAA",
    "entryPoint": "index.handler",
    "runtime": "nodejs14.x"
}
```

The normal response when completed is:

```json
{
  "affectedRecords": 1
}
```

## Delete a function

{% tabs %}
{% tab title="CLI" %}
```
exh tasks delete <options>
```

See the [extrahorizon cli documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}



In order to **Delete** a Task Function, you will need as a User to have the **DELETE\_TASK\_FUNCTION** permission.

Then you can make a `DELETE` call to `<your_endpoint>/tasks/v1/functions/<your_function_name>`.

The normal response when completed is:

```json
{
  "affectedRecords": 1
}
```

{% hint style="success" %}
If a function is removed from the task service its executions (tasks) and the logs aren't removed and can still be retrieved
{% endhint %}
