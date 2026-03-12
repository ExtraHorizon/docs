# Template Service V2

# Overview
We've introduced a new version of the Template Service, which includes several structural and syntax changes. The migration to the new version can be done incrementally, allowing you to update your templates one at a time. To support this the Mail Service is able to work with both v1 and v2 templates, when resolving a template it will first look for a v2 template and if that is not found, it will look for a v1 template.

# Recommended Migration Strategy
We've worked on making this as easy as possible with the most recent changes to the Extra Horizon CLI.
So we'll start by recommending installing the latest version of the CLI to help you with the migration.

High level steps to migrate:
- Duplicate Localizations with parameters
- Migrate Templates
- Update cluster settings
- Update application code
- Test thoroughly
- Remove V1 Templates

In the sections below we will go into more detail on each of these steps, including how the CLI can be used to assist you in the migration.

# Duplicate Localizations with parameters
If you are using localizations with parameters in your templates, we recommend duplicating these localizations and updating the duplicates to use named parameters. This allows you to update your v2 templates to use the new localization format without breaking your existing templates that still rely on the old positional parameter format.

Localizations with parameters need to be updated from positional parameters (e.g. `$1`, `$2`) to named parameters (e.g. `{{first_name}}`, `{{last_name}}`). This requires creating new localization keys for the v2 templates, as the format of the parameters has changed.

From:
```json
{
  "key": "subject_localization",
  "text": {
    "EN": "Message for $1 $2"
  }
}
```

To:
```json
{
  "key": "subject_localization_v2",
  "text": {
    "EN": "Message for {{first_name}} {{last_name}}"
  }
}
```

Later when migrating your templates, you can switch to using the new localization keys with named parameters.

# Migrate Templates
When migrating your templates, you can do this incrementally, one template at a time. Start by creating a copy of your existing v1 template and updating the copy to conform to the v2 structure and syntax. This allows you to test the new template without affecting the existing one.

For example if you have a v1 template like this:
```json
{
  "name": "YourTemplateName",
  "description": "The description of the template",
  "schema": {
    "type": "object",
    "fields": {
      "first_name": { "type": "string" },
      "last_name": { "type": "string" },
      "footer_enabled": { "type": "boolean" }
    }
  },
  "fields": {
    "subject": "{{subject_localization,$content.first_name,$content.last_name}}",
    "body": "hello $content.first_name",
    "footer": "#if($content.footer_enabled) Here is a footer #end"
  }
}
```

You can create a new template with the same name (or a different name if you prefer) and update it to the v2 format:
```json
{
  "name": "YourTemplateName",
  "description": "The description of the template",
  "inputs": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "footer_enabled": { "type": "boolean" }
  },
  "outputs": {
    "subject": "{{t 'subject_localization_v2' first_name=@inputs.first_name last_name=@inputs.last_name }}",
    "body": "hello {{@inputs.first_name}}",
    "footer": "{{#if @inputs.footer_enabled}} Here is a footer {{/if}}"
  },
  "$schema": "https://swagger.extrahorizon.com/cli/1.13.0/config-json-schemas/Template.json"
}
```

When creating the new v2 template, you can use the `$schema` property to point to the JSON schema for the template.
This will help you catch any mistakes or missing properties in your template during development, as most code editors will use the schema to provide validation and auto-completion.

If you are not already using the CLI to manage your templates, we highly recommend doing so.
See the CLI documentation for more information on how to use the CLI to manage your templates.
You can also commit these template files to your version control system to keep track of (future) changes.

Below we will go into more detail on the specific changes that need to be made to migrate from v1 to v2 templates, including the structural changes and the syntax changes.

## Structural Changes

### Rename `schema.fields` → `inputs`
The `schema` section of the template, where the input variables are defined, is now renamed to `inputs` to better reflect its purpose. Additionally, the root object is now implicitly assumed to be of type object, so there is no need to define a top-level type object anymore.

From:
```json
{
  "schema": {
    "type": "object",
    "fields": {
      "first_name": { "type": "string" }
    }
  }
}
```

to:
```json
{
  "inputs": {
    "first_name": { "type": "string" }
  }
}
```

### Rename `fields` → `outputs`
The `fields` section, where the outputs of the template are defined, is now renamed to `outputs` to better reflect its purpose.

From:
```json
{
  "fields": {
    "subject": "..."
  }
}
```
To:
```json
{
  "outputs": {
    "subject": "..."
  }
}
```

### Update the `object` type definitions
The `object` type definitions have been updated to align with a limited subset of JSON Schema. The `fields` keyword used to define the properties of an object is now replaced with `properties`.

From:
```json
{
  "type": "object",
  "fields": {
    "first_name": { "type": "string" },
    "age": { "type": "number" }
  }
}
```

To:
```json
{
  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "age": { "type": "number" }
  }
}
```

### Update the `array` type definitions
The `array` type definitions have been updated to align with a limited subset of JSON Schema. The `type_configuration` keyword used to define the type of items in an array is now replaced with `items`.

From:
```json
{
  "type": "array",
  "type_configuration": { "type": "string" }
}
```

To:
```json
{
  "type": "array",
  "items": { "type": "string" }
}
```

### Remove all `options` arrays
We no longer support the more detailed validation options that were previously available in the `options` array. Any `options` arrays should be removed from your templates.

From:
```json
{
  "type": "number",
  "options": [
    { "min": 0 },
    { "max": 120 }
  ]
}
```

To:
```json
{
  "type": "number"
}
```

### Replace deprecated types
The `object_id` and `date` types have been removed and should be replaced with the `string` type.

From:
```json
{ "type": "object_id" }
{ "type": "date" }
```

To:
```json
{ "type": "string" }
{ "type": "string" }
```

## Templating Syntax Changes
The templating syntax has been updated from Velocity to Handlebars, which includes changes to how variables are accessed, how control structures are defined and how localization is handled.

### Input Access
Input variables can now be accessed using `@inputs` instead of `$content`.

The syntax also requires the use of double curly braces `{{ }}` to denote variable interpolation. Triple curly braces `{{{ }}}` can be used if you want to render HTML content within variables without escaping.

From:
```
$content.variable
```

To:
```hbs
{{@inputs.variable}}
```

### Control Structures
Control structures such as conditionals and loops have a different syntax in Handlebars compared to Velocity.

For example, an if statement in Velocity:
```
#if($content.enabled)
Hello
#end
```

Would be written in Handlebars as:
```hbs
{{#if @inputs.enabled}}
Hello
{{/if}}
```

### Localizations
Localizations are now supported by the more widely used `i18next` library for a more complete and flexible internationalization solution. Localizations without arguments can be easily re-used by adding the `t` and the quotes inside the already present `{{ }}`.

For example:
```
{{greeting}}
```

Becomes:
```hbs
{{t 'greeting'}}
```

As mentioned earlier, for localizations with arguments, we've recommended to create new v2 localizations in order to not break your v1 templates while migrating.

From a localization with positional parameters:
```txt
Message for $1 $2
```

To a localization with named parameters:
```txt
Message for {{first_name}} {{last_name}}"
```

Then, from a v1 template using the old localization:
```
{{subject_localization,$content.first_name,$content.last_name}}
```

To a v2 template using the new localization:
```hbs
{{t 'subject_localization_v2' first_name=@inputs.first_name last_name=@inputs.last_name}}
```

As mentioned before for variables with HTML content, if your localizations include HTML content, you can use triple curly braces to render the HTML without escaping it:
```hbs
{{{t 'html_localization'}}}
```

# Update cluster settings
After migrating your templates to v2, you will need to update your cluster settings to point to the new template name/id for the default emails the user service sends out (e.g. password reset, email verification, etc.).

The CLI now has support for updating these settings. With the addition benefit of being able to target the templates by their name instead of their id, which should make it easier to update the settings without having to worry about the template ids being different in different environments.

Simply create a `service-settings.json` file with the settings you want to update, for example:
```json
{
  "users": {
    "emailTemplates": {
      "activationEmailTemplateName": "activate_account_mail",
      "reactivationEmailTemplateName": "reactivate_account_mail",
      "passwordResetEmailTemplateName": "password_reset_mail",
      "activationPinEmailTemplateName": "activate_account_mail",
      "reactivationPinEmailTemplateName": "reactivate_account_mail",
      "passwordResetPinEmailTemplateName": "password_reset_mail"
    }
  },
  "$schema": "https://swagger.extrahorizon.com/cli/1.13.0/config-json-schemas/SettingsConfig.json"
}
```

And then run `exh settings sync` to update the settings in your cluster.
At the moment of writing, the CLI does the resolution of the template names to ids, but support for directly using the template names in the settings is being worked on and should be available soon as well.

# Update application code
When you make use of templates in your application code, you will also need to update the code to use the new v2 templates.
The nice thing is that the v2 templates can now also be targeted by their name instead of their id, which should make it easier to update the code without having to worry about the template ids being different in different environments.

To have more control over who is allowed to use v2 templates, we also introduced a new permission, `RESOLVE_TEMPLATES`.
So if your code directly resolves a template, you will need to make sure that the user who is making the request has this permission.

When using the ExH SDK, you can update the usage of `exh.templates.*` to `exh.templatesV2.*` to start using the new v2 templates. For example, if you were previously using:
```javascript
const template = await exh.templates.getTemplateByName('YourTemplateName');
const rendered = await exh.templates.resolveAsJson(template.id, {
  content: {
    first_name: 'John',
    last_name: 'Doe',
  }
});
```

You can update it to: (as mentioned, make sure the user has the `RESOLVE_TEMPLATES` permission to be able to resolve v2 templates)
```javascript
const rendered = await exh.templatesV2.resolve('YourTemplateName', {
  inputs: {
    first_name: 'John',
    last_name: 'Doe',
  }
});
```

Or if you are sending a mail like this:
```javascript
const template = await exh.templates.findByName('YourTemplateName');
await exh.mails.send({
  templateId: template.id,
  recipients: { to: [user.email] },
});
```

You can update it to:
```javascript
await exh.mails.send({
  templateName: 'YourTemplateName',
  recipients: { to: [user.email] },
});
```

When using the Template Service API directly, similarly you can update the endpoints used from `/templates/v1/` to `/templates/v2/` and update the request body to match the new structure and syntax of the v2 templates.

# Test thoroughly and Remove V1 Templates
Finally after you have migrated everything, don't forget to test everything thoroughly.
When you are happy with the results you can safely remove the v1 templates if you want to.
