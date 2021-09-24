---
description: >-
  The Extra Horizon Dispatcher Service executes actions as a response to events.
  This guide provides a conceptual overview of the Dispatcher Service and is
  complementary to the API reference documentati
---

# Dispatchers

## Intro

When a Service or a user creates an event, actions are triggered as a response. The Dispatcher Service provides the link between the event and the consequent actions: when a dispatcher receives an event of a specific type, the dispatcher triggers an action based on the event’s data.

![](https://lh6.googleusercontent.com/ObAJNZpGnAlDHYz5S8J1Vj3qoEXM_L2V4iisDw5-0FEW5k9HCiywDGKucauSHOPwmHQlSkkXS1wUey7wfUwA2vxFQHkI2Qi2D8AX5cm3UalcOofZP0LRA6Vh-nnnOr1Y6j9Zc4A=s0)

| For example, when a user is removed \(using the ‘remove a user’ endpoint\), an event is configured in the Event Service. This is noticed by the Dispatcher Service, which triggers the execution of a Task that removes all personally identifiable information of the user. |
| :--- |


### Information Model

![](https://lh5.googleusercontent.com/HWx1d8raCgb4krRTMaQXf87qrTNs1REe2KJTTrz1zZwSNbgrQIvOo7jhSTDDHOdujlccumzLal1gCDPHzAgWghYKjqrYJfoClSXRmrgzQhq15GUNhUchJmwY80LfIsrzz-oaU9Q=s0)

The Dispatcher Service allows users to create dispatchers. The Dispatcher object determines which event types are monitored, as configured in the Event Service, and which actions will be executed. Two types of actions can be configured:

* A mail \(MailAction\), as configured in the Mail Service,
* A task \(TaskAction\), as configured in the Task Service.

### Objects and Attributes

#### Dispatcher object

The Dispatcher object is identified by a unique id. Furthermore, the object contains:

* A type of event \(eventTypes\), as defined in the Event Service,
* Either a MailAction or a TaskAction as a response to the event,
* The time of creation and of the latest update \(timestamps\).

#### Mail object

The Mail object is uniquely identified by an id and contains a type attribute with the value mail to define the Mail action. The mail addresses of the people who are to receive the mail are defined in arrays in the recipients attribute. If the mail is based on a template, the template is defined in the template\_id attribute, which links the object to a Template configured in the Template Service.

#### Task object

The Task object is uniquely identified by an id and contains a type attribute with the value task to define the Task action. In the tags attribute several tags can be added to describe the Task. Furthermore, the object contains attributes required to execute the task as defined in the Task Service:

* The name of the AWS function \(functionName\), 
* The data the AWS function needs as input \(data\), 
* The moment at which the Task is to be executed \(startimestamp\).

### Actions

This section gives an overview of the available Dispatcher Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

#### Create Dispatchers

With the correct permissions, users can create dispatchers and add actions:

* Create a dispatcher: POST /
* Add an action to the dispatcher: POST /{dispatcherId}/actions

#### Update and delete Actions

With the correct permission, the identifier of the action and corresponding dispatcher, a user can update or delete any action.

* Update an action: PUT /{dispatcherId}/actions/{actionId}
* Delete an action: DELETE /{dispatcherId}/actions/{actionId}

#### Delete and list Dispatchers

With the correct permission, the identifier of the action and corresponding dispatcher, users can delete any dispatcher. With the correct permission, users can list all dispatchers.

* List all dispatchers: GET /
* Delete a dispatcher: DELETE /{dispatcherId}

#### Back-end Actions

Health Check 

See xxx. &lt; Discuss on central page: applies to all services.&gt;  


