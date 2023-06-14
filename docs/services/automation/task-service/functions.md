# Functions

{% hint style="success" %}
Available since v1.1.0
{% endhint %}

A Task represents a planned or scheduled piece of code. The code definition is a Function in Extra Horizon.

## Deploying a Function

Developers can leverage the power of the Extra Horizon CLI to efficiently create new Functions and seamlessly update existing ones, this can be achieved by using the `exh tasks sync` command.

{% tabs %}
{% tab title="CLI" %}
```bash
exh tasks sync --name=my-function \
  --code=/my/path/to/my-function \
  --entryPoint=index.handler \
  --runtime="nodejs14.x"
```

See the [Extra Horizon CLI documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

### Tutorial

A step-by-step guide on how to deploy a Function is available in the [hello world](https://docs.extrahorizon.com/extrahorizon-cli/tasks/hello-world-task) example.

{% hint style="info" %}
The [JavaScript SDK](https://extrahorizon.github.io/javascript-sdk/#/) may be used within a Function to easily interface with Extra Horizon services.
{% endhint %}

## List functions

{% tabs %}
{% tab title="CLI" %}
```
exh tasks list <options>
```

See the [Extra Horizon CLI documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

## Delete a function

In order to **Delete** a Task Function, you will need as a User to have the **DELETE\_TASK\_FUNCTION** permission.

{% tabs %}
{% tab title="CLI" %}
```
exh tasks delete <options>
```

See the [Extra Horizon CLI documentation](http://localhost:5000/o/-MkCjSW-Ht0-VBM7yuP9/s/xoM7jW7vVT9Wk3ulEGgO/) for more information.
{% endtab %}
{% endtabs %}

{% hint style="success" %}
If a function is removed from the task service its executions (tasks) and the logs aren't removed and can still be retrieved
{% endhint %}

## Function Properties

```json
{
  "name": "my-function",
  "description": "This is an example of a test Lambda function",
  "entryPoint": "index.handler",
  "runtime": "nodejs14.x",
  "timeLimit": 60,
  "memoryLimit": 256,
  "environmentVariables": {
    "CLIENT_ID": {
      "value": "my-token-value" 
    },
    "CLIENT_SECRET": {
      "value": "my-secret-value" 
    }
  },
  "retryPolicy": {
    "enabled": true,
    "errorsToRetry": [
      "CONNECTION_ERROR",
      "DATABASE_ERROR"
    ]
  },
  "executionOptions": {
    "permissionMode": "permissionRequired"
  },
}
```

### name

The `name` property serves as the unique identifier amongst all Functions.

### description

The `description` property may be supplied to provide a brief explanation regarding a Function's purpose.

### entryPoint

The `entryPoint` property refers to the method in the Function code that is executed.

### runtime

The `runtime` property currently supports the following values:&#x20;

| Runtime | Version                               |
| ------- | ------------------------------------- |
| NodeJs  | `nodejs14.x`                          |
| Python  | `python3.7`, `python3.8`, `python3.9` |
| Ruby    | `ruby2.7`                             |
| Java    | `java8`, `java11`                     |
| Go      | `go1.x`                               |
| .Net    | `dotnetcore3.1`                       |

### timeLimit

The `timeLimit` represents the maximum allowed execution time limit for this Function in seconds. This value may have a minimum value of `3` seconds and a maximum value of `300` seconds.

### memoryLimit

The `memoryLimit` allocates the desired memory for a Function's execution in MB. This value may have a minimum value of `128` MB and a maximum value of `10240` MB.

### environmentVariables

The `environmentVariables` represent the environment variables in the Function execution runtime.

The following code snippet shows an example how to configure the environment variables:

```json
{
  ...
  "environmentVariables": {
    "CLIENT_ID": {
      "value": "my-token-value" 
    },
    "CLIENT_SECRET": {
      "value": "my-secret-value" 
    }
  }
}
```

### retryPolicy

{% hint style="success" %}
Available since v1.3.0
{% endhint %}

The `retryPolicy` field can be used to determine system behavior after the execution of a Function (Task) fails.

The following code snippet shows an example how to configure the retry policy:

```json
{
  ...
  "retryPolicy": {
    "enabled": true,
    "errorsToRetry": [
      "CONNECTION_ERROR",
      "DATABASE_ERROR"
    ]
  }
}
```

#### retryPolicy Properties

`enabled`

The retry policy is disabled by default, If this field is set to `true`, the retry policy becomes active. If active the policy will retry a maximum of 3 times, with an increasing timeout of 2, 5 and 10 seconds respectively.

<figure><img src="../../../.gitbook/assets/Group 1-2.png" alt=""><figcaption><p>Visual representation of the fixed retry policy</p></figcaption></figure>

`errorsToRetry`

It is possible to restrict the retry policy to a specific set of errors using this property.

### executionOptions

The `executionOptions` field may be used to configure how the function can be executed.

The following code snippet shows an example how to configure the execution options:

```json
{
  ...
  "executionOptions": {
    "permissionMode": "permissionRequired"
  },
}
```

#### executionOptions Properties

`permissionMode`

This property determines execution restrictions based on its assigned value. One of the following values may be assigned to the `permissionMode` property to enforce execution restrictions.&#x20;

{% hint style="info" %}
The permissionMode is only considered for direct execution of a Function or [API Functions](api-functions.md).
{% endhint %}

| permissionMode       | Description                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissionRequired` | <p>A user requires a permission as stated for the <a href="functions.md#user-permissions">API Function permissions</a> section. <br><br>This is the default permission mode.</p> |
| `allUsers`           | A user must be logged in, but no permission is required.                                                                                                                         |
| `public`             | Any party may execute this function without any restrictions.                                                                                                                    |

For information regarding the application of permissions to users please refer to [global roles](../../access-management/user-service/global-roles.md).
