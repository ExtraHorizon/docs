---
service: notifications-service
version: 2.0.0
date: 2025-07-16
---

**🎁 Features**

- **User Settings**

  - **Register devices for push notifications**
    - Users can register one or more devices by providing an FCM token to receive push notifications at.

  - **View notification settings for a specific user**
    - Always returns a settings object. If none exists, an empty one is automatically created.

  - **List all notification settings**
    - Admins can retrieve a list of all user notification settings.

  - **Remove devices or user settings**
    - A specific device or the user settings as a whole can be removed.

- **Notifications**

  - **Create notifications**
    - Creating a notification automatically sends it to all registered devices of the targeted user.

  - **View notifications**
    - Users can view their own notification history. Admins can view all notifications.
