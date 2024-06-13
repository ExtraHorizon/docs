---
service: events-service
version: 1.2.0
date: 2024-06-13
---

**🎁 Features**

* Event subscriptions can be marked as retriable
  * When services subscribe to events, they now can indicate the subscription is retriable.
  * When sending an event to a retriable subscription fails, it will be retried up to 3 times.
