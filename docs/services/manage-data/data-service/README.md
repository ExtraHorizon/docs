# Data Service

## **Intro** <a href="#intro" id="intro"></a>

Data is managed using structured documents, written in JSON. These documents rely on data schemas which determine the structure, behaviour, and logic of the documents in a schema collection. The purpose of a data schema is twofold:

1. **Define Data structure:** Data Schemas define the structure of a document using properties. This ensures uniform structuring of documents across the service and provides input validation for API interactions. Data structure definitions in schemas are inspired by [JSON-schemas](http://json-schema.org/) and adhere to the same syntax.
2. **Define behavioural logic:** Data Schemas define the behavioural logic of a document using states and transitions. When a document transitions from one status to another, actions are triggered such as sending an email or running a small piece of code in other services.

{% embed url="https://www.youtube.com/watch?v=YvjHxZC9hjo" %}
ExH Explainer - Data Service Basics
{% endembed %}

### Data Structure <a href="#data-structure" id="data-structure"></a>

Schema validation is based on the open-source JSON schema specification. This allows you to create complex data structures that you can configure yourself. Besides defining field types, you can create complex fields with constraints like: minimum, maximum, regex, maxItems, minItems, …

<figure><img src="../../../.gitbook/assets/Data Structure (2).png" alt=""><figcaption></figcaption></figure>

### States & Transitions <a href="#states-and-transitions" id="states-and-transitions"></a>

The data service allows you to configure workflows that match your exact business need. You can mark your documents with specific states and create transitions between these states, these can be manual or automatic.

E.g. you can easily create a workflow responsible for capturing the data of your measurement, triggering your algorithm to make a diagnosis, notify the physician if when a review is necessary and generate and send a report back to the patient.

<figure><img src="../../../.gitbook/assets/States &#x26; Transitions (1).png" alt=""><figcaption></figcaption></figure>

### Conditions & Actions <a href="#conditions-and-actions" id="conditions-and-actions"></a>

In many cases you will want to restrict transitions from happening. Using conditions you can define limitations to when a transition can be triggered and who can trigger them. E.g. you can make automated transitions only trigger under specific circumstances. (Field value, the person executing the transition, …). When a transition does trigger or is executed you can attach actions. These actions can range from sending events, sending text messages, push notifications, email, starting a script and so much more…

<figure><img src="../../../.gitbook/assets/Conditions &#x26; Actions.png" alt=""><figcaption></figcaption></figure>
