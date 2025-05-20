---
service: notifications-service
version: 1.1.3
date: 2025-05-20
---

**⚒️ Improvements**

- **Retries for additional Firebase error types**
  - We now automatically retry additional error types that Firebase may respond with when sending a notification to a user's device.
- **RQL improvement**
  - Requesting a limit greater than the maximum now sets the maximum
- **Improved support for future database security mechanisms**


**🐞 Bugs Fixed**

- Querying on field names ending with `_id` in the `fields` object is fixed
- Now correctly erroring when no RQL is supplied while deleting notifications


