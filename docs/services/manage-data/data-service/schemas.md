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
const mySchema = await exh.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
});
```
{% endtab %}
{% endtabs %}

## Data Access Management

In this section we discuss how you can configure access to documents. A schema contains specific attributes that define the conditions which must be met to create, view, update or delete documents.

### Access via permissions

Regardless of how the [access modes](schemas.md#access-via-schema-access-modes) (described below) are set, a user is always able to perform an operation on a document if they are assigned a specific permission.  This permission can come from a global role of the user or a staff enlistment role the user has in the group of the document.

<table data-full-width="false"><thead><tr><th width="329">Action</th><th>Permission</th></tr></thead><tbody><tr><td>Create a document</td><td><p><code>CREATE_DOCUMENTS</code> </p><p><code>CREATE_DOCUMENTS:{schemaName}</code></p></td></tr><tr><td>View a document</td><td><p><code>VIEW_DOCUMENTS</code></p><p><code>VIEW_DOCUMENTS:{schemaName}</code></p></td></tr><tr><td>Update a document<br><em>(Includes transitioning a document)</em></td><td><p><code>UPDATE_DOCUMENTS</code></p><p><code>UPDATE_DOCUMENTS:{schemaName}</code></p></td></tr><tr><td>Transition a document</td><td><p><code>TRANSITION_DOCUMENTS</code> </p><p><code>TRANSITION_DOCUMENTS:{schemaName}</code></p><p><code>TRANSITION_DOCUMENTS:{schemaName}:{transitionName}</code></p></td></tr><tr><td>Delete a document</td><td><p><code>DELETE_DOCUMENTS</code></p><p><code>DELETE_DOCUMENTS:{schemaName}</code></p></td></tr><tr><td>Update linked users and groups<br><em>(Only as a global permission)</em></td><td><p><code>UPDATE_ACCESS_TO_DOCUMENT</code></p><p><code>UPDATE_ACCESS_TO_DOCUMENT:{schemaName}</code></p></td></tr></tbody></table>

### Access via schema access modes

#### Access Mode Properties

Schemas allow you to set any of the following properties to control who has access to perform certain actions on the documents for the schema.

| Mode         | Action                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------- |
| `createMode` | Defines who has access to create documents for the schema                                 |
| `readMode`   | Defines who has access to view documents for the schema                                   |
| `updateMode` | Defines who has access to update documents for the schema _(this includes transitioning)_ |
| `deleteMode` | Defines who has access to delete documents permanently from the schema                    |

#### Access Mode Values

Access mode values can either be a general access mode or a combination of relational access mode values as shown in the code snipped below.

```json
{
    "name": "myNewSchema",
    "description": "This is my new schema",
    "createMode": "allUsers",
    "readMode": ["linkedGroupPatients", "linkedGroupStaff"],
    "updateMode": ["creator", "linkedUsers"],
    "deleteMode": "permissionRequired"
}
```

#### General access mode values

The general access mode values determine if a user requires permission to perform the action for the Schema. A general access mode value is provided as one of the following strings.&#x20;

<table><thead><tr><th width="358">General Access Mode Value</th><th>Description</th></tr></thead><tbody><tr><td><code>"permissionRequired"</code></td><td>Only users with the correct permission have the ability to perform the action. </td></tr><tr><td><code>"allUsers"</code></td><td>All users will have the permission to perform the action on the documents in the schema collection. Regardless of their role or their permissions.</td></tr></tbody></table>

#### Relational access mode values

The relational access mode values determine if a user has the correct relation to the document to perform the action.&#x20;

Relational access mode values are supplied as an array. When multiple relational access mode values are supplied, a user adhering to any relation in this array is allowed to perform the action on the document.

<table data-full-width="false"><thead><tr><th width="358">Relational Access Mode Value</th><th>Description</th></tr></thead><tbody><tr><td><code>["creator"]</code></td><td>The user that created the document can perform the action. </td></tr><tr><td><code>["linkedUsers"]</code></td><td>All users where their user id is in the list of <code>userIds</code> of the document can perform the action.</td></tr><tr><td><code>["linkedGroupStaff"]</code></td><td>All users that have a staff enlistment in a group that is in the list of <code>groupIds</code> of the document can perform the action.</td></tr><tr><td><code>["linkedGroupPatients"]</code></td><td>All users that have a patient enlistment in a group that is in the list of <code>groupIds</code> of the document can perform the action.</td></tr></tbody></table>

#### Access Mode Compatibility Matrix

The following table shows the supported access mode values per each access mode.\


<table data-full-width="true"><thead><tr><th width="301"> </th><th>createMode</th><th>readMode</th><th>updateMode</th><th>deleteMode</th></tr></thead><tbody><tr><td><code>"permissionRequired"</code></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><code>"allUsers"</code></td><td>✅</td><td>✅</td><td></td><td></td></tr><tr><td><code>["creator"]</code></td><td></td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><code>["linkedUsers"]</code></td><td></td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><code>["linkedGroupPatients"]</code></td><td></td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td><code>["linkedGroupStaff"]</code></td><td></td><td>✅</td><td>✅</td><td>✅</td></tr></tbody></table>

#### Legacy Access Modes

{% hint style="warning" %}
**The following access modes are deprecated**&#x20;

Listed below are the deprecated values with their current equivalent
{% endhint %}

#### createMode

<table><thead><tr><th width="298">Legacy Access Mode</th><th>Access Mode</th></tr></thead><tbody><tr><td><code>"default"</code></td><td><code>"allUsers"</code></td></tr></tbody></table>

#### readMode

<table><thead><tr><th width="294">Legacy Access Mode</th><th>Access Mode</th></tr></thead><tbody><tr><td><code>"default"</code> </td><td><code>["linkedUsers","linkedGroupStaff"]</code></td></tr><tr><td><code>"enlistedInLinkedGroups"</code></td><td><code>["linkedGroupPatients","linkedGroupStaff"]</code></td></tr></tbody></table>

#### updateMode

<table><thead><tr><th width="303">Legacy Access Mode</th><th>Access Mode</th></tr></thead><tbody><tr><td><code>"default"</code></td><td><code>["linkedUsers","linkedGroupStaff"]</code></td></tr><tr><td><code>"creatorOnly"</code></td><td><code>["creator"]</code></td></tr><tr><td><code>"disabled"</code></td><td><code>"permissionRequired"</code></td></tr><tr><td><code>"linkedGroupsStaffOnly"</code></td><td><code>["linkedGroupStaff"]</code></td></tr></tbody></table>

#### deleteMode

<table><thead><tr><th width="306">Legacy Access Mode</th><th>Access Mode</th></tr></thead><tbody><tr><td><code>"linkedUsersOnly"</code></td><td><code>["linkedUsers","linkedGroupStaff"]</code></td></tr></tbody></table>

## Creating a schema

You can provide a name, description and the access modes upon creation of a schema:

```javascript
await exh.data.schemas.create({
    name: 'Example Schema',
    description: 'The first schema I created',
    createMode: 'allUsers',
    readMode: ['linkedGroupPatients', 'linkedGroupStaff'],
    updateMode: ['creator', 'linkedUsers'],
    deleteMode: 'permissionRequired'
});
```

## Properties

A Schema defines the structure of a document through properties. The Properties object contains type configurations, which represent the fields that should be accepted while creating or updating a document. The structure of the type configurations themselves is inspired by [JSON Schema](https://json-schema.org).



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
When the format is set to `date-time`, input is expected to be [valid ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string (e.g.`2012 or 2012‐08‐22T14:16:05.677+02:00`).

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
await exh.data.properties.create(mySchema.id, {
  name: 'myFirstProperty',
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
await exh.data.properties.update(
  mySchema.id,
  'myObjectField.myStringField',
  { type: 'string' }
);
```
{% endtab %}
{% endtabs %}

### Removing properties

You can remove a specific property of a schema by providing the schema Id, the property path and the the json schema field configuration. The Property path makes use of the dot notation in case you are working with nested fields.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await exh.data.properties.remove(
  mySchema.id,
  'myObjectField.myStringField',
  { type: 'string' }
);
```
{% endtab %}
{% endtabs %}

### Some examples

you can also make more complex objects and array's of objects.

{% tabs %}
{% tab title="Object example" %}
```javascript
await exh.data.properties.create(mySchema.id, {
  name: 'address',
  configuration: {
    type: 'object',
    properties: {
      street: {
        type: 'string',
        minLength: 1,
        pattern: '^[a-z]+$'
      },
      number: {
        type: 'number',
        minimum: 1,
        maximum: 300
      },
      inhabited: {
        type: 'boolean',
        enum: [true, false]
      },
      residents: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 10
      }
    }
  }
});
```
{% endtab %}

{% tab title="Array example" %}
```javascript
await exh.data.properties.create(mySchema.id, {
  name: 'address.residents',
  configuration: {
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      maxItems: 10
    }
  }
});
```
{% endtab %}

{% tab title="Date-time" %}
```javascript
await exh.data.properties.create(mySchema.id, {
  name: 'birthdate',
  configuration: {
    type: 'string',
    format: 'date-time'
  }
});
```

this allows you to create a ISO formatted date-time field which accepts RQL to query on using gt,gte, lt and lte ,...
{% endtab %}
{% endtabs %}

All attributes required to compose the type configurations, can be found in the API reference documentation and on the JSON Schema webpage.

## Statuses

A document can be perceived as a finite-state machine, which remains in a state/status until a transition occurs. You can define a set of statuses for your document based on the expected workflow you want to build.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await exh.data.statuses.create(mySchema.id, {
    name: 'initialStatus',
});
```
{% endtab %}
{% endtabs %}

## CreationTransition

The creation transition is the transition that is executed when you create a document. It is the only type of transition that doesn't have a `fromStatuses` field as there is no status to start from.

{% hint style="info" %}
When you create a new schema, by default the Data Service will include a status named `"new"` and a creation transition towards that status.
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```javascript
await exh.data.transitions.updateCreation(mySchema.id, {
  type: 'manual',
  toStatus: 'initialStatus',
  conditions: [...],
  actions: [...],
  afterActions: [...]
});
```
{% endtab %}
{% endtabs %}

Currently the only supported transition type is `manual`. Other types may be added in the future.



## Transitions

When you want to add more statuses to your document you will need to define transitions that allow you to move your document from one status to another. Normal transitions look the same as a creationTransition but these do include two additional parameters `fromStatuses`and `name`.

A Transition occurs from one Status to another. The Statuses a Transition is able to starts from are determined in the `fromStatuses` array, and the Status the Transition leads to is determined in the `toStatus` attribute.

{% tabs %}
{% tab title="Javascript" %}
```javascript
await exh.data.transitions.updateCreation(mySchema.id, {
  name: 'firsTransition'
  type: 'manual',
  fromStatuses: ['initialStatus'],
  toStatus: 'secondStatus',
  conditions: [...],
  actions: [...],
  afterActions: [...]
});
```
{% endtab %}
{% endtabs %}

A Transition object is identified by its name (name) and has a specific type assigned:

### Types

| Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manual**    | A manual transition will be triggered when the [transition execution endpoint](schemas.md#triggering-transitions) is called on the document.                                                                                                                                                                                                                                                                                                                                                                     |
| **Automatic** | <p>An automatic transition will trigger when its conditions are met. E.g. when a document is transitioned to status <strong>A</strong> the data service will look for any automatic transitions that have status <strong>A</strong> mentioned in <code>fromStatuses</code>. If the conditions of that transition are met it will execute. If not, the Data Service will go to the next automatic transition in line.</p><p><br>The sequence of the transitions will depend on the sequence of configuration.</p> |

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
await exh.data.transitions.create(mySchema.id, {
  ...,
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
  ...
});
```
{% endtab %}
{% endtabs %}

#### **initiatorHasRelationToUserInData** Condition

The initiator of the Transition has a specified relation (as determined in `relation`) to a user (as determined in `userIdField`) mentioned in the transition data.

The only valid value of the `relation` field is `isStaffOfTargetPatient`. The initiator must have at least one staff enlistment for the same group the targeted user has a patient enlistment.

This Condition only applies to the `creationTransition` and Transitions with type `manual`.

**Example**

The following code creates a manual transition for which:

* The targeted user is determined by the `myPatientId` data field.
* The initiator of the transition must be a staff member from the same group to which the targeted user is a patient.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  conditions: [
    {
      type: 'initiatorHasRelationToUserInData',
      userIdField: 'myPatientId',
      relation: 'isStaffOfTargetPatient',
    },
  ],
  ...
});
```
{% endtab %}
{% endtabs %}

#### initiatorHasRelationToGroupInData Condition

The initiator of the Transition has a specified relation (as determined in `relation`) to a group (as determined in `groupIdField`) mentioned in the transition data.&#x20;

The value for the `relation` field can either be:

* &#x20;`staff`: The initiator must have a staff enlistment for the target group
* `patient`: The initiator must have a patient enlistment for the target group

The optional field `requiredPermission` is only used when the `relation` is set to `staff`. When supplied the initiator must not only have a staff enlistment with the targeted group, but also a role assigned within that group with the specified permission.&#x20;

&#x20;This Condition only applies to the `creationTransition` and Transitions with type `manual`.

**Example**

The following code creates a manual transition for which:

* The targeted group is determined by the `myGroupId` data field.
* The initiator of the transition must be a staff member of the targeted group.
* The initiator of the transition must have the `MY_OWN_PERMISSION` group permission.&#x20;

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  conditions: [
    {
      type: 'initiatorHasRelationToGroupInData',
      groupIdField: 'myGroupId',
      relation: 'staff',
      requiredPermission: 'MY_OWN_PERMISSION',
    },
  ],
  ...
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
await exh.data.transitions.create(mySchema.id, {
    ...,
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

| Action Type   | Description                           |
| ------------- | ------------------------------------- |
| `set`         | Change the value of a specific field. |
| `unset`       | Remove one or multiple fields.        |
| `addItems`    | Add values to an array field.         |
| `removeItems` | Removes values from an array field    |

{% hint style="info" %}
To access an element in an array or embedded documents, use the dot notation.
{% endhint %}

**code examples**

{% tabs %}
{% tab title="set" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'set',
      field: 'myField',
      value: 'myValue'
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="unset" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'unset',
      fields: ['myField', 'otherField']
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="addItems" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'addItems',
      field: 'myField',
      values: ['item1', 'item2']
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="removeItems" %}
```javascript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'removeItems',
      field: 'myField',
      values: ['item1', 'item2']
    }
  ],
  ...
});
```
{% endtab %}
{% endtabs %}

#### **Modifying document access**

Each document has a `userIds` and `groupIds` field. These field are part of determining the access policy towards that specific document depending on the general collection schema configuration.

Using actions you can modify these fields and therefore the access of the document.

| Action Type          | Description                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `linkCreator`        | Add the `creatorId` to the `userIds` of the document                                                            |
| `linkUserFromData`   | Add a user id found in data of the document to the `userIds` of the document                                    |
| `linkEnlistedGroups` | Add all groups where the creator of the document has a patient enlistment for to the `groupIds` of the document |
| `linkGroupFromData`  | Add a group id found in data of the document to the `groupIds` field of the document                            |

{% hint style="info" %}
If you like to modify the access to documents from outside the data service you can perform access modification functions on the documents itself. Read the documentation here: [Data Access Management](schemas.md#data-access-management)
{% endhint %}

**code examples**

{% tabs %}
{% tab title="linkCreator" %}
```typescript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'linkCreator',
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="linkUserFromData" %}
```typescript
await sdk.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'linkUserFromData',
      userIdField: '{UserIdField}', // Field in dot notation. The root is data
    }
  ],
  ...
});
```
{% endtab %}

{% tab title="linkEnlistedGroups" %}
```typescript
await sdk.data.transitions.create(mySchema.id, {
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
await sdk.data.transitions.create(mySchema.id, {
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

| **Action Type** | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `task`          | <p>Trigger the creation of a Task in the Task Service. Specify the <code>functionName</code>, and optionally the <code>priority</code> (the priority assigned to the Task in the Task Service) or extra data as key-value pairs in the <code>data</code> variable.<br><br>When the Task is created, the system will add a <code>schemaId</code> and <code>documentId</code> variable to the <code>data</code> object, making it easier for the Function to identify for which Schema / Document the task was created.</p> |

**code examples**

{% tabs %}
{% tab title="Task" %}
```typescript
await exh.data.transitions.create(mySchema.id, {
  ...,
  actions: [
    {
      type: 'task',
      functionName: 'myTaskServiceFunctionName',
      priority: 1,
      data: {
        myExtraKey: "My Extra Value",
      }
    }
  ],
  ...
});
```
{% endtab %}
{% endtabs %}

#### After actions

Next to the list of `actions` you can also choose to define an action in the `afterActions` field.

Actions in the `actions` list are executed during the transition process. An after action however, only starts once a transition is fully completed (including potential automatic follow-up transitions). Since modifying a document during the transition process is not permitted, `afterActions` might be useful for triggering a `task` action that needs to perform additional modification to the document.

Currently only the `task` action is supported as an after action.

**code examples**

{% tabs %}
{% tab title="Task" %}
```typescript
await exh.data.transitions.create(mySchema.id, {
  ...,
  afterActions: [
    {
      type: 'task',
      functionName: 'myTaskServiceFunctionName',
    }
  ],
  ...
});
```
{% endtab %}
{% endtabs %}

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
await exh.data.schemas.update(mySchema.id, {
    groupSyncMode: 'creatorPatientEnlistments',
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
await exh.data.schemas.update(mySchema.id, {
  defaultLimit: 20,
  maximumLimit: 200,
});
```
{% endtab %}
{% endtabs %}

## Removing a schema

You can only remove disabled schema's. Removing a schema removes all documents in that schema collection. Removed documents are non retrievable.

```javascript
await exh.data.schemas.remove(mySchema.id);
```

### **Enabling/disabling a schema**

As the removal of a schema is something that you want to handle with great care the service first requires you to disable a schema. When a schema is disabled creation of new documents is disabled and no changes are allowed to existing documents.

```javascript
await exh.data.schemas.disable(mySchema.id);
```

You can enable a disabled schema the same way:

```javascript
await exh.data.schemas.enable(mySchema.id);
```

##
