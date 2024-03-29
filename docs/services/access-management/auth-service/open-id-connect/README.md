---
description: >-
  With the OpenID Connect capabilities of Extra Horizon you can create a single
  sign on experience in your applications
---

# OpenID Connect

From our personal experience we know that the success of many medical applications largely depend on how well they are able to integrate into the day-to-day workflow of hospitals, physicians, nurses,… Therefore, as an application builder you want to put an extra focus on designing apps with a low barrier of entry and easy accessibility.

The OpenID Connect (OIDC) authentication protocol enables users to securely log in to an Extra Horizon cluster using their existing credentials from another service, known as the provider. A common example of this is the "log in with Google" button that can be found on many websites.

## Getting started <a href="#getting-started" id="getting-started"></a>

To start making use of the OpenID Connect functionality we need tot take the following steps:

1. [Register with an OpenID Connect provider.](./#register-with-an-openid-connect-provider)
2. [Add the Provider to your Extra Horizon cluster](./#add-the-provider-to-your-extra-horizon-cluster)

### Register with an OpenID Connect provider <a href="#register-with-an-openid-connect-provider" id="register-with-an-openid-connect-provider"></a>

First you will need to register with an OpenID Connect provider. The provider can be any kind of external system or platform managing a user directory that supports OpenID Connect protocol with [client\_secret\_basic client authentication](https://openid.net/specs/openid-connect-core-1\_0.html#ClientAuthentication). We have added a tutorial for registering with some of the most common directory systems:

* [Registering with Google Cloud](google-cloud.md)
* [Register with Azure ADFS](azure-adfs.md)

Registering with other platforms or tools is also possible. After registering you will receive the credentials for your application which consist of a `clientId` and `clientSecret`. You will need them later to add the provider to Extra Horizon.

{% hint style="warning" %}
Although registering other providers than the ones listed above is definitely possible, be aware that only those in the list above are tested. Other providers might behave differently and therefor not work as expected with ExtraHorizon.  &#x20;
{% endhint %}

In the OpenID Connect provider documentation you should be able to find the following URLs:

| Field                   | Description                                                                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `issuerId`              | The unique identifier of the provider, which is often in the form of a URL, such as "[https://example.com/issuer](https://example.com/issuer)". This is used to verify that the provider it is communicating with is the intended one. |
| `authorizationEndpoint` | The URL where the user will be redirected to in order to log in with the provider.                                                                                                                                                     |
| `tokenEndpoint`         | The URL that the Extra Horizon Back End will call to obtain an access token for retrieving user information.                                                                                                                           |
| `userInfoEndpoint`      | The URL that the authentication service will call to obtain information about the user, including email, first name, and last name.                                                                                                    |

### Add the Provider to your cluster <a href="#add-the-provider-to-your-extra-horizon-cluster" id="add-the-provider-to-your-extra-horizon-cluster"></a>

{% tabs %}
{% tab title="Control Center" %}
You can use the Extra Horizon control center to configure your OpenID Connect provider. First log in into your cluster on [app.extrahorizon.com](https://app.extrahorizon.com).

{% hint style="info" %}
Make sure the identity authenticating has the needed permissions:

* `CREATE_OIDC_PROVIDER`
* `VIEW_OIDC_PROVIDERS`
* `UPDATE_OIDC_PROVIDER`
* `DELETE_OIDC_PROVIDER`
{% endhint %}

Navigate to [SSO Providers](https://app.extrahorizon.com/users/sso/) that is located under User Management.![](<../../../../.gitbook/assets/image (12) (2).png>)

Here you can find a list of currently registered SSO Providers.

<figure><img src="../../../../.gitbook/assets/Scherm­afbeelding 2023-04-03 om 14.04.33 (1).png" alt=""><figcaption></figcaption></figure>

Go to **"Add new"** to register a new provider and fill in the required information. It should look something like this:

<figure><img src="../../../../.gitbook/assets/image (13) (1).png" alt=""><figcaption></figcaption></figure>

When ready, press **"Create".**
{% endtab %}

{% tab title="JavaScript" %}
You can also add a provider by using the [Extra Horizon JavaScript SDK](https://docs.extrahorizon.com/javascript-sdk/).

{% hint style="info" %}
Make sure the identity executing the function has the needed permissions:

* `CREATE_OIDC_PROVIDER`
* `VIEW_OIDC_PROVIDERS`
* `UPDATE_OIDC_PROVIDER`
* `DELETE_OIDC_PROVIDER`
{% endhint %}

Use the information provided to you by your provider of choice and use the \`createProvider\` function to create a new provider.

```typescript
const newProvider = await exh.auth.oidc.createProvider({
    name: 'google',
    description: 'Google Provider',
    clientId: '1234****.apps.googleuserscontent.com',
    clientSecret: '****0987',
    issuerId: 'https://accounts.google.com',
    redirectUri: 'http://localhost:3000/callback',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    userInfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo'
});
```
{% endtab %}
{% endtabs %}

## Adding OpenID Connect to your app <a href="#adding-openid-connect-to-your-app" id="adding-openid-connect-to-your-app"></a>

Once your OpenID Connect provider is added to your environment. You can start modifying your applications in order for users to login using OpenID Connect. In order to support Single Sign On (SSO) over OpenID Connect you application will need to support the following flow:

* **Step 1:** Add login with SSO as an option to the user
* **Step 2:** Generate an authenticationUrl and redirect the user
* **Step 3:** Implement a redirect url & retrieve a oAuth2 token

<figure><img src="../../../../.gitbook/assets/OpenID Connect Flow (1).png" alt=""><figcaption></figcaption></figure>

### 1. Add login with SSO as an option <a href="#default-log-in-flow" id="default-log-in-flow"></a>

On your login page you can add a login button or list for each registered provider.

<figure><img src="../../../../.gitbook/assets/Frame 4 (3).png" alt=""><figcaption></figcaption></figure>

### 2. Retrieve the authentication URL & redirect the user <a href="#retrieve-the-authentication-url" id="retrieve-the-authentication-url"></a>

Once the provider is selected we will need to redirect the user to that provider. The authenticationUri with the necessary parameters can be generated by using the following function.

```typescript
const url = await exh.auth.generateOidcAuthenticationUrl('google', {
    state: 'some-randomly-generated-string'
});
```

{% hint style="info" %}
A state parameter can be added to the URL. Supply the `state` property to this function and the state parameter will be included in the URL. If supplied, the provider will add the same state parameter and value again to the URL when redirecting the user back to your application (the configured `redirectUri`).

This allows your application to maintain state during the authentication flow. This can (and should) be used to:

* Protect against Cross-Site Request Forgery (CSRF) attacks.
* Identify the correct provider to use the authorization code for in [step 3](./#handle-the-redirect-and-parameters).

A guide with and some tips and examples can be found in [this Auth0 article](https://auth0.com/docs/secure/attack-protection/state-parameters).
{% endhint %}

### **3.** Implement a redirect url and retrieve the oAuth2 token <a href="#handle-the-redirect-and-parameters" id="handle-the-redirect-and-parameters"></a>

Once the authentication is successful, the user will be redirected to the redirect URL that you have configured with the OpenID Connect provider. Your application must capture the authorization code that is provided as a query parameter called `code` in the redirect URL.

{% hint style="warning" %}
The authorization code may be URL encoded, so your application should decode it before using it.
{% endhint %}

At this point, if the state was provided in [step 2](./#retrieve-the-authentication-url), the `state` query parameter should be used to check for CSRF attacks and identify the correct provider.

Next you can use the `authenticateWithOidc` function to exchange the authorization code for tokens:

```typescript
const token = await exh.auth.authenticateWithOidc('google',{
    authorizationCode: 'abcd********1234'
});
```

{% hint style="warning" %}
**First time users**

Extra Horizon copies the basic user information _(email, first name, lastname)_ from the SSO provider once when the user registers in Extra Horizon. After that this information can be edited independently of the SSO provider in Extra Horizon.

**No profile**

For users that register through an SSO provider, a profile will not be created automatically. If necessary a profile should be created manually.
{% endhint %}

{% hint style="danger" %}
**Already registered Error**

An \`EmailUsedError\` will be thrown if a user tries to register a new account by using SSO for an email that already exists. Make sure your application catches error and informs the user in a correct way.

If a user wants to switch from an email based account to an SSO based account your application needs to implement the ability to link an SSO provider. [More info here](./#link-the-authenticated-user-to-a-provider)
{% endhint %}

{% hint style="danger" %}
**Disabled providers**

Extra Horizon provides you with the ability to disable providers. When a provider is disabled authentication attempts will trigger a \`IllegalStateError\`. Make sure your application catches error and informs the user in a correct way.
{% endhint %}

{% hint style="danger" %}
**Provider misconfiguration**

When the authentication communication between Extra Horizon and the OpenID Connect Provider fails a \`OidcProviderResponseError\` is returned. Make sure your application catches this error and informs the user in a correct way.
{% endhint %}

## Support

### Link the authenticated user to a provider

When an email-password based user wants to connect to a provider your application will need to support that kind of functionality.

Similar to the flow [above](./#adding-openid-connect-to-your-app) you will need to generate an authenticationUrl and redirect the user:

```typescript
const oidcAuthenticationUrl = await exh.auth.generateOidcAuthenticationUrl('google',{
    state: 'some-randomly-generated-string'
});
```

You can use the following function in the SDK to link an authenticated user to an existing provider. Note that the user will need to log in first via email and password before you can execute this function.

To link an authenticated user to an existing provider using the SDK, use the following function. However, note that the user must first log in with their email and password to generate a presenceToken using the `auth.confirmPresence` function. Once you have the presenceToken, you can execute the function to link the user to the provider

```typescript
await exh.auth.oidc.linkUserToOidcProvider('gooogle',{
    presenceToken: '3e9a8***224c'
    authorizationCode: 'abcd********1234'
});
```

After the linking process is completed successfully, the user will be automatically logged out from all applications. To access the application again, the user will need to log in using the linked provider's credentials.

{% hint style="warning" %}
If a user is already linked to a provider, they must first be unlinked before they can be linked to another provider. Each user can only be linked to one provider at a time.
{% endhint %}

{% hint style="warning" %}
When a user is linked to a provider, their password is removed from their account. As a result, they will no longer be able to log in using their password and email combination.
{% endhint %}

### Unlink a user from a provider

In some cases users might want to detach a provider from their account and return to a email-password based account. Administrator intervention is required to unlink users by a user with the `UNLINK_USER_FROM_OIDC` permission.

Before being able to unlink users from an OpenID Connect providers admins need to set the OIDC Unlink email template. [This is described in the User Service](../../user-service/configuration.md#oidc-unlink-email).

The admin can unlink the existing user from a provider by using the following function:

```typescript
await exh.auth.oidc.unlinkUserFromOidc(':userId');
```

Once the unlinking process is successfully completed, the user will be logged out of all applications. They will receive the OIDC Unlink email confirming their unlinking from OpenID Connect. Once the user completes the password reset process, they will be able to log in again.

{% hint style="warning" %}
**In order to reset their password, a user must be activated**

If the user's email address is correctly set, they can request a new activation email themselves. However, if their email address is not correctly set, an admin will need to intervene to correct the issue.
{% endhint %}

