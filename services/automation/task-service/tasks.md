# Tasks

## Creating a task

Tasks represent a scheduled or planned function. Tasks can give you insights in to when the function will be executed and provide insights into the success or failure of the execution.

### Scheduling

#### By data service transitions

When configuring your application's data model, it's possible to attach an [action](broken-reference) to a transition. Triggering the scheduling of a task is one of the available actions. Read more about how to implement this functionality in the [Documents Service section](broken-reference)

#### Scheduling via the SDK

In JavaScript/TypeScript environments, our open source [ExtraHorizon SDK ](broken-reference)offers a convenient wrapper around the API.

```typescript
await sdk.tasks.create({
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
await sdk.tasks.find();
```
{% endtab %}
{% endtabs %}



A Task object is uniquely identified within the Task Service by its id. It contains a number of attributes

```javascript
{
  "id": "757f191a810c19729de860ae",
  "status": "new",
  "statusChangedTimestamp": "2021-09-29T15:17:07.051Z",
  "functionName": "testFunction",
  "data": {
    "key": "value"
  },
  "startTimestamp": "2021-09-29T15:17:07.051Z",
  "tags": [
    "string"
  ],
  "priority": 1,
  "creationTimestamp": "2021-09-29T15:17:07.051Z",
  "updateTimestamp": "2021-09-29T15:17:07.051Z"
}
```

* `functionName` - the name of the AWS Lambda function that should be executed. This function must be created in the same AWS account as the ExtraHorizon deployment.
* `data` - \[optional] A key-value object where input to the function is provided
* `tags` - \[optional] Descriptive keywords that improve the search experience. For example, they can be used to trace automated Tasks by adding the Task id’s to the tags list.
* `status` - Task status, see below for more information
* `statusChangedTimestamp` - timestamp when the status was last updated
* `priority` - define which tasks should get precedence in a queue
* `startTimestamp` - set when the task should start

## Task Lifecycle

### Queuing

When many tasks need to be executed within a short timeframe, the Tasks are queued chronologically by the value of their startTimestamp attribute. However, in a queue, the `priority` attribute takes precedence over the `startTimestamp` attribute. Tasks with a higher `priority` value will be executed first.

### Execution status

![](https://lh6.googleusercontent.com/af5KNmsUUbeSMWvMsNd27lX2m1O5sQlQq4UyIZFC6pYtUlNFJioAG6OiDVidT52T8nt1iClUDsmaDveT71ej6QkVmRQGrgkxt8CztZTOkcw0IBrACEQhEYf5jw\_wEMKNmZabTac=s0)

The `status` and `statusChangedTimestamp` attributes are updated according to the Task’s execution progress. A newly created Task (status: new) can be revoked via the Cancel a Task endpoint (canceled).

Once the Task Service invokes the specified AWS Lambda function, the Task receives the inProgress status and the execution of the code cannot be halted via Extra Horizon.

Upon (un)successful execution of the code, AWS Lambda reports back to the Task Service and the Task status is updated accordingly to `complete` or `failed`

If AWS Lambda does not report anything within 5 minutes, the associated task status is set to `failed`.

{% hint style="warning" %}
There is no automatic retrying for a failed task. To rerun a failed Task, create a new Task with the same parameters
{% endhint %}
