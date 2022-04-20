# Groups



Groups allow you to create access control policies for a group of users, or for users with a specific role within that group.

The user service is built for medical applications, where patients and medical staff collaborate and share information. A user can join a group from a patient and/or from a staff member's perspective.

A **Patient Enlistment** is a type of enlistment that is dedicated to patients without the ability to add more specific permissions.

A **Staff Enlistment** allows you to create roles within a group where you can attach any kind of permissions to create the role base access system you need for your application.

## Create a group

A group is nothing more than the collection of its members. Creating a group is as simple as creating your first group role or attaching your first patient or staff member to a **shared identifier**: the `groupId`**.**

* Create a group role
* Enlist a staff member
* Enlist a patient

## Create a Group Role

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

### **Default permissions**

| See a limited set of fields of all patients and staff members (of the groups where you are enlisted as staff member) |
| -------------------------------------------------------------------------------------------------------------------- |
| View all the patients in a group                                                                                     |
| View the other staff members of the group                                                                            |
| See a subset of the fields for any staff member or patient of the group                                              |
| View the roles of the groups where you have a staff enlistment                                                       |

### **Enlist a Staff member**

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.groupRoles.addUsersToStaff({
    groups: ['841e55106a2a40c39ed6359b2c137a19'],
});
```
{% endtab %}
{% endtabs %}

Once a staff member you can start attaching group roles to give the user additional permissions.

## Patient Enlistment

You can enlist a user as a patient of a group. This will provide that user with some basic permissions in the User Service and other ExtraHorizon services.

{% hint style="warning" %}
You can not attach additional permissions to patients
{% endhint %}

### **Default permissions**

| Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- |
| See a limited set of fields of the staff members (of the groups where you are enlisted as a patient) |
| See a subset of the fields for any staff member or patient of the group                              |

### **Enlist a patient**

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
