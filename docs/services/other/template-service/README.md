---
description: >-
  Use the template service to build templates that can be used to generate HTML
  mails or any other text-based format. Supports working with inputs, basic
  logic and localization/internationalization.
---

# Template Service

## Basic functionality <a href="#resolving-templates" id="resolving-templates"></a>

### Define templates <a href="#resolving-templates" id="resolving-templates"></a>

The following JSON example shows the definition of a Template:

```json
{
    "name": "myTemplateName",
    "description" : "Example Template Definition",
    "inputs": {
        "first_name": { "type": "string" }
    },
    "outputs": {
        "message": "Dear, {{@inputs.first_name}}"
    }
}
```

The `inputs` key allows you to define the inputs that can be provided to render a template.

The `outputs` key allows you to define the different outputs that the Template Service should render. You can reference inputs by using `@inputs.<property>` .

Under the hood, this service uses Handlebars as its template engine. For more information about how it can be used, see [Helpers in Templates](helpers-in-templates.md) and [Localizations in Templates](localizations.md), or consult the official [Handlebars Guide](https://handlebarsjs.com/guide/) to learn how to write more complex templates

#### Create or update templates

{% tabs %}
{% tab title="CLI" %}
The [Extra Horizon CLI](https://docs.extrahorizon.com/cli/commands/templates) has built-in tooling to make working with the Template Service very easy. Next to the simple example below, the CLI you can easily upload full HTML files as Template `outputs`, define Templates that extend other Templates or work with static/environment variables.

**Simple example**

Create a `myTemplateName.json` file with the same structure as the example Template definition file mentioned higher on this page.

{% code title="myTemplateName.json" %}
```json
{
    "description" : "Example Template Definition",
    "inputs": {
        "first_name": { "type": "string" }
    },
    "outputs": {
        "message": "Dear, {{@inputs.first_name}}"
    }
}
```
{% endcode %}

To create and synchronise your Template, execute the following command:

```bash
exh templates sync --template myTemplateName.json
```

The CLI has a lot more tools and features to help you manage your Templates! Visit the [CLI documentation](https://docs.extrahorizon.com/cli/features/templates) for more information.
{% endtab %}
{% endtabs %}

### Render Templates

Rendering a Template results in a `json` that is returned with all variables filled in. For this we need to supply the Template Service with the variables defined in the `inputs` defined in the Template definition.

Using the example Template from the previous section, we can resolve it by calling something like:

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const resolvedTemplate = await exh.templatesV2.resolve(templateName, {
  inputs: {
    first_name: "John"
  }
});
```
{% endtab %}

{% tab title="HTTP API" %}
{% code title="POST /templates/v2/{templateName}/resolve" %}
```json
{
    "inputs" : {
        "first_name": "John"
    }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

With the above input the Template Service will return the following output:

```json
{
    "message": "Dear, John"
}
```

Our Template is now resolved into a message that makes sense.

## E-mail Templates

Templates that are defined in the Template Service can be easily used together with the Mail Service to create nicely formatted (HTML) e-mails.

To define e-mail Templates there are additional requirements on the `outputs` that must be present:

* `subject` - the content of this output will be used as e-mail subject
* `body` - the content of this output will be used as the body for the e-mail

{% hint style="info" %}
For more info how to send e-mails using Templates, take a look in [the Mail Service documentation](https://docs.extrahorizon.com/extrahorizon/services/communication/mail-service)
{% endhint %}
