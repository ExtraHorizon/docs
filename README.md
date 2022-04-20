# Extra Horizon Public Documentation
This repository contains the source code for https://docs.extrahorizon.com .


## Integration with GitBook
GitBook is used as a documentation hosting provider.

## Changelog documentation
We use [hugo](https://gohugo.io/) in combination with the GitHub CI/CD to generate the changelogs in multiple formats

### How to add a changelog?
Add the service changelog as a new `.md` file in `changelog-generator/content/changelogs/`.

Important to keep in mind:
* Use the frontmatter heading to define some variables
* Do not use headings (`#`, `##`, ...) in the content section of the markdown file

Example:
```
---
service: data-service
version: 1.1.0
date: 2022-02-16
---

**🎁 Features**
* Allow targeting schema’s by name in the url
  * All the end points that were previously called with a schema id can now also be called by schema name.
* Specific schema permissions
  * It is now possible to have permissions specifically for a schema. e.g. VIEW_DOCUMENTS:notes gives you permission to view all the documents on the schema with the name notes.

**⚒️ Improvements**
* Swagger documentation is improved
  * Comments end points are marked as deprecated. Small mistakes in other end points are fixed.

**🐞 Bugs Fixed**
* While adding a property to a schema the configuration field was not marked as required
```

Once merged in main, it will automatically be added to the GitBook documentation on different pages.