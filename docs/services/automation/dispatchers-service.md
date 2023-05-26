# Dispatchers Service

Whereas the Event Service is in charge of communicating the occurrence of specific types of events, the Dispatcher Service gives you the ability to act on them. Learn how to configure dispatchers.

#### Example

When a User object is removed in the User Service, the customer must guarantee that all personally identifiable information of the user disappears from all services. A dispatcher for the `user_deleted` Event type must therefore create a Task which eliminates the PII in, for example, the Data Service.

## Create your first dispatcher

Dispatching an action based on an event is easy. First you need to choose the action type. The dispatcher service currently supports two types of actions (a mail and task action).

{% tabs %}
{% tab title="Task Action" %}
The TaskAction contains the (optional) parameters for the Create a Task request to the Task Service:

```typescript
await exh.dispatchers.create({
  eventType: 'user_created',
  actions:[
    {
      type: ActionType.TASK,
      functionName: 'myHelloWorldFunction',
      data: {
        customStringField: 'myStringHere',
        customNumberField: 42
      },
      startTimestamp: new Date(),
      tags:["tag1"]
    }
  ]
});
```

* `functionName`: The name of the AWS function to invoke,
* `data`: The key-value pairs the AWS function expects as input,
* `starTimestamp`: The moment at which the Task is to be executed. If no time is specified, the Task will be immediately performed, and
* `tags`: Descriptive keywords that are stored in the Task object.

{% hint style="info" %}
The dispatcher service will append the original event data as a property called event and pass it tot the task service. Setting the an event property yourself will be overridden.
{% endhint %}
{% endtab %}

{% tab title="Mail Action" %}
A MailAction contains part of the parameters required for the Send an email request to the [Mail Service](broken-reference). These components are fixed for the email that must be send in response to the type of Event that is monitored by the Dispatcher. The variable parameters are derived from the content attribute of the captured Event object.

The fixed components include the recipients of the email and the templateId which is needed to compose the email subject and body text fields.

```typescript
await exh.dispatchers.create({
  eventType: 'user_created',
  actions:[{
    type: ActionType.MAIL,
    recipients:{
      to:["john.doe@example.com"],
      cc:["jane.doe@example.com"],
      bcc: ["bcc@example.com"]
    },
    templateId:'abcdef0123456789abcdef013456789ab'
  }]
});
```

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

## Retrieving a list of dispatchers

{% embed url="https://extrahorizon.atlassian.net/browse/SVCS-41" %}



You can retrieve a paginated list of dispatchers via the Extra Horizon SDK.

```typescript
const dispatchers = await exh.dispatchers.find();
```

