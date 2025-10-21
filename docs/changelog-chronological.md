
## Localizations Service 1.1.10 (2025-10-21)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/localizations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/localizations-service/1.1.10/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL pagination pagination improved**
  - The maximum page size is increased to 100.

**🐞 Bugs Fixed**

- Sending localizations with the same key multiple times in a `POST` or `PUT` request results in a `DUPLICATE_LOCALIZATION_INPUT_KEYS` error instead of `SERVICE_EXCEPTION`
- The localization fields `text` and `key` are now marked as required. Omitting them resulted in a `SERVICE_EXCEPTION` before.
- A localization with a null value for a `key` is no longer accepted. Before, if created, it broke a few internals and was not able to be requested again.
- Multi-field sorting now works correctly. Instead of only applying the last field, results are sorted by each field in order.
- The page its `limit` field for the languages and countries endpoint now show the number of entries rather than 0

</details>


## Events Service 1.2.3 (2025-10-07)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.2.3/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL pagination**
  - Requesting a limit greater than the maximum now sets the maximum

- **Hour passed event triggering removed**
  - The hour passed event hasn’t been used for quite a while.
  - Now we’ve actually removed the triggering of the event as well.


**🐞 Bugs Fixed**

- **Multi-field sorting now works correctly**
  - Instead of only applying the last field, results are sorted by each field in order.
- Empty objects and arrays in the event `content` field are now correctly stored rather than replaced by `null`
- `event_types` is handled as required field, is shows up as missing in the missing required fields error and omitting it results in a missing required fields error instead of a field format error

</details>


## Notifications Service 2.0.0 (2025-07-17)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/2.0.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

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

</details>


## Users Service 1.5.1 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.5.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Improved support for future database security mechanisms**
- **No longer subscribing to the unused `hour_passed` event**

**🐞 Bugs Fixed**

- Adding/Removing staff roles now correctly check the matching group id
- Multiple endpoints now return the correct `MISSING_REQUIRED_FIELDS_EXCEPTION` when not providing any fields
  - `POST /add_to_staff`
  - `POST /remove_from_staff`
  - `POST /add_roles`
  - `POST /remove_roles`
  - `POST /groups/{groupId}/staff/add_roles`
  - `POST /groups/{groupId}/staff/remove_roles`
- Multiple endpoints now return the correct `EMPTY_BODY_EXCEPTION` when no body is provided
  - `POST /groups/{groupId}/staff/add_roles`
  - `POST /groups/{groupId}/staff/remove_roles`
  - `POST /add_roles`
  - `POST /remove_roles`
- Adding and removing roles now ignore not-existing roles
- `POST /add_to_staff` and `POST /remove_from_staff` now return the amount of affected records correctly
- Following endpoints now remove all the selected roles from the users or staff, not just the last one in the list.
  - `DELETE /roles`
  - `POST /remove_roles`
  - `POST /groups/{groupId}/staff/remove_roles`


</details>


## Groups Service 1.1.7 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service/groups) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/groups-service/1.1.7/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**
- **The visibility of custom fields for patients can now be toggled by us**


**🐞 Bugs Fixed**
- The bulk `approve` / `update` / `add_tags` / `remove_tags` group-request actions are fixed
- Tags will no longer be added multiple times to a group
- The `ne` RQL operator now works correctly as a “not equals”
- Querying on custom_fields keys ending with `_id` now works

</details>


## Localizations Service 1.1.9 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/localizations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/localizations-service/1.1.9/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service 
  - Sorting on `id` fields is now more consistent 
  - Requesting a limit greater than the maximum now sets the maximum 
- **Improved support for future database security mechanisms**

**🐞 Bugs Fixed**
- The `ne` RQL operator now works correctly as a “not equals”
- Querying on custom_fields keys ending with `_id` now works
- `POST` and `PUT` requests with an empty request body return the correct error

</details>


## Notifications Service 1.1.3 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/1.1.3/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Retries for additional Firebase error types**
  - We now automatically retry additional error types that Firebase may respond with when sending a notification to a user's device.
- **RQL improvement**
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- Querying on field names ending with `_id` in the `fields` object is fixed
- Now correctly erroring when no RQL is supplied while deleting notifications



</details>


## Prescriptions Service 1.1.21 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.21/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Improved support for future database security mechanisms**



</details>


## Profiles Service 1.2.2 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/profiles-service/1.2.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Improved support for future database security mechanisms**



</details>


## Events Service 1.2.2 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.2.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Improved support for future database security mechanisms**



</details>


## Template Service 1.0.16 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/template-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/templates-service/1.0.16/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**

**🐞 Bugs Fixed**
- The `ne` RQL operator now works correctly as a “not equals”
- Querying on field or `schema.field` keys ending with `_id` now works
- `POST` and `PUT` requests with an empty request body return the correct error

</details>


## Reports Service 1.0.14 (2025-05-20)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/reports-service/1.0.14/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**

**🐞 Bugs Fixed**
- The `ne` RQL operator now works correctly as a “not equals”
- Reports are still generated for deleted users when the prescription ends

</details>


## Events Service 1.2.1 (2025-04-07)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.2.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Improved support for future database security mechanisms**

</details>


## Prescriptions Service 1.1.20 (2025-03-27)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.20/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- The race conditions in prescription scanning and activating are solved
- The `free`/`not_free`/`paid_by_group`/`not_paid` update queries are fixed
- Querying on fields ending with `_id` in custom data is fixed

</details>


## Profiles Service 1.2.1 (2025-03-27)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/profiles-service/1.2.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **RQL improvements**
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- Querying on fields ending with `_id` in custom data is fixed

</details>


## Data Service 1.4.0 (2025-01-21)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.4.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

- **The Schema access control options are now more granular**
  - Schema `createMode`, `readMode`, `updateMode` and `deleteMode` have been improved to be more consistent and accept multiple granular options.
  - For further information please refer to the data access management documentation. 


- **Executing a Transition by name**
  - When executing a Transition, instead of having to find and provide the `id`, you can now choose to provide the `name` of a Transition. This improvement will make code clearer and easier to re-use across your different clusters.


- **New Transition permissions**  
  The following permissions have been added to allow the execution of Transitions:

  - Execute any Transition in any Schema:  
    `TRANSITION_DOCUMENTS`

  - Execute any Transition in a specific Schema:  
    `TRANSITION_DOCUMENTS:{SCHEMA_NAME}`

  - Execute a specific Transition for a specific Schema:  
  `TRANSITION_DOCUMENTS:{SCHEMA_NAME}:{TRANSITION_NAME}`


- **Group permissions**
  - Staff members can now be assigned permission to perform operations on a Document that is linked to their Groups. The permissions `VIEW_DOCUMENTS`, `UPDATE_DOCUMENTS`, `DELETE_DOCUMENTS` and `TRANSITION_DOCUMENTS` are now supported. (Including their sub-permissions e.g. `VIEW_DOCUMENTS:{SCHEMA_NAME}`)



- **Task Action quality of life improvements**
  - The Task Action now supports the `priority` field
  - The Task Action is now supported for Transition `afterActions`.


**🚨 Deprecation Warnings**

- **Legacy schema access control options**
  - Most of the existing createMode, readMode, updateMode and deleteMode values have been deprecated in favor of the revamped access control options.

</details>


## Data Service 1.3.1 (2024-07-12)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.3.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Bugs Fixed**

* Deleted users no longer cause issues when being linked or unlinked from a document
* General stability issues with background processes resolved

</details>


## Authentication Service 2.2.0 (2024-06-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/auth-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/auth-service/2.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Logout the user on password reset completion or user deletion
  * When a user completes a password reset or a user is deleted, the tokens belonging to the user are removed.
  * The tokens which are removed include all tokens related to oAuth1, oAuth2, MFA and SSO.


**⚒️ Improvements**

* Dependencies updated

</details>


## Events Service 1.2.0 (2024-06-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Event subscriptions can be marked as retriable
  * When services subscribe to events, they now can indicate the subscription is retriable.
  * When sending an event to a retriable subscription fails, it will be retried up to 3 times.

</details>


## Users Service 1.5.0 (2024-06-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.5.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* An event is triggered when a password reset is completed
  * The `password_reset_completed` event is triggered when a user completes a password reset.

* Clean up on user deletion
  * When a user is deleted the password reset and account activation requests belonging to that user are removed as well.

</details>


## Mail Service 1.2.1 (2024-06-04)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/mail-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/mail-service/1.2.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

* Emails can be blocked from actually being sent
  * Behind the scenes we can block emails being sent to certain domains/email addresses when needed. Only to be used on request if you want to protect your email sending reputation.

</details>


## Notifications Service 1.1.2 (2024-04-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/1.1.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

* Firebase internal server errors are retried
  * When Firebase Cloud Messaging returns an internal server error  while sending a push notification, we now retry to up to 2 times

</details>


## Users Service 1.4.0 (2024-03-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.4.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

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
</details>


## Notifications Service 1.1.1 (2024-02-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/1.1.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

* Unusable Firebase tokens are removed automatically
  * Tokens reported by Firebase as valid but not (or no longer) usable, are automatically removed.
  * Invalid formatted tokens are ignored as proper detection is currently not feasible.

</details>


## Notifications Service 1.1.0 (2024-02-01)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/1.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Added support for Firebase HTTP V1 notifications 
  * Starting from the 20th of June the old Legacy HTTP Protocol for notifications will stop working.
* The total count in the listing endpoints can now be disabled
  * Added a `skip_count()` RQL operator. Would instruct the listing endpoints not to execute/return the total count to increase performance.

**⚒️ Improvements**

* Improved Swagger documentation 
  * Swagger documentation was heavily extended

**🐞 Bugs Fixed**

* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
*  Updating the settings without a body now throws a correct `EMPTY_BODY_ERROR`
*  The Link Notification Type name now correctly shows `link` instead of `message`

</details>


## Profiles Service 1.2.0 (2024-01-02)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/profiles-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Added a `skip_count()` RQL operator. Would instruct the listing endpoints not to execute/return the total count to increase performance.


**🐞 Bugs Fixed**

* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s

* Removing fields
  * `patient_id` can now be removed from profile groups
  * An empty list of fields to remove is now correctly handled
  * Attempts to remove an id or timestamp field are now correctly handled

</details>


## Tasks Service 1.6.0 (2024-01-02)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.6.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Added a `skipCount()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**

* RQL
  * Known `SERVICE_EXCEPTION`s thrown for RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
  * Double encoding the `<` and `>` characters when searching for them now works.

</details>


## Events Service 1.1.0 (2023-11-17)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Added a `skip_count()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**
* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
  * Sorting on id now behaves as expected
  * Querying on `content.<name>_id` now works as expected

</details>


## Users Service 1.3.0 (2023-11-03)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.3.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Added a `skip_count()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**
* Staff enlistment roles can now be queried correctly with the RQL `contains` operator
* Deleted users referenced in an Activation or New Password Request now cause a `USER_UNKNOWN_EXCEPTION` to be thrown
* Empty strings are no longer accepted for permissions
* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s

</details>


## Data Service 1.3.0 (2023-10-27)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.3.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Added a skipCount() RQL function that instructs the listing function not to execute and return the total count.


**🐞 Bugs Fixed**
* Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
* The `<` and `>` characters may now be used in RQL when [double encoded](https://docs.extrahorizon.com/extrahorizon/additional-resources/resource-query-language-rql#double-encoding-of-special-characters).

</details>


## Dispatchers Service 1.1.0 (2023-09-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/dispatchers-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/dispatchers-service/1.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Added a `PUT` endpoint for updating Dispatchers
* Added name, description and tags fields to Dispatchers
  * Name is unique against all Dispatchers
* Added name and description fields to Actions
  * Name is unique against Actions within a Dispatcher

**⚒️ Improvements**
* Updated validation for Dispatchers and Actions

</details>


## Data Service 1.2.1 (2023-08-29)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.2.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Improved error thrown when multiple text indexes are created


**🐞 Bugs Fixed**
* Input conditions on date-time fields now working correctly
* Allowed removing broken indexes
* If creating an index fails, the index is not added to the schema anymore

</details>


## Files Service 1.1.0 (2023-08-09)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/file-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/files-service/1.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Added File Service settings
  * A new settings property `disableForceDownloadForMimeTypes` may be configured to override the File Service’s default behavior of enforcing file downloads and enable viewing of files directly in the browser for selected mime types.


**⚒️ Improvements**
* Improved the error message for creating a file without a request body


**🐞 Bugs Fixed**
* An empty string is now a valid value in an array of tags
* Fixed an RQL issue that would not consider the use of the limit operator

</details>


## Tasks Service 1.5.0 (2023-07-12)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.5.0/openapi.yaml)

<details>
<summary>Release Notes</summary>



**🎁 Features**
* Added API Requests
  * API Requests are a summary of the requests made to API Functions. They can be helpful to monitor and debug API Function calls.
* Add functionality to consult logs of API Requests
  * API Functions may now include logging statements during execution. These logs are saved as API Request Logs.
  
**⚒️ Improvements**
* Increased performance of API Functions and Direct Function Execution
* Improve the error message for tasks of which the output could not be determined
* Updated the function runtimes
  * The new runtimes are documented in the [public documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service/functions#runtime).
  
**🐞 Bugs Fixed**
* The last task log line sometimes did not show up
* Trying to add Node12 as a runtime resulted in an error
* Retrieving the task logs for a non-existing task resulted in a SERVER_EXCEPTION
* Retrieving the logs for a new function right after the first run could result in a SERVER_EXCEPTION
* Returning a number from an API function as body resulted in a SERVER_EXCEPTION


</details>


## API Gateway 1.6.1 (2023-06-23)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/api-gateway/1.6.1/openapi.yaml)

<details>
<summary>Release Notes</summary>



**🐞 Bugs Fixed**
* The gateway can start up without configuring a service to be redirected

</details>


## API Gateway 1.6.0 (2023-06-16)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/api-gateway/1.6.0/openapi.yaml)

<details>
<summary>Release Notes</summary>



**🎁 Features**
* Add the possibility to redirect requests from one service to another
  * It is now possible to redirect all traffic from one service to another service or another version of the service by setting environment variables.

</details>


## API Gateway 1.5.0 (2023-06-06)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/api-gateway/1.5.0/openapi.yaml)

<details>
<summary>Release Notes</summary>



**⚒️ Improvements**
* Added DNS Caching
  * DNS Caching was added in the gateway to speed up requests and improve the stability of the API Gateway.

</details>


## Tasks Service 1.4.0 (2023-05-31)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.4.0/openapi.yaml)

<details>
<summary>Release Notes</summary>



**🎁 Features**
* Functions can be used as an HTTP(s) endpoint
  * API Functions can be used to create your own endpoints.
* Send a task failed event
  * When a task fails, a `task_failed` event is triggered.

**⚒️ Improvements**
* Allow empty body in the execute endpoint.
  * The execute-endpoint can now be called with an empty body whereas previously, an empty objects had to be provided.

**🐞 Bugs Fixed**
* Task logs with a timestamp equal to the end marker are now shown
* RQL is now correctly marked as required in the OpenAPI documentation

</details>


## Tasks Service 1.3.2 (2023-04-19)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.3.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Updated how we authenticate with our external services

</details>


## Logs Service 1.0.1 (2023-04-19)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/logs-service/1.0.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Updated how we authenticate with our external services

</details>


## Files Service 1.0.3 (2023-04-19)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/file-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/files-service/1.0.3/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Updated how we authenticate with our external services

</details>


## Authentication Service 2.1.0 (2023-04-12)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/auth-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/auth-service/2.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* OpenID Connect is added as a authentication method
  * Users can now authenticate with OpenID Connect identity providers that support the `client_secret_basic` authentication method. 

**⚒️ Improvements**

* Validation from the application logo is removed
  * Users can now add anything they want as the application logo.
  * This used to be only hashes that were used by the image service.
</details>


## Users Service 1.2.0 (2023-04-12)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* OpenID Connect is added as a authentication method.
  * The end points that return users now also provide `oidc_links` with the `provider_id` and the `subject_id` fields.
  * Other endpoints for users with a password are blocked for OpenID Connect users.

</details>


## Prescriptions Service 1.1.19 (2023-01-19)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.19/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Events are now fired after the relevant state is updated
</details>


## Logs Service 1.0.0 (2022-11-18)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/logs-service/1.0.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* View the API access logs
  * View and query the API access logs from the comfort of your ExH cluster.
</details>


## Users Service 1.1.12 (2022-11-18)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.12/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Requests can now take up to 10 seconds
    * Queries for GET requests are no longer restricted by the 3 seconds timeout. The timeout is now configurable on our side and is set to 10 seconds by default.(previously also implemented in 1.1.11)

**🐞 Bugs Fixed**
* Trying to add a non existing role to a user no longer affects the user
* (Regression) The RQL select operation no longer affects updates
</details>


## Data Service 1.2.0 (2022-11-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* RQL support for update array item end point
    * It is now possible to filter array items by RQL when doing an update or deletion.

**⚒️ Improvements**
* Documentation improvements

**🐞 Bugs Fixed**
* Unique index is not created on array items to avoid long database lock up
</details>


## Users Service 1.1.11 (2022-11-15)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.11/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Requests can now take up to 10 seconds
</details>


## Mail Service 1.2.0 (2022-10-12)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/mail-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/mail-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**

- **Increased the stability of the service**  
  Service discovery is now based on DNS and more reliable.
- **Internationalized email address support**  
  Email addresses using non ascii characters, such as `二ノ宮@黒川.日本`, are now supported via updating our validation to be based on [RFC 6530](https://datatracker.ietf.org/doc/html/rfc6530).


**🐞 Bugs Fixed**

- Inconsistencies in querying on certain fields (`template_id`, `updateTimestamp`, …) with RQL have been resolved.

</details>


## Events Service 1.0.7 (2022-09-23)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/event-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/events-service/1.0.7/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Increased the stability of the service:
  * Service discovery is now based on DNS and more reliable.
</details>


## Template Service 1.0.15 (2022-09-23)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/template-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/templates-service/1.0.15/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Increased the stability of the service:
  * Service discovery is now based on DNS and more reliable.
</details>


## Prescriptions Service 1.1.18 (2022-09-22)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.18/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Increased the stability of the service:
  * Service discovery is now based on DNS and more reliable.
</details>


## Reports Service 1.0.13 (2022-09-22)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/reports-service/1.0.13/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Increased the stability of the service:
  * Service discovery is now based on DNS and more reliable.
</details>


## Users Service 1.1.10 (2022-09-22)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.10/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Increased the stability of the service:
  * Service discovery is now based on DNS and more reliable.

**🐞 Bugs Fixed**
* Expiry field set incorrectly in patient enlistments
</details>


## Notifications Service 1.0.9 (2022-09-21)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/notification-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/notifications-service/1.0.9/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Profiles Service 1.1.4 (2022-09-21)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/profiles-service/1.1.4/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Localizations Service 1.1.8 (2022-09-20)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/localizations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/localizations-service/1.1.8/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Authentication Service 2.0.5 (2022-09-19)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/auth-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/auth-service/2.0.5/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.

**🐞 Bugs Fixed**
- Applications with an invalid type can not be created anymore
</details>


## Groups Service 1.1.6 (2022-09-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service/groups) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/groups-service/1.1.6/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Configurations Service 2.0.4 (2022-09-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/configurations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/configurations-service/2.0.4/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Data Service 1.1.1 (2022-09-15)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.1.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Dispatchers Service 1.0.5 (2022-09-15)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/dispatchers-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/dispatchers-service/1.0.5/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Payments Service 1.3.2 (2022-09-15)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/payments-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/payments-service/1.3.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Files Service 1.0.2 (2022-09-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/file-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/files-service/1.0.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Tasks Service 1.3.1 (2022-09-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.3.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service
  - Service discovery is now based on DNS and more reliable.

</details>


## Tasks Service 1.3.0 (2022-08-09)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.3.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

	

**🎁 Features**

* Function retry policy
  * Users can now enable a retry policy on a function, which retries tasks of the function that fail. The user can choose between retrying all errors or specifying specific errors that should be retried.

* Task-specific logs
  * It is now possible to list the logs of a specific task. This allows users to easily find what happened during a task run. 


**🚨 Deprecation Warnings**
* `GET /functions/:functionName/logs` is now deprecated
</details>


## Payments Service 1.3.1 (2022-08-03)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/payments-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/payments-service/1.3.1/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🐞 Bugs Fixed**
* AppStore: Transactions with a changed `transaction_id` value do no longer cause issues.
* An active subscription being detached from a user will now correctly update the `expireTimestamp` of the relevant entitlement. 

**🚨 Deprecation Warnings**
* The `lastTransactionId` field in the App Store subscriptions is replaced by `lastWebOrderId`. App Store subscriptions are returned by the `GET /appStore/subscriptions endpoint`.
</details>


## Payments Service 1.3.0 (2022-07-14)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/payments-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/payments-service/1.3.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Complete a purchase for another user
  * When the payment details of a Play Store or App Store purchase are known, it is now possible to complete the purchase process for another user. This allows users with administrative privileges to move a subscription from one user to another or help users with (technical) difficulties.
* Re-evaluate the state of a Play Store or App Store subscription
  * We now allow to trigger a re-evaluation of the subscription state. If the Play Store or App Store subscription state is out of sync, a re-evaluation will bring the state back in sync with the information reported by the payment provider.
* Detach a Play Store or App Store subscription from a user
  * It is now possible to remove a Play Store and App Store subscription. This allows the subscription to be moved to another user.


**⚒️ Improvements**
* Improved the integration with Play Store and App Store
  * The Play Store integration got a big overhaul and the stability of the App Store integration has been improved.
* Automatically detach subscriptions on user removal
  * When a user account is deleted, the subscriptions linked to the account are removed. This allows users that deleted their account to reclaim their subscription when creating a new account.

**🐞 Bugs Fixed**
* Play Store subscriptions no longer end up in the `expired_from_billing` status after a successful renewal
* App Store receipts with awkward ordering are now handled correctly
* Invalid RQL queries are now reported with the correct error
</details>


## Localizations Service 1.1.7 (2022-06-28)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/localizations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/localizations-service/1.1.7/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Expand the accepted language codes to at least include all entries in ISO 639-1.

**🐞 Bugs Fixed**
* Users with some languages could not use the service correctly.
* When non-existent localization code is translated, fall back to the default language.

**🚨 Deprecation Warnings**
* `GET /languages` is now deprecated
</details>


## Configurations Service 2.0.3 (2022-06-28)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/configurations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/configurations-service/2.0.3/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Internal improvements that make the service less dependent on changes in other services.
</details>


## Prescriptions Service 1.1.17 (2022-04-29)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.17/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🐞 Bugs Fixed**
* Sometimes the 7/30 days past timestamp was not updated
* The PeriodExpiryCheckStartJob scheduler stopped after a while
* Users with some languages could not use the service correctly

</details>


## Groups Service 1.1.5 (2022-04-15)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service/groups) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/groups-service/1.1.5/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Publish events for each group update
  * When a group has been updated, a tag has been added/removed, or when a custom field is added/removed the group_updated-event is sent out. 


**⚒️ Improvements**
* Documentation - Correct the request body of the remove custom fields endpoint
  * Updated openapi.yaml file so the example makes sense 

**🐞 Bugs Fixed**
* Cannot query on a custom field with a name ending with _id 
</details>


## Tasks Service 1.2.0 (2022-03-30)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.2.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

	

**🎁 Features**

* Execute a function synchronously for its response
  * Via the following request: POST /functions/:name/execute a function can now be executed directly, and the caller gets the output of the function execution.

* Execute functions based on a schedule
  * You can now schedule the execution of a function on a fixed interval.

* Fetch the details of a function
  * The details of a function are returned via GET /functions/:name﻿

*  Ability to disable/enable a function
  * Via the following request: GET /functions/:name/enable & GET /functions/:name/disable Will affect the ability for a function to be executed or not


**⚒️ Improvements**
* A single task service instance can now run multiple tasks in parallel
* After creating a function all details are returned
* The tasks now keep track of their initiator


**🐞 Bugs Fixed**
* Function code can now be updated together with other configuration
* Unknown fields are no longer causing errors while updating a function
* Errors for invalid function names are now correctly reported
</details>


## Users Service 1.1.9 (2022-03-10)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.9/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Configurable Email Template ID's
  * The activation, reactivation and password reset mail template can now be configured by the end user.
</details>


## Data Service 1.1.0 (2022-02-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.1.0/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**
* Allow targeting schema’s by name in the url
  * All the end points that were previously called with a schema id can now also be called by schema name.
* Specific schema permissions
  * It is now possible to have permissions specifically for a schema. e.g. VIEW_DOCUMENTS:notes gives you permission to view all the documents on the schema with the name notes.

**⚒️ Improvements**
* Swagger documentation is improved
  * Comments end points are marked as deprecated. Small mistakes in other end points are fixed.

**🐞 Bugs Fixed**
* While adding a property to a schema the configuration field was not marked as required
</details>


## Users Service 1.1.8 (2021-12-22)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.8/openapi.yaml)

<details>
<summary>Release Notes</summary>

**🎁 Features**

* Two endpoints where added to support configuration of the password policy.
  * GET /password_policy
  * PUT /password_policy

</details>

