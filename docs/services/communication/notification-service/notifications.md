# Notifications

## Create a notification

Notifications are created for individual users, a notification will be sent as a push notification to each of the user's registered devices.

{% hint style="info" %}
If the user doesn't have configured any devices, the notification will still be created but not marked as sent.
{% endhint %}

The Extra Horizon SDK can be used to create a notification as follows:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const notification = await exh.notificationsV2.create({
  targetUserId: userId,
  title: 'Hello from Extra Horizon',
  descriptions: 'Welcome to our platform'
});

console.log('Notification was created with id:', notification.id);
console.log('Notification was sent to a device:', notification.sent);
```
{% endtab %}
{% endtabs %}

## List notifications

There are multiple methods available in the SDK at `exh.notificationsV2` to fetch notifications.

For example, getting a specific notification by its id:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const notification = await exh.notificationsV2.findById(notificationId);
console.log('Notification was sent to:', notification.targetUserId);
```
{% endtab %}
{% endtabs %}

Or, list notifications for a specific user:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const response = await exh.notificationsV2.findByTargetUserId(userId);
console.log('Notifications:', response.data);
```
{% endtab %}
{% endtabs %}
