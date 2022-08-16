---
service: localizations-service
version: 1.1.7
date: 2022-06-28
---

**⚒️ Improvements**
* Expand the accepted language codes to at least include all entries in ISO 639-1.

**🐞 Bugs Fixed**
* Users with some languages could not use the service correctly.
* When non-existent localization code is translated, fall back to the default language.

**🚨 Deprecation Warnings**
* `GET /languages` is now deprecated