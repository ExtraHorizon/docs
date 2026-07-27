---
service: users-service
version: 1.6.1
date: 2026-07-27
---

**⚒️ Improvements**

* Loosened email validation for endpoints where it is not required
  * Removed email validation from the authenticate, forgot password and account activation endpoints to avoid potential breaking changes if email validation rules become stricter in the future. Also removed email validation from the creation of accounts via OpenID Connect.
* Internal security improvements

