---
service: tasks-service
version: 1.7.1
date: 2026-08-03
---

**⚒️ Improvements**

* Added automatic retries for function executions and updates targeting pending functions
* Made RQL shorthand operator value encoding consistent with other services
* Improved error reporting
  * When trying to set an invalid function configuration
  * For malformed or incomplete API function requests
  * Added more detailed for invalid responses from AWS Lambda
* Internal security improvements
