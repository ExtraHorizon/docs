---
service: users-service
version: 1.5.0
date: 2024-06-13
---

**🎁 Features**

* An event is triggered when a password reset is completed
  * The `password_reset_completed` event is triggered when a user completes a password reset.

* Clean up on user deletion
  * When a user is deleted the password reset and account activation requests belonging to that user are removed as well.
