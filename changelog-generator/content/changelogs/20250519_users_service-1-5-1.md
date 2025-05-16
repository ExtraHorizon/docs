---
service: users-service
version: 1.5.1
date: 2025-05-19
---

**⚒️ Improvements**

- **Improved support for future database security mechanisms**
- **No longer subscribing to the unused `hour_passed` event**

**🐞 Bugs Fixed**

- Adding/Removing staff roles now correctly check the matching group id
- Multiple endpoints now return the correct `MISSING_REQUIRED_FIELDS_EXCEPTION` when not providing any fields
  - `POST /add_to_staff`
  - `POST /remove_from_staff`
  - `POST /add_roles`
  - `POST /remove_roles`
  - `POST /groups/{groupId}/staff/add_roles`
  - `POST /groups/{groupId}/staff/remove_roles`
- Multiple endpoints now return the correct EMPTY_BODY_EXCEPTION when no body is provided
  - `POST /groups/{groupId}/staff/add_roles`
  - `POST /groups/{groupId}/staff/remove_roles`
  - `POST /add_roles`
  - `POST /remove_roles`
- Adding and removing roles now ignore not-existing roles
- `POST /add_to_staff` and `POST /remove_from_staff` now return the amount of affected records correctly
- Following endpoints now remove all the selected roles from the users or staff, not just the last one in the list.
  - `DELETE /roles`
  - `POST /remove_roles`
  - `POST /groups/{groupId}/staff/remove_roles`

