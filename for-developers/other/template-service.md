---
description: >-
  The Extra Horizon Template Service is used to configure and resolve (email)
  templates. This guide provides a conceptual overview and is complementary to
  the API reference documentation.
---

# Template Service

## Intro

Templates facilitate the (automated) composition of generic messages to users. A typical example is an email following a user’s registration to a service. Although the bulk of the message is identical for all users, some variable data is present, such as the user’s name. A blueprint for this type of messages can be configured with the Template Service. Subsequently, the service can generate a complete message when the variable values are provided via a request.&#x20;

## Objects and attributes

### Templates

The Template object is uniquely identified by its id and contains a name and description, which help to identify the Template and its intended purpose. The fields attribute holds the blueprint for the text(s) used in the message and the schema specifies the expected input.&#x20;

![](https://lh3.googleusercontent.com/LBtwFT67OeRdp27XZK\_wtU-FIaL5RoWL8Hjj1s0HnR8cIzwJ3lUeuPVBNUgghufKfnsTIDHTgltD5\_qKCfjxADoXQUREySQLJEMN1VNlV5BXRVuWjkUs39\_tl5FL2\_CUPKqKhWY=s1600)

### Defining the blueprint: fields

A Template can provide a blueprint for one or more text fields via the fields attribute. For example, an email requires a subject and body field. The associated string values can include variables for which a value must be provided as content in the request to resolve a Template.&#x20;

#### Example

```
{
  “fields”: {
    “subject”: “Order $content.order_id is ready”,
    “body”: “Hello $content.first_name $content.last_name, Your order is ready. For more information, please contact us at $content.contact.”}
}
```

### Validating variables: schema

The variables that are used as placeholders in the text fields, must be declared in a schema, within another field's object. In addition to specifying the value type (array, string, number, or boolean), the customer can set some restrictions to which limit the range of allowed values are allowed. The available options to define a schema are listed in our [API reference documentation](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/templates-service/1.0.13/openapi.yaml#/Template/post\_).

```json
{
  "id": "5cff960c46e0fb0007b45cc4",
  "schema": {
    "type": "object",
    "fields": {
      "first_name": {
        "type": "string"
      },
      "order_id": {
        "type": "number",
        "options": [{
          type: “min”,
          value: 1
        }]
      }
  }
}
```

#### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation (creation\_Timestamp) and of the most recent update (update\_Timestamp) of their stored objects.

{% hint style="info" %}
**Note: **The timestamp attributes in the Template Service have a number format, whereas other Services use a string($date-time) format.
{% endhint %}

## Designing text fields

### Multi-lingual Templates: localization keys

One Template can be used for messages in multiple languages when the text fields are composed with localization keys, i.e. references to text snippets in several languages that are stored by the Localization Service. Since the order of words in a sentence can differ between languages due to their unique set of grammar rules, it is recommended to compose text snippets with complete sentences. Consequently, variables that are part of a sentence should be included in the text snippet. In a Template, their values must be provided, together with the key, within double curly brackets:&#x20;

`{{key, argument1, argument2, etc}}`

The arguments can consist of actual values, e.g. “16”, or of variables that receive a value via the resolve a Template request, e.g.  $content.age“.

#### Example

Template:

```
“fields”: {
  “message”: “{{age_requirement, $content.age}}”
}
```

LocalizationSet stored by the Localization Service:

```
"key": " age_requirement",
"text": {"EN": "For individuals above the age of $1",
         "ES": "Para personas mayores de $1 años",
         "NL": "Voor personen ouder dan $1 jaar"}
```

#### HTML and hash codes

Depending on the intended use of the text fields in a Template, their string values can be written in plain text or HTML. The latter enables the addition of, among others, images and hyperlinks. Hyperlinks can be used to forward information that was included in an email, to the customer’s client application. Examples are the tracking\_hash code, which is used by the Mail Service to count how often an email is opened, and the activation\_hash code, which is needed by the User Service to verify a user’s email address. As for all variables in a Template, hash codes that are part of a URL, must be declared in the Template’s schema.&#x20;

#### Example: Email Template with tracker pixel&#x20;

```json
{
  "fields": {
    "subject": "Weekly report"  
    "body": "Some text. <img src=\"https://api.client-a.extrahorizon.io/mail/v1/$content.tracking_hash/open\">"
  },
  "schema": {
    "type": "object",
    "fields": {
      "tracking_hash": {
          "type": "string"
      }
    }
}
```

### Resolving the Template

Resolving a Template means that specific values are assigned to the variables and localization keys in the blueprint for the text fields. The result is a human-readable (HTML) text that can be used for communication to users, for example via email. However, before the Template Service attempts to resolve the text fields, a validity check is performed on the delivered values.&#x20;

The process to resolve a Template is as follows:

1. A Resolve a Template request is made by an Extra Horizon service or directly by the customer’s application. There are three parameters:&#x20;
2.
   * content: The key-value pairs required to resolve the variables.&#x20;
   * language: The code of the language in which text snippets must be requested if localization keys are present. &#x20;
   * time\_zone: The time zone of the user to whom the message is intended. This enables the correct conversion of values with a number or `dateTime` format to a human-readable time representation.
3. The content key-value pairs are validated against the Template’s schema. If one or more required values are missing or do not qualify, an error response is immediately returned.
4. The Template’s text fields are resolved and returned. This involves assigning the (converted) values to the corresponding variables and/or requesting text snippets in the specified language from the Localization Service.

### Default Templates for the User Service

The User Service requires specific Templates to send verification emails to users via the Mail Service. While setting up a new environment for the customer, Extra Horizon already creates these default required Templates. Once set up, the customer can further manage these Templates themselves and replace the default content. The default Templates enable sending emails with the following purposes:

* Email address activation verification (Registration of a new User),
* Email address verification activation (Update of an email address), and
* Password reset (Forgot password).

{% hint style="info" %}
**Tip: **The following key-value pairs from the User Service reach the Template Service (via the Mail Service) and can therefore be used in the default Templates, provided that they have been declared in the associated schema:&#x20;

* `first_name: string`
* `last_name: string`
* `activation_hash: string` (for email address activation)
* `reset_hash: string` (for password reset)
{% endhint %}

## Actions

The sections below give an overview of the available Template Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing Templates

The four CRUD actions are available to set up Templates.

{% swagger method="post" path="/" baseUrl="" summary="Create a Template" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/" baseUrl="" summary="List all Templates" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="put" path="/{templateId}" baseUrl="" summary="Update a Template" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/{templateId}" baseUrl="" summary="Delete a Template" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="info" %}
**Note:** Deleting default Templates will break the email functionality of the User Service.&#x20;
{% endhint %}

### Resolving Templates

The action of replacing the placeholders in a Template with actual values and returning the resulting message, is called resolving a Template. This result will be presented in a JSON or PDF format, depending on the chosen endpoint.

{% swagger method="post" path="/{templateId}/resolve" baseUrl="" summary="Resolve JSON template" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="templateId" required="true" %}

{% endswagger-parameter %}
{% endswagger %}

{% swagger method="post" path="/{templateId}/pdf" baseUrl="" summary="Resolve PDF template" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="templateId" required="true" %}

{% endswagger-parameter %}
{% endswagger %}

{% hint style="info" %}
**Tip: **The content parameter in the request body must have the same structure as the Template’s schema.
{% endhint %}

## References

* [Template service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/templates-service/1.0.13/openapi.yaml)
