---
service: files-service
version: 1.1.0
date: 2023-08-09
---

**🎁 Features**
* Added File Service settings
  * A new settings property `disableForceDownloadForMimeTypes` may be configured to override the File Service’s default behavior of enforcing file downloads and enable viewing of files directly in the browser for selected mime types.


**⚒️ Improvements**
* Improved the error message for creating a file without a request body


**🐞 Bugs Fixed**
 * An empty string is now a valid value in an array of tags
* Fixed an RQL issue that would not consider the use of the limit operator
