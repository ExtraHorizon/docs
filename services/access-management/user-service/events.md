# Events

Every Extra Horizon service will emit events towards the Event service. You can subscribe to events in other services and dispatch specific actions.

| Event Name                 | Description                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `UserCreated`              | When a new user is created the **UserCreated** event is triggered.                    |
| `UserDeleted`              | When a user is removed the **UserDeleted** event is triggered.                        |
| `PatientEnlistmentAdded`   | When a patient enlistment is added the **PatientEnlistmentAdded** event is triggered. |
| `PatientEnlistmentRemoved` | When a patient enlistment is removed the **PatientEnlistmentRemoved** is triggered.   |

{% hint style="info" %}
Use the Dispatcher Service to trigger actions like **sending emails**, **sending notifications,** or **executing tasks** based on events.
{% endhint %}
