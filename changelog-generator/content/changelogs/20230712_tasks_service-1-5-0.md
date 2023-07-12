---
service: tasks-service
version: 1.5.0
date: 2023-07-12
---



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

