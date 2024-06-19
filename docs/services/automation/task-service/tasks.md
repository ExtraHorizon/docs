# Tasks

## Creating a task

Tasks represent a scheduled or planned function. Tasks can give you insights in to when the function will be executed and provide insights into the success or failure of the execution.

### Scheduling

#### By data service transitions

When configuring your application's data model, it's possible to attach an [action](../../manage-data/data-service/schemas.md#other-actions) to a transition. Triggering the scheduling of a task is one of the available actions. Read more about how to implement this functionality in the [Data Service documentation](../../manage-data/data-service/schemas.md#other-actions).

#### Scheduling via the SDK

In JavaScript/TypeScript environments, our open source [Extra Horizon SDK ](https://docs.extrahorizon.com/javascript-sdk)offers a convenient wrapper around the API.

```typescript
await exh.tasks.create({
    functionName: 'yourFunctionName',
    data: {...yourData},
    priority: 1,
    startTimestamp: new Date(Date.now()),
    tags: ['mytag']
});
```

#### Scheduling via an API call

See the [Tasks Service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml) to learn how to schedule a Task via the API

### Listing scheduled tasks

{% tabs %}
{% tab title="sdk" %}
```typescript
await exh.tasks.find();
```
{% endtab %}
{% endtabs %}

A Task object is uniquely identified within the Task Service by its id. It contains a number of attributes

```javascript
{
  "id": "757f191a810c19729de860ae",
  "functionName": "testFunction",
  "status": "new",
  "statusChangedTimestamp": "2021-09-29T15:17:07.051Z",
  "data": {
    "my_key": "My Value"
  },
  "tags": [
    "my_tag"
  ],
  "startTimestamp": "2021-09-29T15:17:07.051Z",
  "priority": 1,
  "createdByApplicationId": "6672ede774a7bd291fb0bea4",
  "createdByUserId": "58ff75ad4cedfd0005f80951",
  "creationTimestamp": "2021-09-29T15:17:07.051Z",
  "updateTimestamp": "2021-09-29T15:17:07.051Z"
}
```

* `functionName` - the name of the AWS Lambda function that should be executed. This function must be created in the same AWS account as the Extra Horizon deployment.
* `status` - Task status, see below for more information
* `statusChangedTimestamp` - timestamp when the status was last updated
* `data` - \[optional] A key-value object where input to the function is provided
* `tags` - \[optional] Descriptive keywords that improve the search experience. For example, they can be used to trace automated Tasks by adding the Task id’s to the tags list.
* `startTimestamp` - set when the task should start
* `priority` - define which tasks should get precedence in a queue
* `createdByApplicationId` - The application which created the task&#x20;
* `createdByUserId` - The user who created the task

{% hint style="info" %}
If you define a function schedule, you will only see the next scheduled task execution at the moment when it starts.
{% endhint %}

## Task Lifecycle

### Queuing

When many tasks need to be executed within a short timeframe, the Tasks are queued chronologically by the value of their `startTimestamp` attribute. However, in a queue, the `priority` attribute takes precedence over the `startTimestamp` attribute. Tasks with a higher `priority` value will be executed first.

### Execution status

<figure><img src="../../../.gitbook/assets/image (8) (1).png" alt=""><figcaption></figcaption></figure>

The `status` and `statusChangedTimestamp` attributes are updated according to the Task’s execution progress. A newly created Task (status: `new`) can be revoked via the Cancel a Task endpoint (status: `canceled`).

Once the Task Service invokes the specified AWS Lambda function, the Task receives the `inProgress` status and the execution of the code cannot be halted via Extra Horizon.

Upon successful execution of the code, AWS Lambda reports back to the Task Service and the Task status is updated to `complete`.

#### Retries

{% hint style="success" %}
Available since v1.3.0
{% endhint %}

If an error occurs while executing a Task, the Task Service will check if the function has defined a retry policy of the function.

When a retry policy is applicable the Task status is set to `retried` and a new Task is created with the same properties. The new Task will include a `retryForTaskIds` field containing the id of the original Task. In turn, the original task will receive a `retriedByTaskId` field holding the id of the new Task.

See the [Functions section](functions.md#retrypolicy-automatically-retry-a-task-when-it-fails) to learn more about retry policies.

#### Task failures

If an error occurs while no restart policy is defined or the maximum number of tries have been reached the Task status is set to `failed`.

If the system cannot determine the outcome of the Task execution, the Task status is also set to `failed`. In such cases, an error named `zombieTaskCleaned` will be included in the Task.

## The Task Failed Event

{% hint style="success" %}
Available since v1.4.0
{% endhint %}

When a Task reaches the `failed` status, a `task_failed` event is published.

The event can be used to react to Task failures. This could for instance be used for monitoring, alerting or implementing custom retry logic.

A `task_failed` event contains the following attributes:

```json
{
    "type": "task_failed",
    "content": {
        "id": "757f191a810c19729de860ae",
        "functionName": "testFunction",
        "error": {
            "type": "runtime",
            "name": "TypeError",
            "message": "Cannot read property 'x' of undefined"
        }
    }
}
```

* `content.id` - the id of the failed Task.
* `content.functionName` - the name of the function the failed Task was trying to execute.
* `content.error` - the error that led to the failure of the Task.
