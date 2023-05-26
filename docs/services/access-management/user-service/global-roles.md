# Global roles

## Create a role

Creating a system-wide role requires the `CREATE_ROLE` permission on a system level. The following example shows how you can do this using the Extra Horizon SDK:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const myNewRole = await exh.users.globalRoles.create({
  name: 'myRole',
  description: 'myNewRoleDescription',
});
```
{% endtab %}
{% endtabs %}

## Attach permissions to a role

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const rql = rqlBuilder().eq('id', myNewRole.id).build();
await exh.users.globalRoles.addPermissions(rql, {
  permissions: [GlobalPermissionName.ADD_PATIENT],
});
```
{% endtab %}
{% endtabs %}

## Attach a role to a user

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const rql = rqlBuilder().eq('email', 'john.doe@example.com').build();
await exh.users.globalRoles.addToUsers(rql, {
  roles: [myNewRole.id],
});
```
{% endtab %}
{% endtabs %}

## Remove a role from a user

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const rql = rqlBuilder().eq('email', 'john.doe@example.com').build();
await exh.users.globalRoles.removeFromUser(rql, {
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
