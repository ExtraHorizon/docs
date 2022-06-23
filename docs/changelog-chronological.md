# 📦 Changelog

### Groups Service 1.1.5 (2022-04-15)

[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service/groups) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/groups-service/1.1.5/openapi.yaml)

<details>

<summary>Release Notes</summary>

**🎁 Features**

* Publish events for each group update
  * When a group has been updated, a tag has been added/removed, or when a custom field is added/removed the group\_updated-event is sent out.

**⚒️ Improvements**

* Documentation - Correct the request body of the remove custom fields endpoint
  * Updated openapi.yaml file so the example makes sense

**🐞 Bugs Fixed**

* Cannot query on a custom field with a name ending with \_id

</details>

### Tasks Service 1.2.0 (2022-03-30)

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
* Ability to disable/enable a function
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

### Users Service 1.1.9 (2022-03-10)

[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.9/openapi.yaml)

<details>

<summary>Release Notes</summary>

**🎁 Features**

* Configurable Email Template ID's
  * The activation, reactivation and password reset mail template can now be configured by the end user.

</details>

### Data Service 1.1.0 (2022-02-16)

[Documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/data-service/1.1.0/openapi.yaml)

<details>

<summary>Release Notes</summary>

**🎁 Features**

* Allow targeting schema’s by name in the url
  * All the end points that were previously called with a schema id can now also be called by schema name.
* Specific schema permissions
  * It is now possible to have permissions specifically for a schema. e.g. VIEW\_DOCUMENTS:notes gives you permission to view all the documents on the schema with the name notes.

**⚒️ Improvements**

* Swagger documentation is improved
  * Comments end points are marked as deprecated. Small mistakes in other end points are fixed.

**🐞 Bugs Fixed**

* While adding a property to a schema the configuration field was not marked as required

</details>

### Users Service 1.1.8 (2021-12-22)

[Documentation](https://docs.extrahorizon.com/extrahorizon/services/access-management/user-service) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/users-service/1.1.8/openapi.yaml)

<details>

<summary>Release Notes</summary>

**🎁 Features**

* Two endpoints where added to support configuration of the password policy.
  * GET /password\_policy
  * PUT /password\_policy

</details>
