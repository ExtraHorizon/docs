---
service: users-service
version: 1.2.0
date: 2023-04-12
---

**🎁 Features**

* OpenID Connect is added as a authentication method.
  * The end points that return users now also provide `oidc_links` with the `provider_id` and the `subject_id` fields.
  * Other endpoints for users with a password are blocked for OpenID Connect users.
