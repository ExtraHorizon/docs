---
description: >-
  The Extra Horizon File Service handles the storage of unstructured data
  objects.
---

# File Service

### Introduction

The File module is a file storage solution. This module stores files as binary data together with some metadata. The File module accepts all data types but aims at data that does not adhere to a particular structure, such as images, log files, and zipped files. File retrieval is based on tokens that grant either full or read-only access.

{% hint style="info" %}
**Tip: **If you have structured data to store,** **we recommend that you take a look at our [Document Module](data-service.md). This module has more features to define additional logic when data changes.
{% endhint %}

### Information Model

For each File with binary data, the File module stores a FileMetadata object and one or more associated Token objects. To receive access to a File or its metadata, the user (or system) must possess one of the associated access tokens.&#x20;

{% hint style="info" %}
**Tip: **Files and their metadata can be accessed via multiple, unique access tokens. The advantage of this is two-fold: As different Users do not have to share the same token, access to one User can be denied easily – without removing access for the other Users. Moreover, the tokens can grant different levels of access, enabling the owner of a File to safely invite other Users to view -but not remove- their data.\

{% endhint %}

![](https://lh5.googleusercontent.com/DUFATZ5w5ColZ84RIH6uSgSDhCmWoNVwJJ4dxiWc3xg4rCtID7gvMduietkzLgRn8FmT\_5wtbbD4Gi9O240lTxqm37k2BFdt9It2bLnFMNzBzBRYTfKNdlfnoqtpLSLPdjv8rp8=s0)

&#x20;

### Objects and Attributes

#### FileMetadata

A `FileMetadata` object does not contain a unique identifier. However, it can be accessed directly via one of the associated access tokens. The optional `name` and `tags` can be used by the customer’s application to identify the File for which it has stored an access token.&#x20;

By default, the File Service extracts and stores the following metadata when a new file is added:&#x20;

* `creatorId`: The identifier of the User making the file storage request,
* `mimetype`: The MIME type as specified in the request. If this is absent, the module derives the type from the user agent.
* `size`: The file size in bytes &#x20;

{% hint style="warning" %}
By default, the maximum file size is 8 MiB. Contact Extra Horizon support if more space is required.
{% endhint %}

#### Token

When a user creates a new File, the File module generates one Token object granting full access and returns it in the response. The customer’s application must store the included token for future access to the File and FileMetadata. Subsequently, this (and any other) full-access token can be used by the customer’s application to generate additional full-access or read-only Token objects.&#x20;

{% hint style="info" %}
**Tip:** The customer’s application can link these tokens to other entities that provide context to the Files. For example, Documents in the Data Service can have a reference to “attachment(s)” that are stored in the File Module. \

{% endhint %}

#### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation (`creationTimestamp`) and of the most recent update (`updateTimestamp`) of their stored objects. Within the File module, this information is only stored in the `FileMetadata` object.

### Actions

This section gives an overview of the available File module endpoints. The full descriptions, including the required `accessLevel`, permissions, and scopes can be found in the API reference documentation.

#### Managing Files and their metadata

When a new File is added, the File module generates an initial Token that grants full access to the File and its metadata. This Token can be found in the response to the request and must be stored by the client application for future use.&#x20;

Any User can add a File, but Files can only be removed by means of a token with a full access level. This action results in removing the binary data, the FileMetadata object, and all associated Tokens



{% swagger method="post" path="/files/v1/" baseUrl="" summary="Add a new file" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/files/v1/{token}" baseUrl="" summary="Delete a File" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="token" required="true" %}
File token
{% endswagger-parameter %}
{% endswagger %}

{% hint style="info" %}
**Note:** In the current version of the File module, the binary data and associated metadata of a File cannot be updated.
{% endhint %}

#### Managing Tokens

Managing the Tokens associated with a FileMetadata object requires a token that grants full access to that specific File. This can be the initial token, or any full-access token created later on. The number of (read-only or full-access) Tokens that can be generated is unlimited. Deleting a Token object renders the token stored by the customer’s application invalid.

{% swagger method="post" path="/files/v1/{token}/tokens" baseUrl="" summary="Generate a new Token for a File" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/files/v1/{token}/tokens/{tokenToDelete}" baseUrl="" summary="Delete a Token" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="info" %}
**Tip: **In the request to delete a token, `token` and `tokenToDelete` can have the same value as long as at least one other Token object with full access remains associated with the FileMetaData. This prevents that a File becomes inaccessible.&#x20;
{% endhint %}

#### Viewing Files and their metadata

Files and their metadata can be viewed with either a read-only or full-access token.&#x20;

When a user has read-only access, this module does not return the tokens attribute of the FileMetaData object.

{% swagger method="get" path="/{token}/file" baseUrl="" summary="Retrieve a file" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="token" required="true" %}
File Token
{% endswagger-parameter %}
{% endswagger %}

{% swagger method="get" path="/{token}/details" baseUrl="" summary="Retrieve file metadata" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="token" %}
File token
{% endswagger-parameter %}
{% endswagger %}

For debugging purposes, an additional endpoint can be used in combination with the global VIEW\_FILES permission. This request provides a list of the available FileMetadata objects, including the corresponding tokens. It can be used by an administrator to regain access to a File when tokens are lost.&#x20;

{% swagger method="get" path="/" baseUrl="" summary="Get all metadata objects" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="warning" %}
**Warning: **With the global `VIEW_FILES` permission, a user gets access to all attributes of each `FileMetadata` object in the system, including the tokens. The latter can be used to retrieve or remove the actual file, i.e. the binary data. Grant this permission to a specific Role with caution.
{% endhint %}

\
