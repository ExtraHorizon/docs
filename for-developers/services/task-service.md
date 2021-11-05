---
description: >-
  Use the Task Service to add add custom code and business logic to your
  ExtraHorizon backend.
---

# Task Service

Every medical application is different. Based on your application and requirements, the backend needs to provide some custom functionality and/or data processing. Within ExtraHorizon, custom functionality can be easily added using the tasks service.

The following examples give an idea how you might use the tasks service:

* **Data Processing**\
  When a new device measurement comes in, a task can be triggered to asynchronously process the measurement data. This task can make 3th-party API calls to augment the measurement.
* **Data synchronization**\
  ****If you use other systems and want to synchronize data between ExtraHorizon and the respective system, a task can be created to perform the synchronization. This can happen on a scheduled basis (daily, weekly, ...) or based on events.
* **GDPR-compliant user management**\
  When a user is deleted from the system, a task can be triggered that uses the API of a 3th-party system to delete the user's data in that system as well.
* **Daily reporting**\
  Run a reporting task to aggregate data from the data service into a daily report.

## Writing tasks

### Supported runtimes

Your task code will be executed in a code execution environment. Today, ExtraHorizon supports the following runtimes:

* [NodeJS](https://nodejs.org/en/about/)
  * `nodejs12.x`
  * `nodejs14.x`

When using NodeJS, our open-source [ExtraHorizon JavaScript SDK](https://extrahorizon.github.io/javascript-sdk/#/) can be used within the tasks to easily interface with other services.

{% hint style="warning" %}
The Tasks Service uses[ AWS Lambda](https://aws.amazon.com/lambda/) as the engine for code execution. The task code currently cannot be directly uploaded through the Tasks Service. To upload tasks, you will receive AWS credentials to your dedicated environment. With those credentials you can use the regular AWS SDK's to upload and update the task code.
{% endhint %}

## Scheduling tasks

Tasks can be triggered in a number of ways ways.&#x20;

### Scheduling via a data service transitions

When configuring your application's data model, it's possible to attach an [action](data-service/#transition-actions) to a transition. Triggering the scheduling of a task is one of the available actions. Read more about how to implement this functionality in the [Documents Service section](data-service/)

### Scheduling via the SDK

In JavaScript/TypeScript environments, our open source [ExtraHorizon SDK ](../extrahorizon-sdk.md)offers a convenient wrapper around the API.&#x20;

### Scheduling via an API call

See the [Tasks Service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml) to learn how to schedule a Task via the API

## Tasks Service API&#x20;

### Task Definition

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

### Task Queuing

When many tasks need to be executed within a short timeframe, the Tasks are queued chronologically by the value of their startTimestamp attribute. However, in a queue, the `priority` attribute takes precedence over the `startTimestamp` attribute. Tasks with a higher `priority` value will be executed first.&#x20;

### Task Lifecycle

![](https://lh6.googleusercontent.com/af5KNmsUUbeSMWvMsNd27lX2m1O5sQlQq4UyIZFC6pYtUlNFJioAG6OiDVidT52T8nt1iClUDsmaDveT71ej6QkVmRQGrgkxt8CztZTOkcw0IBrACEQhEYf5jw\_wEMKNmZabTac=s0)



The `status` and `statusChangedTimestamp` attributes are updated according to the Task’s execution progress. A newly created Task (status: new) can be revoked via the Cancel a Task endpoint (canceled).&#x20;

Once the Task Service invokes the specified AWS Lambda function, the Task receives the inProgress status and the execution of the code cannot be halted via Extra Horizon.&#x20;

Upon (un)successful execution of the code, AWS Lambda reports back to the Task Service and the Task status is updated accordingly to `complete` or `failed`

If AWS Lambda does not report anything within 5 minutes, the associated task status is set to `failed`.

{% hint style="warning" %}
There is no automatic retrying for a failed task. To rerun a failed Task, create a new Task with the same parameters
{% endhint %}

## FAQ

### How to repeat a task at regular interval?

To repeat the same Task at regular intervals, create a recurring Task that triggers the scheduling of an identical Task with `startTimestamp = {previous startTimestamp + N}`.

### How to schedule multiple tasks at once?

![Execute multiple tasks at once](https://lh5.googleusercontent.com/MBbXkcRf4eh3FeHU34PhUDVURT5LFVnEWWCIxFSFCYH1-xVhJGtZTimJcqB0xZoSGK45E2gzRmK1eD\_x-eIPhvu1bB7Kk3AvT3NFR4L17BqgO0MtJjI9hShhlkCh\_MR4EvFNKtg=s0)

To automate the execution of multiple repeating actions, set up a (recurring) task that triggers the scheduling of a collection of tasks.

## Examples

### List all the tasks

{% tabs %}
{% tab title="curl" %}
```bash
curl  \
    --location \
    --request GET 'https://api.<environment>.extrahorizon.io/tasks/v1/'
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const tasks = await sdk.tasks.find();
```
{% endtab %}
{% endtabs %}

## Resources & References

* [Task Service Swagger Specification](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml)\
