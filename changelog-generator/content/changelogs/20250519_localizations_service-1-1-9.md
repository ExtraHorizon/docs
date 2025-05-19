---
service: localizations-service
version: 1.1.9
date: 2025-05-19
---

**⚒️ Improvements**
- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service 
  - Sorting on `id` fields is now more consistent 
  - Requesting a limit greater than the maximum now sets the maximum 
- **Improved support for future database security mechanisms**

**🐞 Bugs Fixed**
- The `ne` RQL operator now works correctly as a “not equals”
- Querying on custom_fields keys ending with `_id` now works
- `POST` and `PUT` requests with an empty request body return the correct error
