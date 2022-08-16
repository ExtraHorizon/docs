---
service: tasks-service
version: 1.3.0
date: 2022-08-09
---

	

**🎁 Features**

* Function retry policy
  * Users can now enable a retry policy on a function, which retries tasks of the function that fail. The user can choose between retrying all errors or specifying specific errors that should be retried.

* Task-specific logs
  * It is now possible to list the logs of a specific task. This allows users to easily find what happened during a task run. 


**🚨 Deprecation Warnings**
* `GET /functions/:functionName/logs` is now deprecated