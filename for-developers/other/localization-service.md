---
description: >-
  The Extra Horizon Localization Service manages storage and retrieval of text
  snippets translated into multiple languages.
---

# Localization Service

## Intro

The Localization Service provides a database to store text snippets in multiple languages that can be retrieved on demand by using a `localization key`. These keys can be included in the Template Service to automatically provide the text messages in the preferred language.

#### Example: Template Service message with localization keys&#x20;

![](https://lh4.googleusercontent.com/0MWrt1Xuj7PkzYIt\_Mj2z9fYLH0MErNmL6aNvXNw6kzHEaO6bNnw\_o8SCNVR7meIv2m\_tnoywnkdPxu4a0xwEqdga1h0-D8z50MLF2iBLEtmrBpraj3F2Jy\_5jHEgrjvo1tNulM=s1600)

\


## Objects and attributes

### LocalizationSets

Text snippets are stored in a `LocalizationSet` object, which is uniquely identified by its key attribute. The translations and their respective language codes (`ISO 639-1`) are stored as key-value pairs in the text attribute.&#x20;

![Graphical user interface

Description automatically generated with low confidence](https://lh5.googleusercontent.com/lk2JJvQdefKnVKKy-DQa-4gC32jifY5IdpFaBJB8VgNc5UTZ5TtTjb5Ih\_H1Qp6\_AzZIuwLLzFQnCy8cwYlq2XAQdVhq\_AFk\_LIRPCgRsiHQbmyGT6vMYSDEi6iXuOP9r\_O5bEU=s1600)

{% hint style="info" %}
**Tip: **It is recommended to compose text snippets with complete sentences because the order of words in a sentence can differ between languages due to their unique set of grammar rules.&#x20;
{% endhint %}



### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation (creation\_Timestamp) and of the most recent update (update\_Timestamp) of their stored objects.

{% hint style="info" %}
**Note:** The timestamp attributes in the Localization Service have a number format, whereas other Services use a string($date-time) format.
{% endhint %}



## Using Variables in a LocalizationSet

Generic text snippets are often combined with user-specific data, such as the user’s name or medical records. These variables can be added to the text strings of the `LocalizationSet` as `$1`, `$2`, etc.&#x20;



#### Example LocalizationSet

```json
{
  "key": " heart_rate",
  "text": {
    "EN": "On $1 at $2, your heart rate was $3 bpm.",
    "ES": "El $1 a la(s) $2, su frecuencia cardíaca era de $3 lpm.",
    "NL": "Uw hartslag was $3 hsm op $1 om $2."
  }
}
```



When requesting text snippets, a value for each variable should be added in numeric order. This means that the first additional argument in the request corresponds to $1.&#x20;

\


#### Example List LocalizationSet text(s) in specific language(s) request

Request body:

```json
{
  "localization_codes": ["NL"],
  "localizations": ["heart_rate, 06/10/2021, 21:00, 63"]
}
```

Request Response:

```json
{
  "heart_rate": {
        "NL": "Uw hartslag was 63 hsm op 06/10/2021 om 21:00."
        "EN": "On 06/10/2021 at 21:00, your heart rate was 63 bpm.",
  }
}
```

## Actions

This section gives an overview of the available Localization Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing LocalizationSets

The four CRUD actions are available to set up LocalizationSets. The `{languageCode: string}` pairs in a set can be updated but cannot be removed individually.&#x20;

{% swagger method="post" path="/" baseUrl="" summary="Create LocalizationSet(s)" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/" baseUrl="" summary="List all LocalizationSets" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="put" path="/" baseUrl="" summary="Update LocalizationSet(s)" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/" baseUrl="" summary="Delete LocalizationSet(s)" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}



### Using LocalizationSets

Text snippets in one or more languages can also be requested directly from the Localization Service with the following endpoint. The response will include the snippet in the requested language(s), if available, and in English.&#x20;

{% swagger method="post" path="/request" baseUrl="" summary="List LocalizationSet text(s) in specific language(s)" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}



In addition, LocalizationSets can be implemented in the Template Service by using double curly brackets: `{{key}}` in the text fields. The Services will then communicate with each other to provide the text snippets in the user’s preferred language, if available. If not, the default text is returned, i.e. the English version of the snippet.&#x20;



\
