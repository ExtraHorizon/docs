# Localizations in Templates

Localizations are short text-snippets identified by a unique key, which have multiple translations into different languages. We can manage Localizations through the [Localizations Service](../localizations-service/). In the context of Templates, we can use Localizations to create localize-able templates. In templates, we represent localizations with the helper function `t`. Take the following Template for example, where we use a Localization with key `greeting`:

```json
{
    "name": "myTemplateName",
    "inputs": {
        "first_name": { "type": "string" }
    },
    "outputs": {
        "message": "{{t 'greeting'}} {{@inputs.first_name}},"
    }
}
```

In the original Template example, the greeting “Dear” was hardcoded. We have now replaced it with a `greeting` Localization.

This allows the Template Service to resolve the appropriate translated greeting dynamically. For example, if we resolve the Template in Dutch (`NL`), using the following snippet:

```typescript
const result = await exh.templatesV2.resolve('myTemplateName', {
    language: 'NL',
    inputs: {
        first_name: 'John'
    }
});
```

The Template Service will lookup the `greeting` Localization in the Localization Service, which could contain something like:

```json
{
    "key": "greeting",
    "text": {
        "EN": "Dear", 
        "NL": "Beste"
    }
}
```

Eventually, the resolver will put everything together correctly and respond with the following resolved Template:

```json
{
    "message": "Beste John"
}
```

Or, if we asked the resolver to resolve the Template in English:

```typescript
const result = await exh.templatesV2.resolve('myTemplateName', {
    language: 'EN',
    inputs: {
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

Because of grammar rules in certain languages, the order of words in a sentence can differ. Of course, this poses a problem if we use Localizations like in the example mentioned above. Sometimes a Localization will need to determine the exact placement of variable content in a string. Therefore Localizations can accept arguments.

Arguments can be used in Localization by using the placeholders `{{place_holder_name}}` .

```json
{
  "key": "heart_rate_msg",
  "text": {
    "EN": "On {{date}} at {{time}}, your heart rate was {{rate}} bpm.",
    "ES": "El {{date}} a la(s) {{time}}, su frecuencia cardíaca era de {{rate}} lpm.",
    "NL": "Uw hartslag was {{rate}} spm op {{date}} om {{time}}."
  }
}
```

With a Template:

```json
{
    "name": "myTemplateName",
    "inputs": {
        "date": { "type": "string" },
        "time": { "type": "string" },
        "rate": { "type": "number" }
    },
    "outputs": {
        // This example is just supplying the Localization with its arguments
        "message": "{{t 'heart_rate_msg' date=@inputs.date time=@inputs.time rate=@inputs.rate }}"
    }
}
```

Resolving for English:

```typescript
const result = await exh.templatesV2.resolve('myTemplateName', {
    language: 'EN',
    inputs: {
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
