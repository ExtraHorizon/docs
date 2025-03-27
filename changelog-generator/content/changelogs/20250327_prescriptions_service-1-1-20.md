---
service: prescriptions-service
version: 1.1.20
date: 2025-03-27
---

**⚒️ Improvements**

- **RQL improvements**
  - Less 5xx errors returned where an invalid RQL error was expected
  - The `skip_count` operator is now also available for this service
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- The race conditions in prescription scanning and activating are solved
- The `free`/`not_free`/`paid_by_group`/`not_paid` update queries are fixed
- Querying on fields ending with `_id` in custom data is fixed
