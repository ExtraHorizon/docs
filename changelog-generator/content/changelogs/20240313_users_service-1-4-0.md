---
service: users-service
version: 1.4.0
date: 2024-03-13
---

**🎁 Features**

- Pin code mode for the account activation and forgot password flows
  - The pin code mode is an alternative mode for the account activation and forgot password flows.
  - The mode is targeted to use cases where the end user might need to manually input the secret in your application.

- List and remove the account activation and forgot password requests
  - New endpoints to list and remove the account activation and forgot password requests.
  - Helps to provide insight and control over these flows.

- (Rate)limit account activation and password reset requests
  - The amount, rate and lifetime of account activation and password reset requests that are requested for an account are now controlled.

- View and update verification settings
  - Control the behavior of the account activation and password reset flows.


**⚒️ Improvements**

- Fallback to the maximum RQL limit if larger is requested
  - Supplying an RQL limit higher than the maximum now set it to the maximum rather than the default limit


**🐞 Bugs Fixed**

- Empty strings are now included in the response correctly rather than hidden
- Corrected the OpenAPI documentation of the `PUT /password` response

 

**🚨 Deprecation Warnings**

- The newly introduced verification settings `limit_hash_activation_requests` and `limit_hash_forgot_password_requests` are marked as deprecated immediately.
  - They’re only provided to help existing applications transition to make use of the new (rate)limiting feature.