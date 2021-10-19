# Automation

### Intro <a href="markdown-header-introduction" id="markdown-header-introduction"></a>

the ExH services provide a way of running code on demand through _tasks_. Instead of containing actual code, tasks contain a _reference_ to code that is stored elsewhere, as well as the necessary data to execute it. Because of this, tasks are lightweight and their configuration remains simple.

Aside from tasks, the `data service` allows for automation by providing configurable logic for the documents that it creates.  The document behaviour is configured in a document's _schema_ through _statuses_ and _transitions_. A document's behaviour can also be configured to trigger tasks, allowing documents to become an active part of applications created with ExH services.

Other Services, such as `event service` and `dispatcher service` also work in conjunction with the `task service` to create even more configurable logic, like event-based code execution.

### Tasks <a href="markdown-header-tasks" id="markdown-header-tasks"></a>

As previously mentioned, ExH services allow the execution of code on demand. This is done by triggering _tasks_ with the `task service`. Created tasks are added to a task queue, and it is possible to schedule a task to run at a future moment.

#### Task structure <a href="markdown-header-task-structure" id="markdown-header-task-structure"></a>

Tasks consist of three core elements: a **function name**, execution **data** and an optional **start time**.\
The _function name_ contains a reference to the code to be executed; For example, the name of an AWS Lambda function.\
_Execution data_ is used as input for the execution of the aforementioned code.\
The _start time_, when provided, specifies the time at which the task should be scheduled for execution.

#### Scheduling tasks <a href="markdown-header-scheduling-tasks" id="markdown-header-scheduling-tasks"></a>

Tasks have two notable features that can be used in conjunction: They can be scheduled to run at a later moment, and they can be used to trigger other tasks.

Tasks can also be scheduled _recursively_, meaning a task can create another task identical to itself to run at a later time, essentially re-scheduling itself upon being executed. Because of this, it is possible to create a task that infinitely repeats itself at regular intervals.

A task doesn't necessarily need to trigger a single other task, it can trigger a _collection_ of tasks, including itself. Using this functionality, 'scheduler' tasks can be created to automate the execution of a suite of frequently recurring actions.

### Data behaviour <a href="markdown-header-data-behaviour" id="markdown-header-data-behaviour"></a>

Documents provide programmable logic behaviour akin to a _finite-state machine_. This means a document can exist in one of the _statuses_ configured in it's schema, and change it's status according to the _transitions_ defined in the schema.

#### Transitions <a href="markdown-header-transitions" id="markdown-header-transitions"></a>

Depending on it's configuration, a document can change it's status automatically. The data schema allows or an automatic transition to be configured with _conditions_. This means that a document will automatically transition into the next status when the conditions to do so are fulfilled.

#### Actions <a href="markdown-header-actions" id="markdown-header-actions"></a>

When a document undergoes a _transition_, it can also invoke an _action_. Like conditions, actions are configured within the respective transition, inside the data schema.

Actions invoked by transitioning a document can affect that document directly, such as permitting or denying users and groups read and/or write access to that document. Actions can also trigger tasks, allowing documents to interact with other parts of your application for even more configurable data-driven logic.

### Event-based logic <a href="markdown-header-event-based-logic" id="markdown-header-event-based-logic"></a>

In addition to tasks and data-driven logic, ExH services also provide features for event-based logic. This logic is made possible through the combined functionality of the `event service` and `dispatcher service`. These services allow the creation of _events_ and _dispatchers_, respectively.

#### Events <a href="markdown-header-events" id="markdown-header-events"></a>

_Events_ are simple objects which can be created manually, although they are also created and used by other services. Services use events to alert each other when something happens that another service should be aware of. At such an occurrence, the informing service will create an event of a specific type. The receiving service will be listening for events of the aforementioned type, and then do something based on the event.

#### Dispatchers <a href="markdown-header-dispatchers" id="markdown-header-dispatchers"></a>

Similar to event-receiving services ,_dispatchers_ wait and listen for an event of a specific type to occur. Upon receiving an event, dispatchers will trigger an action based on that event and it's data. The event type to listen for an the action to perform are configurable through the `dispatcher service`. The actions a dispatcher can trigger are sending an e-mail and triggering a task.

![event\_flowchart](https://bytebucket.org/extrahorizon/exhz-user-guide/raw/5c89db24939dfd20e92c10df46a532724ff545af/assets/img/tasks\_flow\_event.svg?token=1b2cdcab198c7c7fc43beb90fb026a2768d044cd)

### Related Documents <a href="markdown-header-related-documents" id="markdown-header-related-documents"></a>

* [Handling data](https://bitbucket.org/extrahorizon/exhz-user-guide/src/5c89db24939dfd20e92c10df46a532724ff545af/handleData.md)
* [Tasks Service guide](https://developers.extrahorizon.io/services/?service=tasks-service\&redirectToVersion=1)
* [Data Service guide](https://developers.extrahorizon.io/services/?service=data-service\&redirectToVersion=1)
* [Events Service guide](https://developers.extrahorizon.io/services/?service=events-service\&redirectToVersion=1)
* [Dispatchers Service guide](https://developers.extrahorizon.io/services/?service=dispatchers-service\&redirectToVersion=1)
