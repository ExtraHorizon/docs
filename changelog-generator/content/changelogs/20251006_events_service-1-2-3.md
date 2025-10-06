---
service: events-service
version: 1.2.3
date: 2025-10-07
---

**⚒️ Improvements**

- **RQL pagination**
  - Requesting a limit greater than the maximum now sets the maximum

- **Hour passed event triggering removed**
  - The hour passed event hasn’t been used for quite a while.
  - Now we’ve actually removed the triggering of the event as well.


**🐞 Bugs Fixed**

- **Multi-field sorting now works correctly**
  - Instead of only applying the last field, results are sorted by each field in order.
- Empty objects and arrays in the event `content` field are now correctly stored rather than replaced by `null`
- `event_types` is handled as required field, is shows up as missing in the missing required fields error and omitting it results in a missing required fields error instead of a field format error
