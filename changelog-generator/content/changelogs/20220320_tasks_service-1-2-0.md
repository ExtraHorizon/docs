---
service: tasks-service
version: 1.1.9
date: 2022-03-30
---

	

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