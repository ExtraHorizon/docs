---
description: >-
  The User Service handles user management and general role base access control
  functionality.
---

# Users

The user service handles user management and a general role based access control system. At a basic level every user in the system starts out as basic user without any permissions. Based on the type of application you want to build you can create roles on system and group level and assign permissions to them.

In addition to role base access controls this service also provides registration and password management functionality.

## **Users**

#### **Retrieve users**

```javascript
const rql = rqlBuilder().eq('email', 'john.doe@example.com').build();
await sdk.users.find({
  rql,
});
```

Using the extrahorizon SDK or REST API's you can easily retrieve users. The permissions assigned to you will determine what fields will be returned to you. You will receive either a **full User**, a **Patient** or a **Staff** view. 

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



When you receive a **Patient** the patientEnlistments property will only hold the enlistments for groups where you are a staffMember.
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

When you receive a **Staff** the staffEnlistments property will only hold the enlistments for groups where you are a staffMember
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
When using the Javascript SDK fields are transformed into a **camelCase**. **snake_case** will be phased out for the user service and all other ExtraHorizon Services in the future.
{% endhint %}

### **Create** a new user

You can make use of the ExtraHorizon SDK to create new users from your application. This will also trigger a [UserCreated](user-service.md#usercreated) event.

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
Notice **birthday**, **country** & **gender** is part of the registration fields but is not returned when Querying for the user. This is because of the underlying integration with the ExtraHorizon Profile Service. During account creation a user profile is created and these fields are stored there.
{% endhint %}

#### Check for email availability

As an application you have the ability to check if an email is available or already in use in a user account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.isEmailAvailable('jane.doe@example.com');
```
{% endtab %}
{% endtabs %}

### Email verification

After registration the activation attribute will default to `false`. While email verification is not blocking the use of any API services, it is blocking the possibility to initiate a password reset. If you are not providing password reset functionality inside your application you can skip this step. For other applications it is highly recommended as you want to prevent sending emails to the wrong person.

The user service can be configured to hold a reference to an html template in the template service. When a registration occurs the user service will try to send an email by using this template.

{% hint style="danger" %}
Currently the configuration of a templateId is not possible through the API. Contact ExtraHorizon support in order to set this variable.
{% endhint %}

The user service will provide the users **firstname, lastname** and **activation_hash** to the email service. The email service will add the **tracking_hash** before it reaches the template service. Thus you have the option to use these three fields in your email template. Please check the [Template Service ](template-service.md)for more details.

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

When you make an application where email verification is a prerequisite or when you want to provide password reset capabilities you want your user to be able to trigger the email verification mail again.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestEmailActivation('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

You can choose to set a different templateId for this email in the [User Service](user-service.md). Currently this functionality is not supported through the API. Contact ExtraHorizon support in order to set this variable.

#### Performing a user activation

With the steps above you can provide your user with an email containing an activation token. Typically this is embedded inside a url or deeplink towards your application. You can then use that token to activate the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.validateEmailActivation({
    hash: '6ca1691b4c5b4dbfa5def4c49b910657',
});
```
{% endtab %}
{% endtabs %}

### Changing email

When logged in you can change the email of your/a user account depending on your permissions. When doing this you will be required to reactive your account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.updateEmail('abcdef0123456789abcdef01', 'jane.doe@example.com');
```
{% endtab %}
{% endtabs %}

### Password reset

Users not remembering their password is common and you want to deal with it safely in your applications. The ExtraHorizon SDK provides you with the ability to do so.

#### Requesting a password reset email

Much like the email verification flow, the password reset flow provides you with a reset token that you can use to set a new password for your users account. The user service again contains a templateId for this email, contact ExtraHorizon support in order to set this variable.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestPasswordReset('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

#### Resetting a password

With the steps above you can provide your user with an email containing a reset token. Typically this is embedded inside a url or deeplink towards your application. You can then use that token to reset the password of the user.

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

Removing a user requires the global [DELETE_USER](user-service.md#permissions) permission. This will also trigger a [UserDeleted](user-service.md#userdeleted) event.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.remove('abcdef0123456789abcdef01');
```
{% endtab %}
{% endtabs %}

## Groups

Groups are entities that combine users together. Allowing us to create access control policies for the entire group or for users with a specific role within that group. 

The user service was build specifically for medical applications where patients and medical staff can collaborate and share information. With this in mind you can join a group from a patient and/or from a staff member perspective. While the [**Patient Enlistment**](user-service.md#patient-enlistment)** **is a type of enlistment that is a dedicated for patients without the ability to add more specific permissions the [**Staff Enlistment**](user-service.md#staff-enlistment) allows you to create roles within a group where you can attach any kind of permissions to create the role base access system you need for you application.

### Create a group

A group is no more than the collection of its members. Creating a group thus is as simple as creating your first group role or attaching your first patient or staf member to a **shared identifier**: the group Id**.**

* [Create a group role](user-service.md#create-a-group-role)
* [Enlist a staff member](user-service.md#enlist-a-staff-member)
* [Enlist a patient](user-service.md#enlist-a-patient)

### Create a Group Role

Group roles give the ability to provide specific users with specific permissions in the context of a group. You can assign permissions that give access to actions within the User Service or other Extra Horizon Services.

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

You can attach a group Role to Staff Members. Permissions that are not granted by you by default and you need to obtain via a group role. Below is a summary of the group permissions that you can attach to a group role that have an effect in the User Service.

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
There are more permissions that you can attach to a group role that have their effect in other services. An overview of those permissions can be found in the designated service documentation.
{% endhint %}

## Staff Enlistment

You can enlist a user as a staff member of a group. This will provide that user with some basic permissions in the User Service and other ExtraHorizon services.

#### Default permissions

| Description                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- |
| See a limited set of fields of all patients and staff members (of the groups where you are enlisted as staff member) |
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

You can enlist a user a patient of a group. This will provide that user with some basic permissions in the User Service and other ExtraHorizon services. You can not attach additional permissions to patients.

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

With a patient enlistment you can provide an **expiryTimestamp **(Your are not obligated to use this functionality). When you retrieve users the user service will display wether the expiry timestamp was exceeded or is still in the future.

{% hint style="info" %}
**USE CASE:** You can use this feature to implement a prescription like application functionality where you provide patients with access to specific functionality while the prescription lasts.
{% endhint %}

## System Roles

You can assign permissions to system roles that have an effect on a system wide level. 

### Create a role

Creating a system wide role requires you to have the create `CREATE_ROLE` permission on system level. An example of how you can do this with The Extra Horizon SDK below:

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
There are more permissions that you can attach to system roles that have effect in other services. An overview of those permissions can be found in the designated service documentation.
{% endhint %}

## Events

Every Extra Horizon service will emit events towards the Event Service. You can subscribe to events in other services and dispatch specific actions depending on the wanted functionality in your system.

<table><thead><tr><th>UserCreated</th><th data-type="number">test</th><th></th></tr></thead><tbody><tr><td></td><td>null</td><td></td></tr><tr><td></td><td>null</td><td></td></tr><tr><td></td><td>null</td><td></td></tr></tbody></table>

### UserCreated

### UserDeleted

### PatientEnlistmentAdded

### PatientEnlistmentRemoved





##

## Other/TODO

The Extra Horizon customer can implement \[NB9] an extra layer of security for certain actions, e.g. account deletion, by requiring the (logged in) user to confirm the action with their password.

o   Confirm action with password:             POST   /confirm_password

**Authentication**

Users are authenticated at the Auth Service with their email address and password. However, these credentials are stored by the User Service and must therefore be validated by the latter.

o   Authenticate a User: POST /authenticate

**Health Check**

