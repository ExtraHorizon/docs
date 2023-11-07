---
service: users-service
version: 1.3.0
date: 2023-11-03
---

**🎁 Features**
* Disable the total count in the listing query
  * Added a `skip_count()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**
* Staff enlistment roles can now be queried correctly with the RQL `contains` operator
* Deleted users referenced in an Activation or New Password Request now cause a `USER_UNKNOWN_EXCEPTION` to be thrown
* Empty strings are no longer accepted for permission
* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
