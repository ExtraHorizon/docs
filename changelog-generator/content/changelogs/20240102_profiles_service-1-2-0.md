---
service: profiles-service
version: 1.2.0
date: 2024-01-02
---

**🎁 Features**

* Added a `skip_count()` RQL operator. Would instruct the listing endpoints not to execute/return the total count to increase performance.


**🐞 Bugs Fixed**

* RQL
  * Using the `contains` operator inside an `or` operator now works as expected
  * The `ne` operator now behaves as expected
  * Known `SERVICE_EXCEPTION`s thrown on RQL errors are now resolved to `INVALID_RQL_EXCEPTION`s

* Removing fields
  * `patient_id` can now be removed from profile groups
  * An empty list of fields to remove is now correctly handled
  * Attempts to remove an id or timestamp field are now correctly handled
