---
service: notifications-service
version: 1.1.0
date: 2024-02-01
---

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
