---
description: >-
  The Extra Horizon Notification Service stores short messages and sends them as
  push notifications to the user’s mobile device. This guide is complementary to
  the API reference documentation.
---

# Notification Service

### About the Notification Service <a href="docs-internal-guid-90f8b35c-7fff-b445-6663-78fe67211d9e" id="docs-internal-guid-90f8b35c-7fff-b445-6663-78fe67211d9e"></a>

{% hint style="info" %}
The current version of the Notification Service (V1) is primarily used by FibriCheck. It is not offered to new customers. A customer-oriented version is in development.

For internal developers: V2 is already available but only offers push notification functionality. It does not function as a notification center.
{% endhint %}

The Notification Service is used to compose and store short, generic messages for the end user of an application and, optionally, to send these messages as push notifications to the user’s mobile device. The customer’s application can retrieve a user’s messages to display them in its UI and can subsequently mark them as viewed.&#x20;

Certain common actions within the User and Data Services are by default set up to trigger the creation of basic notifications. In addition, the customer’s application can request the creation of more specialized messages.

#### Example

![](../../.gitbook/assets/Screenshot\_20211018\_144825.png)

## Information Model

A **Notification** object contains all data required to compose one message for one specific User. This includes a reference to one of the **Type** objects, which provide templates for the `title` and `body` text fields of a specific type of notification.&#x20;

The Notification Service also stores a **Settings** object for each User. This object holds the user’s preferences regarding the types of messages for which they wish to receive push notifications.

![](../../.gitbook/assets/Screenshot\_20211018\_145014.png)

## Objects and Attributes <a href="docs-internal-guid-a7d62954-7fff-94f5-bdcf-ee4c8be0c682" id="docs-internal-guid-a7d62954-7fff-94f5-bdcf-ee4c8be0c682"></a>

### Notifications

The Notification object is uniquely identified by its `id`. The object contains the identifier of the intended receiver (`user_id`), the elements to generate the message (`type` and `fields`), and a boolean that indicates whether the message has been viewed by the user. The latter can be set to `true` via the [Mark your notification(s) as viewed](notification-service-1.md#undefined) request.

To generate the `title` and `body` texts of the (push) notification, the key-value pairs provided in the fields attribute are used to replace the variables in the template of the specified notification type.&#x20;

{% hint style="info" %}
The Notification object also contains a deprecated attribute: `important`. It was originally developed for FibriCheck but will not be included in V2 of the service.
{% endhint %}

### Types

The Notification Service offers a couple of [default notification Types](notification-service-1.md#default-types) that can be used by the customer’s application. These Type objects are uniquely identified by their name (“message” and “link”) and define templates for the title and body text fields of a notification. The templates can include variables for which the value must be provided in the [Create a Notification](notification-service-1.md#create-a-notification) request. The `required_fields` and `optional_fields` attributes specify which parameters are to be included in the request.

{% hint style="info" %}
In the current version of the Notification Service, Type objects cannot be created by the customer, nor can the default Type objects be customized.
{% endhint %}

### Push notification-specific attributes

When set up correctly (see [Sending Push Notifications](notification-service-1.md#sending-push-notifications)), push notifications can be send to a user’s mobile device when a new Notification object is created. However, a user can choose which types of push notifications they will receive by adjusting their preferences in the Settings object. The default preferences are derived from the `push_by_default` attribute in each of the Type objects.

Before sending the push notification, the service will check if there are other Notifications of the same type (and for the same User) for which the `viewed` attribute is set to `false`. If so, the push notification that is sent out will contain the `combined_body` text instead of the text specified in the body attribute.&#x20;

#### Example

```
body: "A new rapport is available: {{ rapport_name }}
```

```
combined_body: "Multiple new rapports are available."
```

For internal developers: the FibriCheck Prescription Service includes a counter in this attribute.

```
combined_body: "{{ keyX, $counter }}"
```

With \`keyX referring to a LocalizationSet with the English text snippet:

```
"{{ count }} new comments on measurements are available"
```

### Settings objects

Each Settings object is uniquely identified by the `id` of the User it represents. The object contains a preferences attribute which defines whether the sending of a specific type of push notifications is enabled for the user. The Settings object is created when a new User is registered. At that moment, the key-value pairs in the `preferences` attribute are set to the `push_by_default` value of all available notification Types. Afterwards, a [Create/update the Settings](notification-service-1.md#create-update-the-settings-for-a-used) for a User request can be made to update these preferences.&#x20;

The Notification Service can only send push notifications to a user’s mobile device when the Settings object includes an active key. This attribute holds a secret value set by the customer’s (mobile) application that enables the identification of the associated device.&#x20;

#### Example

```
{
    "id": "58074804b2148f3b28ad759a",
    "key": "string",
    "preferences": {
        "message": true,
        "link": true,
        "activated": true,
        "password_change": false
    },
    "creation_timestamp": 1550577829354,
    "update_timestamp": 1550577829354
}
```

### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation (`creation_Timestamp`) and of the most recent update (`update_Timestamp`) of their stored objects. This does not apply for the default Type objects since they are fixed components.

{% hint style="info" %}
The timestamp attributes in the Notification Service have a number format, whereas other Services use a `string($date-time)` format.
{% endhint %}

## Sending Push Notifications

Push notifications are short messages that are displayed outside the user interface of a (mobile) application. To receive push notifications on a mobile device, a link with the Notification Service is required. This link is set up as follows:&#x20;

1. The user installs the customer’s application on its mobile device and gives permission to receive push notifications.
2. The mobile app registers the user’s device on Firebase and receives a secret code, called a "push key”.&#x20;
3. The mobile app stores the push key in the key attribute of the User’s Settings object in the Notification Service.&#x20;
4. When new Notifications are created, the service sends the required data to Firebase, which uses the key to identify the user’s mobile device and to trigger a push notification.

{% hint style="warning" %}
Important: The customer must implement [Firebase](https://firebase.google.com) in its mobile application.
{% endhint %}

{% hint style="info" %}
Tip: To disable the sending of push notifications of a specific type to a user, set the value of the corresponding field in the preferences attribute of the [Settings object](notification-service-1.md#settings-objects) to false.
{% endhint %}

## Default Types

### Free text-Types: messages and link

There are two non-specific Type objects available that enable the customer’s application to create notifications with a custom `title` and `body` text. Both strings are required parameters in the request. The message Type additionally requires the identifier of the (system) User creating the Notification (`sender_id`), whereas the link Type expects a URL. By default, clicking a push notification of the link Type opens this URL.

{% hint style="info" %}
Tip: Push notification can contain action buttons, for example to accept a friend request without opening the app. These customized actions must be set up for the customer’s mobile application in Firebase. Subsequently, the action name can be assigned to the `click_action` parameter in the request to the Notification Service.
{% endhint %}

{% hint style="info" %}
Note: Currently, the title of Notifications of the message and link Types is fixed to “FibriCheck”.
{% endhint %}

![](<../../.gitbook/assets/Screenshot\_20211018\_154407 (1).png>)

{% hint style="info" %}
Note: The JSON syntax in the Type objects is different from other services. The double brackets do not refer to a localization key (as used in the [Template Service](template-service.md)) but to the values provided in the [Create a Notification](notification-service-1.md#create-a-notification) request. To include text snippets stored in the [Localization Service](localization-service.md), the client application must first retrieve the snippets in the required language and subsequently include them as plain text in the request `title` or `body` parameter.
{% endhint %}

{% hint style="info" %}
Note for internal developers: Originally, the purpose of the message Type was to enable a functionality in which a User (`sender_id`), e.g. a physician, could send a user-written message to another User. However, this functionality was never applied, and the message Type is currently used to automatically create messages with the [Data Service ](data-service.md)(e.g. measurement rapports). The `sender_id` attribute has been recycled to store the system User that is responsible for creating the Notifications.
{% endhint %}

### Application Specific Types

#### Application-specific Types <a href="docs-internal-guid-778ff6b1-7fff-cce7-0358-450af1f76fd3" id="docs-internal-guid-778ff6b1-7fff-cce7-0358-450af1f76fd3"></a>

For the above non-specific Types, the `title` and `body` text fields must be completely provided during the [Create a Notification ](notification-service-1.md#create-a-notification)request. For more specific Types, these text fields are usually predefined and only some variables are required.&#x20;

Two notification Types are used to create Notifications in response to successful actions at the [User Service](user-service.md): `email address activation` (activated) and `password_change`. By default, only the first type of notification will result in a push notification. &#x20;

{% hint style="info" %}
For internal developers: The User Service-specific Types will not be included in V2.
{% endhint %}

{% hint style="info" %}
For internal developers:  The V1 Notification Service also provides notification Types for FibriCheck’s Prescription Service that will not be included in V2.

* A comment on a measurement is available (Measurement\_comment),
* A review of a measurement is available (Measurement\_reviewed),
* A prescription is expiring soon (Prescription\_expiry).

Push notifications for the prescription\_expiry and measurement\_comment Types are by default enabled, whereas they are disabled for the measurement\_reviewed notification Type.

The FibriCheck-specific Types make use of localization keys to provide notifications in multiple languages. However, these keys are hard-coded in the respective notification Type templates; they are not provided via the request.
{% endhint %}

## Actions

This section gives an overview of the available Notification Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Viewing Types <a href="docs-internal-guid-ede68648-7fff-1dfa-7dea-6a392bc37c05" id="docs-internal-guid-ede68648-7fff-1dfa-7dea-6a392bc37c05"></a>

All available notification Types can be viewed by any User.

{% swagger method="get" path="/types" baseUrl=" " summary="List all Types" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### Managing Notifications

In general, Notifications are managed by (a) system User(s) with the required permissions. Once created, Notifications cannot be updated. However, they can be deleted. The latter action will not affect any sent-out push notifications since there is no direct link with the Notification object.

{% swagger method="post" path="/" baseUrl=" " summary="Create a Notification" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/notifications" baseUrl=" " summary="Delete a notification" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/notifications" baseUrl=" " summary="List all Notifications" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="info" %}
Info: Users can retrieve their Notifications via two endpoints. The more recent [List all Notifications](notification-service-1.md#list-all-notifications) endpoint also enables administrators to access another User’s Notifications. However, it makes the original List your own Notifications endpoint redundant. The latter will be excluded in V2.
{% endhint %}

{% hint style="info" %}
Note: The V1 Notification Service does not support localization keys in the request parameters. The customer’s application must fetch the snippet(s) in a specific language and use these resolved strings in the [Create a Notification](notification-service-1.md#create-a-notification) request. The same applies when using data from other services (e.g. `first_name`).
{% endhint %}

{% hint style="info" %}
For internal developers: The variables in the title and body template of the specified notification Type are processed after resolving localization keys. Therefore, these keys can be used in the attributes of the Type object but not in the [Create a Notification](notification-service-1.md#create-a-notification) request parameters.
{% endhint %}

### Keeping track of viewed Notifications <a href="docs-internal-guid-a4e91704-7fff-c0fa-432a-1a488f4e3f40" id="docs-internal-guid-a4e91704-7fff-c0fa-432a-1a488f4e3f40"></a>

When the user interacts with a notification in the UI (e.g. by clicking it), the customer’s application can set the viewed attribute in the associated Notification object to true. This information enables the application to stylize previously viewed notifications differently in the UI or to omit them from the displayed list.&#x20;

{% swagger method="post" path="/viewed" baseUrl=" " summary="Mark your Notification(s) as viewed" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

### User Settings  <a href="docs-internal-guid-75d9a081-7fff-1efb-95c3-dc400f2518d4" id="docs-internal-guid-75d9a081-7fff-1efb-95c3-dc400f2518d4"></a>

When a new User object is created in the User Service, a Settings object with the same identifier is created automatically. Each User can subsequently update their own preferences but only an administrator can reset them via a DELETE request.

{% swagger method="put" path="/settings/{userId}" baseUrl=" " summary="Create/Update the Settings for a used" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/settings/{userId}" baseUrl=" " summary="Delete the Settings for a user" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/settings" baseUrl=" " summary="List all Settings" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="info" %}
Info: Requesting the removal of a User’s Settings will, in practice, reset the preferences to the default values. In addition, the key value will be null.
{% endhint %}

{% hint style="info" %}
For internal developers: The Settings object is temporarily removed.
{% endhint %}
