# Localization Service

The Localization Service is a simple service that features storage and retrieval of **text snippets, translated into multiple languages**. A snippet is identified by a key, for example `mail_closing`, and has associated values in all translated languages.

The [Notification Service](../../communication/notification-service/) as well as the [Template Service](../template-service/) are aware of the Localization Service, and have [built-in support for localizations](../template-service/localizations.md). They both use the Localization Service in order to generate **notifications, emails and PDFs in appropriate languages** based on a pre-defined template, which in turn are filled with localization keys that can be managed by the Localization Service.

## Localizations

Translated text snippets can be stored in Localization objects, which are uniquely identified by the `key` attribute. The translations and their respective language codes ([ISO 639-1](https://en.wikipedia.org/wiki/List\_of\_ISO\_639\_language\_codes)) are stored as key-value pairs in the `text` attribute.

```json
{
  "key": "mail_closing",
  "text": {
    "EN": "Kind regards,",
    "NL": "Met vriendelijke groeten,"
  }
}
```

{% hint style="info" %}
**Tip:** It is recommended to compose text snippets with complete sentences because the order of words in a sentence can differ between languages due to their unique set of grammar rules.
{% endhint %}

## Managing localizations

The easiest way to manage your localizations is by using the [ExH CLI](https://docs.extrahorizon.com/cli).

The ExH CLI allows you to simply define your localizations as a list of key/value pairs per language. When instructed, the CLI will combine these into localization objects and sync them with the Localization Service.

Example file structure:

{% code title="localizations/EN.json" %}
```json
{
  "mail_closing": "Kind regards,"
}
```
{% endcode %}

{% code title="localizations/NL.json" %}
```json
{
  "mail_closing": "Met vriendelijke groeten,"
}
```
{% endcode %}

Syncing the localizations with the CLI will result in a localization matching the example mentioned in the [Localizations section](./#localizations) above:

```bash
exh localizations sync
```

See the [ExH CLI documentation regarding localizations](https://docs.extrahorizon.com/cli/commands/localizations) for more information.

## Using localizations

Once you have configured your localizations, you can use them in your application or within ExH services which have localization support.

### Support in Extra Horizon services

As mentioned before, the [Template Service](../template-service/) has built-in support for localizations. This also affects the [Mail Service](../../communication/mail-service.md), which uses the Template Service to generate emails. Allowing you to create fully localized emails.

[See the Template Service documentation on how to use localizations in your templates.](../template-service/localizations.md)\
[See the Mail Service on how to send emails based on templates.](../../communication/mail-service.md#send-an-email)

### In your application(s)

You can also use the Localization Service directly in your application(s) by using the [ExH SDK](https://docs.extrahorizon.com/javascript-sdk/).

For example, to retrieve translated texts form the `mail_closing` localization in Dutch and English:

```typescript
const texts = await sdk.localizations.getByKeys({
  localizations: ['mail_closing'],
  localizationCodes: ['NL', 'EN'],
});

console.log(texts['mail_closing'].NL);
```
