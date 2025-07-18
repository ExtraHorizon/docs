# Documents

After the creation of a Schema, a document can be created which adheres to the Schema. A document is identified by an id and contains data as defined by the properties field in the Schema. Furthermore, the object contains the following attributes:

{% tabs %}
{% tab title="List" %}
| Attribute         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                | The id of the document                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| userIds           | The ids of the users linked to this document (e.g. when the readMode is set to default and you userId is in this list you will have access to the document)                                                                                                                                                                                                                                                                                                                                                                                                                         |
| groupIds          | The groups the document is linked to. (e.g. when the readMode is set to default and you have a staff enlistment in one of the groups you have access to the document)                                                                                                                                                                                                                                                                                                                                                                                                               |
| status            | The status the Document resides in (all statuses the document can reside in are determined by the Statuses object in the Schema object the Document adheres to)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data              | The data stored in the document compliant with the properties defined in the schema.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| transitionLock    | <p>When an update is complex it might take some time to execute. Whilst a document is updating, the document is in a locked state and no other updates are permitted.  </p><p></p><p>The only actions that do not impose a lock on a document are retrieval and deletion. All other operations, such as document creation, updates, or transitions, temporarily lock the document until the update is finished and no further automatic transitions are needed.</p><p></p><p>The <code>transitionLock</code> is an object containing a timestamp when the update was initiated.</p> |
| updateTimestamp   | The time when the document was last updated (including when a transition was executed).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| creationTimestamp | The time the document was created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
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

## Create

Below you can find an example of how you can create a document. You need to specify the schema and the properties you want to provide when creating the document.

```javascript
const document = await exh.data.documents.create(schema.id,{
    fieldA: "value",
    fieldB: 123456
});
```

The creation transition and the schema will determine what properties will be required and the conditions that both the input fields and the permissions the creator will need to successfully create the document.

## Querying

Using [RQL](../../../for-developers/resource-query-language-rql.md) you can build queries on any field in the document service. The Extra Horizon SDK contains an RQL builder that allows you to easily build queries and explore the different query functions supported.

```javascript
const myRql = rqlBuilder().eq('data.fieldA', 'myValue').gt('creationTimestamp', '2021-01-21').build();
const documents = await exh.data.documents.find(schema.id, {
  rql: myRql,
});
```

Note that all custom properties defined in the schema will be under the `data` property of the document. You can query both on document properties and custom properties by using the dot notation in the RQL builder.

{% hint style="warning" %}
When queries take more than X milliseconds the document service will stop the running query and respond with an error indicating the query took longer than the allowed limit.

To resolve this it is advised to add indexes on fields you use often in queries.
{% endhint %}

## Update

When permitted by the settings in the schema and the permissions assigned to you, you will be able to update any field in a document.

```javascript
await exh.data.documents.update(schema.id, document.id, {
    fieldB: 4321,
});
```

{% hint style="info" %}
As a good practice you can also add an RQL query when updating a document. This way you can guarantee your document is in a specific status or a field holds a specific value and let the update fail if this is not the case.
{% endhint %}

## Permanent delete

While in many cases you will want to implement a `deleted` status to keep records of removed documents, in other cases you will want to remove a document from existence.

```javascript
await exh.data.documents.remove(schema.id,document.id);
```

The schema configuration will determine who can execute a permanent delete of a document.

## Triggering transitions

Transitions allow you to move documents from one state to another. While automatic transitions will be triggered when the documents ends up in one of the transition's `fromStatuses`, manual transitions will need to be triggered by an API call.

```javascript
await exh.data.documents.transition(schema.id, document.id, {
  name: 'myTransition',
  data: {...},
});
```

When executing a transition you can either provide the `id` or the `name` of the transition that you want to execute. If there are multiple transitions with the same `name`, the following will be used to evaluate which transition will be executed:

* The document's `status` is present in the transition's `fromStatuses`
* The transition's `conditions` are satisfied

{% hint style="danger" %}
**Important!** If you set properties in `data` that correspond to properties in the document, the transition will update the record with the values from the `data` property.
{% endhint %}

## Updating access

Access rules are defined in the schema and in many cases are dependent on the `userIds` and `groupIds` properties in the document root. These fields indicate to whom this specific document belongs to or has specific permissions over the document.

You can use the following functions to add or remove userIds and / or groupIds from the document.

{% tabs %}
{% tab title="Linking Users" %}
```javascript
await exh.data.documents.linkUsers('{yourSchemaId}', '{yourDocumentId}', {
    userIds: ['{userIdToLink}'],
});
```
{% endtab %}
{% endtabs %}

## Updating arrays of objects in documents

When you have an arrays of objects in your documents, we provide a set of functions to manipulate these arrays.

For example, if you have a schema `daily-summary`, with a document that has an array of objects called `hourlySummaries`:

```json
{
  "id": "5f7b1b3b1f7b4b0001f7b4b2",
  "data": {
   "date": "2025-03-28",
   "hourlySummaries": [
     { "id": "6568d05351c0f5307421e196", "avg": 5, "max": 10, "min": 2 },
     { "id": "67e66793ae59de5bba4b262f", "avg": 7, "max": 15, "min": 3 }
   ]
  }
}
```

To add a new object to the `hourlySummaries` array, you can use the following function:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.documents.appendObjectToArray('daily-summary', documentId, 'hourlySummaries', {
  avg: 10, max: 20, min: 5,
});
```
{% endtab %}
{% endtabs %}

To update the existing object `67e66793ae59de5bba4b262f` in the `hourlySummaries` array, you can use:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.documents.updateObjectInArray('daily-summary', documentId, 'hourlySummaries', '67e66793ae59de5bba4b262f', {
  avg: 8, max: 18, min: 4,
});
```
{% endtab %}
{% endtabs %}

To remove the object `67e66793ae59de5bba4b262f` from the `hourlySummaries` array, you can use:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.documents.removeObjectFromArray('daily-summary', documentId, 'hourlySummaries', '67e66793ae59de5bba4b262f');
```
{% endtab %}
{% endtabs %}

## Updating a locked document

When an update is complex it might take some time to execute. Whilst a document is updating, the document is in a locked state and no other updates are permitted. &#x20;

If an application tries to update a document that has a `transitionLock` active, it will receive a`LOCKED_DOCUMENT_EXCEPTION`.&#x20;
