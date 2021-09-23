---
description: >-
  The Extra Horizon Data Service gives you the ability to define data models
  specifically for your applications needs and make them interactive by
  attaching them to automation workflows.
---

# Data Service

## **Intro**

Data is managed using structured documents, written in JSON. These documents rely on data Schemas which determine the structure, behavior, and logic of the documents in a schema collection. The purpose of a data schema is twofold:

1. **Define Data structure** Data Schemas define the structure of a document using properties. This ensures uniform structuring of documents across the service and provides input validation for API interactions. Data structure definition in schemas are inspired by [JSON-schemas](http://json-schema.org/) and adhere to the same syntax.
2. **Define Behaviour logic** Data Schemas define the behavior logic of a document using states and transitions. When a document transitions from one status to another, actions are triggered such as sending an email or running a small piece of code in other services. 

## Schema's

A schema defines both the data contained and the behavior \(in the form of a state machine\) of the documents it holds. A Schema object is identified within the Data Service by a unique identifier \(id\) and contains a name and description. A Schema is based on:

* Permissions that determine who can access what documents,
* Statuses which define the state of the document,
* Properties which define the structure of the document,
* Transitions which can trigger actions

#### Create a new schema

{% tabs %}
{% tab title="JavaScript" %}
```text
const myNewSchema = await sdk.data.schemas.create({
    name: 'myNewSchema',
    description: 'This is my new schema',
});
```
{% endtab %}

{% tab title="curl" %}
```text
TODO
```
{% endtab %}
{% endtabs %}

### Permissions

A schema contains some specific attributes which define the conditions which must be met to create \(createMode\), view \(readMode\), update \(updateMode\) or delete \(deleteMode\) a document. The required conditions combined with the required permissions for each endpoint can be found in the API reference documentation. 

#### createMode

createMode defines the permissions needed to create a document in a schema collection.

| Mode | Description |
| :--- | :--- |
| `DEFAULT` | The default mode allows every logged-in user to create a new document in the collection. If you don't specify the createMode during schema creation it will by default end up in this mode. |
| `PERMISSIONREQUIRED` | Only people with the`CREATE_DOCUMENTS`will have the permission to create a document. |

#### readMode

readMode defines the permissions need to read a document in a schema collection

| Mode | Description |
| :--- | :--- |
| `DEFAULT` | All users where their userId is in the list of userIds attached to the document or if they have a staff enlistment in a group that is in the list of groupIds of the document |
| `ALLUSERS` | All users will have the permission to read the documents in the schema collection. |
| `ENLISTEDINLINKEDGROUPS` | Every user in default mode and all users that have a patient enlistment in a group that is in the list of groupIds of the document. |

#### updateMode

#### deleteMode

Additionally, the Data Service stores the following attributes when a new Schema is added:

* The synchronization options \(groupSyncMode\):
  * disabled: no synchronization,
  * creatorPatientEnlistments: …
  * linkedUsersPatientEnlistments: all the groups where the specified user is enlisted as patient will also be added or removed to or from the document.
* Limits for returning items \(defaultLimit and MaximumLimit\),
* The time of creation and of the latest update of the Schema object \(timestamps\).

### Properties

A Schema defines the structure of a document through properties. The Properties object contains type configurations, which represent the fields which should be accepted while creating or updating a document. The structure of the type configurations themselves is inspired by [JSON Schema](https://json-schema.org/). 

![](https://lh3.googleusercontent.com/FqZ0yp8aT6rAhz5rP69T6qCmNwwr3eE4EZoCDQQr4bEc1Poh8zrxg_WiBjiuzqgpFDjYJL1ker6l4fM_qVSIzBoSlyPrk60Mnte-ITj9PY583rMbQZVYCCJEe-QlyexcROsLmMY=s0)

The Data Service supports five kinds of configurations \(type attribute\): 

* object: A container object to define multiple objects, in which each object must meet the schema defined in the properties attribute,
* array: An array object in which each value must meet the schema defined by the items attribute,
* string: A string object of which each value must meet the schema defined by the pattern, format, enum and/or const attributes,
* number: A number object of which each value must meet the schema defined by the enum or const attribute,
* boolean: A boolean object of which each value must meet the schema defined by the enum or const attribute.

Each object also contains a queryable attribute, which …. . 

The following example illustrates the use of type configurations:

```text
"address": {
  type: 'object',
  properties: {
    street: {type: 'string', minLength: 1, pattern: '^[a-z]+$'},
    number: {type: 'number', minimum: 1, maximum: 300},
    inhabited: {type: 'boolean', enum: [true, false]},
    residents: {type: 'array', items: {type: 'string'}, minItems: 1, maxItems: 10}
  },
  additionalProperties: false,
  required: ['street', 'number']
}
```

 All attributes required to compose the type configurations, can be found in the API reference documentation and on the JSON webpage.

### Statuses and transitions

A document can be perceived as a finite-state machine, which remains in a state/status until a transition occurs. The Data Service distinguishes two types of Transition objects:

* Transition: the default transition object,
* Creation Transition: a specialized form of the default transition object which determines to which status the document should transition after creation.

![](https://lh5.googleusercontent.com/NxkZDy4_TPSP0EpaVcBdo45xrA85Y2YfH1iF3LxuVwz70Fk7pNWYjXTckhOLxdFo1pXXkA19M9mjVL4H82CabJvwm9tPnQKjKE00RFBlTmWjXIN1sR8J2p74edUE1D21xix7PlU=s0)A Transition object is identified by its name \(name\) and has a specific type assigned:

* manual:
* automatic: 

A Transition occurs from one Status to another. The Statuses a Transition starts from are determined in the fromStatuses object, and the Status the Transition leads to is determined in the toStatus attribute. Creation Transitions have no fromStatuses object, as they start from nothing, and no name, as they …. Transitions only occur when conditions are met and subsequently perform actions. 

#### Transition conditions

Conditions need to be met before a transition can occur. There are three types of conditions which apply on the Creation Transition and manual Transitions: 

* The transition data must match a desired form, as specified by the type configurations in the configuration attribute \(inputCondition\),
* The initiator of the Transition has a specified relation \(as determined in relation\) to a user \(as determined in userIdField\) mentioned in the transition data \(initiatorHasRelationToUserInDataCondition\),
* The initiator of the Transition has a specified relation \(as determined in relation\) to a group \(as determined in groupIdField\) mentioned in the transition data \(initiatorHasRelationToGroupInDataCondition\).

There is an additional condition which applies to all Transitions:

* The content of a document must match a desired form, as specified by the type configurations in the configuration attribute \(documentCondition\),

All attributes required to compose the transition conditions, can be found in the API reference documentation.

#### Transition actions

An action will trigger operations \(such as calling endpoints in other Services\). In case of a Creation Transition, the action will be executed during the creation of the document. 

![](https://lh3.googleusercontent.com/s_PR6dyeDHvYNWQh65hIgxtnK18qVffFs4CNofNCJPcK4wpFiatk9Ht9o9Zc0ijAo62pVJrPLbKHs6jfO7Q7sWXYSQ6Ixknul2hXAyhq3zhRVJ-SpqeLG5wVbVlzD9c6eR_sMVI=s0)

The transition actions include changing the data of the document:

* Change the value of a specific field with the Set action,
* Remove one or multiple fields with the Unset action,
* Add values to a field with the AddItems action,
* Removes values from a field with the RemoveItems action.

Tip: To access an element in an array or embedded documents, use the dot notation.

Not only data, but also root elements \(user ids and group ids\) are changeable with the transition actions:

* Add the creatorId to the userIds of the document with the LinkCreator action,
* Add a user id found in data of the document to the userIds of the document with the LinkUserFromData action, 
* Add all groups where the creator of the document has a patient enlistment for to the groupIds of the document with the LinkEnlistedGroups action,
* Add a group id found in data of the document to the groupIds field of the document with the LinkGroupFromData action.

Note: An enlistment is an object that connects a User to a specific group by means of the group\_id. There are two types of enlistments: PatientEnlistment and StaffEnlistment. For more information see the User Service.

The delay action is used to delay a transition by a specified amount of time. This action is usually used as a test to validate the correct handling of the lock on documents while transitions are executing. 

Transition actions can also trigger the creation of a Task in the Task Service by using the task action. Specify the functionName \(which references the AWS Lambda function\) and optionally extra data as key-value pairs in the data variable. For more information see the Task Service.

Lastly, the Data Service supports some FibriCheck specific actions:

* Create a measurement\_reviewed notification in which the reviewer is the creator of the document with the measurementReviewedNotification action, 
* Trigger the Algo Planner Service to check for new measurements to run the algorithm on with the notifyAlgoQueueManager action.

For more information on these services, see the Notification Service and Algo Planner Service. All attributes required to compose the transition actions, can be found in the API reference documentation.

#### Documents 

After the creation of a Schema, a document can be created which adheres to the Schema. A document is identified by an id and contains data as defined by the properties field in the Schema. Furthermore, the object contains the following attributes:

* The status the Document resides in \(all statuses the document can reside in are determined by the Statuses object in the Schema object the Document adheres to\),
* The ids of the user currently authenticated \(userId\) and the groups the document is linked to \(groupIds\),
* The number of comments linked to the document \(commentCount\), 
* The time of creation, of transition and of the latest update of the Document object \(timestamps and transitionLock\).

![](https://lh5.googleusercontent.com/XyPnDmjLZd-6Cr3Dvfi3vIot6qYGHdKOGSv-WFDVICqfEmG39Kn_cJGBVSTEgW6j9Y93UZ3hS6mrMOu2OvUtVsrGJXEDEYBOZiIK0Cc4WuL8YTR1buAOe1BItcZHdxYdNSFWwTM=s0)

#### Comments

Comments can be linked to documents. A Comment object is identified by an id, contains text \(text\) and is linked to a Schema \(schemaId\). Furthermore, the object contains the following attributes:

* The id of the measurement system \(measurementId\) and of the user currently authenticated \(userId\),
* The time of creation and of the latest update of the Comment object \(timestamps\).

![](https://lh5.googleusercontent.com/WptW1_9Jhl2kesLY46a8R_1FrRjpbNJqgPI9DJ4W6g-EG4F7D7p663Yw8oeKh_LX-HKHKilFVTRrx3xER9RppsXZkTSSVmD64O3wFSMMoEc3snHkBU3GPLJ5vPL8anOK4-B2THU=s0)





### Conditions

### Actions

### Indexes

The Index object is identified by an id and a name. An index is set on a specific property in a Schema. This property is defined in the Fields object by the name and type attribute. The index is tailored with the following attributes:

* A boolean value to determine whether the index must be … \(background\),
* A boolean value to determine whether the index must be unique \(unique\),
* A boolean value to determine whether the index must be sparse \(sparse\), 
* A boolean value to determine whether the index must be … \(system\).

![](https://lh3.googleusercontent.com/6HdFlAycO47FP893W7yNt4h7-oh0nMvCGsqXonvRw1pX2viBY15VIqOtUu2v89S5v2nQriwx6Qenqw9xW1tZSdXGv5nhsOaAVsrSNRTLQNQ4-eCG8E7xwchX6zBy22YtNEsbg6s=s0)

## Endpoints

This section gives an overview of the available Data Service endpoints. The full descriptions, including the required conditions, permissions and/or scopes, can be found in the API reference documentation.

#### I. Getting started with the Data Service

Creating a document

1. Create a schema: POST/
2. Enable the schema: POST/{schemaId}/enable
3. Create properties: POST/{schemaId}/properties
4. Create statuses: POST/{schemaId}/statuses 
5. Create transitions: POST/{schemaId}/transitions 
6. Create an index: POST/{schemaId}/indexes
7. Create the document: POST/{schemaId}/documents
8. Link users to a document: POST/{schemaId}/documents/{documentId}/linkUsers
9. Link groups to a document: POST/{schemaId}/documents/{documentId}/linkGroups
10. Create comments: POST/{schemaId}/documents/{documentId}/comments

#### II. Document management

General create, update and delete endpoints

* Create a schema: POST/
* Update a schema: PUT/{schemaId}
* Delete a schema: DELETE/{schemaId}  
* Create a property: POST/{schemaId}/properties
* Delete a property: DELETE/{schemaId}/properties/{propertyPath}
* Update a property: PUT/{schemaId}/properties/{propertyPath}  
* Create a status: POST/{schemaId}/statuses
* Delete a status: DELETE/{schemaId}/statuses/{name}
* Update a status: PUT/{schemaId}/statuses/{name}  
  * Create a transition: POST/{schemaId}/transitions
  * Update a transition: PUT/{schemaId}/transitions/{transitionId}
  * Delete a transition: DELETE/{schemaId}/transitions/{transitionId}  
  * Create a document: POST/{schemaId}/documents
  * Update a document: PUT/{schemaId}/documents/{documentId}
* Delete a document: DELETE/{schemaId}/documents/{documentId}  
* Create a comment: POST/{schemaId}/documents/{documentId}/comments
* Update a comment: PUT/{schemaId}/documents/{documentId}/comments
* Delete a comment: DELETE/{schemaId}/documents/{documentId}/comments  
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
* The Transition exists within the Schema object, 
* The Document resides in a Status defined in the fromStatuses object of the Transition.

With the correct permission, multiple documents can be transitions at once.

* Transition a document: POST/{schemaId}/documents/{documentId}/transition

Linking and unlinking groups and users

Add or remove data to or from the groupIds and userIds attributes.

* Link groups to a document: POST/{schemaId}/documents/{documentId}/linkGroups
* Unlink groups from a document:POST/{schemaId}/documents/{documentId}/unlinkGroups
* Link users to a document: POST/{schemaId}/documents/{documentId}/linkUsers
* Unlink users from a document: POST/{schemaId}/documents/{documentId}/unlinkUsers

Notes: When GroupSyncMode is set to LINKED\_USERS\_PATIENT\_ENLISTMENT for a document, all the groups where the specified user is enlisted as patient will also be added or removed to or from the document.  
Specifying an empty userIds or groupIds array will have no effect on the document.  
Not specifying the userIds or groupIds array will unlink all users or groups from the document.

Viewing schemas, documents, and comments

With the correct permissions or the correct enlistment, users can view \(a selection of\) the data of schemas, documents, and comments. 

* Request a list of schemas: GET/ 
* Request a list of documents: GET/{schemaId}/documents
* Request a list of comments: GET/{schemaId}/documents/{documentId}/comments

#### II. Back-end Actions

The following actions allow back-end communication between the Extra Horizon Services.

Health Check 

See xxx. &lt; Op centrale pagina bespreken; geldt voor alle services.&gt;  


