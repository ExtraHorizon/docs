---
service: reports-service
version: 1.0.14
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
- Reports are still generated for deleted users when the prescription ends
