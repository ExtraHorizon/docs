# Schemas

A schema defines both the data contained and the behavior (in the form of a state machine) of the documents it holds. A Schema object is identified within the Data Service by a unique identifier (id) and contains a name (3-50 characters) and description (max 100 characters). A schema is based on:

* Permissions that determine who can access what documents,
* Statuses which define the state of the document,
* Properties which define the structure of the document,
* Transitions which can trigger actions

#### Create a new schema

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const myNewSchema = await exh.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
});
```
{% endtab %}
{% endtabs %}

## Data Access Management

In this section we discuss how you can configure access to documents. A schema contains specific attributes that define the conditions which must be met to create, view, update or delete documents.

### Access Modes

#### createMode

createMode defines the permissions needed to create a document in a schema collection.

| Mode                 | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`            | The default mode allows every logged-in user to create a new document in the collection. When no `createMode` is set, this mode will be used. |
| `permissionRequired` | Only users with `CREATE_DOCUMENTS` or `CREATE_DOCUMENTS:{schemaName}`permission have the ability to create a document.                        |

#### readMode

readMode defines the permissions needed to read a document in a schema collection

| Mode                     | Description                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `default`                | All users where their userId is in the list of userIds attached to the document or if they have a staff enlistment in a group that is in the list of groupIds of the document. |
| `allUsers`               | All users will have the permission to read the documents in the schema collection.                                                                                             |
| `enlistedInLinkedGroups` | Every user in default mode and all users that have a patient enlistment in a group that is in the list of groupIds of the document.                                            |

{% hint style="info" %}
Users that have the `VIEW_DOCUMENTS` or `VIEW_DOCUMENTS:{schemaName}`permission attached to a global role will be able to read any document regardless of the setting above.
{% endhint %}

#### updateMode

updateMode defines the permissions needed to update a document in a schema collection

| Mode                    | Description                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`               | All users where their userId is in the list of userIds attached to the document or if they have a staff enlistment in a group that is in the list of groupIds of the document |
| `creatorOnly`           | Only the user that created the document is able to update a document                                                                                                          |
| `disabled`              | Nobody can update a document                                                                                                                                                  |
| `linkedGroupsStaffOnly` | All users that have a staff enlistment in a group that is in the list of groupIds of the document.                                                                            |

{% hint style="info" %}
Users that have the UPDATE`_DOCUMENTS` or UPDATE`_DOCUMENTS:{schemaName}`permission attached to a global role will be able to update any document regardless of the setting above.
{% endhint %}

#### deleteMode

deleteMode defines the permissions needed to remove a document permanently from a schema collection.

| Mode                 | Description                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `permissionRequired` | Only users with the`DELETE_DOCUMENTS` or `DELETE_DOCUMENTS:{schemaName}`permission will be able to remove a document. \[default] |
| `linkedUsersOnly`    | All users where their userId is in the list of userIds attached to the document.                                                 |

{% hint style="info" %}
Users that have the DELETE`_DOCUMENTS` or DELETE`_DOCUMENTS:{schemaName}`permission attached to a global role will be able to delete any document regardless of the setting above.
{% endhint %}

### Access to documents through role permissions

Every permission has a global and a schema-specific variant. This allows you to define access to documents in a very granular way.

The following table lists the relevant permissions for the data service:

| Permission                                                                                                                                                                   | Description                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `VIEW_DOCUMENTS`                                                                                                                                                             | A user with this permission can view all documents in **any schema**                     |
| <p><code>VIEW_DOCUMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark></p>                                                                 | A user with this permission can view all documents in a specific schema `schemaName`     |
| `CREATE_DOCUMENTS`                                                                                                                                                           | A user with this permission can create documents **in any schema**                       |
| <p><code>CREATE_DOCUMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark></p>                                                               | A user with this permission can create documents in a specific schema `schemaName`       |
| `UPDATE_DOCUMENTS`                                                                                                                                                           | A user with this permission can update all documents **in any schema**                   |
| <p><code>UPDATE_DOCUMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark></p>                                                               | A user with this permission can update all documents in a specific schema `schemaName`   |
| `DELETE_DOCUMENTS`                                                                                                                                                           | A user with this permission can delete any document **in any schema**                    |
| <p><code>DELETE_DOCUMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark></p>                                                               | A user with this permission can delete any document in schema `schemaName`               |
| <p><code>CREATE_DOCUMENT_COMMENTS</code><br><mark style="background-color:red;">deprecated</mark></p>                                                                        | A user with this permission can create comments in any document **in any schema**        |
| <p><code>CREATE_DOCUMENT_COMMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark> <mark style="background-color:red;">deprecated</mark></p> | A user with this permission can create comments in any document in schema `schemaName`   |
| <p><code>VIEW_DOCUMENT_COMMENTS</code><br><mark style="background-color:red;">deprecated</mark></p>                                                                          | A user with this permission can view comments in any document **in any schema**          |
| <p><code>VIEW_DOCUMENT_COMMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark> <mark style="background-color:red;">deprecated</mark></p>   | A user with this permission can view comments in any document in schema `schemaName`     |
| <p><code>UPDATE_DOCUMENT_COMMENTS</code><br><mark style="background-color:red;">deprecated</mark></p>                                                                        | A user with this permission can update any document comments **in any schema**           |
| <p><code>UPDATE_DOCUMENT_COMMENTS:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark> <mark style="background-color:red;">deprecated</mark></p> | A user with this permission can update any document comments in schema `schemaName`      |
| `UPDATE_ACCESS_TO_DOCUMENT`                                                                                                                                                  | A user with this permission can update the access to any document **in any schema**      |
| <p><code>UPDATE_ACCESS_TO_DOCUMENT:{schemaName}</code><br><mark style="background-color:yellow;">since 1.1.0</mark></p>                                                      | A user with this permission can update the access to any document in schema `schemaName` |

The above mentioned permissions can be granted to users through global roles or group roles.

For more information how to add permissions to roles and roles to users, take a look at the [user service documentation](https://docs.extrahorizon.com/user-service/features/global-roles)

### Creating a schema with permissions

You can provide the permissions parameters upon creation of you new schema:

```javascript
const myNewSchema = await exh.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
    createMode: 'default',
    readMode: 'allUsers',
    updateMode: 'disabled',
    deleteMode: 'permissionRequired'
});
```

## Properties

A Schema defines the structure of a document through properties. The Properties object contains type configurations, which represent the fields that should be accepted while creating or updating a document. The structure of the type configurations themselves is inspired by [JSON Schema](https://json-schema.org).

![](https://lh3.googleusercontent.com/FqZ0yp8aT6rAhz5rP69T6qCmNwwr3eE4EZoCDQQr4bEc1Poh8zrxg\_WiBjiuzqgpFDjYJL1ker6l4fM\_qVSIzBoSlyPrk60Mnte-ITj9PY583rMbQZVYCCJEe-QlyexcROsLmMY=s0)

The Data Service supports five kinds of configurations (type attribute):

| Type      | Description                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `object`  | A container object to define multiple objects, in which each object must meet the schema defined in the properties attribute |
| `array`   | An array object in which each value must meet the schema defined by the items attribute                                      |
| `string`  | A string object of which each value must meet the schema defined by the pattern, format, enum and/or const attributes,       |
| `number`  | A number object of which each value must meet the schema defined by the enum or const attribute,                             |
| `boolean` | A boolean object of which each value must meet the schema defined by the enum or const attribute.                            |

{% tabs %}
{% tab title="Object" %}
```javascript
{
  type: 'object',
  properties: {
    my_custom_field: { type: 'string' },
  },
  additionalProperties: { type: 'string' },
  required: ['my_custom_field'],
}
```

References:

* [JSON Schema: Keywords for Applying Subschemas to Objects](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9.3.2)
* [JSON Schema Validation: Validation Keywords for Objects](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.5)
{% endtab %}

{% tab title="Array" %}
```javascript
{
  type: 'array',
  items: { type: 'string' },
  minItems: 1,
  maxItems: 10,
  contains: { type: 'string' },
}
```

Note that the `items`- property is required.

References:

* [JSON Schema: Keywords for Applying Subschemas to Arrays](https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.9.3.1)
* [JSON Schema Validation: Validation Keywords for Arrays](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.4)
{% endtab %}

{% tab title="String" %}
```javascript
{
  type: 'string',
  minLength: 1,
  maxLength: 10,
  pattern: '^[a-z]+$',
  format: 'date-time', // The only supported format is `date-time`
  enum: ['a', 'b', 'c'],
  const: 'b' // Can only be one fixed string
}
```

{% hint style="warning" %}
When the format is set to `date-time`, input is expected to be [valid ISO 8601](https://en.wikipedia.org/wiki/ISO\_8601) string (e.g.`2012 or 2012‐08‐22T14:16:05.677+02:00`).

This value is stored as an UTC Date Time String (e.g. `2012‐08‐22T12:16:05.677Z`).&#x20;

[Input conditions](schemas.md#input-condition) will operate on the input (e.g.`2012 or 2012‐08‐22T14:16:05.677+02:00`).\
[Document conditions](schemas.md#document-condition) will operate on the stored date, thus the UTC Date Time String (e.g. `2012‐08‐22T12:16:05.677Z`).
{% endhint %}

References:

* [JSON Schema Validation: Validation Keywords for Strings](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.3)
* [JSON Schema Validation: Dates, Times, and Duration](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7.3.1)
* [JSON Schema Validation: Validation Keywords for Any Instance Type](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1)
{% endtab %}

{% tab title="Number" %}
```javascript
{
  type: 'number',
  minimum: 1,
  maximum: 5,
  enum: [1, 2, 3, 4, 5],
  const: 3 // Can only be 1 number
}
```

References:

* [JSON Schema Validation: Validation Keywords for Numeric Instances](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.4)
* [JSON Schema Validation: Validation Keywords for Any Instance Type](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1)
{% endtab %}

{% tab title="Boolean" %}
```javascript
{
  type: 'boolean',
  enum: [true, false],
  const: true, // Can only be either true or false
}
```

References:

* [JSON Schema Validation: Validation Keywords for Any Instance Type](https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.6.1)
{% endtab %}
{% endtabs %}

### Adding properties to your schema

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

### Updating properties

You can update a specific property of a schema by providing the schema Id, the property path and the the json schema field configuration. The Property path makes use of the dot notation in case you are working with nested fields.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await sdk.data.properties.update(mySchema.id,'myObjectField.myStringField',{
    type:"string"
});
```
{% endtab %}
{% endtabs %}

### Removing properties

You can remove a specific property of a schema by providing the schema Id, the property path and the the json schema field configuration. The Property path makes use of the dot notation in case you are working with nested fields.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await sdk.data.properties.remove(mySchema.id,'myObjectField.myStringField',{
    type:"string"
});
```
{% endtab %}
{% endtabs %}

### Some examples

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
```javascript
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

this allows you to create a ISO formatted date-time field wich accepts RQL to query on using gt,gte, lt and lte ,...
{% endtab %}
{% endtabs %}

All attributes required to compose the type configurations, can be found in the API reference documentation and on the JSON Schema webpage.

## Statuses

A document can be perceived as a finite-state machine, which remains in a state/status until a transition occurs. You can define a set of statuses for your document based on the expected workflow you want to build.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await sdk.data.statuses.create(newSchema.id, {
    name: 'initialStatus',
});
```
{% endtab %}
{% endtabs %}

## CreationTransition

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

Currently the only supported transition type is `manual`. Other types may be added in the future.



## Transitions

When you want to add more statuses to your document you will need to define transitions that allow you to move your document from one status to another. Normal transitions look the same as a creationTransition but these do include two additional parameters `fromStatuses`and `name`.

A Transition occurs from one Status to another. The Statuses a Transition starts from are determined in the `fromStatuses` object, and the Status the Transition leads to is determined in the `toStatus` attribute.

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

### Types

| Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manual**    | A manual transition will be triggered when the [transition execution endpoint](schemas.md#triggering-transitions) is called on the document.                                                                                                                                                                                                                                                                                                                                                       |
| **Automatic** | <p>An automatic transition will trigger when its conditions are met. E.g. when a document is transitioned to status <strong>A</strong> the data service will look for any automatic transitions that have status <strong>A</strong> mentioned as a fromStatus. If the conditions of that transition are met it will execute. If not the data service will go to the next automatic transition in line.</p><p><br>The sequence of the transitions will depend on the sequence of configuration.</p> |

### Transition conditions

Conditions need to be met before a transition can occur. There are three types of conditions which apply to the `creationTransition` and Transitions with the type `manual`:

<table><thead><tr><th>Type</th><th>Description</th><th data-hidden></th></tr></thead><tbody><tr><td><code>input</code></td><td>The transition data must match a desired form, as specified by the type configurations in the <code>configuration</code> attribute.</td><td></td></tr><tr><td><code>initiatorHasRelationToUserInData</code></td><td>The initiator of the Transition has a specified relation (as determined in <code>relation</code>) to a user (as determined in <code>userIdField</code>) mentioned in the transition data</td><td></td></tr><tr><td><code>initiatorHasRelationToGroupInData</code></td><td>The initiator of the Transition has a specified relation (as determined in <code>relation</code>) to a group (as determined in <code>groupIdField</code>) mentioned in the transition data</td><td></td></tr></tbody></table>

There is an additional condition which applies to all Transitions:

| Type       | Description                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `document` | The content of a document must match a desired form, as specified by the type configurations in the `configuration` attribute |



#### Input Condition

The transition data must match a desired form, as specified by the type configurations in the `configuration` attribute.&#x20;

This Condition only applies to the `creationTransition` and Transitions with type `manual`.

**Example**

The following code creates a manual transition requiring:

* The name in the input to be a string
* The name in the input to exist

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(newSchema.id, {
    type: 'manual',
    name: 'firstTransition',
    fromStatuses: ['initialStatus'],
    toStatus: 'secondStatus',
    conditions: [
      {
        type: 'input',
        configuration: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
          required: ['name'],
        },
      },
    ],
  });
```
{% endtab %}
{% endtabs %}

#### **initiatorHasRelationToUserInData** Condition

The initiator of the Transition has a specified relation (as determined in `relation`) to a user (as determined in `userIdField`) mentioned in the transition data.&#x20;

This Condition only applies to the `creationTransition` and Transitions with type `manual`.

**Example**

The following code creates a manual transition requiring:

* The initiator of the transition to be staff of the user with id `5e9fff9d90135a2a9a718e2f`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(newSchema.id, {
    type: 'manual',
    name: 'firstTransition',
    fromStatuses: ['initialStatus'],
    toStatus: 'secondStatus',
    conditions: [
      {
        type: 'initiatorHasRelationToUserInData',
        userIdField: '5e9fff9d90135a2a9a718e2f',
        relation: 'isStaffOfTargetPatient'
      },
    ],
  });
```
{% endtab %}
{% endtabs %}

#### initiatorHasRelationToGroupInData Condition

The initiator of the Transition has a specified relation (as determined in `relation`) to a group (as determined in `groupIdField`) mentioned in the transition data.&#x20;

This Condition only applies to the `creationTransition` and Transitions with type `manual`.

**Example**

The following code creates a manual transition requiring:

* The initiator of the transition to be a staff member of the group with id `5e9fff9d90135a2a9a718e2f`.
* The initiator of the transition to have the `MY_OWN_PERMISSION` group permission.&#x20;

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(newSchema.id, {
    type: 'manual',
    name: 'firstTransition',
    fromStatuses: ['initialStatus'],
    toStatus: 'secondStatus',
    conditions: [
      {
        type: 'initiatorHasRelationToGroupInData',
        groupIdField: '5e9fff9d90135a2a9a718e2f',
        relation: 'staff',
        requiredPermission: 'MY_OWN_PERMISSION'
      },
    ],
  });
```
{% endtab %}
{% endtabs %}

#### Document Condition

The content of the existing document must match a desired form, as specified by the type configurations in the `configuration` attribute.&#x20;

This Condition applies to all transitions.

**Example**

The following code creates a manual transition requiring:

* The name in the document data to be a string
* The name in the document data to exist

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(newSchema.id, {
    type: 'manual',
    name: 'firstTransition',
    fromStatuses: ['initialStatus'],
    toStatus: 'secondStatus',
    conditions: [
      {
        type: 'document',
        configuration: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
              required: ['name'],
            },
          },
          required: ['data'],
        },
      },
    ],
  });
```
{% endtab %}
{% endtabs %}

### Transition actions

You can attach actions to transitions. This way when a transition is executed and its conditions are met it will also trigger the action. In case of a Creation Transition, the action will be executed during the creation of the document.

#### **Modifying the document**

| Action Type   | Description                          |
| ------------- | ------------------------------------ |
| `set`         | Change the value of a specific field |
| `unset`       | Remove one or multiple fields        |
| `addItems`    | Add values to an array field         |
| `removeItems` | Removes values from an array field   |

{% hint style="info" %}
To access an element in an array or embedded documents, use the dot notation.
{% endhint %}

#### **Modifying document access**

Each document has a `userIds` and `groupIds` field. These field are part of determining the access policy towards that specific document depending on the general collection schema configuration.

Using actions you can modify these fields and therefore the access of the document.

| Action Type          | Description                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `linkCreator`        | Add the creatorId to the userIds of the document                                                              |
| `linkUserFromData`   | Add a user id found in data of the document to the userIds of the document                                    |
| `linkEnlistedGroups` | Add all groups where the creator of the document has a patient enlistment for to the groupIds of the document |
| `linkGroupFromData`  | Add a group id found in data of the document to the groupIds field of the document                            |

{% hint style="info" %}
If you like to modify the access to documents from outside the data service you can perform access modification functions on the documents itself. Read the documentation here: [#updating-access](schemas.md#updating-access "mention")
{% endhint %}

**code examples**

{% tabs %}
{% tab title="linkCreator" %}
```typescript
await exh.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkCreator'
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="linkUserFromData" %}
```typescript
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkUserFromData',
      userIdField: '{UserIdField}', // Field in dot notation. The root is data
    }
  ],
  ...
})
```
{% endtab %}

{% tab title="linkEnlistedGroups" %}
```typescript
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkEnlistedGroups',
      onlyActive: true, // Optional, defaults to false
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="LinkGroupFromData" %}
```typescript
await sdk.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'linkGroupFromData',
      groupIdField: 'my_group_id', // Field in dot notation. The root is data
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

**code examples**

{% tabs %}
{% tab title="Task" %}
```typescript
await exh.data.transitions.create(newSchema.id, {
  ...,
  actions: [
    {
      type: 'task',
      functionName: 'myTaskServiceFunctionName'
    }
  ],
  ...
})
```
{% endtab %}
{% endtabs %}

### After Actions

`afterActions` can be used to execute an action once a transition is completed. This is helpful when you want to look at the result of transition itself; compared to the normal actions that are executed during the transition.&#x20;

## Indexes

The Index object is identified by an id and a name. An index is set on a specific property in a Schema. This property is defined in the Fields object by the name and type attribute. The index is tailored with the following attributes:

| Attribute  | Description                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| background | A boolean value to determine whether the index must be built in the background; meaning it will take longer but active read and write operations are prioritized. |
| unique     | A boolean value to determine whether the index must be unique                                                                                                     |
| sparse     | A boolean value to determine whether the index must be sparse                                                                                                     |
| system     | A boolean value to determine whether the index must be                                                                                                            |

## Other settings

### groupSyncMode

The `groupIds` field allows to define which groups should get access to the document. The users that have a staff enlistment in a group that is in the `groupIds` field will get access to the document. The level of access depends on the `readMode`, `writeMode`, `updateMode` and `deleteMode` values.

When a `groupSyncMode` is configured, the data service will automatically update the `groupIds` field of documents in the schema depending on changes in the user service. The table below lists the different options.

| Mode                            | Description                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                      | The `groupIds` field is not automatically updated.                                                                                                  |
| `creatorPatientEnlistments`     | All the groups where the user that created the document (`creatorId`) is enlisted as a patient will be automatically added to the `groupIds` field. |
| `linkedUsersPatientEnlistments` | The groups that contain the users defined in the `userIds` as a patient are added to the `groupIds` field.                                          |

The synchronization is applied retroactively. It will be applied to all documents in a schema. That includes the documents that were created before configuring this setting and the documents that were created before the user was added to a group.

#### Example 1 • Allow doctors to access measurements created by patients

When you define a measurements schema, the patients will be the users creating the measurement documents. The `creatorId` of a measurement will be set to the patient `userId`.

To automatically give the appropriate doctors access to the measurements of their patients, you can set the `groupSyncMode` to `creatorPatientEnlistments`.

#### Example 2 • Allow doctors to read lab results of patients

Consider the use case where patients can have their saliva tested at kiosks that are deployed in pharmacies. When patients provide a specimen in the kiosk, the kiosk will process the specimen and upload the results. The corresponding document is created by the kiosk, thus `creatorId` of the document will not correspond to the `userId` of the patient.

To give doctors access to the results, set the `groupSyncMode` to `linkedUsersPatientEnlistments` and configure the kiosk to add the `userId` of the patient in the `userIds` field of the document.

**Code Example**

{% tabs %}
{% tab title="Javascript" %}
```javascript
const myNewSchema = await exh.data.schemas.create({
    ...
    groupSyncMode:'creatorPatientEnlistments'
    ...
});
```
{% endtab %}
{% endtabs %}

### **defaultLimit & maximumLimit**

The defaultLimit and maximumLimit refer to the number of documents that are returned to you when you execute a query. Pagination is crucial in keeping you API fast and responsive. By default the **defaultLimit** is set to 20 documents and the **maximumLimit** is set to 100 documents. We recommend to keep these settings. Only in very specific use cases would it be reasonable to change these settings.

| setting          |                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **defaultLimit** | Defaults to **20**. Determines the number of documents returned when no RQL limit parameter is provided.                                  |
| **maximumLimit** | Defaults to **100.** Determines the number of documents returned when an RQL limit parameter is provided and the maximumLimit is crossed. |

{% tabs %}
{% tab title="Javascript" %}
```javascript
const myNewSchema = await exh.data.schemas.update(mySchema.id,{
    ...
    defaultLimit:20,
    maximumLimit:200,
    ...
});
```
{% endtab %}
{% endtabs %}

## Removing a schema

You can only remove disabled schema's. Removing a schema removes all documents in that schema collection. Removed documents are non retrievable.

```javascript
await exh.data.schemas.enable('{yourSchemaId}');
```

### **Enabling/disabling a schema**

As the removal of a schema is something that you want to handle with great care the service first requires you to disable a schema. When a schema is disabled creation of new documents is disabled and no changes are allowed to existing documents.

```javascript
await exh.data.schemas.disable('{yourSchemaId}');
```

You can enable a disabled schema the same way:

```javascript
await exh.data.schemas.enable('{yourSchemaId}');
```

##
