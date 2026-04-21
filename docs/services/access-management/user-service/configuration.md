# Configuration

## Password Policy <a href="#password-policy" id="password-policy"></a>

{% hint style="success" %}
Password policy configuration was added in v.1.1.8
{% endhint %}

The password policy enforces new passwords to adhere to its requirements. The policy can be changed at any time and will require all new passwords (registration, password forgotten, ...) to adhere to its requirements. Old passwords will still be valid and don't require changing. An example of a password policy is:

#### Example <a href="#example-2" id="example-2"></a>

```json
{
  "minimum_length": 8,
  "maximum_length": 128,
  "upper_case_required": true,
  "lower_case_required": true,
  "symbol_required": false,
  "number_required": true
}
```

#### Fields <a href="#fields" id="fields"></a>

* `minimum_length`: the minimum amount of characters that a password must contain.
* `maximum_length`: the maximum amount of characters that a password must contain.
* `upper_case_required`: if set to true, the password must contain an uppercase character: `A-Z`.
* `lower_case_required`: if set to true, the password must contain a lowercase character: `a-z`.
* `symbol_required`: if set to true, the password must contain a special character: ``~@#$%^&*(){}[]_<>-+=|\/:;"'`,.?!``
* `number_required`: if set to true, the password must contain a digit: `0-9`.

### Login attempts <a href="#logins" id="logins"></a>

Next to the password policy, there are also restrictions with regard to login attempts.

After each failed login attempt for an email address that is assigned to a user in the system. The failed login attempts counter for that user is incremented by 1. When a user has a successful login the counter of that user is reset to 0.

See also the [Login timeout restrictions section on the Usage and Performance page](../../../exh-platform/usage-and-performance.md#logins).

When a user has 50 failed login attempts this can be reset to 0 by any user with the global `RESET_FAILED_LOGIN_ATTEMPTS` permission by performing following call:

```
POST /{userId}/reset_failed_login_attempts
```

## Email templates <a href="#logins" id="logins"></a>

For certain actions the User Service sends an email. The user service allows you to customize these emails by linking to email templates.

The types of emails the User Service send:

* Activation email
* Reactivation email
* Password reset email
* OIDC Unlink email

The content of email templates are configured in the [Template Service](../../other/template-service/#e-mail-templates). The User Service can be configured to use specific templates by referencing their `name` .

{% hint style="warning" %}
Declaring email templates by id was deprecated in v.1.6.0
{% endhint %}

We recommend synchronising email templates using the [CLI](https://docs.extrahorizon.com/cli) please refer to the [synchronizing settings documentation](https://docs.extrahorizon.com/cli/commands/settings#synchronize-settings) for further information.

#### OIDC Unlink email

The OIDC Unlink email serves to inform the user they are unlinked from their OIDC provider and should configure a password for their account.

The template will receive a password reset hash with which the user can update its password from within your application.

Setting the email template:

```typescript
await exh.users.setEmailTemplates({ oidcUnlinkEmailTemplateName: 'oidc_unlink_email_template_name' })
```

#### Pin code email variants

The email templates mentioned above are the default emails used. Alternatively pin code mode can be enabled and used for these flows. The pin code mode has its own set of email templates which can be configured:

```javascript
await exh.users.setEmailTemplates({
  activationPinEmailTemplateName: 'activation_pin_email_template_name',
  reactivationPinEmailTemplateName: 'reactivation_pin_email_template_name',
  passwordResetPinEmailTemplateName: 'password_reset_pin_email_template_name',
  oidcUnlinkPinEmailTemplateName: 'oidc_unlink_pin_email_template_name',
});
```

See "[Using pin codes for email verification](users.md#using-pin-codes-for-email-verification)" for more information.

## Verification Settings

The behavior of the activation and forgot password flows can be customized by the verification settings.

For example, the pin code mode can be enabled using the Extra Horizon SDK:

```javascript
await exh.users.settings.updateVerificationSettings({
  enablePinCodeActivationRequests: true,
  enablePinCodeForgotPasswordRequests: true,
});
```

See "[Using pin codes for email verification](users.md#using-pin-codes-for-email-verification)" for more information.
