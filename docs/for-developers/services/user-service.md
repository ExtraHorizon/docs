---
description: The User Service handles user management and role base access control.
---

# User Service

The user service handles user management and offers role-based access control. By default, a new user has no permissions. Depending on the type of application you want to build you can create roles on a system and group-level and assign permissions to them.

In addition to role base access controls this service also provides registration and password management functionality.

## **Users**

#### **Retrieve users**

```javascript
const rql = rqlBuilder().eq('email', 'john.doe@example.com').build();
await sdk.users.find({
  rql,
});
```

Using the Extra Horizon SDK or REST API's you can easily retrieve users. The permissions assigned to you determine the returned fields. You will receive either a **Full User**, a **Patient,** or a **Staff** view.&#x20;

{% tabs %}
{% tab title="Full User" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "roles":[...],
    "staffEnlistments":[...],
    "patientEnlistments":[...]
    "lastFailedTimestamp": 1632733680,
    "failedCount": 0,
    "creationTimestamp": 1632733681,
    "updateTimestamp": 1632733682
}
```
{% endtab %}

{% tab title="Patient" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "patientEnlistments": [...] //only the groups where you are staff
  }
```



When you receive a **Patient** the patientEnlistments property will only hold the enlistments for groups where you are a Staff member.
{% endtab %}

{% tab title="Staff" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "staffEnlistments": [...] //only the groups where you are patient
  }
```

When you receive a **Staff** the `staffEnlistments` property will only hold the enlistments for groups where you are a Staff member.
{% endtab %}
{% endtabs %}

#### Property overview

| Attribute               | Description                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| `id`                    | The identifier of the user.                                                                        |
| `first_name`            | First name of the user.                                                                            |
| `last_name`             | Last name of the user.                                                                             |
| `email`                 | email address of the user.                                                                         |
| `phone_number`          | phone number of the user.                                                                          |
| `activation`            | Boolean indicating the email address has been activated true or false.                             |
| `roles`                 | Array containing a description of the roles this user has obtained.                                |
| `staff_enlistments`     | Array containing a description of the staff enlistments this user has within one or more groups.   |
| `patient_enlistments`   | Array containing a description of the patient enlistments this user has within one or more groups. |
| `last_failed_timestamp` | Epoch timestamp Information about when the last password login attempt failed.                     |
| `failed_count`          | The number of consecutive password login attempts.                                                 |
| `creation_timestamp`    | Epoch timestamp when the user was created.                                                         |
| `update_timestamp`      | Epoch timestamp when this user object was last updated.                                            |

{% hint style="info" %}
When using the Javascript SDK fields are transformed into a **camelCase**. **snake\_case** will be phased out for the user service and all other ExtraHorizon Services in the future.
{% endhint %}

### **Create** a new user

You can use the Extra Horizon SDK to create new users from your application. This also triggers a [UserCreated](user-service.md#usercreated) event.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const myNewSchema = await sdk.users.createAccount({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Secret1234',
    phoneNumber: '+32012345678',
    birthday: '1987-06-05',
    country: 'UK',
    gender: 1,
    language: 'EN',
    timeZone: 'Europe/London'
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
**Notice:** **birthday**, **country** & **gender** are part of the registration fields but are not returned when querying for the user. This is because of the underlying integration with the ExtraHorizon Profile Service. During account creation, a user profile is created and these fields are stored there.
{% endhint %}

#### Check for email availability

As an application, you have the ability to check if an email is available or already in use in a user account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.isEmailAvailable('jane.doe@example.com');
```
{% endtab %}
{% endtabs %}

### Email verification

After registration, the activation attribute defaults to `false`. While email verification does not block using any API services, it does block the possibility to initiate a password reset. If you do not provide password reset functionality in your application, you can skip this step. For other applications, it is highly recommended to implement email verification to prevent sending emails to the wrong person.

The user service can be configured to hold a reference to an HTML template in the template service. When registration occurs, the user service will try to send an email by using this template.

{% hint style="danger" %}
To use an email verification template other than the default one, contact [Extra Horizon](mailto:requests@extrahorizon.com)
{% endhint %}

The user service will provide the user's `firstname`, `lastname`, and `activation_hash` values to the email service. The email service adds a `tracking_hash` before it reaches the template service. Thus you can use these three fields in your email template. Please review the [Template Service ](template-service.md)documentation to learn how to design email templates.

```javascript
{
    ...,
    "schema": {
        "type": "object",
        "fields": {
            "firstname": {
                "type": "string"
            },
            "lastname": {
                "type": "string"
            },
            "activation_hash": {
                "type": "string"
            },
            "tracking_hash": {
                "type": "string"
            }
        },
    }
    ...
}
```

#### Resending email verification

When you make an application where email verification is a prerequisite, or when you want to provide password reset capabilities, you want your user to be able to trigger the email verification mail again.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestEmailActivation('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
To use an email activation template other than the default one, contact [Extra Horizon Support](mailto:requests@extrahorizon.com)
{% endhint %}

#### Performing a user activation

By performing the steps mentioned higher, you can send your user an email with an activation token. Typically this is embedded inside an URL or a deep link. You can then use that token to activate the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.validateEmailActivation({
    hash: '6ca1691b4c5b4dbfa5def4c49b910657',
});
```
{% endtab %}
{% endtabs %}

### Change an email

When a user is logged in, he can change the email of his or another user's account, depending on the set permissions. Changing an email requires re-activating the associated account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.updateEmail('abcdef0123456789abcdef01', 'jane.doe@example.com');
```
{% endtab %}
{% endtabs %}

### Password reset

Users not remembering their password is common. You want to deal with it safely in your applications. The Extra Horizon SDK provides you with the ability to do so.

#### Requesting a password reset email

Similar to the email verification flow, the password reset flow provides you with a reset token that you can use to set a new password for your user's account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestPasswordReset('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
To use a password reset template other than the default one, contact [Extra Horizon Support](mailto:requests@extrahorizon.com)
{% endhint %}

#### Resetting a password

By performing the steps mentioned higher, you can provide your user with an email containing a reset token. Typically this is embedded inside a URL or deep link towards your application. You can then use that token to reset the password of the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.validatePasswordReset({
    hash: 'be7ab8ebe9094588ac3693cd6ec9d5b7',
    newPassword: 'myNewSecret1234',
});
```
{% endtab %}
{% endtabs %}

### Password Change

When authenticated you can also implement password change functionality in your application. Changing the password requires you to resend the current password together with the new password.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.changePassword({
    oldPassword: 'password123',
    newPassword: 'newPassword123',
});
```
{% endtab %}
{% endtabs %}

### Removing a user

Removing a user requires the global [DELETE\_USER](user-service.md#permissions) permission. This will also trigger a [UserDeleted](user-service.md#userdeleted) event.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.remove('abcdef0123456789abcdef01');
```
{% endtab %}
{% endtabs %}

## Groups

Groups allow you to create access control policies for a group of users, or for users with a specific role within that group.

The user service is built for medical applications, where patients and medical staff collaborate and share information. A user can join a group from a patient and/or from a staff member's perspective.&#x20;

A [**Patient Enlistment**](user-service.md#patient-enlistment)** **is a type of enlistment that is dedicated to patients without the ability to add more specific permissions.

A [**Staff Enlistment**](user-service.md#staff-enlistment) allows you to create roles within a group where you can attach any kind of permissions to create the role base access system you need for your application.

### Create a group

A group is nothing more than the collection of its members. Creating a group is as simple as creating your first group role or attaching your first patient or staff member to a **shared identifier**: the `groupId`**.**

* [Create a group role](user-service.md#create-a-group-role)
* [Enlist a staff member](user-service.md#enlist-a-staff-member)
* [Enlist a patient](user-service.md#enlist-a-patient)

### Create a Group Role

Group roles give the ability to provide specific users with specific permissions in the context of a group. You can assign permissions that allow users to perform specific actions across the Extra Horizon Services.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
//step1: create a new role
const myNewGroupRole = await sdk.users.groupRoles.add(
    '841e55106a2a40c39ed6359b2c137a19',
    {
        name: 'myGroupRole',
        description: 'myNewGroupRoleDescription',
    }
);

//step2: attach permissions to the new group role
const rql = rqlBuilder().eq('id', myNewGroupRole.id).build();
await sdk.users.groupRoles.addPermissions(
    myNewGroupRole.groupId,
    {
        permissions: ['UPDATE_GROUP_ROLE'],
    },
    rql
);
```
{% endtab %}
{% endtabs %}

### Group Permissions

You can attach a group Role to Staff Members. Permissions that are not granted to a user by default and you need to obtain via a group role. The table below gives a summary of the group permissions that you can attach to a group role. These permissions allow certain actions in the User Service.

| Permission                     | Description                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `REMOVE_PATIENT`               | Remove a patient from the group where you have this permission               |
| `CREATE_GROUP_ROLE`            | Create a role for the group where you have this permission                   |
| `UPDATE_GROUP_ROLE`            | Update a role for the group where you have this permission                   |
| `DELETE_GROUP_ROLE`            | Delete a role for the group where you have this permission                   |
| `ADD_GROUP_ROLE_PERMISSION`    | Add permissions to any role of the group where you have this permission      |
| `REMOVE_GROUP_ROLE_PERMISSION` | Remove permissions from any role of the group where you have this permission |
| `ADD_GROUP_ROLE_TO_STAFF`      | Assign a group role to a staff member of the group                           |
| `REMOVE_GROUP_ROLE_FROM_STAFF` | Remove a group role from a staff member of the group                         |
| `ADD_STAFF`                    | Add staff to the group                                                       |
| `REMOVE_STAFF`                 | Remove staff from the group                                                  |

{% hint style="warning" %}
There are more permissions that you can attach to a group role that affect the allowed actions in other services. An overview of those permissions can be found in the designated service documentation.
{% endhint %}

## Staff Enlistment

You can enlist a user as a staff member of a group. This provides that user with some basic permissions in the User Service and other Extra Horizon services.

#### Default permissions

| See a limited set of fields of all patients and staff members (of the groups where you are enlisted as staff member) |
| -------------------------------------------------------------------------------------------------------------------- |
| View all the patients in a group                                                                                     |
| View the other staff members of the group                                                                            |
| See a subset of the fields for any staff member or patient of the group                                              |
| View the roles of the groups where you have a staff enlistment                                                       |

#### Enlist a Staff member

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.groupRoles.addUsersToStaff({
    groups: ['841e55106a2a40c39ed6359b2c137a19'],
});
```
{% endtab %}
{% endtabs %}

Once a staff member you can start [attaching group roles](user-service.md#create-a-group-role) to give the user additional permissions.

## Patient Enlistment

You can enlist a user as a patient of a group. This will provide that user with some basic permissions in the User Service and other ExtraHorizon services.&#x20;

{% hint style="warning" %}
You can not attach additional permissions to patients
{% endhint %}

#### Default permissions

| Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- |
| See a limited set of fields of the staff members (of the groups where you are enlisted as a patient) |
| See a subset of the fields for any staff member or patient of the group                              |

#### Enlist a patient

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.addPatientEnlistment('{userId}', {
    groupId: '841e55106a2a40c39ed6359b2c137a19',
    expiryTimestamp: 1234567890,
});
```
{% endtab %}
{% endtabs %}

With a patient enlistment, you can **optionally** provide an `expiryTimestamp`. When you retrieve users, the user service will display whether the expiry timestamp was exceeded or not.

{% hint style="info" %}
**Use Case:** You can use this feature to implement a prescription-like application functionality where you provide patients with access to specific functionality while the prescription lasts.
{% endhint %}

## System Roles

You can assign permissions to system roles that have a system-wide effect.

### Create a role

Creating a system-wide role requires the `CREATE_ROLE` permission on a system level. The following example shows how you can do this using the Extra Horizon SDK:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// Step1: create a new role
const myNewRole = await sdk.users.globalRoles.create({
  name: 'myRole',
  description: 'myNewRoleDescription',
});

//step2: Attach the permissions to the role
const rql = rqlBuilder().eq('id', myNewRole.id).build();
await sdk.users.globalRoles.addPermissions(rql, {
  permissions: [GlobalPermissionName.ADD_PATIENT],
});

//step3: Attach the new role to a user
const rql2 = rqlBuilder().eq('email', 'john.doe@example.com').build();
await sdk.users.globalRoles.addToUsers(rql2, {
  roles: [myNewRole.id],
});
```
{% endtab %}
{% endtabs %}

### Permissions

| name                           | Description                             |
| ------------------------------ | --------------------------------------- |
| `VIEW_USER`                    | View all users                          |
| `UPDATE_USER`                  | Update a user                           |
| `UPDATE_USER_EMAIL`            | Update users email                      |
| `DELETE_USER`                  | Delete users                            |
| `CREATE_ROLE`                  | Create a new role                       |
| `VIEW_ROLE`                    | View roles                              |
| `UPDATE_ROLE`                  | update a role                           |
| `DELETE_ROLE`                  | delete a role                           |
| `ADD_ROLE_PERMISSION`          | Add permissions to a role               |
| `REMOVE_ROLE_PERMISSION`       | Remove permissions from a role          |
| `ADD_ROLE_TO_USER`             | add a role to a user                    |
| `REMOVE_ROLE_FROM_USER`        | remove a role from a user               |
| `CREATE_GROUP_ROLE`            | add roles to a group                    |
| `UPDATE_GROUP_ROLE`            | update roles from a group               |
| `DELETE_GROUP_ROLE`            | delete roles from group                 |
| `ADD_GROUP_ROLE_PERMISSION`    | Add a permission to group roles         |
| `REMOVE_GROUP_ROLE_PERMISSION` | Remove a permission from group roles    |
| `VIEW_STAFF`                   | View the staff members of groups        |
| `ADD_STAFF`                    | Add staff to a group                    |
| `REMOVE_STAFF`                 | Remove staff from a group               |
| `ADD_GROUP_ROLE_TO_STAFF`      | Add a group role to a staff member      |
| `REMOVE_GROUP_ROLE_FROM_STAFF` | Remove a group role from a staff member |
| `VIEW_PATIENTS`                | View the patients of groups             |
| `ADD_PATIENT`                  | Add patients to a group                 |
| `REMOVE_PATIENT`               | Remove patients from a group            |

{% hint style="warning" %}
There are more permissions that you can attach to system roles that affect the allowed actions in other services. An overview of those permissions can be found in the designated service documentation.
{% endhint %}

## Events

Every Extra Horizon service will emit events towards the Event service. You can subscribe to events in other services and dispatch specific actions.

| Event Name                 | Description                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `UserCreated`              | When a [new user is created](user-service.md#create-a-new-user) the **UserCreated** event is triggered.                     |
| `UserDeleted`              | When a [user is removed](user-service.md#removing-a-user) the **UserDeleted** event is triggered.                           |
| `PatientEnlistmentAdded`   | When a [patient enlistment is added](user-service.md#patient-enlistment) the **PatientEnlistmentAdded** event is triggered. |
| `PatientEnlistmentRemoved` | When a patient enlistment is removed the **PatientEnlistmentRemoved** is triggered.                                         |

{% hint style="info" %}
Use the [Dispatcher Service](dispatcher-service.md) to trigger actions like **sending emails**, **sending notifications,** or **executing tasks** based on events.
{% endhint %}



## &#x20;References

* [User Service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/users-service/1.1.7/openapi.yaml)
