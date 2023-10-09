# Localizations

#### Example <a href="#example" id="example"></a>

A Localization will be represented by the `localization service` as a JSON-object of the following form:

```
{
    "key": "mail_greeting",
    "text": {
        "EN": "Hi",
        "FR": "Bonjour",
        "NL": "Beste",
    }
}
```

With `key` being a unique string to identify the localization, and `text` being an array of possible translations of the localization into different languages.

### Usage <a href="#usage" id="usage"></a>



The `localization service` allows for the basic CRUD operations on localizations, as wel as retrieving available languages. For more information consult the API Reference (opens new window).

### Specific case: retrieving a bulk of translated keys <a href="#specific-case-retrieving-a-bulk-of-translated-keys" id="specific-case-retrieving-a-bulk-of-translated-keys"></a>

It's also possible to request localizations of multiple keys in a specified languages. **The default language (`EN`) is always included as a fallback in case there is no translation available for the specified language.**

#### **Request** <a href="#request" id="request"></a>

`POST /request`

```
{
    "localization_codes": [
        "FR"
    ],
    "localizations": [
        "mail_greeting",
        "mail_subject"
    ]
}
```

#### **Response** <a href="#response" id="response"></a>

```
{
    "mail_greeting": {
        "EN": "Hi",
        "FR": "Bonjour"
    },
    "mail_subject": {
        "EN": "Your purchase",
        "FR": "Votre achat"
    }
}
```
