# Task Service

Every medical application is different. Based on your application and requirements, the backend needs to provide some custom functionality and/or data processing. Within Extra Horizon, custom functionality can be easily added using the task service.

The following examples give an idea of how you can use the task service:

* **Data Processing**\
  When a new device measurement comes in, a task can be triggered to asynchronously process the measurement data. This task can make 3th-party API calls to augment the measurement.
* **Data synchronisation**\
  If you use other systems and want to synchronise data between Extra Horizon and the respective system, a task can be created to perform the synchronisation. This can happen on a scheduled basis (daily, weekly, ...) or based on events.
* **GDPR-compliant user management**\
  When a user is deleted from the system, a task can be triggered that uses the API of a 3th-party system to delete the user's data in that system as well.
* **Daily reporting**\
  Run a reporting task to aggregate data from the data service into a daily report.



## Functions & Tasks

The task service has two logical entities: functions and tasks.&#x20;

A **function** contains the business logic, the code that you want to execute.&#x20;

{% content-ref url="functions.md" %}
[functions.md](functions.md)
{% endcontent-ref %}

A **task** is represents the execution of a function with a set of inputs.&#x20;

{% content-ref url="tasks.md" %}
[tasks.md](tasks.md)
{% endcontent-ref %}

## FAQ

### How to schedule a task at regular intervals?

To repeat the same Task at regular intervals, create a recurring Task that triggers the scheduling of an identical Task with `startTimestamp = {previous startTimestamp + N}`.

### How to schedule multiple tasks at once?

![Execute multiple tasks at once](https://lh5.googleusercontent.com/MBbXkcRf4eh3FeHU34PhUDVURT5LFVnEWWCIxFSFCYH1-xVhJGtZTimJcqB0xZoSGK45E2gzRmK1eD\_x-eIPhvu1bB7Kk3AvT3NFR4L17BqgO0MtJjI9hShhlkCh\_MR4EvFNKtg=s0)

To automate the execution of multiple repeating actions, set up a (recurring) task that triggers the scheduling of a collection of tasks.

## Video Tutorials

{% embed url="https://www.youtube.com/watch?v=uIuGQ_VZ4CM" %}

## Resources & References

* [Task Service Swagger Specification](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml)
