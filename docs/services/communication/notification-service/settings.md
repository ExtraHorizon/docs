# User Settings

General steps to get an FCM registration token:

* Integrate the FCM SDK into your app
  * [https://firebase.google.com/docs/cloud-messaging/android/client](https://firebase.google.com/docs/cloud-messaging/android/client)
  * [https://firebase.google.com/docs/cloud-messaging/ios/client](https://firebase.google.com/docs/cloud-messaging/ios/client)
* Fetch the current registration token using the FCM SDK when the user is logged in to you application
* And/or monitor for changes to the FCM registration token

When you have the FCM registration token, you can assign them to a device in the user's notification settings.

## Token Management

Each user can have one or more devices, each with its own FCM token. When a Notification is created it is sent to **all registered devices with an FCM token** for the targeted user.

### Add or update a device

The following code snippet will create a new device or updates the token if the device already exists:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const deviceName = "mobile"
const deviceData = {
  fcmToken: "zc8HuXBRjeSPaYnKkL7vyU6FDG2MAQVT9d5w3ft4NEZgprbmh1"
};

await exh.notificationsV2.userSettings.addOrUpdateDevice(userId, deviceName, deviceData);
```
{% endtab %}
{% endtabs %}

#### Device Properties

* **`name`** – Unique name and identifier for the device.
* **`description`** – Description of the device.
* **`fcmToken`** – FCM token for the device.

### Remove a device&#x20;

This stops notifications from being sent to the specified device:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.notificationsV2.userSettings.removeDevice(userId, deviceName);
```
{% endtab %}
{% endtabs %}

### Remove the user settings

Completely remove the user settings for a user and all associated devices and tokens from the system. This stops notifications from being sent to the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.notificationsV2.userSettings.remove(userId);
```
{% endtab %}
{% endtabs %}

## List user settings

There are multiple methods in the SDK at `exh.notificationsV2.userSettings` to fetch the notification settings of users.

For example, getting the notification settings for a specific user:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const userSettings = await exh.notificationsV2.userSettings.getById(userId);
```
{% endtab %}
{% endtabs %}

Or, listing the latest users who updated their settings:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const response = await exh.notificationsV2.userSettings.find({
  rql: rqlBuilder()
    .sort('-updateTimestamp')
    .limit(5)
    .build(),
});

console.log('Total number of user notification settings', response.page.total);
console.log('Last 5 updated user notification settings', resonse.data);
```
{% endtab %}
{% endtabs %}
