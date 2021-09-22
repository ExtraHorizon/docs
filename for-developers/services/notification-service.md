---
description: >-
  The Extra Horizon Notification Service handles push notifications. This guide
  provides a conceptual overview of the Notification Service and is
  complementary to the API reference documentation.
---

# Notification Service

## Intro

The Notification Service is used to create and push notifications. The Notification Service functionalities are used by:

* The User Service, to notify users their password has changed, or their account is activated, 
* The Payment service, to message users a payment is completed,
* The Tasks service, to message users a task is completed.

The following example illustrates how a notification could look: 

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>title: &apos;Activated account&apos;</p>
        <p>body: &apos;You have successfully activated your account.&apos;</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

### Information Model

When notifications are configured via the Notification Service, a Notification object is created, containing the title and body of the notification in the Type object. The settings for each user’s notifications are defined in the Settings object. 

![](https://lh6.googleusercontent.com/26U5gUhRN6fF1AALzKO6WlUnqknEGN9pa7vxZlyy5FC36KXtZHEBt44AeSOOlTjx3qtG68LYknhkUxdsB1xNWCC1ijuZDbdQj93T7j3cOMHTGtoHacqtUqn6U6KYJUjWEz4KJKE=s0)

### Objects and Attributes

#### Notification object

The Notification object contains a Type object, which defines how the Notification is built, and a Fields object, which contains the…. Furthermore, the object contains the following attributes: 

* Id of the user who is to receive the notification \(user\_id\),
* The importance of the notification \(important\),
* A value indicating whether the notification is viewed yet by the user \(viewed\),
* The time of creation and the time of the latest update of the Notification object \(timestamps\).

| Note: The viewed attribute in the Notification object is set to true after calling the ‘mark as viewed’ endpoint. |
| :--- |


#### Type object

The type of notification is defined in the Type object, containing a template for a Notification. The Notification Service provides default Notification templates for the following actions:

* Changing a password \(Password\_changed\),
* Activating an account \(Activated\),
* A general template \(Message\),
* A general link \(Link\).

The Type defines:

* A name, used to identify the notification,
* The type of required\_fields \(string, number, Boolean, object\_id or URL\), 
* The type of optional\_fields \(string, number, Boolean, object\_id or URL\) and a default value when no field is specified,
* The title of the notification, which is shown to the end user,
* The body of the notification, which is shown to the end user,
* The combined\_body,
* A boolean value defining whether the Notification is pushed by default \(Push\_by\_default\).

#### Settings object

The Settings object is unique for each user and therefore identified by the id of the Use r and the key. Furthermore, the object contains the following attributes:

* The key type,
* The preferences the user has regarding the Notification,
* The time of creation and the time of the latest update of the Settings object \(timestamps\).

### Actions

This section gives an overview of the available Notification File Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

#### Setting up Notifications

With the correct permission, users can create Notifications for any user by specifying his or her user\_id in the request. With the correct permissions, users can delete multiple notifications at once.

* Create a Notification: POST /
* Delete a Notification: DELETE /notifications 

#### Listing Notifications

Any user can list his own notifications, but only with the correct permission users can also see the notifications of other Users. Similarly, any user can list his or her own notification settings, but only with the correct permission a user can view the settings of other users. Each user can see all notification types.

* List your own notifications: GET
* List all notifications: GET /notifications
* List all notification types: GET /types
* List all notification settings: GET /settings 

#### Marking Notifications

Any user can mark his or her own notifications as viewed, which sets the viewed attribute in the Notification object on TRUE.

* Mark as viewed: POST /viewed

#### Notification Settings

Any user can update his or her own notification settings. However, to update or delete the notification settings of another user, specific permissions are required.

* Update the settings for a user: PUT /settings/{userId}
* Delete the settings for a user: DELETE /settings/{userId}

| For internal developers: To check the health of the Service, use the GET/health endpoint. |
| :--- |


### FibriCheck specifics

The Notification Service functionalities are additionally used by the Algo Planner Service, to notify users a measurement is reviewed or commented on. 

The type of FibriCheck specific notification is defined in the Type object:

* A comment on a measurement \(Measurement\_comment\),
* A review of a measurement \(Measurement\_reviewed\),
* The expiration of a prescription \(Prescription\_expiry\).

