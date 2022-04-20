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

### Create

Below you can find an example of how you can create a document. You need to specify the schema and the properties you want to provide when creating the document.

```javascript
const document = await sdk.data.documents.create(schema.id,{
    fieldA: "value",
    fieldB: 123456
});
```

The creation transition and the schema will determine what properties will be required and the conditions that both the input fields and the permissions the creator will need to successfully create the document.

### Querying

Using [RQL](../../../for-developers/resource-query-language-rql.md) you can build queries on any field in the document service. The ExtraHorizon SDK contains an RQL builder that allows you to easily build queries and explore the different query functions supported.

```javascript
const myRql = rqlBuilder().eq('data.fieldA', 'myValue').gt('creationTimestamp', '2021-01-21').build();
const documents = await sdk.data.documents.find(schema.id, {
  rql: myRql,
});
```

Note that all custom properties defined in the schema will be under the `data` property of the document. You can query both on document properties and custom properties by using the dot notation in the RQL builder.

{% hint style="warning" %}
When queries take more than X milliseconds. The document service will stop the running query and respond with an error indicating the query took longer than the allowed limit.

To resolve this it is advised to add indexes on fields you use often in queries.
{% endhint %}

### Update

When permitted by the settings in the schema and the permissions assigned to you, you will be able to update any field in a document.

```javascript
await sdk.data.documents.update(schema.id, document.id, {
    fieldB: 4321,
});
```

{% hint style="info" %}
As a good practice you can also add an RQL query when updating a document. This way you can guarantee you document is in a specific status or a fields holds a specific value and let the update fail it this is not the case.
{% endhint %}

### Permanent delete

While in many cases you will want to implement a `deleted` status to keep records of removed documents. In other cases you will want to remove a document from existence.

```javascript
await sdk.data.documents.remove(schema.id,document.id);
```

The schema configuration will determine who can execute a permanent delete of a document.

### Triggering transitions

Transitions allow you to move documents from one state to another. While automatic transitions will be triggered when the documents ends up in transitions `fromState`, manual transitions will need to be triggered by an API call.

```javascript
const transitionId = schema.findTransitionIdByName('myTransition');
await sdk.data.documents.transition(schema.id, document.id, {
  id: transitionId,
  data: {...},
});
```

When executing a transition you will need to provide the id of the transition that you want to execute.

### updating access

Access rules are defined in the schema and in many cases are dependent on the userIds and groupIds properties in the document root. These fields indicate to whom this specific document belongs to or has specific permissions over the document.

You can use the following functions to add or remove userIds and or groupIds from the document.

{% tabs %}
{% tab title="Linking Users" %}
```javascript
await sdk.data.documents.linkUsers('{yourSchemaId}', '{yourDocumentId}', {
    userIds: ['{userIdToLink}'],
});
```
{% endtab %}
{% endtabs %}
