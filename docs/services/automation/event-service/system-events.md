# System Events

As described on the previous pages, the [Event Service](./) allows you to view and fire events and the [Dispatcher Service](../dispatchers-service.md) allows you to subscribe to events and execute actions based on them. This page describes the events that are fired by the Extra Horizon platform itself.

## User Service events

### User created

This event is fired when a new [user is created](../../access-management/user-service/users.md#create-a-new-user).

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "user_created",
  "content": {
    "id": "630f297acff47e0008346bbe"
  },
  "creation_timestamp": 1643889512167
}
```

### User deleted

This event is fired when a [user is deleted](../../access-management/user-service/users.md#removing-a-user).

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "user_deleted",
  "content": {
    "id": "630f297acff47e0008346bbe"
  },
  "creation_timestamp": 1643889512167
}
```

### Patient enlistment added

This event is fired when a user is enlisted in a group as a patient.

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "patient_enlistment_added",
  "content": {
    "user_id": "630f297acff47e0008346bbe",
    "group_id": "87b55a649be4cd3e2cf99f15"
  },
  "creation_timestamp": 1643889512167
}
```

### Patient enlistment removed

This event is fired when a user is removed from a group as a patient.

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "patient_enlistment_removed",
  "content": {
    "user_id": "630f297acff47e0008346bbe",
    "group_id": "87b55a649be4cd3e2cf99f15"
  },
  "creation_timestamp": 1643889512167
}
```

### Password reset completed

This event is fired when a user has successfully [reset their password](../../access-management/user-service/users.md#resetting-a-password).

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "password_reset_completed",
  "content": {
    "user_id": "630f297acff47e0008346bbe"
  },
  "creation_timestamp": 1643889512167
}
```

### Password update completed

This event is fired when a user has successfully updated their password.

{% hint style="info" %}
This event is **not** fired when a user completes a password reset.
{% endhint %}

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "password_update_completed",
  "content": {
    "user_id": "630f297acff47e0008346bbe"
  },
  "creation_timestamp": 1643889512167
}
```

### User activation completed

This event is fired when a user has successfully activates their account.

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "user_activation_completed",
  "content": {
    "user_id": "630f297acff47e0008346bbe"
  },
  "creation_timestamp": 1643889512167
}
```

## Task Service events

### Task failed

This event is fired when a task moves to the `failed` status. This excludes tasks for which a retry policy is defined and are retried, as they are moved to the `retried` status instead. However, this event is still fired for the failure of the **last attempt** of a task with a retry policy.

```json
{
  "id": "61fbc368cff47e000833ac83",
  "type": "task_failed",
  "content": {
    "id": "6a047c5c6b52ff0e2ca10157",
    "functionName": "my-function",
    "error": {
      "type": "invocation",
      "name": "MyError",
      "message": "My error message!"
    }
  },
  "creation_timestamp": 1643889512167
}
```
