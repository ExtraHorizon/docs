---
service: users-service
version: 1.5.2
date: 2025-12-17
---

**⚒️ Improvements**

- Email validation is now in line with the Mail Service

**🐞 Bugs Fixed**

- All updates to global/group roles are now properly reflected in users already having those roles assigned to them
- More consistent errors and record counts are returned when updating global/group roles
- Fixed the behavior of the RQL operators `gt`, `lt`, `ge` and `le` when working with ids
- Multi-field sorting now works correctly. Instead of only applying the last field, results are sorted by each field in order.