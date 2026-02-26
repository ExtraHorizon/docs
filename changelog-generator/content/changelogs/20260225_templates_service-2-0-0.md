---
service: templates-service
version: 2.0.0
date: 2026-02-25
---

**🎁 Features**

* **Managing Templates**

  * **List all templates**
    * Admins can list templates

  * **Create a template**
    * Admins can create new templates

  * **Update a template** 
    * Admins can update templates by id or by name

  * **Delete a template**
    * Admins can delete templates by id or by name

* **Resolving templates**

  * **Templates can be resolved by id or by name**

  * **New templating engine: Handlebars.js**
     * Handlebars.js replaces Apache Velocity from templates-service V1
     * Better localization/internationalization support via i18next

  * **Resolving templates can now only be done via the mail service or with a permission**

  * **Added helpers**
    * Internationalisation and translation helpers
    * Logical helpers
    * Compare helpers
    * String helpers
    * Array helpers
    * Object helpers
    * Math helpers
