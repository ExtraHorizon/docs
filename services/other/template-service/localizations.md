# Localizations

Localizations are short text-snippets identified by a unique key, which have multiple translations into different languages. We can manage localizations through the `localizations service`. In the context of templates, we can use localizations to create localize-able templates. In templates, we represent localizations in curly brackets. Take the following template for example, where we use a localization with key `greeting`:

```
{
    "id": "5cff960c46e0fb0007b45cc4",
    "schema": {
        "type": "object",
        "fields": {
            "first_name": {
                "type": "string"
            }
        }
    },
    "fields": {
        "message": "{{greeting}} $content.name,"
    }
}
```

In comparison to our previous email template, we have now changed our greeting `Dear` with the key to a greeting localization. This means we can now fill the greeting localization with whatever translation of a greeting we want. Imagine we ask the `template service` to resolve our template in Dutch by using the following request call:

`POST /5cff960c46e0fb0007b45cc4/resolve/NL`

with the following request body:

```
{
    "content": {
        "first_name": "John"
    }
}
```

The `template service` will lookup the `greeting` localization in the `localization service`, which will in turn respond with the following localization:

```
{
    "key": "greeting",
    "text": {
        "EN": "Dear", 
        "NL": "Beste"
    }
}
```

Eventually, the resolver will put everything together correctly and respond with the following resolved template:

```
{
    "message": "Beste John"
}
```

Or, if we asked the resolver to resolve the template in English:

`POST /5cff960c46e0fb0007b45cc4/resolve/EN`

```
{
    "message": "Dear John"
}
```

#### [#](https://developers.extrahorizon.io/services/templates-service/1.0.14/#localizations-with-arguments)Localizations with arguments <a href="#localizations-with-arguments" id="localizations-with-arguments"></a>

Because of grammar rules in certain languages, the order of words in a sentence can differ. Of course, this poses a problem for our previous implementation of localizations. Sometimes a localization will need to determine the exact placement of variable content in a string. Therefore localizations can accept arguments:

Template:

```
{
    "id": "5d00e7da46e0fb0007b45cc8",
    "schema": {
        "type": "object",
        "fields": {
            "first_name": {
                "type": "string"
            }
        }
    },
    "fields": {
        // Template string is just the localization with an argument now
        "message": "{{greeting,$content.first_name}}"
    }
}
```

With the following localization:

```
{
    "key": "greeting",
    "text": {
        "EN": "Dear $1",
        "NL": "Dear $1",
    }
}
```

Notice how the localization now uses the `$1` variable. The variable `$1` could be anywhere in the string, the `template service` now knows by the positioning of the `$1` variable exactly where it should place the content string.

If resolved for English:

`POST /5d00e7da46e0fb0007b45cc8/resolve/EN`

```
{
    "content": {
        "name": "John"
    }
}
```

will yield the following response:

```
{
    "message": "Dear, John"
}
```

## &#x20;<a href="#other-operations" id="other-operations"></a>
