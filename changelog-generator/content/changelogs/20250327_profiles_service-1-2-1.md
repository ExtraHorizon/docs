---
service: profiles-service
version: 1.2.1
date: 2025-03-27
---

**⚒️ Improvements**

- **RQL improvements**
  - Sorting on `id` fields is now more consistent
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- Querying on fields ending with `_id` in custom data is fixed
