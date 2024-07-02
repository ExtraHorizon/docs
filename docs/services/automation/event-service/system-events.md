# System Events

As described on the previous pages, the [Event Service](./) allows you to view and fire events and the [Dispatcher Service](../dispatchers-service.md) allows you to subscribe to events and execute actions based on them. This page describes the events that are fired by the Extra Horizon platform itself.

## User events

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
