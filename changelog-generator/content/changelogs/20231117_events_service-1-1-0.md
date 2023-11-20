---
service: events-service
version: 1.1.0
date: 2023-11-17
---

**🎁 Features**
* Added a `skip_count()` RQL operator. Would instruct the listing functions not to execute/return the total count. 


**🐞 Bugs Fixed**
* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s
  * Sorting on id now behaves as expected
  * Querying on `content.<name>_id` now works as expected
