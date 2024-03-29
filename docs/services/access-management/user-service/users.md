# Users

## **Retrieve users**

```javascript
const rql = rqlBuilder().eq('email', 'john.doe@example.com').build();
await exh.users.find({
  rql,
});
```

Using the Extra Horizon SDK or REST API's you can easily retrieve users. The permissions assigned to you determine the returned fields. You will receive either a **Full User**, a **Patient,** or a **Staff** view.

{% tabs %}
{% tab title="Full User" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "roles":[...],
    "staffEnlistments":[...],
    "patientEnlistments":[...]
    "lastFailedTimestamp": 1632733680,
    "failedCount": 0,
    "creationTimestamp": 1632733681,
    "updateTimestamp": 1632733682
}
```
{% endtab %}

{% tab title="Patient" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "patientEnlistments": [...] //only the groups where you are staff
  }
```

When you receive a **Patient** the patientEnlistments property will only hold the enlistments for groups where you are a Staff member.
{% endtab %}

{% tab title="Staff" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phoneNumber": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "staffEnlistments": [...] //only the groups where you are patient
  }
```

When you receive a **Staff** the `staffEnlistments` property will only hold the enlistments for groups where you are a Staff member.
{% endtab %}
{% endtabs %}

**Property overview**

| Attribute               | Description                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `id`                    | The identifier of the user.                                                                                            |
| `first_name`            | First name of the user.                                                                                                |
| `last_name`             | Last name of the user.                                                                                                 |
| `language`              | A supported language code see [Localization service documentation](../../other/localizations-service/language-code.md) |
| `email`                 | email address of the user.                                                                                             |
| `phone_number`          | phone number of the user.                                                                                              |
| `activation`            | Boolean indicating the email address has been activated true or false.                                                 |
| `roles`                 | Array containing a description of the roles this user has obtained.                                                    |
| `staff_enlistments`     | Array containing a description of the staff enlistments this user has within one or more groups.                       |
| `patient_enlistments`   | Array containing a description of the patient enlistments this user has within one or more groups.                     |
| `last_failed_timestamp` | Epoch timestamp Information about when the last password login attempt failed.                                         |
| `failed_count`          | The number of consecutive password login attempts.                                                                     |
| `creation_timestamp`    | Epoch timestamp when the user was created.                                                                             |
| `update_timestamp`      | Epoch timestamp when this user object was last updated.                                                                |

{% hint style="info" %}
When using the Javascript SDK fields are transformed into a **camelCase**. **snake\_case** will be phased out for the user service and all other Extra Horizon Services in the future.
{% endhint %}

## **Create** a new user

You can use the Extra Horizon SDK to create new users from your application. This also triggers a UserCreated event.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const user = await exh.users.createAccount({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Secret1234',
    phoneNumber: '+32012345678',
    birthday: '1987-06-05',
    country: 'UK',
    gender: 1,
    language: 'EN',
    timeZone: 'Europe/London'
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
**Notice:** **birthday**, **country** & **gender** are part of the registration fields but are not returned when querying for the user. This is because of the underlying integration with the Extra Horizon Profile Service. During account creation, a user profile is created and these fields are stored there.
{% endhint %}

### **Check for email availability**

As an application, you have the ability to check if an email is available or already in use in a user account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.isEmailAvailable('jane.doe@example.com');
```
{% endtab %}
{% endtabs %}

### Email verification

After registration, the activation attribute defaults to `false`. While email verification does not block using any API services, it does block the possibility to initiate a password reset. If you do not provide password reset functionality in your application, you can skip this step. For other applications, it is highly recommended to implement email verification to prevent sending emails to the wrong person.

The user service can be configured to hold a reference to an HTML template in the template service. When registration occurs, the user service will try to send an email by using this template.

{% hint style="danger" %}
To use an email verification template other than the default one, contact [Extra Horizon](mailto:requests@extrahorizon.com)
{% endhint %}

The user service will provide the user's `firstname`, `lastname`, and `activation_hash` values to the email service. The email service adds a `tracking_hash` before it reaches the template service. Thus you can use these three fields in your email template. Please review the Template Service documentation to learn how to design email templates.

```javascript
{
    ...,
    "schema": {
        "type": "object",
        "fields": {
            "firstname": {
                "type": "string"
            },
            "lastname": {
                "type": "string"
            },
            "activation_hash": {
                "type": "string"
            },
            "tracking_hash": {
                "type": "string"
            }
        },
    }
    ...
}
```

### **Resending email verification**

When you make an application where email verification is a prerequisite, or when you want to provide password reset capabilities, you want your user to be able to trigger the email verification mail again.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.requestEmailActivation('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
To use an email activation template other than the default one, contact [Extra Horizon Support](mailto:requests@extrahorizon.com)
{% endhint %}

### **Performing a user activation**

By performing the steps mentioned higher, you can send your user an email with an activation token. Typically this is embedded inside an URL or a deep link. You can then use that token to activate the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.validateEmailActivation({
    hash: '6ca1691b4c5b4dbfa5def4c49b910657',
});
```
{% endtab %}
{% endtabs %}

## Change email address

When a user is logged in, he can change the email of his or another user's account, depending on the set permissions. Changing an email requires re-activating the associated account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.updateEmail('abcdef0123456789abcdef01', {
  email: 'jane.doe@example.com',
});
```
{% endtab %}
{% endtabs %}

## Password reset

Users not remembering their password is common. You want to deal with it safely in your applications. The Extra Horizon SDK provides you with the ability to do so.

### **Requesting a password reset email**

Similar to the email verification flow, the password reset flow provides you with a reset token that you can use to set a new password for your user's account.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.requestPasswordReset('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
To use a password reset template other than the default one, contact [Extra Horizon Support](mailto:requests@extrahorizon.com)
{% endhint %}

### **Resetting a password**

By performing the steps mentioned higher, you can provide your user with an email containing a reset token. Typically this is embedded inside a URL or deep link towards your application. You can then use that token to reset the password of the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.validatePasswordReset({
    hash: 'be7ab8ebe9094588ac3693cd6ec9d5b7',
    newPassword: 'myNewSecret1234',
});
```
{% endtab %}
{% endtabs %}

## Password Change

When authenticated you can also implement password change functionality in your application. Changing the password requires you to resend the current password together with the new password.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.changePassword({
    oldPassword: 'password123',
    newPassword: 'newPassword123',
});
```
{% endtab %}
{% endtabs %}

## Removing a user

Removing a user requires the global DELETE\_USER permission. This will also trigger a UserDeleted event.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await exh.users.remove('abcdef0123456789abcdef01');
```
{% endtab %}
{% endtabs %}

## Using pin codes for email verification

The pin code mode is an **alternative mode for the account activation and forgot password flows**. The mode is targeted to use cases where the end user might need to manually input the secret in the application.&#x20;

By default Extra Horizon uses the hash mode, this sends an email with a hash (a string of 40 hexadecimal characters) to the user. When the pin code mode is enabled and used, **a pin code of 8 digits** is send instead.

### Setting up pin code mode

By default the pin code mode is disabled, it can be enabled with the Extra Horizon SDK:

```javascript
await exh.users.settings.updateVerificationSettings({
  enablePinCodeActivationRequests: true,
  enablePinCodeForgotPasswordRequests: true,
});
```

It is supported that both the hash mode and pin code mode are be used for different parts of your application, so different [email templates](../../other/template-service/#e-mail-templates) are used to send pin codes to end users. Rather then the `content.activation_hash` or `content.reset_hash`, a `content.pin_code` field will be available to the pin code email templates. The templates can be set like this:

```javascript
await exh.users.setEmailTemplates({
  activationPinEmailTemplateId: '642ffe4388742725cc5cb1e2',
  reactivationPinEmailTemplateId: '642b0899443c9874f8c41bc7',
  passwordResetPinEmailTemplateId: '65325e4a18bf0c1e3b1f5c7e',
});
```

After enabling the pin code mode and setting the email templates, pin codes can now be used in the activation and forgot password flows.

### Using the pin code mode in the account activation flow

When enabled the pin code mode can be used when initiating the activation flow, during account creation, changing the email address of a user and when (re-)requesting the account activation email.&#x20;

For example, the pin code mode is used by setting `activationMode` when creating an account:

```javascript
await exh.users.createAccount({
  activationMode: 'pin_code',
  // Account details ...
});
```

The user receives an email showing the pin code, which the user should be able to give to your application. Then the pin code can be used to complete the activation:

```javascript
await exh.users.validateEmailActivation({
  email: 'john.doe@example.com',
  pinCode: '88703459',
});
```

### Using the pin code mode in the forgot password flow

If the pin code mode is enabled for the forgot password flow, `mode` can be used when requesting a forgot password email:

```javascript
await exh.users.requestPasswordReset({
  email: 'john.doe@example.com',
  mode: 'pin_code',
});
```

The user receives an email showing the pin code, which the user should be able to give to your application. Then the pin code can be used to change the password:

```javascript
await exh.users.validatePasswordReset({
  email: 'john.doe@example.com',
  pinCode: '88703459',
  newPassword: 'MyV3ryS3cr3tP4a$$w0rd'
});
```
