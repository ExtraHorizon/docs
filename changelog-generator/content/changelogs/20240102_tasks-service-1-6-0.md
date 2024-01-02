---
service: tasks-service
version: 1.6.0
date: 2024-01-02
---

**🎁 Features**

* Added a `skipCount()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**

* RQL
  * Known `SERVICE_EXCEPTION`s thrown for RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
  * Double encoding the `<` and `>` characters when searching for them now works.
