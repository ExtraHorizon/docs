# Migration guide: Enabling verification request limiting

With User Service version 1.4.0 we introduced the ability to increase the security of your environment by enabling Verification Request Limiting. This page describes all you need to know about this new security feature and how to enable it.&#x20;

## Verification Request Limiting

We've added the ability to (rate) limit the account activation and forgot password flows. This is to prevent brute force attacks and spamming users with activation and forgot password emails.

This is a **security feature** and is enabled by default for all new environments. However for existing environments this feature is disabled as it could break your existing applications. **We do recommend enabling this feature**.&#x20;

This new feature can be enabled as described in the [Enabling the verification request limiting](migration-guide-enabling-verification-request-limiting.md#enabling-the-verification-request-limiting) section below. However, before enabling this feature, it is important to **consider the impact on your application**.

In summary, enabling the feature will apply the following new behavior:

* The account activation and forgot password hashes will only be valid for 60 minutes.
* Resending an account activation email will be (rate) limited.
* Requesting a forgot password email will be (rate) limited.

## Changes to take into account

Below we've outlined each of the changes in more detail. This should help you determine the impact on your application.

#### The account activation and forgot password hashes will only be valid for 60 minutes.

The most important impact for this change is when **accounts are created for other users**, and the activation hash is sent to them to sit in their mailbox until they are ready to use it. When this feature is enabled the hash will expire after 60 minutes, so the user will have to request a new one when they are ready to use it.

We do not expect a need to change the logic of your application, but you might want to **inform your users about this time limit** and instruct them how to request a new account activation or forgot password hash.

When a hash is expired the platform will return the same error as if the hash never existed.

#### Resending the account activation email will be (rate)limited

New errors should be considered when a user requests the activation email to be resend.

{% tabs %}
{% tab title="Using the SDK" %}
The SDK method `exh.users.requestEmailActivation(...)`.

* Throws an error when the request is too quickly (within 5 minutes) after the last request:  `ActivationRequestTimeoutError`
* Throws an error when too many account activation requests were initiated (5 times), without completing one: `ActivationRequestLimitError`

The status of the account activation flow for users can be checked with the SDK method:\
`exh.users.activationRequests.find(...)`

The status can be reset by deleting the activation request with the SDK method:\
`exh.users.activationRequests.remove(...)`
{% endtab %}

{% tab title="Using HTTP " %}
The HTTP endpoint `GET /users/v1/activation`&#x20;

* Returns an error when the request is too quickly (within 5 minutes) after the last request:  `ACTIVATION_REQUEST_TIMEOUT_EXCEPTION`
* Returns an error when too many account activation requests were initiated (5 times), without completing one: `ACTIVATION_REQUEST_LIMIT_EXCEPTION`

The status of the account activation flow for users can be checked with the HTTP endpoint:\
`GET /users/v1/activation_requests`

The status can be reset by deleting the activation request with the HTTP endpoint:\
`DELETE /users/v1/activation_requests/:id`
{% endtab %}
{% endtabs %}

#### (Re)sending the forgot password email will be (rate)limited

New errors should be considered when a user requests a forgot password email.

{% tabs %}
{% tab title="Using the SDK" %}
The SDK method `exh.users.requestPasswordReset(...)`

* Throws an error when the request is too quickly (within 5 minutes) after the last request: `ForgotPasswordRequestTimeoutError`
* Throws an error when too many forgot password requests were initiated (5 times), without completing one: `ForgotPasswordRequestLimitError`

The status of the forgot password flow for users can be checked with the SDK method:\
`exh.users.forgotPasswordRequests.find(...)`

The status can be reset by deleting the forgot password request with the SDK method:\
`exh.users.forgotPasswordRequests.remove(...)`
{% endtab %}

{% tab title="Using HTTP" %}
The HTTP endpoint `GET /users/v1/forgot_password`

* Returns an error when the request is too quickly (within 5 minutes) after the last request: `FORGOT_PASSWORD_REQUEST_TIMEOUT_EXCEPTION`
* Returns an error when too many forgot password requests were initiated (5 times), without completing one: `FORGOT_PASSWORD_REQUEST_LIMIT_EXCEPTION`

The status of the forgot password flow for users can be checked with the HTTP endpoint:\
&#x20;`GET /users/v1/forgot_password_requests`

The status can be reset by deleting the forgot password request with the HTTP endpoint:\
`DELETE /users/v1/forgot_password_requests/:id`
{% endtab %}
{% endtabs %}

## Enabling the verification request limiting&#x20;

After it is confirmed the impact of the new behavior is acceptable, the feature can be enabled.

The global permission `UPDATE_USER_VERIFICATION_SETTINGS` is required to make this change.

{% tabs %}
{% tab title="Using the SDK" %}
With the SDK the following snippet can be used to enable the feature:

```typescript
await exh.users.settings.updateVerificationSettings({
  limitHashActivationRequests: true,
  limitHashForgotPasswordRequests: true,
});
```
{% endtab %}

{% tab title="Using HTTP" %}
The HTTP endpoint `PUT /users/v1/settings/verification` can be used to enable the feature, with the following request body:

```json
{
  "limit_hash_activation_requests": true,
  "limit_hash_forgot_password_requests": true
}
```
{% endtab %}
{% endtabs %}
