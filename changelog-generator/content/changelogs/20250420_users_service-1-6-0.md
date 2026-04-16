---
service: users-service
version: 1.6.0
date: 2026-04-20
---

	

**🎁 Features**
  * Added support for specifying email templates by name
  Email templates can now be configured using either their id or name. 
  id and name fields are mutually exclusive, setting activation_email_template_name will remove activation_email_template_id and vice versa

  * Added additional event emissions
      * password_update_completed 
        * Emitted when a user updates their password
      * user_activation_completed 
        * Emitted when a user is successfully activated

**⚒️ Improvements**
  * Resets the failed login attempt counter
    * When a user completes the forgot password flow
    * When a user updates their password