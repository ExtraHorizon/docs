---
service: tasks-service
version: 1.4.0
date: 2023-05-31
---



**🎁 Features**
* Functions can be used as an HTTP(s) endpoint
  * API Functions can be used to create your own endpoints.
* Send a task failed event
  * When a task fails, task fails event is triggered.

**⚒️ Improvements**
* Allow empty body in the execute endpoint.
  * The execute endpoint can now be called with an empty body whereas previously, an empty objects had to be provided.

**🐞 Bugs Fixed**
* Task logs with a timestamp equal to the end marker are now shown
* RQL is now correctly marked as required in the OpenAPI documentation
