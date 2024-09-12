# Localizations

Localizations are short text-snippets identified by a unique key, which have multiple translations into different languages. We can manage localizations through the Localizations Service. In the context of templates, we can use localizations to create localize-able templates. In templates, we represent localizations in curly brackets. Take the following template for example, where we use a localization with key `greeting`:

```json
{
    "id": "5cff960c46e0fb0007b45cc4",
    "schema": {
        "type": "object",
        "fields": {
            "first_name": { "type": "string" }
        }
    },
    "fields": {
        "message": "{{greeting}} $content.first_name,"
    }
}
```

In comparison to our previous email template, we have now changed our greeting `Dear` with the key to a greeting localization. This means we can now fill the greeting localization with whatever translation of a greeting we want. Imagine we ask the template service to resolve our template in Dutch (`NL`) by using the following snippet:

```typescript
const result = await exh.templates.resolveAsJson('5cff960c46e0fb0007b45cc4', {
    language: 'NL',
    content: {
        first_name: 'John'
    }
});
```

The template service will lookup the `greeting` localization in the localization service, which will in turn respond with the following localization:

```json
{
    "key": "greeting",
    "text": {
        "EN": "Dear", 
        "NL": "Beste"
    }
}
```

Eventually, the resolver will put everything together correctly and respond with the following resolved template:

```json
{
    "message": "Beste John"
}
```

Or, if we asked the resolver to resolve the template in English:

```typescript
const result = await exh.templates.resolveAsJson('5cff960c46e0fb0007b45cc4', {
    language: 'EN',
    content: {
        first_name: 'John'
    }
});
```

The response would be:

```json
{
    "message": "Dear John"
}
```

### Localizations with arguments <a href="#localizations-with-arguments" id="localizations-with-arguments"></a>

Because of grammar rules in certain languages, the order of words in a sentence can differ. Of course, this poses a problem if we use localizations like in the example mentioned above. Sometimes a localization will need to determine the exact placement of variable content in a string. Therefore localizations can accept arguments.

Arguments can be used in localization by using the placeholders `$1`, `$2`, etc...

```json
{
  "key": "heart_rate_msg",
  "text": {
    "EN": "On $1 at $2, your heart rate was $3 bpm.",
    "ES": "El $1 a la(s) $2, su frecuencia cardíaca era de $3 lpm.",
    "NL": "Uw hartslag was $3 spm op $1 om $2."
  }
}
```

With a template:

```json
{
    "id": "5d00e7da46e0fb0007b45cc8",
    "schema": {
        "type": "object",
        "fields": {
            "date": { "type": "string" },
            "time": { "type": "string" },
            "rate": { "type": "number" }
        }
    },
    "fields": {
        // This example is just the localization with arguments
        "message": "{{heart_rate_msg,$content.date,$content.time,$content.rate}}"
    }
}
```

Resolving for English:

```typescript
const result = await exh.templates.resolveAsJson('5d00e7da46e0fb0007b45cc8', {
    language: 'EN',
    content: {
        date: '06/10/2021',
        time: '21:00',
        rate: 63
    }
});
```

will yield the following response:

```json
{
    "message": "On 06/10/2021 at 21:00, your heart rate was 63 bpm."
}
```

Or resolving for Dutch (`NL`), will yield the following response: (with a different order of the values)

```json
{
    "message": "Uw hartslag was 63 spm op 06/10/2021 om 21:00."
}
```
