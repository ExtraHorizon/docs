---
description: This page discusses how to use Extra horizon services to manage data.
---

# Data Management

## Intro <a href="#markdown-header-introduction" id="markdown-header-introduction"></a>

For structured data, the Data service supports creating and manipulating [JSON](https://www.json.org) documents. Not only can these documents contain data, but they can also be configured to contain a certain level of logic. To achieve this, documents created with the data service rely on a _data schema_, which dictates the document's structure and behavior.

Extra horizon services also provide storage for files that don't adhere to a particular structure, like images or zipped files. This service is called the `files service`, and allows storage and retrieval of a large variety of files.

## Structured data <a href="#markdown-header-structured-data" id="markdown-header-structured-data"></a>

As previously mentioned, storage of structured data with ExH services relies on the `data service`. This service stores data in structured _documents_ and uses _data schemas_ to determine the structure of these documents. Documents can also adapt to a configurable logic, which is also determined in the document's schema.

#### Data schemas <a href="#markdown-header-data-schemas" id="markdown-header-data-schemas"></a>

Before a new creating document, the data service requires a _data schema_. The purpose of a data schema is twofold: It dictates the _data structure_ of a document, as well as the _behavior logic_ of that same document. ExH data schemas are inspired by [JSON-schemas](http://json-schema.org) and adhere to the same syntax.

**Data structure**

The primary function of a data schema is to ensure documents that are created with the `data service` are uniformly structured. Data schemas use _properties_ to dictate the data structure that is accepted to create the resulting document.

**Configurable logic**

Secondly, data schemas allow configuration of the behavior logic of a document, similar to a [finite-state machine](https://en.wikipedia.org/wiki/Finite-state\_machine). This means that the document can possess one of a limited amount of states, and change between these states based on the configuration provided. Similar to properties, the states and transitions of a document are configured in it's data schema.

**Finite-state machines**

A traffic light could be considered a finite-state machine. It can exist in three **states**: green, orange and red.\
Changing from one state to another is called a **transition**. In the case of a traffic light, that would mean it has three transitions: changing from green to orange, changing from orange to red, and changing from red back to green.\\

#### Documents <a href="#markdown-header-documents" id="markdown-header-documents"></a>

After configuring a data schema, any number of documents can be created that follow it's structure. These documents will exist in the states that are defined by the schema's _statuses_, and follow the logic configured in the schema's _transitions_. As previously mentioned, transitioning a document between statuses can trigger actions such as sending a mail, or tasks that interact with other services.

## Unstructured data <a href="#markdown-header-unstructured-data" id="markdown-header-unstructured-data"></a>

While structured data is handled by `data service`, some file types don't gain any significant benefit from being structured with JSON. Storing and retrieving unstructured data with ExH services can be done with the [file service.](broken-reference)

#### Files <a href="#markdown-header-files" id="markdown-header-files"></a>

The `files service` provides a way of storing data without imposing a structure on it by way of schemas. This means the `files service` allows the storage of a variety of file types with an unstructured content, such as images and streams. Storing a file with this service will return a _file token_, which can be used as a reference to that file for further interaction. The `files service` stores uploaded files together with metadata that describes the file, such as the name of the file, the file size and the file type.
