# Dispatchers Service

Whereas the Event Service is in charge of communicating the occurrence of specific types of events, the Dispatcher Service gives you the ability to act on them. Learn how to configure dispatchers.

#### Example use case

When a User object is removed in the User Service, the customer must guarantee that all personally identifiable information of the user disappears from all services. A dispatcher for the `user_deleted` Event type must therefore create a Task which eliminates the PII in, for example, the Data Service.

## Create your first dispatcher

Dispatching an action based on an event is easy. First you need to choose the action type. The dispatcher service currently supports two types of actions (a mail and task action).

{% tabs %}
{% tab title="Task Action" %}
The Task Action contains the (optional) parameters for the Create a Task request to the Task Service:

```typescript
await exh.dispatchers.create({
  eventType: 'my-event-type',
  name: 'my-unique-dispatcher-name',
  description: 'A Dispatcher that handles my-event-type',
  actions: [
    {
      type: 'task',
      name: 'my-unique-action-name'
      description: 'An Action that handles my-event-type',
      functionName: 'my-function-name',
      data: {
        customStringField: 'myStringHere',
        customNumberField: 42
      },
      startTimestamp: new Date(),
      tags: [
        'tag1',
        'tag2'
      ]
    }
  ],
  tags: [
    'tag1',
    'tag2'
  ]
});
```

* `name`: The unique name of the Action. - (optional)
* `description`: A brief description for the Action. - (optional)
* `functionName`: The name of the Task Service Function to invoke.
* `data`: The key-value pairs the Task Service Function expects as input. - (optional)
* `starTimestamp`: The moment at which the Task is to be executed. If no time is specified, the Task will be immediately performed. - (optional)
* `tags`: Descriptive keywords that are stored in the Task object. - (optional)

{% hint style="info" %}
The dispatcher service will append the original event data as a property called event and pass it to the task service. Setting the event property yourself will be overridden.
{% endhint %}
{% endtab %}

{% tab title="Mail Action" %}
A Mail Action contains part of the parameters required for the Send an email request to the [Mail Service](broken-reference). These components are fixed for the email that must be send in response to the type of Event that is monitored by the Dispatcher. The variable parameters are derived from the content attribute of the captured Event object.

The fixed components include the recipients of the email and the templateId which is needed to compose the email subject and body text fields.

```typescript
await exh.dispatchers.create({
  eventType: 'my-event-type',
  name: 'my-unique-dispatcher-name',
  description: 'A Dispatcher that handles my-event-type',
  actions: [
    {
      type: 'mail',
      name: 'my-unique-action-name'
      description: 'An Action that handles my-event-type',
      recipients: {
        to: ["john.doe@example.com"],
        cc: ["jane.doe@example.com"],
        bcc: ["bcc@example.com"]
      },
      templateId: 'abcdef0123456789abcdef013456789ab'
    }
  ],
  tags: [
    'tag1',
    'tag2'
  ]
});
```

* `name`: The unique name of the Action - (optional)
* `description`: A brief description for the Action - (optional)
* `recipients`: The recipients list of the mail, including `to`, `cc` and `bcc`
* `templateId`: The id of the mail template to be consumed

{% hint style="info" %}
The dispatcher service will add the original event data as a property called event and pass it tot the mail and template service.
{% endhint %}

{% hint style="warning" %}
Only template-based emails can be sent via the Dispatcher Service. You must create an email template before you can send an email via a dispatcher action.
{% endhint %}
{% endtab %}
{% endtabs %}

Events can originate from any service and the dispatcher service will put listeners based on the dispatchers configured.



![](../../.gitbook/assets/Screenshot\_20211018\_164704.png)

## List Dispatchers

In order to list dispatchers a user is required to have the `VIEW_DISPATCHERS` permission.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const dispatchers = await exh.dispatchers.find();
```
{% endtab %}
{% endtabs %}

## Update a Dispatcher

In order to update a Dispatcher a user is required to have the `UPDATE_DISPATCHERS` permission.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.dispatchers.update(
    dispatcherId, 
    {
        eventType: 'my-event-type',
        name: 'my-unique-dispatcher-name',
        description: 'A Dispatcher that handles my-event-type',
        "tags": [
          "tag1",
          "tag2"
        ]
    }
);
```
{% endtab %}
{% endtabs %}

## Dispatcher Properties

### eventType

The type of event the Dispatcher will respond to e.g `user_deleted`

### name

The unique name of the Dispatcher - (Optional)

### description

A brief description for the Dispatcher - (Optional)

### actions

The actions the Dispatcher shall execute

### tags

A list of string identifiers that can be attached to a Dispatcher

{% hint style="info" %}
When managing Dispatchers using the CLI `EXH_CLI_MANAGED` will be appended to the tags array
{% endhint %}
