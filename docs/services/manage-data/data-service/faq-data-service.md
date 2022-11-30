# FAQ Data Service

## Schema Design

### How can I validate that an array does not contain a certain value in a transition condition?

If it is an array of strings, you can use regex expressions. In the following schema definition, you can find an example of a validation where the tag important\_tag should not be present.

The relevant regex expression is `^(?!important_tag$).+$`

```json
{
    "name": "measurementSchema",
    "description": "Example Measurement Schema",
    "statuses": {
      "active": {}, 
      "deleted": {}
    },
    "creationTransition": {
      "type": "manual",
      "toStatus": "active"
    },
    "transitions": [
        {
            "name": "startRemoval",
            "type": "manual",
            "fromStatuses": [
                "active"
            ],
            "toStatus": "deleted",
            "conditions": [
                {
                    "type": "input",
                    "configuration": {
                        "type": "object",
                        "properties": {
                            "tags": {
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "pattern": "^(?!important_tag$).+$"
                                }
                            }
                        }
                    }
                }
            ]
        }
    ],
    "properties": {
        "tags": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    }
}
```

### How can I validate that an array does contain a certain value in a transition condition?

To validate that an array does contain a certain value there are different options. The following examples show how to check if an array contains the value `important_tag`.

Each code snippet shows the code in the condition configuration part of the schema.

#### Option 1 • Use a regex

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "contains": {
    "type": "string",
    "pattern": "^important_tag$"
  }
```

#### Option 2 • Use the const keyword

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "contains": {
    "type": "string",
    "const": "important_tag"
  }
}
```

#### Option 3 • Use the enum keyword

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "contains": {
    "type": "string",
    "enum": ["important_tag"]
  }
}
```

## Data Manipulation

### How can I remove values from an array property in a record?

If the array items are objects, you can remove an object by executing the following HTTP call:

```
DELETE /data/v1/{{schema}}/documents/${schemaId}/{{arrayName}}/{{objectId}}
```

If the array items are simple values, like strings or numbers, you have to execute a `PUT` to the record endpoint and provide the full array (leaving out the value that you want to remove).



## Permissions

### What is the difference between creatorId and userIds in a document?

The `creatorId` refers to the user that created the document, `userIds` is an array of users which have access to the document as set by the [document permissions](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas#access-modes). A simple use case is for example if you want to share a single document with multiple individual users which are not necessarily in the same group.
