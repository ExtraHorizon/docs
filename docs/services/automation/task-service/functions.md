# Functions

{% hint style="success" %}
Functions was added to the Task service from [v1.1.0](broken-reference)
{% endhint %}

{% hint style="warning" %}
Managing and uploading functions is scheduled to become available in the next release of the Task Service. Contact [requests@extrahorizon.com](mailto:requests@extrahorizon.com) if you have questions about this.
{% endhint %}

A task represents a planned or scheduled peace of code. This piece of code is called a function in Extra Horizon.

### Creating a function

{% tabs %}
{% tab title="sdk" %}
{% hint style="warning" %}
This functionality has not yet been added to the SDK. You can implement this functionality using the sdk.raw methods.
{% endhint %}
{% endtab %}

{% tab title="cli" %}
```
exh tasks create <options>
```

See the [extrahorizon cli documentation](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

#### Tutorials

* Checkout our [hello world task](https://docs.extrahorizon.com/extrahorizon-cli/tasks/hello-world-task) example.

#### Supported runtimes

Your task code will be executed in a code execution environment. Today, ExtraHorizon supports the following runtimes:&#x20;

|        | Runtime versions                |
| ------ | ------------------------------- |
| NodeJs | nodejs12.x, nodejs14.x          |
| Python | python3.7, python3.8, python3.9 |
| Ruby   | ruby2.7,                        |
| Java   | java8, java11                   |
| Go     | go1.x                           |
| .Net   | dotnetcore3.1                   |

When using NodeJS, our open-source [ExtraHorizon JavaScript SDK](https://extrahorizon.github.io/javascript-sdk/#/) can be used within the tasks to easily interface with other services.

### Listing functions

{% tabs %}
{% tab title="sdk" %}
{% hint style="warning" %}
This functionality has not yet been added to the SDK. You can implement this functionality using the sdk.raw methods.
{% endhint %}
{% endtab %}

{% tab title="cli" %}
```
exh tasks list <options>
```

See the [extrahorizon cli documentation](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

### Updating a function

{% tabs %}
{% tab title="sdk" %}
{% hint style="warning" %}
This functionality has not yet been added to the SDK. You can implement this functionality using the sdk.raw methods.
{% endhint %}
{% endtab %}

{% tab title="cli" %}
```
exh tasks functions update <functionName> <options>
```

See the [extrahorizon cli documentation](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

### Deleting a function

{% tabs %}
{% tab title="sdk" %}
{% hint style="warning" %}
This functionality has not yet been added to the SDK. You can implement this functionality using the sdk.raw methods.
{% endhint %}
{% endtab %}

{% tab title="cli" %}
```
exh tasks delete <options>
```

See the [extrahorizon cli documentation](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

{% hint style="success" %}
If a function is removed from the task service the logs aren't removed and can still be retrieved
{% endhint %}

### Logs

{% tabs %}
{% tab title="sdk" %}
{% hint style="warning" %}
This functionality has not yet been added to the SDK. You can implement this functionality using the sdk.raw methods.
{% endhint %}

See the [API Specification](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml) for more information.
{% endtab %}
{% endtabs %}



### Tasks Service Functions API

#### Function Definition

A Function is uniquely identified within the Task Service by its name. It contains a number of attributes

```javascript
{
  name: 'test-task-service-function',
  code: 'UEsDBAoAAAAAAIdEilMAAAAAAAAAAAAAAAAOABwAdGVzdC1mdW5jdGlvbi9VVAkAA20Ds2F4A7NhdXgLAAEE9QEAAAQUAAAAUEsDBAoAAAAAAGJEilNnlP2NHwAAAB8AAAAWABwAdGVzdC1mdW5jdGlvbi9pbmRleC5qc1VUCQADJwOzYW8Ds2F1eAsAAQT1AQAABBQAAABjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBFeEgnKTsKUEsBAh4DCgAAAAAAh0SKUwAAAAAAAAAAAAAAAA4AGAAAAAAAAAAQAO1BAAAAAHRlc3QtZnVuY3Rpb24vVVQFAANtA7NhdXgLAAEE9QEAAAQUAAAAUEsBAh4DCgAAAAAAYkSKU2eU/Y0fAAAAHwAAABYAGAAAAAAAAQAAAKSBSAAAAHRlc3QtZnVuY3Rpb24vaW5kZXguanNVVAUAAycDs2F1eAsAAQT1AQAABBQAAABQSwUGAAAAAAIAAgCwAAAAtwAAAAAA', // BASE64 encoded zip file containing the function code
  entryPoint: 'index.handler', // the entry point where the function first gets called
  runtime: 'nodejs14.x', // the execution runtime used for the function
  description: 'Description of the Function',
  timeLimit: 230,
  memoryLimit: 256,
  environmentVariables: {
    Extra: {
      value: 'Horizon'
    }
  }
}
```

The complete list of the available runtime, memory, timeLimit values is defined in the Swagger endpoint documentation.

#### Creating Task Function

In order to **Create** a Task Function, you will need as a User to have the **CREATE\_TASK\_FUNCTION** permission.

Then you can make a `POST` call to `<your_endpoint>/tasks/v1/functions` With body:

```json
{
    "name": "test-task-service-function",
    "code": "UEsDBAoAAAAAAIdEilMAAAAAAAAAAAAAAAAOABwAdGVzdC1mdW5jdGlvbi9VVAkAA20Ds2F4A7NhdXgLAAEE9QEAAAQUAAAAUEsDBAoAAAAAAGJEilNnlP2NHwAAAB8AAAAWABwAdGVzdC1mdW5jdGlvbi9pbmRleC5qc1VUCQADJwOzYW8Ds2F1eAsAAQT1AQAABBQAAABjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBFeEgnKTsKUEsBAh4DCgAAAAAAh0SKUwAAAAAAAAAAAAAAAA4AGAAAAAAAAAAQAO1BAAAAAHRlc3QtZnVuY3Rpb24vVVQFAANtA7NhdXgLAAEE9QEAAAQUAAAAUEsBAh4DCgAAAAAAYkSKU2eU/Y0fAAAAHwAAABYAGAAAAAAAAQAAAKSBSAAAAHRlc3QtZnVuY3Rpb24vaW5kZXguanNVVAUAAycDs2F1eAsAAQT1AQAABBQAAABQSwUGAAAAAAIAAgCwAAAAtwAAAAAA",
    "entryPoint": "index.handler",
    "runtime": "nodejs14.x"
}
```

The body above is the strict minimum for the creation of a function. You can provide the `description`,`timeLimit`,`memoryLimit` and `environmentVariables` as defined in the previous section.

#### Listing Task Functions

In order to **List** the Task Functions present, you will need as a User to have the **READ\_TASK\_FUNCTIONS** permission.

Then you can make a `GET` call to `<your_endpoint>/tasks/v1/functions`.

It will provide you a list of the functions in the given environment where the service is running.

#### Updating a given Task Function

In order to **Update** a Task Function, you will need as a User to have the **UPDATE\_TASK\_FUNCTION** permission.

Then you can make a `PUT` call to `<your_endpoint>/tasks/v1/functions/<your_function_name>`.

Every property except for the name can be updated, therefore all properties in the request are **optional**, but at least one needs to be :

```json
{
    "code": "UEsDBAoAAAAAAIdEilMAAAAAAAAAAAAAAAAOABwAdGVzdC1mdW5jdGlvbi9VVAkAA20Ds2F4A7NhdXgLAAEE9QEAAAQUAAAAUEsDBAoAAAAAAGJEilNnlP2NHwAAAB8AAAAWABwAdGVzdC1mdW5jdGlvbi9pbmRleC5qc1VUCQADJwOzYW8Ds2F1eAsAAQT1AQAABBQAAABjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBFeEgnKTsKUEsBAh4DCgAAAAAAh0SKUwAAAAAAAAAAAAAAAA4AGAAAAAAAAAAQAO1BAAAAAHRlc3QtZnVuY3Rpb24vVVQFAANtA7NhdXgLAAEE9QEAAAQUAAAAUEsBAh4DCgAAAAAAYkSKU2eU/Y0fAAAAHwAAABYAGAAAAAAAAQAAAKSBSAAAAHRlc3QtZnVuY3Rpb24vaW5kZXguanNVVAUAAycDs2F1eAsAAQT1AQAABBQAAABQSwUGAAAAAAIAAgCwAAAAtwAAAAAA",
    "entryPoint": "index.handler",
    "runtime": "nodejs14.x"
}
```

The body above is the strict minimum for the creation of a function. You can provide the `description`,`timeLimit`,`memoryLimit` and `environmentVariables` as defined in the previous section.

The normal response when completed is:

```json
{
  "affectedRecords": 1
}
```

#### Deleting a given Task Function

In order to **Delete** a Task Function, you will need as a User to have the **DELETE\_TASK\_FUNCTION** permission.

Then you can make a `DELETE` call to `<your_endpoint>/tasks/v1/functions/<your_function_name>`.

The normal response when completed is:

```json
{
  "affectedRecords": 1
}
```

#### Viewing a given Task Function's Logs

In order to **List** a given Task Function's Logs, you will need as a User to have the **READ\_TASK\_FUNCTION\_LOGS** permission.

Then you can make a `GET` call to `<your_endpoint>/tasks/v1/functions/<your_function_name>/logs?eventTimestamp>=2020-01-25T00:28:04.222Z&eventTimestamp<=2020-01-23T23:30:00.000Z`.

It will provide you a list of the logs emitted by the given function within the time bracket provided. Note that the maximum number of events that can be returned is **100**, you can use move the time bracket in order to access different log events.

The normal response when completed is:

```json
{
  "page": {
      "total": 4,
      "offset": 0,
      "limit": 0
  },
  "data": [
    {
      "message": "START RequestId: 2c69e412-346b-4698-b8e3-6086dd7d821a Version: $LATEST\n",
      "eventTimestamp": "2021-12-10T08:01:03.926Z"
    },
    {
      "message": "2021-12-10T08:01:05.721Z\tundefined\tERROR\t(node:9) Some Log message\n",
      "eventTimestamp": "2021-12-10T08:01:05.722Z"
    },
    {
      "message": "END RequestId: 2c69e412-346b-4698-b8e3-6086dd7d821a\n",
      "eventTimestamp": "2021-12-10T08:01:05.862Z"
    },
    {
      "message": "REPORT RequestId: 2c69e412-346b-4698-b8e3-6086dd7d821a\tDuration: 1934.38 ms\tBilled Duration: 1935 ms\tMemory Size: 128 MB\tMax Memory Used: 12 MB\t\n",
      "eventTimestamp": "2021-12-10T08:01:05.862Z"
    },
  ]
}
```
