---
service: localizations-service
version: 1.1.10
date: 2025-10-21
---

**⚒️ Improvements**

- **RQL pagination pagination improved**
  - The maximum page size is increased to 100.

**🐞 Bugs Fixed**

- Sending localizations with the same key multiple times in a `POST` or `PUT` request results in a `DUPLICATE_LOCALIZATION_INPUT_KEYS` error instead of `SERVICE_EXCEPTION`
- The localization fields `text` and `key` are now marked as required. Omitting them resulted in a `SERVICE_EXCEPTION` before.
- A localization with a null value for a `key` is no longer accepted. Before, if created, it broke a few internals and was not able to be requested again.
- Multi-field sorting now works correctly. Instead of only applying the last field, results are sorted by each field in order.
- The page its `limit` field for the languages and countries endpoint now show the number of entries rather than 0
