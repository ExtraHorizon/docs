# Events

## Objects and Attributes <a href="#docs-internal-guid-5c7f23fb-7fff-e75b-bba0-5cdbc84e7969" id="docs-internal-guid-5c7f23fb-7fff-e75b-bba0-5cdbc84e7969"></a>

### Events

An Event object is uniquely identified by its id. The type attribute contains a string value which has been chosen by the customer (or Extra Horizon) for this particular kind of event. The same value can be listed in the Subscription objects to indicate an interest in all Event objects of this type.

Optionally, the Event object stores a set of key-value pairs with information from the informing service in a content attribute. This data can be used by the receiving service to perform the required follow-up action(s).

![](<../../../.gitbook/assets/Screenshot\_20211018\_141452 (1).png>)



![](../../../.gitbook/assets/Screenshot\_20211018\_141651.png)

### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation (`creation_Timestamp`) and of the most recent update (`update_Timestamp`) of their stored objects.

{% hint style="info" %}
The timestamp attributes in the Event Service have a number format, while other Services use a `string($date-time)` format.
{% endhint %}

## Setting up Events

To make use of Events, the customer’s application must configure the following:

1. Set up the customer’s application to make a Create an Event request after specific types of actions. Choose a unique type name for each kind of action and make sure to include the content that is required for follow-up actions.
2. Create (a) Subscription(s) for the Dispatcher (or other) Service(s) to receive these types of Events.
3. Configure (third party) services to intercept Events
4. Configure the Dispatcher (or other) Service(s) to take the required action(s), for example to send an email or create a Task.

Configure the Dispatcher (or other) Service(s) to take the required action(s), for example to send an email or create a Task.

## Default Events/Subscriptions/Actions

* user\_deleted

## Actions

This section gives an overview of the available Event Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing Subscriptions <a href="#docs-internal-guid-33b87069-7fff-4991-ad79-bfae582ebfd7" id="docs-internal-guid-33b87069-7fff-4991-ad79-bfae582ebfd7"></a>

Administrators of the customer’s application can set up Subscriptions for its services.

{% swagger method="post" path="/subscriptions" baseUrl=" " summary="Create an event Subscription" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/subscriptions" baseUrl=" " summary="List all event Subscriptions" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### Managing Events

Once set-up correctly, the creation of Events and the resulting actions are handled automatically by the customer’s application and the different services. The permissions required to create or view Events must therefore be granted to the system User(s) that manage(s) events.

{% swagger method="post" path="/" baseUrl=" " summary="Create an Event" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/" baseUrl=" " summary="List all Events" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}
