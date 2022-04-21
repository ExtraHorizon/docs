---
service: groups-service
version: 1.1.5
date: 2022-04-15
---

**🎁 Features**
* Publish events for each group update
  * When a group has been updated, a tag has been added/removed, or when a custom field is added/removed the group_updated-event is sent out. 


**⚒️ Improvements**
* Documentation - Correct the request body of the remove custom fields endpoint
  * Updated openapi.yaml file so the example makes sense 

**🐞 Bugs Fixed**
* Cannot query on a custom field with a name ending with _id 