---
description: >-
  Use the template service to build templates that can be used to generate
  HTML-formatted mails and PDF documents.
---

# Template Service

## Basic functionality <a href="#resolving-templates" id="resolving-templates"></a>

### Define templates <a href="#resolving-templates" id="resolving-templates"></a>

The following JSON example shows how you can define a template:

{% code title="example-template-definition.json" %}
```
{
    "id": "5cff960c46e0fb0007b45cc4",
    "description" : "Example Template Definition
    "schema":
        "type": "object",
        "fields": {
            "firstName": {
                "type": "string"
            }
        }
    },
    "fields": {
        "message": "Hello, $content.firstName"
    }
}
```
{% endcode %}

The `schema` key allows you to define the variables that must be provided to render a template.

The `fields` key allows you to define the different outputs that the template service should render. You can reference input fields and other fields by using `$content.<variable>`

Under the hood, this service uses [Apache Velocity](https://velocity.apache.org) as a template engine. Take a look at the [Velocity User Guide](https://velocity.apache.org/engine/2.3/user-guide.html) for in-depth information how to write more complex templates.

#### Create or update templates

{% tabs %}
{% tab title="CLI" %}
The CLI has built-in tooling to make working with the template service a lot easier. Using the CLI you can easily upload full HTML files as template fields as well as define templates that extend other templates.\


Create a new folder and add a `template.json` file. This file has the same structure as the example template definition file mentioned higher on this page.  \


{% hint style="success" %}
Additionally, you can add `<field_name>.html` files in the same folder. The CLI will include these `html` files as a field in the JSON before uploading.
{% endhint %}



To create and synchronise your template, execute the following command:



```bash
exh templates sync --path ./$TEMPLATE_FOLDER
```

Visit the [CLI documentation ](https://docs.extrahorizon.com/cli/features/templates)for more details on how to manage templates using the CLI.&#x20;
{% endtab %}

{% tab title="JS SDK" %}
```typescript
import { createOAuth2Client } from "@extrahorizon/javascript-sdk";

const sdk = createOAuth2Client({
  host: "",
  clientId: "",
});

await sdk.auth.authenticate({
  password: "",
  username: "",
});

const schemaDefinition = {
  name: "example-schema",
  description: "This is an example schema",
  schema: {
    type: "object",
    fields: {
      firstName: {
          type: "string"
      }
    }
  },
  fields: {
    message: "Hello, $content.firstName"
  }
}

// Example To Update
await sdk.templates.update("<ID>", schemaDefinition);

// Example to Create
await sdk.templates.create(schemaDefinition);
```
{% endtab %}
{% endtabs %}

### Render templates

Rendering a template results in a `json` that is returned with all variables filled in. For this we need to supply the template service with the variables defined in the `schema` defined in the template definition.

Using the example template from the previous section, we have to provide the following input:&#x20;

```
{
    "content": {
        "firstName": "John"
    }
}
```

With the above input the template service will return the following output:

```
{
    "message": "Hello, John"
}
```

Our template is now resolved into a message that makes sense.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
import { createOAuth2Client } from "@extrahorizon/javascript-sdk";

const sdk = createOAuth2Client({
  host: "",
  clientId: "",
});

await sdk.auth.authenticate({
  password: "",
  username: "",
});

// Example To Update
const resolvedTemplate = await sdk.templates.resolveAsJson("{TEMPLATE_ID}",{
  firstName: "John"
});
```
{% endtab %}

{% tab title="HTTP API" %}
Execute the following REST API call to resolve the template:

```
POST /templates/v1/{templateId}/resolve
{
    "firstName": "John"
}
```
{% endtab %}
{% endtabs %}

## E-mail templates

Templates that are defined in the template service can be easily used together with the mail service to create formatted mails.&#x20;

To define e-mail templates there are additional requirements on the `fields` that must be present:

* `body` - the content of this field will be used as the body for the e-mail
* `subject` - the content of this field will be used as e-mail subject

{% hint style="info" %}
For more info how to send e-mails using templates, take a look in the [mail service documentation](https://docs.extrahorizon.com/mail-service/)
{% endhint %}

