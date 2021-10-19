---
description: >-
  The Extra Horizon Dispatcher Service executes actions as a response to events.
  This guide is complementary to the API reference documentation
---

# Dispatchers

## &#x20;About the Dispatcher Service

Whereas the [Event Service](event-service.md) is in charge of communicating the occurrence of specific types of actions, the Dispatcher Service makes sure the required follow-up actions are performed. This can either be the sending of a template-based email via the [Mail Service](mail-service.md) or the execution of a Task via the [Task Service](task-service.md). For each type of Event, a different dispatcher can be configured, with different actions that are triggered.

![](../../.gitbook/assets/Screenshot\_20211018\_164704.png)

#### Example

When a User object is removed in the User Service, the customer must guarantee that all personally identifiable information of the user disappears from all services. A dispatcher for the user\_deleted Event type must therefore create a Task which eliminates the PII in, for example, the Data Service.

## Information Model

Configurators of the customer’s application can create multiple **Dispatchers** to monitor the different types of Events and to trigger **MailActions** and/or **TaskActions**.

![](https://lh5.googleusercontent.com/HWx1d8raCgb4krRTMaQXf87qrTNs1REe2KJTTrz1zZwSNbgrQIvOo7jhSTDDHOdujlccumzLal1gCDPHzAgWghYKjqrYJfoClSXRmrgzQhq15GUNhUchJmwY80LfIsrzz-oaU9Q=s0)

## Objects and Attributes

### Dispatchers

A Dispatcher object is uniquely identified by its `id`. Each Dispatcher can only monitor Events of one `eventType` but it can trigger multiple `actions` to send template-based emails and/or create Tasks.

### Actions

Action objects are uniquely identified by their `id` and contain a `mail` or `task` type attribute.

#### MailActions

A MailAction object contains part of the parameters required for the Send an email request to the [Mail Service](mail-service.md). These components are fixed for the email that must be send in response to the type of Event that is monitored by the Dispatcher. The variable parameters are derived from the content attribute of the captured Event object.

The fixed components include the recipients of the email and the templateId which is needed to compose the email subject and body text fields.&#x20;

{% hint style="info" %}
Note: Only template-based emails can be sent via the Dispatcher Service.
{% endhint %}

#### TaskActions

The TaskAction object contains the (optional) parameters for the Create a Task request to the Task Service:

* `functionName`: The name of the AWS function to invoke,&#x20;
* `data`: The key-value pairs the AWS function expects as input,&#x20;
* `startimestamp`: The moment at which the Task is to be executed. If no time is specified, the Task will be immediately performed, and
* `tags`: Descriptive keywords that are stored in the Task object.&#x20;

The values for the above attributes can be variables that refer to the content attribute of the captured Event object.

#### Common timestamp attributes <a href="docs-internal-guid-2bab1c3c-7fff-eacb-5ca1-4c989f84ba8f" id="docs-internal-guid-2bab1c3c-7fff-eacb-5ca1-4c989f84ba8f"></a>

All Extra Horizon Services keep track of the time of creation (`creationTimestamp`) and of the most recent update (`updateTimestamp)` of their stored objects.&#x20;

{% hint style="info" %}
Note: The timestamp attributes in the Dispatcher Service have a number format, whereas other services use a string(`$date-time`) format.
{% endhint %}

## Actions

This section gives an overview of the available Dispatcher Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing Dispatchers

Configurators, with the correct permissions, can create Dispatchers for the different Event types that they have set up in other services. Each Dispatcher can contain multiple Actions.

{% swagger method="post" path="/" baseUrl=" " summary="Create a Dispatcher" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/" baseUrl=" " summary="List all Dispatchers" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/{dispatcherId}" baseUrl=" " summary="Delete a Dispatcher" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### Managing Actions

Once a Dispatcher is created, its `eventType` can no longer be changed. However, the included Actions can be managed via the following endpoints.

{% swagger method="post" path="/{dispatcherId}/actions" baseUrl=" " summary="Add an Action to a Dispatcher" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="put" path="/{dispatcherId}/actions/{actionId}" baseUrl=" " summary="Update an Action from a Dispatcher" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/{dispatcherId}/actions/{actionId}" baseUrl=" " summary="Delete an action from a Dispatcher" %}
{% swagger-description %}


\



{% endswagger-description %}
{% endswagger %}
