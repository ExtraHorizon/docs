---
service: notifications-service
version: 1.1.1
date: 2024-02-16
---

**⚒️ Improvements**

* Unusable Firebase tokens are removed automatically
  * Tokens reported by Firebase as valid but not (or no longer) usable, are automatically removed.
  * Invalid formatted tokens are ignored as proper detection is currently not feasible.
