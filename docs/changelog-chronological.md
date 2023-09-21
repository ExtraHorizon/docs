
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


## Files Service 1.0.3 (2023-04-19)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/file-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/files-service/1.0.3/openapi.yaml)

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


## Tasks Service 1.3.2 (2023-04-19)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.3.2/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Updated how we authenticate with our external services

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


## Notifications Service v1 1.0.9 (2022-09-21)
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


## Configurations Service 2.0.4 (2022-09-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/configurations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/configurations-service/2.0.4/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service:
  - Service discovery is now based on DNS and more reliable.
</details>


## Groups Service 1.1.6 (2022-09-16)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service/groups) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/groups-service/1.1.6/openapi.yaml)

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


## Configurations Service 2.0.3 (2022-06-28)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/configurations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/configurations-service/2.0.3/openapi.yaml)

<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Internal improvements that make the service less dependent on changes in other services.
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

