# Task Service

Do you need some custom logic in your medical backend? Run custom code in a certified environment using the Task Service. The Task Service is well-integrated with the [Data Service](../../manage-data/data-service/#intro) to automatically act upon changes in your database. It can as well be used to run standalone business logic asynchronously, synchronous or on a schedule.

Some common use cases where you can leverage the Task Service include:

* **Data Processing**\
  When a new device measurement comes in, a task can be triggered to asynchronously process the measurement data. This task can make third-party API calls to augment the measurement.
* **Data synchronisation**\
  To synchronise data between ExtraHorizon other systems, a task can be created. This task can run on a schedule or can be triggered by an event.
* **GDPR-compliant user management**\
  When a user is deleted from the system, a task can be triggered that uses the API of a third-party system to delete the user's data in that system as well.
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

### Functions and tasks

Functions and tasks are the two main concepts in this service.

A **function** is the single unit of code that can be executed within the executable piece of code that an executable&#x20;

A **task** represents the execution of a specific function.

### 🔗 More Resources

{% embed url="https://www.youtube.com/watch?v=ncOFiA5lrRE" %}

## Resources & References

* [Task service changelog](https://docs.extrahorizon.com/extrahorizon/api-reference/changelog-chronological/changelog-service#tasks-service)
* [API Specifications](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs)

##

