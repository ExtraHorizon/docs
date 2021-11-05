---
description: >-
  The Extra Horizon Data Service gives you the ability to define data models
  specifically for your applications needs and make them interactive by
  attaching them to automation workflows.
---

# Document Service

## **Intro**

Data is managed using structured documents, written in JSON. These documents rely on data Schemas which determine the structure, behavior, and logic of the documents in a schema collection. The purpose of a data schema is twofold:

1. **Define Data structure**\
   ****Data Schemas define the structure of a document using properties. This ensures uniform structuring of documents across the service and provides input validation for API interactions. Data structure definitions in schemas are inspired by [JSON-schemas](http://json-schema.org) and adhere to the same syntax.
2. **Define behavior logic**\
   ****Data Schemas define the behavior logic of a document using states and transitions. When a document transitions from one status to another, actions are triggered such as sending an email or running a small piece of code in other services.&#x20;

### Data Structure

![](<../../../.gitbook/assets/image (5) (1).png>)

The document service validation is based on the open-source JSON schema specification. This allows you to create complex data structures that you can configure yourself.

Besides defining field types, you can create complex fields with constraints like: minimum, maximum, regex, maxItems, minItems, …

### States & Transitions

![](<../../../.gitbook/assets/image (2) (1).png>)

The document service allows you to configure workflows that match your exact business need.   You can mark your documents with specific states and create transitions between these states, these can be manual or automatic.

For example, you can create an order and shipment workflow to keep track of all orders, connect your frontend applications, and trigger actions to inform stakeholders when needed.

### Conditions & Actions

![](<../../../.gitbook/assets/image (3) (1).png>)

You can add conditions to a transition, meaning the transition can only be executed if all the conditions are met. E.g. you can make automated transitions only trigger under specific cercomstances. (Field value, the person executing the transition, …)

When a transition does trigger you can attach actions. These actions can range from sending events, sending text messages, push notifications, email, starting a script and so much more…&#x20;

## Schema's

A schema defines both the data contained and the behavior (in the form of a state machine) of the documents it holds. A Schema object is identified within the Data Service by a unique identifier (id) and contains a name and description. A Schema is based on:

* Permissions that determine who can access what documents,
* Statuses which define the state of the document,
* Properties which define the structure of the document,
* Transitions which can trigger actions

#### Create a new schema

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const myNewSchema = await sdk.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
});
```
{% endtab %}
{% endtabs %}

### Permissions

A schema contains some specific attributes which define the conditions which must be met to create (createMode), view (readMode), update (updateMode) or delete (deleteMode) a document. The required conditions combined with the required permissions for each endpoint can be found in the API reference documentation.&#x20;

#### createMode

createMode defines the permissions needed to create a document in a schema collection.

| Mode                 | Description                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`            | The default mode allows every logged-in user to create a new document in the collection. If you don't specify the createMode during schema creation it will by default end up in this mode. |
| `PERMISSIONREQUIRED` | Only users with the`CREATE_DOCUMENTS`permission will have the ability create a document.                                                                                                    |

#### readMode

readMode defines the permissions need to read a document in a schema collection

| Mode                     | Description                                                                                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`                | All users where their userId is in the list of userIds attached to the document or if they have a staff enlistment in a group that is in the list of groupIds of the document |
| `ALLUSERS`               | All users will have the permission to read the documents in the schema collection.                                                                                            |
| `ENLISTEDINLINKEDGROUPS` | Every user in default mode and all users that have a patient enlistment in a group that is in the list of groupIds of the document.                                           |

#### updateMode

updateMode defines the permissions need to update a document in a schema collection

| Mode                    | Description                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEFAULT`               | All users where their userId is in the list of userIds attached to the document or if they have a staff enlistment in a group that is in the list of groupIds of the document |
| `CREATORONLY`           | Only the user that created the document is able to update the document                                                                                                        |
| `DISABLED`              | Nobody can update the document                                                                                                                                                |
| `LINKEDGROUPSSTAFFONLY` | All users that have a staff enlistment in a group that is in the list of groupIds of the document.                                                                            |

#### deleteMode

deleteMode defines the permissions needed to remove a document permanently from a schema collection.

| Mode                 | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `PERMISSIONREQUIRED` | Only users with the`DELETE_DOCUMENTS`permission will be able to remove a document. |
| `LINKEDUSERSONLY`    | All users where their userId is in the list of userIds attached to the document.   |

#### Creating a schema with permissions

You can provide the permissions parameters upon creation of you new schema:

```javascript
const myNewSchema = await sdk.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
    createMode: 'default',
    readMode: 'allUsers',
    updateMode: 'disabled',
    deleteMode: 'permissionRequired'
});
```

### Properties

A Schema defines the structure of a document through properties. The Properties object contains type configurations, which represent the fields which should be accepted while creating or updating a document. The structure of the type configurations themselves is inspired by [JSON Schema](https://json-schema.org).&#x20;

![](https://lh3.googleusercontent.com/FqZ0yp8aT6rAhz5rP69T6qCmNwwr3eE4EZoCDQQr4bEc1Poh8zrxg\_WiBjiuzqgpFDjYJL1ker6l4fM\_qVSIzBoSlyPrk60Mnte-ITj9PY583rMbQZVYCCJEe-QlyexcROsLmMY=s0)

The Data Service supports five kinds of configurations (type attribute):&#x20;

| Type      | Description                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `object`  | A container object to define multiple objects, in which each object must meet the schema defined in the properties attribute |
| `array`   | An array object in which each value must meet the schema defined by the items attribute                                      |
| `string`  | A string object of which each value must meet the schema defined by the pattern, format, enum and/or const attributes,       |
| `number`  | A number object of which each value must meet the schema defined by the enum or const attribute,                             |
| `boolean` | A boolean object of which each value must meet the schema defined by the enum or const attribute.                            |

#### Adding properties to your schema

{% tabs %}
{% tab title="Javascript" %}
```javascript
await sdk.data.properties.create(newSchema.id, { name: 'myFirstProperty',
    configuration: {
      type: 'string',
      enum: ['firstValue', 'secondValue'],
    }
});
```
{% endtab %}
{% endtabs %}

#### Some examples

you can also make more complex objects and array's of objects.

{% tabs %}
{% tab title="Object example" %}
```javascript
await sdk.data.properties.create(newSchema.id, 
  {
    name: 'address',
    configuration: {
      type: 'object',
      properties: {
        street: {type: 'string', minLength: 1, pattern: '^[a-z]+$'},
        number: {type: 'number', minimum: 1, maximum: 300},
        inhabited: {type: 'boolean', enum: [true, false]},
        residents: {type: 'array', items: {type: 'string'}, minItems: 1, maxItems: 10}
      }
    }
  }
});
```
{% endtab %}

{% tab title="Array example" %}
```javascript
await sdk.data.properties.create(newSchema.id, 
  {
    name: 'relatives',
    configuration: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {type: 'string', minLength: 1, maxLength: 50},
          relation: {type: 'string', enum:['relative','family','friend']}
        }
      }
    }
  }
});
```
{% endtab %}

{% tab title="Date-time" %}
```
await sdk.data.properties.create(newSchema.id, 
  {
    name: 'birthdate',
    configuration: {
      type: 'string',
      format: 'date-time'
    }
  }
});
```

this allows you to create a ISO formatted date-time field wich accepts rql to query on using gt,gte, lt and lte ,...&#x20;
{% endtab %}
{% endtabs %}

&#x20;All attributes required to compose the type configurations, can be found in the API reference documentation and on the JSON Schema webpage.

### Statuses

A document can be perceived as a finite-state machine, which remains in a state/status until a transition occurs. You can define a set of statuses for you document based on the expected workflow you want to build.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await sdk.data.statuses.create(newSchema.id, {
    name: 'initialStatus',
});
```
{% endtab %}
{% endtabs %}

### CreationTransition

The creation transition is the transition that is executed when you create a document. It is the only type of transition that doesn't have a `fromStatus` as there is no status to start from.

{% hint style="warning" %}
When you create new schema, by default the data service will include a **NEW** status and a creation transition towards that status. This is the reason why you wont find a create creationTransition or delete creationTransition function and only an updateCreationTransition function.
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```javascript
sdk.data.transitions.updateCreation(newSchema.id,{
    type: 'manual',
    toStatus: 'initialStatus',
    conditions: {...},
    actions: {...},
    afterActions: {...}
});
```
{% endtab %}
{% endtabs %}

For a creationTransition the type will always be set to `manual`

### Transitions

When you want to add more statuses to your document you will need to define transitions that allow you to move your document from one status to another. Normal transitions look the same as a creationTransition but these do include two additional parameters `fromStatuses`and `name`.&#x20;

A Transition occurs from one Status to another. The Statuses a Transition starts from are determined in the fromStatuses object, and the Status the Transition leads to is determined in the toStatus attribute.&#x20;

{% tabs %}
{% tab title="Javascript" %}
```javascript
sdk.data.transitions.updateCreation(newSchema.id,{
    name: 'firsTransition'
    type: 'manual',
    fromStatuses: ['initialStatus'],
    toStatus: 'secondStatus',
    conditions: {...},
    actions: {...},
    afterActions: {...}
});
```
{% endtab %}
{% endtabs %}

A Transition object is identified by its name (name) and has a specific type assigned:

#### Types

| Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manual**    | A manual transition will be triggered when the transition execution endpoint is called on the document.                                                                                                                                                                                                                                                                                                                                                                                            |
| **Automatic** | <p>An automatic transition will trigger when its conditions are met. E.g. when a document is transitioned to status <strong>A</strong> the data service will look for any automatic transitions that have status <strong>A </strong>mentioned as a fromStatus. If the conditions of that transition are met it will execute. If not the data service will go to the next automatic transition in line.</p><p><br>The sequence of the transitions will depend on the sequence of configuration.</p> |

### Transition conditions

Conditions need to be met before a transition can occur. There are three types of conditions which apply on the CreationTransition and manual Transitions:&#x20;

| Type                                | Description                                                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`                             | The transition data must match a desired form, as specified by the type configurations in the configuration attribute (inputCondition)                            |
| `initiatorHasRelationToUserInData`  | The initiator of the Transition has a specified relation (as determined in relation) to a user (as determined in userIdField) mentioned in the transition data    |
| `initiatorHasRelationToGroupInData` | The initiator of the Transition has a specified relation (as determined in relation) to a group (as determined in groupIdField) mentioned in the transition data  |

There is an additional condition which applies to all Transitions:

| Type       | Description                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `document` | The content of a document must match a desired form, as specified by the type configurations in the configuration attribute |

#### **Examples**

{% tabs %}
{% tab title="inputCondition" %}
When executing a transition on a document you can require the API client to provide a set of fields that are described in the properties of the schema and put additional restrictions on them&#x20;

```javascript
  await sdk.data.transitions.create(newSchema.id, {
    type: 'manual',
    toStatus: 'secondStatus',
    fromStatuses: ['initialStatus'],
    name: 'firstTransition',
    conditions: [
      {
        type: 'input',
        configuration: {
          type: 'object',
          properties: {
            address: {
              type: 'object',
              properties: {
                inhabited: { type: 'boolean' },
              },
              required: ['inhabited'],
            },
          },
          required: ['address'],
        },
      },
    ],
  });
```

the example above would require the API client to provide the address.inhabited property. otherwise the transition will not trigger.
{% endtab %}

{% tab title="document" %}


```javascript
  await sdk.data.transitions.create(newSchema.id, {
    type: 'manual',
    toStatus: 'secondStatus',
    fromStatuses: ['initialStatus'],
    name: 'firstTransition',
    conditions: [
      {
        type: 'input',
        configuration: {
          type: 'object',
          properties: {
            address: {
              type: 'object',
              properties: {
                inhabited: { type: 'boolean' },
              },
              required: ['inhabited'],
            },
          },
          required: ['address'],
        },
      },
    ],
  });
```
{% endtab %}

{% tab title="initiatorHasRelationToUserInData" %}


```javascript
```
{% endtab %}

{% tab title="initiatorHasRelationToGroupInData" %}


```javascript
```
{% endtab %}
{% endtabs %}

### Transition actions

You can attach actions to transitions. This way when a transition is executed and its conditions are met it will also trigger the action. In case of a Creation Transition, the action will be executed during the creation of the document.&#x20;

#### **Modifying the document**

| Action Type   | Description                          |
| ------------- | ------------------------------------ |
| `Set`         | Change the value of a specific field |
| `Unset`       | Remove one or multiple fields        |
| `AddItems`    | Add values to an array field         |
| `RemoveItems` | Removes values from an array field   |

{% hint style="info" %}
To access an element in an array or embedded documents, use the dot notation.
{% endhint %}

#### code examples

{% tabs %}
{% tab title="Set" %}

{% endtab %}

{% tab title="Unset" %}

{% endtab %}

{% tab title="AddItems" %}

{% endtab %}

{% tab title="RemoveItems" %}

{% endtab %}
{% endtabs %}

#### **Modifying document access**

Each document has a `userIds` and `groupIds` field. These field are part of determining the access policy towards that specific document depending on the general collection schema configuration.

Using actions you can modify these fields and therefore the access of the document.

| Action Type          | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `LinkCreator`        | Add the creatorId to the userIds of the document                                                               |
| `LinkUserFromData`   | Add a user id found in data of the document to the userIds of the document                                     |
| `LinkEnlistedGroups` | Add all groups where the creator of the document has a patient enlistment for to the groupIds of the document  |
| `LinkGroupFromData`  | Add a group id found in data of the document to the groupIds field of the document                             |

{% hint style="info" %}
If you like to modify the access to documents from outside the data service you can perform access modification functions on the documents itself. Read the documentation here: [#updating-access](./#updating-access "mention")
{% endhint %}

**code examples**

{% tabs %}
{% tab title="LinkCreator" %}
```
c
```
{% endtab %}

{% tab title="LinkUserFromData" %}
```
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkUserFromData',
      userIdField: '{UserIdField}', // Field in dot notation.The root is data
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="LinkEnlistedGroups" %}
```
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'LinkEnlistedGroups',
      onlyActive: true, // Optional, defaults to false
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="LinkGroupFromData" %}
```
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkGroupFromData',
      groupIdField: 'my_group_id', // Field in dot notation.The root is data
    }
  ],
  ...
});
```
{% endtab %}
{% endtabs %}

#### Other actions

| **Action Type** | Description                                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Task`          | trigger the creation of a Task in the Task Service by using the task action. Specify the functionName (which references the AWS Lambda function) and optionally extra data as key-value pairs in the data variable. |

#### **code **examples

{% tabs %}
{% tab title="Task" %}

{% endtab %}
{% endtabs %}

### Indexes

The Index object is identified by an id and a name. An index is set on a specific property in a Schema. This property is defined in the Fields object by the name and type attribute. The index is tailored with the following attributes:

| Attribute  | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| background | A boolean value to determine whether the index must be        |
| unique     | A boolean value to determine whether the index must be unique |
| sparse     | A boolean value to determine whether the index must be sparse |
| system     | A boolean value to determine whether the index must be        |

###

### Other settings

Additionally, the Data Service stores the following attributes when a new Schema is added:

#### groupSyncMode

TODO more explanation

| Value                           | Description                                                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `disabled`                      | no synchronization                                                                                                    |
| `creatorPatientEnlistments`     | TODO                                                                                                                  |
| `linkedUsersPatientEnlistments` | all the groups where the specified user is enlisted as patient will also be added or removed to or from the document. |

**code example**

{% tabs %}
{% tab title="Javascript" %}
```javascript
TODO
```
{% endtab %}
{% endtabs %}

#### **defaultLimit & maximumLimit**

TODO

**example**

## Documents&#x20;

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

### Creating a document

### Querying

### Performing updates

### Permanent delete

### Triggering transitions

### updating access

#### &#x20;Linking users

```javascript
await sdk.data.documents.linkUsers('{yourSchemaId}', '{yourDocumentId}', {
  userIds: ['{userIdToLink}'],
});
```

#### Unlink users

```javascript
await sdk.data.documents.unlinkUsers('{yourSchemaId}', '{yourDocumentId}', {
  userIds: ['{userIdToUnLink}'],
});
```

#### Linking groups

```javascript
await sdk.data.documents.linkGroups('{yourSchemaId}', '{yourDocumentId}', {
    groupIds: ['{groupIdToLink}'],
});
```

#### Unlink groups

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
* Request a list of comments: GET/{schemaId}/documents/{documentId}/comments\
