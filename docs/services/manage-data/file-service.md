---
description: >-
  This service intended for blob storage. This services stores files as binary
  data together with metadata
---

# File Service

This service intended for blob storage and stores files as binary data together with metadata. You can use this service to store and acces files like CT-scans, ECG recordings, pdf reports, log files, ... and much more and use them directly from within your frontend applications.

{% hint style="info" %}
**Tip:** If you have structured data to store we recommend that you take a look at our [Data Service](data-service/). This module has more features to define additional logic on data changes.
{% endhint %}

## Upload a new file

Uploading new files to the file service is easy. You can use our Javascript SDK as described below or use our REST API by visiting our [api-specs.md](../../api-specs.md "mention")

For each File you upload, the service will store MetaData and one or more associated Tokens. These tokens can be used afterwards to retrieve the file data and metadata.

{% hint style="info" %}
The size of the files you can upload is limited for performance and user experience reasons. Please visit our [usage-and-performance.md](../../exh-platform/usage-and-performance.md "mention") page for more information and what's needed in case you need a limit increase.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```typescript
const fileMetaData = await sdk.files.create('myRepport.pdf',myBuffer,{
    tags:['ecg-report']
});
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

Once uploaded, you will receive a response representing the metadata of the file. The service generates one Token object granting full access. The customer’s application must store the included token for future access to the File and File Metadata. Subsequently, this (and any other) full-access token can be used by the customer’s application to generate additional full-access or read-only Token objects.

{% hint style="info" %}
**Tip:** The customer’s application can link these tokens to other entities that provide context to the Files. For example, Documents in the Data Service can have a reference to “attachment(s)” that are stored in the File Module.
{% endhint %}

#### File Metadata

{% tabs %}
{% tab title="Table" %}
| Field                 | Type      | Description                                                                                                                                                                                                 |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**              | string    | The name of the file                                                                                                                                                                                        |
| **mimeType**          | string    | An identifier existing of two parts used to represent the format of the file. E.g. "application/pdf" or "text/csv". The service derives the type from the user agent if not provided in the upload message. |
| **creatorId**         | string    | The userId of the user who created or uploaded the file.                                                                                                                                                    |
| **size**              | number    | The size of the file represented by the number of bytes.                                                                                                                                                    |
| **tags**              | string\[] | A list of strings or tags that can be used to annotate a file.                                                                                                                                              |
| **tokens**            | Token\[]  | A list of tokens attached to the file.                                                                                                                                                                      |
| **creationTimestamp** | string    | A string in date-time notation of when the file was uploaded or created in the service.                                                                                                                     |
| **updateTimestamp**   | string    | A string in date-time notation of when the file was last updated.                                                                                                                                           |
{% endtab %}

{% tab title="Json" %}
{% code lineNumbers="true" %}
```json
{
  "name": "myReport.pdf",
  "mimetype": "application/pdf",
  "creatorId": "j49fd3h65j6sad89fgy9o8ds",
  "size": 500,
  "tags": [
    "ecg-report"
  ],
  "tokens": [
    {
      "token": "507f191e810c19729de860ea-149fdc4c-83ff-4a18-a54c-e2ab6a0d067e",
      "accessLevel": "full"
    }
  ],
  "creationTimestamp": "2023-02-09T11:03:27.179Z",
  "updateTimestamp": "2023-02-09T11:03:27.179Z",
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Retrieving a file

Files and their metadata can be retrieved with either a read-only or full-access token.

### Retrieving data

{% tabs %}
{% tab title="Javascript" %}
Using a file token that is attached to the file you can retrieve the content of that specific file.

This example will retrieve the file and will return to you a Buffer with the binary data.

```typescript
const file = await sdk.files.retrieve('myAccessToken');
```

You can use the `retrieveStream` function in case you are working with streams.

```typescript
const file:ReadStream = await sdk.files.retrieveStream('myAccessToken');
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

### Retrieving metadata

When a user has read-only access, this function does not return the tokens attribute of the FileMetaData object.

{% tabs %}
{% tab title="Javascript" %}
You can use the following function to retrieve the metadata of a file.

```typescript
const file = await sdk.files.getDetails('myAccessToken');
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

## Deleting a file

Any User can add a File, but Files can only be removed by means of a token with a full access level. This action results in removing the binary data, the FileMetadata object, and all associated Tokens

{% hint style="danger" %}
Deleted files will permanently remove the file from our service. There will be no way to revive the file after this action is performed.
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```typescript
await sdk.files.remove('myAccessToken');
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

## File Tokens

Files and their metadata can be accessed via multiple, unique access tokens. This provides you with two advantages:&#x20;

* As different Users do not have to share the same token, access to one User can be denied easily – without removing access for the other Users.&#x20;
* Tokens can grant different levels of access, enabling the owner of a File to safely invite other Users to view -but not remove- their data.

Managing the Tokens associated with a FileMetadata object requires a token that grants full access to that specific File. This can be the initial token, or any full-access token created later on. The number of (read-only or full-access) Tokens that can be generated is unlimited. Deleting a Token object renders the token stored by the customer’s application invalid.

#### Token Object

| Field       | Type   | Description                                                                                                               |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| token       | string | The string token that can be used to access the file                                                                      |
| accessLevel | string | The access level of the token. Can be <mark style="color:red;">`full`</mark> or <mark style="color:orange;">`read`</mark> |

#### Permissions

As discussed, tokens can receive different access levels. currently there are two access levels defined.

| Access level | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| **full**     | Provides permission to read, remove and manage tokens for the file. |
| **read**     | Provides only permission to read the file                           |

### Adding new tokens to a file

{% hint style="warning" %}
Requires a token with full a full access level
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```typescript
const tokenObject = await sdk.files.generateToken('myAccessToken',{
    accessLevel:TokenPermission.READ
});
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

### Removing tokens

{% hint style="warning" %}
Requires a token with full a full access level
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```typescript
await sdk.files.deleteToken('myAccessToken','tokenToDelete');
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

In the request to delete a token, `token` and `tokenToDelete` can have the same value as long as at least one other Token object with full access remains associated with the FileMetaData. This prevents that a File becomes inaccessible.

## List uploaded files

This request provides a list of the available FileMetadata objects, including the corresponding tokens. It can be used by an administrator, for example to regain access to a File when tokens are lost. This request provides a list of the available FileMetadata objects, including the corresponding tokens. It can be used by an administrator to regain access to a File when tokens are lost.

{% hint style="warning" %}
Retrieving a list of uploaded files is only intended for Administrator use. Only users with the global VIEW\_FILES permission can use the following functions.
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
Using [resource-query-language-rql.md](../../for-developers/resource-query-language-rql.md "mention") you can search for files with specific tags or other attributes.

```typescript
const myRql = rqlBuilder()
    .eq('tags', 'myFirstTag')
    .build();

const file = await sdk.files.find({rql:myRql});
```

If you need to find a file with a specific fileName you can use the findByName function.

```typescript
const fileDetails = await sdk.files.findByName('filename.ext');
```

When your query is intended to find one file you can ask the SDK to return the first result.

```typescript
const file = await sdk.files.findFirst({rql:myRql});
```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

{% hint style="warning" %}
With the global `VIEW_FILES` permission, a user gets access to all attributes of each `FileMetadata` object in the system, including the tokens. The latter can be used to retrieve or remove the actual file, i.e. the binary data. Grant this permission to a specific Role with caution.
{% endhint %}
