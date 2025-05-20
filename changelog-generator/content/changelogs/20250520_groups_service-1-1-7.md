---
service: groups-service
version: 1.1.7
date: 2025-05-20
---

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**
- **The visibility of custom fields for patients can now be toggled by us**


**🐞 Bugs Fixed**
- The bulk `approve` / `update` / `add_tags` / `remove_tags` group-request actions are fixed
- Tags will no longer be added multiple times to a group
- The `ne` RQL operator now works correctly as a “not equals”
- Querying on custom_fields keys ending with `_id` now works
