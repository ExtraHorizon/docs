# Event Service

Certain types of actions that are performed in one module require follow-up actions in other modules. These actions, or events, can be registered in the Event Module by the “event-informing service” (or the customer’s application). Subsequently, the Event Service notifies the relevant “event-receiving services” of the occurred action. Which types of events each service receives, is configured within Subscription objects.

#### Example

When a User object is removed, the User module creates an Event to notify other services. Only the services that are subscribed to this type of Events will be notified. The customer can configure follow-up actions via the Dispatcher module, e.g. deleting all personally identifiable information (PII) of the removed user.

![](../../.gitbook/assets/Screenshot\_20211018\_141014.png)

## Create a custom event

Extra Horizon services create different types of events on which you can act from within your cluster. If required you can create your own custom events.

{% tabs %}
{% tab title="Javascript" %}
```typescript
const customEvent = await exh.events.create({
  type: 'myCustomEvent',
  content: {
    key:  'value'
  }
});
```
{% endtab %}
{% endtabs %}

## List events

You can search and list events that occurred within your cluster.

{% tabs %}
{% tab title="Javascript" %}
```typescript
const events = await exh.events.find();
```
{% endtab %}
{% endtabs %}
