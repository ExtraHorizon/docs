---
service: notifications-service
version: 1.1.2
date: 2024-04-16
---

**⚒️ Improvements**

* Firebase internal server errors are retried
  * When Firebase Cloud Messaging returns an internal server error  while sending a push notification, we now retry to up to 2 times
