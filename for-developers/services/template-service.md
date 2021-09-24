---
description: >-
  The Extra Horizon Template Service is used to configure and resolve (email)
  templates. This guide provides a conceptual overview and is complementary to
  the API reference documentation.
---

# Templates

## Intro

Templates facilitate the \(automated\) composition of generic messages to users. A typical example is the email following a user’s registration to a service. Although the bulk of the message is identical for all users, some variable data is present, such as the user’s name. A blueprint for this type of messages can be configured with the Template Service. Subsequently, the service can generate a complete message when the variable values are provided via a request. 

## Objects and attributes

### Templates

The Template object is uniquely identified by its id and contains a name and description, which help to identify the Template and its intended purpose. The fields attribute holds the blueprint for the text\(s\) used in the message and the schema specifies the expected input. 

![](https://lh6.googleusercontent.com/wzMMo-asqA9YaONHCIoeMudEbrrvgpaSvGVrLzLQtvOfqj-EPAHywXkJXEycud_D73aZAvzURNPKMkGMidAckNFC_vPwCmHcK_bXoJ50vXF1c8jCvaJhp17NTw-7aDVNB4VERJM=s0)

### Defining the blueprint: fields

A Template can provide a blueprint for one or more text fields via the fields attribute. For example, an email requires a subject and body field. The associated string values can include variables for which a value must be provided as content in the request to resolve a Template. Moreover, the string can be a combination of localization keys, i.e. references to text snippets stored in several languages in the Localization Service.

| Tip: Depending on the intended use of the texts, the string values can be written in HTML. This enables the addition of, among others, images and hyperlinks.  |
| :--- |


Plain-text example

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>&#x201C;fields&#x201D;: {</p>
        <p>&#x201C;subject&#x201D;: &#x201C;Order $content.order_id is ready&#x201D;,</p>
        <p>&#x201C;body&#x201D;: &#x201C;Hello $content.first_name $content.last_name,</p>
        <p>Your order is ready.</p>
        <p>For more information, please contact us at $content.contact.&#x201D;}</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

Localization keys example

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>&#x201C;fields&#x201D;: {</p>
        <p>&#x201C;subject&#x201D;: &#x201C;{{order_ready_subject,$content.order_id}}&#x201D;,</p>
        <p>&#x201C;body&#x201D;: &#x201C;{{greeting,$content.first_name,$content.last_name
          }},</p>
        <p>{{order_ready}}</p>
        <p>{{more_info,$content.contact}}&#x201D;</p>
        <p>}</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

### Validating variables: schema

The variables that are used as placeholders in the text fields, must be declared in a schema, within another fields object. In addition to specifying the value type \(array, string, number, or boolean\), the customer can set some restrictions to which values are allowed. The available options to define a schema are listed in our [API reference documentation](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/templates-service/1.0.13/openapi.yaml#/Template/post_).

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>&quot;schema&quot;: {</p>
        <p>&quot;type&quot;: &quot;object&quot;,</p>
        <p>&quot;fields&quot;: {</p>
        <p>&quot;first_name&quot;: {</p>
        <p>&quot;type&quot;: &quot;string&quot;</p>
        <p>}</p>
        <p>&quot;order_id&quot;: {</p>
        <p>&quot;type&quot;: &quot;number&quot;,</p>
        <p>&quot;minimum&quot;: 1</p>
        <p>}</p>
        <p>}</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

## Resolving the Template

Resolving a Template means that specific values are assigned to the variables and localization keys in the blueprint for the text fields. The result is a human-readable \(HTML\) text that can be used for communication to users, for example via email. However, before the Template Service attempts to resolve the text fields, a validity check is performed on the delivered values. 

The process to resolve a Template is as follows:

1. A Resolve a Template request is made by an Extra Horizon service or directly by the customer. The content parameter contains the required key-value pairs. Additionally, a language code can be specified for use by the Localization Service.

| Tip: When using variables that indicate time, the time\_zone of the specific user must be included in the request. This enables the correct conversion of values with a number or dateTime format to a human-readable time representation.  |
| :--- |


1. The content key-value pairs are validated against the Template’s schema. If one or more required values are missing or do not qualify, an error response is immediately returned.
2. The Template’s text fields are resolved and returned. This involves assigning the values to the corresponding variables and/or requesting text snippets in the specified language from the Localization Service.

| For internal developers: Resolving the Template is powered by [Velocity engine](https://velocity.apache.org/). |
| :--- |


## Default Templates for the User Service

The User Service requires specific Templates to send verification emails to users via the Mail Service. While setting up a new environment, Extra Horizon already creates the default Templates. Once set up, the customer can further manage these Templates themselves. The default Templates enable sending emails with the following purposes:

* Email address activation \(Registration of a new User\),
* Email address activation \(Update of an email address\),
* Password reset.

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Tip: The following key-value pairs from the User Service reach the Template
          Service (via the Mail Service) and can therefore be used in the default
          Templates, provided that they have been declared in the associated schema:</p>
        <ul>
          <li>first_name: string</li>
          <li>last_name: string</li>
          <li>activation_hash: string (for email address activation)</li>
          <li>reset_hash: string (for password reset)</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

## Adding hash codes to a Template

Hash codes in emails are unique strings that are used to monitor user behaviour in respect to specific objects. For example, the number of times a specific email is opened by the recipient\(s\), can be counted by adding an \(invisible\) tracker pixel including a tracking\_hash code. Similarly, email address verification is based on a clickable button with an activation\_hash code attached to the underlying URL.

To make use of hash codes in template-based emails, the customer must set up the following: 

1. The hash code key-value pair is included in the content parameter of the Resolve a Template request. 

| Tip: By default, the Mail Service adds a unique tracking\_hash code to all its requests. In addition, it forwards the activation\_hash and reset\_hash codes it receives from the User Service.  |
| :--- |


1. The hash variable is declared in the schema of the Template.
2. Via the fields attribute, the body of the email receives a hyperlink that calls the customer’s client application, for example through a “verify email address” button or a tracker pixel. The composed URL must include the hash variable.

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Tracker pixel example</p>
        <p>&#x201C;body&#x201D;: &#x201C;some text &lt;img src= &#x201C;https://www.organization.com/track?code={hash_code}&#x201D;&gt;&#x201D;</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

1. The client application uses the provided hash code to make the required follow-up request, e.g. register user or increase email view count.

## Actions

The sections below give an overview of the available Template Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing Templates

The four CRUD actions are available to set up Templates.

* Create a Template: POST /
* List all Templates: GET /
* Update a Template: PUT /{templateId}
* Delete a Template: DELETE /{templateId}

| Note: Deleting default Templates will break the email functionality of the User Service.  |
| :--- |


### Resolving Templates

The action of replacing the placeholders in a Template with actual values and returning the resulting message, is called “resolving” a Template. This result will be presented in a JSON or PDF format, depending on the chosen endpoint.

* Resolve a Template \(JSON\): POST /{templateId}/resolve
* Resolve a Template \(PDF\): POST /{templateId}/pdf

| Tip: The content parameter must have the same structure as the Template’s schema. |
| :--- |


