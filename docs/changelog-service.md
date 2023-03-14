
## Configurations Service

### 2.0.3 (2022-06-28)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/configurations-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/configurations-service/2.0.3/openapi.yaml)
<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
* Internal improvements that make the service less dependent on changes in other services.
</details>


## Data Service

### 1.1.0 (2022-02-16)
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


## Groups Service

### 1.1.5 (2022-04-15)
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


## Localizations Service

### 1.1.7 (2022-06-28)
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


## Payments Service

### 1.3.1 (2022-08-03)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/other/payments-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/payments-service/1.3.1/openapi.yaml)
<details>
<summary>Release Notes</summary>

**🐞 Bugs Fixed**
* AppStore: Transactions with a changed `transaction_id` value do no longer cause issues.
* An active subscription being detached from a user will now correctly update the `expireTimestamp` of the relevant entitlement. 

**🚨 Deprecation Warnings**
* The `lastTransactionId` field in the App Store subscriptions is replaced by `lastWebOrderId`. App Store subscriptions are returned by the `GET /appStore/subscriptions endpoint`.
</details>


### 1.3.0 (2022-07-14)
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


## Prescriptions Service

### 1.1.17 (2022-04-29)
[Documentation](https://docs.extrahorizon.com/) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/prescriptions-service/1.1.17/openapi.yaml)
<details>
<summary>Release Notes</summary>

**🐞 Bugs Fixed**
* Sometimes the 7/30 days past timestamp was not updated
* The PeriodExpiryCheckStartJob scheduler stopped after a while
* Users with some languages could not use the service correctly

</details>


## Tasks Service

### 1.3.1 (2022-09-13)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/automation/task-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/tasks-service/1.3.1/openapi.yaml)
<details>
<summary>Release Notes</summary>

**⚒️ Improvements**
- Increased the stability of the service
  - Service discovery is now based on DNS and more reliable.

</details>


### 1.3.0 (2022-08-09)
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


### 1.2.0 (2022-03-30)
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


## Users Service

### 1.1.9 (2022-03-10)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.9/openapi.yaml)
<details>
<summary>Release Notes</summary>

**🎁 Features**
* Configurable Email Template ID's
  * The activation, reactivation and password reset mail template can now be configured by the end user.
</details>


### 1.1.8 (2021-12-22)
[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.8/openapi.yaml)
<details>
<summary>Release Notes</summary>

**🎁 Features**

* Two endpoints where added to support configuration of the password policy.
  * GET /password_policy
  * PUT /password_policy

</details>

