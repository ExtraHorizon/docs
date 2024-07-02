---
description: >-
  This page gives a brief overview of the different communication options
  provided by the Extra Horizon platform.
---

# Communication

## Intro <a href="#markdown-header-introduction" id="markdown-header-introduction"></a>

The main services that assist in communicating with your users are the Mail, Notification and Localization services.

[Notifications](./#markdown-header-notifications) can be used to quickly inform users with short, simple messages such as single sentences.

Conversely, [_E-mails_](https://bitbucket.org/extrahorizon/exhz-user-guide/src/master/communicate.md#e-mails) are typically used to send longer messages, or messages set in a more formal context. Mails sent with ExH services can be built from of an e-mail template, created with the [template service](../other/template-service/).

Finally, Localizations allow the storage and retrieval of short text snippets in multiple languages. These snippets can be used by other services, such as the Mail service to build messages in multiple languages based using a single template.

### Notifications <a href="#markdown-header-notifications" id="markdown-header-notifications"></a>

As previously mentioned, notifications typically contain short, simple messages. Notifications can be created with the Notification service. Immediately after being created, a notification is sent to it's intended recipient(s). The service can also be polled later to check whether or not the notification has been viewed by it's recipient.

### E-mails <a href="#markdown-header-e-mails" id="markdown-header-e-mails"></a>

E-mails typically contain longer messages, or are used in a more formal context than notifications. Sending e-mails can be done through the Mail service and relies on the Template service. Templates are used to streamline sending personalized e-mails by providing re-usable e-mail design 'blueprints'.

#### Sending an e-mail <a href="#markdown-header-sending-an-e-mail" id="markdown-header-sending-an-e-mail"></a>

Sending an e-mail based on a template is slightly more complicated than sending a notification, but still a relatively simple process.\
Starting from scratch, it takes two steps to send an e-mail with our services: 1. [Creating a template](https://bitbucket.org/extrahorizon/exhz-user-guide/src/master/communicate.md#creating-a-template) 0. [Sending an e-mail](https://bitbucket.org/extrahorizon/exhz-user-guide/src/master/communicate.md#resolving-a-template)

**Creating a template**

This step is evidently performed by using the `template service`. A template is essentially the body of an e-mail, where the variable information such, as a name or the result of a measurement, is replaced with placeholders that can later be replaced by data.

**Sending an e-mail**

In this step, the complete e-mail is constructed based on the template created in the previous step. To resolve a template, the `mail service` requires two elements: a reference to a template, and the mail data.

First, the referenced template is fetched from the `template service`. Then, the placeholders inside that template are replaced by the data provided, resulting in a complete e-mail which is then sent to it's recipient.

### Localizations <a href="#markdown-header-localizations" id="markdown-header-localizations"></a>

The `localization service` is a simple service that features storage and retrieval of text snippets in multiple languages. The snippets are stored per tag, inside of which they are listed per language so they can be utilized intuitively.

The `notification service` as well as the `template service` are aware of the `localization service`, and have built-in support for localizations. Because of this, it is possible to define the body of an e-mail or notification in all supported languages, based on a single structure. More information on the utility of localizations can be found [here](https://bitbucket.org/extrahorizon/exhz-user-guide/src/master/communicate.md#localizations-2).

### Related documents <a href="#markdown-header-related-documents" id="markdown-header-related-documents"></a>

* [Notifications Service guide](https://developers.extrahorizon.io/services/?service=notifications-service\&redirectToVersion=1)
* [Mails Service guide](https://developers.extrahorizon.io/services/?service=mail-service\&redirectToVersion=1)
* [Localizations Service guide](https://developers.extrahorizon.io/services/?service=localizations-service\&redirectToVersion=1)
