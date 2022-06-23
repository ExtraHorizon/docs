# FAQ Data Service

## Schema Design

### How can I validate that an array contains a certain value in a transition condition?

If it is an array of strings, you can use regex expressions. In the following schema definition, you can find an example of a validation where the tag important\_tag needs to be present.

* Regex expression to check that the array **contains** the tag: `^important_tag$`
* Regex expression to check that the array **does not contain** a value: `^(?!important_tag$).+$`

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
                                  "pattern": "^important_tag$"
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



## Data Manipulation

### How can I remove values from an array property in a record?

If the array items are objects, you can remove an object by executing the following HTTP call:

```
DELETE /data/v1/{{schema}}/documents/${schemaId}/{{arrayName}}/{{objectId}}
```

If the array items are simple values, like strings or numbers, you have to execute a `PUT` to the record endpoint and provide the full array (leaving out the value that you want to remove).
