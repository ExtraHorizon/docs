# Documents



After the creation of a Schema, a document can be created which adheres to the Schema. A document is identified by an id and contains data as defined by the properties field in the Schema. Furthermore, the object contains the following attributes:

{% tabs %}
{% tab title="List" %}
| Attribute         | Description                                                                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                | The id of the document                                                                                                                                                                                                                              |
| userIds           | The ids of the users linked to this document (e.g. when the readMode is set to default and you userId is in this list you will have access to the document)                                                                                         |
| groupIds          | The groups the document is linked to. (e.g. when the readMode is set to default and you have a staff enlistment in one of the groups you have access to the document)                                                                               |
| status            | The status the Document resides in (all statuses the document can reside in are determined by the Statuses object in the Schema object the Document adheres to)                                                                                     |
| data              | The data stored in the document compliant with the properties defined in the schema.                                                                                                                                                                |
| transitionLock    | When a transition is complex it might take some time to execute. During that time the document is in a locked state and no updates are permitted. the transitionLock is an object containing a timestamp when the initial transition was initiated. |
| updateTimestamp   | The time when the document was last updated (including when a transition was executed).                                                                                                                                                             |
| creationTimestamp | The time the document was created.                                                                                                                                                                                                                  |
{% endtab %}

{% tab title="Json" %}
```javascript
{
    id: 'abcdef012345678901bacdef',
    userIds: ['abcdef012345678901bacdef', 'bcdef012345678901bacdef0'],
    groupIds: ['cdef012345678901bacdef01'],
    status: 'new',
    data: {...},
    transitionLock: {...}
    updateTimestamp: '2021-09-24T09:11:40+0000',
    creationTimestamp: '2021-09-24T09:11:37+0000',
}
```
{% endtab %}
{% endtabs %}

## Creating a document

## Querying

## Performing updates

## Permanent delete

## Triggering transitions

## updating access

### &#x20;Linking users

```javascript
await sdk.data.documents.linkUsers('{yourSchemaId}', '{yourDocumentId}', {
  userIds: ['{userIdToLink}'],
});
```

### Unlink users

```javascript
await sdk.data.documents.unlinkUsers('{yourSchemaId}', '{yourDocumentId}', {
  userIds: ['{userIdToUnLink}'],
});
```

### Linking groups

```javascript
await sdk.data.documents.linkGroups('{yourSchemaId}', '{yourDocumentId}', {
    groupIds: ['{groupIdToLink}'],
});
```

### Unlink groups

```javascript
await sdk.data.documents.unlinkGroups('{yourSchemaId}', '{yourDocumentId}', {
  groupIds: ['{groupIdToUnLink}'],
});
```

## Endpoints

This section gives an overview of the available Data Service endpoints. The full descriptions, including the required conditions, permissions and/or scopes, can be found in the API reference documentation.

#### I. Getting started with the Data Service

Creating a document

1. Create a schema: POST/
2. Enable the schema: POST/{schemaId}/enable
3. Create properties: POST/{schemaId}/properties
4. Create statuses: POST/{schemaId}/statuses&#x20;
5. Create transitions: POST/{schemaId}/transitions&#x20;
6. Create an index: POST/{schemaId}/indexes
7. Create the document: POST/{schemaId}/documents
8. Link users to a document: POST/{schemaId}/documents/{documentId}/linkUsers
9. Link groups to a document: POST/{schemaId}/documents/{documentId}/linkGroups
10. Create comments: POST/{schemaId}/documents/{documentId}/comments

#### II. Document management

General create, update and delete endpoints

* Create a schema: POST/
* Update a schema: PUT/{schemaId}
* Delete a schema: DELETE/{schemaId}\
  \

* Create a property: POST/{schemaId}/properties
* Delete a property: DELETE/{schemaId}/properties/{propertyPath}
* Update a property: PUT/{schemaId}/properties/{propertyPath}\
  \

* Create a status: POST/{schemaId}/statuses
* Delete a status: DELETE/{schemaId}/statuses/{name}
* Update a status: PUT/{schemaId}/statuses/{name}\
  \

  * Create a transition: POST/{schemaId}/transitions
  * Update a transition: PUT/{schemaId}/transitions/{transitionId}
  * Delete a transition: DELETE/{schemaId}/transitions/{transitionId}\
    \

  * Create a document: POST/{schemaId}/documents
  * Update a document: PUT/{schemaId}/documents/{documentId}
* Delete a document: DELETE/{schemaId}/documents/{documentId}\
  \

* Create a comment: POST/{schemaId}/documents/{documentId}/comments
* Update a comment: PUT/{schemaId}/documents/{documentId}/comments
* Delete a comment: DELETE/{schemaId}/documents/{documentId}/comments\
  \

* Create an index: POST/{schemaId}/indexes
* Delete an index: PUT/{schemaId}/indexes/{indexId}

Enabling/disabling a Schema

* Disable a schema: POST/{schemaId}/disable
* Enable a schema: POST/{schemaId}/enable

Updating the Creation Transition

Update the Creation Transition analogous to updating the Transition. Make sure the toStatus value is determined in the Schema object.

* Update the creation transition: PUT/{schemaId}/creationTransition

Deleting data fields from a document

Any data field of a document can be deleted. With the correct permission, multiple documents can be changed at once.

Tip: To access an element in an array or embedded documents, use the dot notation.

* Delete fields from a document: POST/{schemaId}/documents/{documentId}/deleteFields

Transitioning a document

Manually start the transition of a document adhering to a Schema, when the following conditions are met:

* The inputCondition,
* The initiatorHasRelationToUserInDataCondition,
* The initiatorHasRelationToGroupInDataCondition,
* The Transition type is manual,
* The Transition exists within the Schema object,&#x20;
* The Document resides in a Status defined in the fromStatuses object of the Transition.

With the correct permission, multiple documents can be transitions at once.

* Transition a document: POST/{schemaId}/documents/{documentId}/transition

Linking and unlinking groups and users

Add or remove data to or from the groupIds and userIds attributes.

* Link groups to a document: POST/{schemaId}/documents/{documentId}/linkGroups
* Unlink groups from a document:POST/{schemaId}/documents/{documentId}/unlinkGroups
* Link users to a document: POST/{schemaId}/documents/{documentId}/linkUsers
* Unlink users from a document: POST/{schemaId}/documents/{documentId}/unlinkUsers

Notes: When GroupSyncMode is set to LINKED\_USERS\_PATIENT\_ENLISTMENT for a document, all the groups where the specified user is enlisted as patient will also be added or removed to or from the document.\
Specifying an empty userIds or groupIds array will have no effect on the document.\
Not specifying the userIds or groupIds array will unlink all users or groups from the document.

Viewing schemas, documents, and comments

With the correct permissions or the correct enlistment, users can view (a selection of) the data of schemas, documents, and comments.&#x20;

* Request a list of schemas: GET/&#x20;
* Request a list of documents: GET/{schemaId}/documents
* Request a list of comments: GET/{schemaId}/documents/{documentId}/comments
