---
service: dispatchers-service
version: 1.1.0
date: 2023-09-20
---

**🎁 Features**
* Added a `PUT` endpoint for updating Dispatchers
* Added name, description and tags fields to Dispatchers
  * Name is unique against all Dispatchers
* Added name and description fields to Actions
  * Name is unique against Actions within a Dispatcher

**⚒️ Improvements**
* Updated validation for Dispatchers and Actions
