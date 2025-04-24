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

The content of email templates are configured in the [Template Service](../../other/template-service/#e-mail-templates). The ids of the templates to be used by the User Service can be configured via the SDK:

```javascript
await exh.users.setEmailTemplates({
  activationEmailTemplateId: '65e8328bdeac6337e1e5f6f7',
  reactivationEmailTemplateId: '65e8328adeac631d37e5f6f6',
  passwordResetEmailTemplateId: '65e8328fdeac634842e5f6f9',
  oidcUnlinkEmailTemplateId: '65e83298deac633d2ae5f6fa',
});
```

#### OIDC Unlink email

The OIDC Unlink email serves to inform the user they are unlinked from their OIDC provider and should configure a password for their account.

The template will receive a password reset hash with which the user can update its password from within your application.

Setting the email template:

```typescript
await exh.users.setEmailTemplates({ oidcUnlinkEmailTemplateId: 'template-id' })
```

#### Pin code email variants

The email templates mentioned above are the default emails used. Alternatively pin code mode can be enabled and used for these flows. The pin code mode has its own set of email templates which can be configured:

```javascript
await exh.users.setEmailTemplates({
  activationPinEmailTemplateId: '642ffe4388742725cc5cb1e2',
  reactivationPinEmailTemplateId: '642b0899443c9874f8c41bc7',
  passwordResetPinEmailTemplateId: '65325e4a18bf0c1e3b1f5c7e',
  oidcUnlinkPinEmailTemplateId: '65325d8f18bf0c1e3b1f5c7c',
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
