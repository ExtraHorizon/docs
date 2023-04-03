---
description: >-
  With the openID connect capabilities of Extra Horizon you can create a single
  sign on experience in your applications
---

# Open ID Connect

From our personal experience we know that the success of many medical applications largely depend on how well they are able to integrate into the day to day workflow of hospitals, physicians, nurses,… Therefore, as an application builder you want to put an extra focus on designing apps with a low barrier of entry and easy accessibility.

The OpenID Connect (OIDC) authentication protocol enables users to securely log in to an Extra Horizon cluster using their existing credentials from another service, known as the provider. A common example of this is the "login with Google" button that can be found on many websites.

## Getting started <a href="#getting-started" id="getting-started"></a>

To start making use of the openID connect functionality we need tot take the following steps:

1. [Register with an openID connect provider.](./#register-with-an-openid-connect-provider)
2. [Add the Provider to your Extra Horizon cluster](./#add-the-provider-to-your-extra-horizon-cluster)

### Register with an OpenID Connect provider <a href="#register-with-an-openid-connect-provider" id="register-with-an-openid-connect-provider"></a>

First you will need to register with an OpenID Connect provider. The provider can be any kind of external system or platform managing a user directory that supports OpenID connect protocol. We have added a tutorial for registering with some of the most common directory systems:

* [Registering with Google Cloud](google-cloud.md)
* [Register with Azure ADFS](azure-adfs.md)

Registering with other platform's or tools is also possible. After registering you will receive the credentials for your application which consist of a `clientId` and `clientSecret`. You will need them later to add the provider to Extra Horizon.

In the OpenID Connect provider documentation you should be able to find the following URL's:

| Field                   | Description                                                                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `issuerId`              | The unique identifier of the provider, which is often in the form of a URL, such as "[https://example.com/issuer](https://example.com/issuer)". This is used to verify that the provider it is communicating with is the intended one. |
| `authorizationEndpoint` | The URL where the user will be redirected to in order to log in with the provider.                                                                                                                                                     |
| `tokenEndpoint`         | The URL that the Extra Horizon Back End will call to obtain an access token for retrieving user information.                                                                                                                           |
| `userInfoEndpoint`      | The URL that the authentication service will call to obtain information about the user, including email, first name, and last name.                                                                                                    |

### Add the Provider to your cluster <a href="#add-the-provider-to-your-extra-horizon-cluster" id="add-the-provider-to-your-extra-horizon-cluster"></a>

{% tabs %}
{% tab title="Control Center" %}
You can use the Extra Horizon control center to configure your OpenID Connect provider. First login into your cluster on [app.extrahorizon.com](https://app.extrahorizon.com).&#x20;

{% hint style="info" %}
Make sure the identity authenticating has the needed permissions:

* `CREATE_OIDC_PROVIDER`
* `VIEW_OIDC_PROVIDERS`
* `UPDATE_OIDC_PROVIDER`
* `DELETE_OIDC_PROVIDER`
{% endhint %}



Navigate to [SSO Providers](https://app.extrahorizon.com/users/sso/) that is located under User Management.<img src="../../../../.gitbook/assets/Scherm­afbeelding 2023-04-03 om 13.38.58.png" alt="" data-size="original">

Here you can find a list of currently registered SSO Providers.

<figure><img src="../../../../.gitbook/assets/Scherm­afbeelding 2023-04-03 om 14.04.33 (1).png" alt=""><figcaption></figcaption></figure>

Go to **"Add new"** to register a new provider and fill in the required information. It should look something like this:

<figure><img src="../../../../.gitbook/assets/Scherm­afbeelding 2023-04-03 om 14.11.54.png" alt=""><figcaption></figcaption></figure>

When ready, press **"Create".**
{% endtab %}

{% tab title="JavaScript" %}
You can also add a provider by using the [Extra Horizon JavaScript SDK](https://docs.extrahorizon.com/javascript-sdk/).&#x20;

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

## Adding OpenID connect to your app <a href="#adding-openid-connect-to-your-app" id="adding-openid-connect-to-your-app"></a>

Once your openID connect provider is added to your environment. You can start modifying your applications in order for users to login using OpenID Connect. In order to support Singel Sign On over OpenID connect you application will need to support the following flow:

* **Step 1:** Add login with SSO as an option to the user
* **Step 2:** Generate an authenticationUrl and redirect the user
* **Step 3:** Implement a callback url & retrieve a oAuth2 token

<figure><img src="../../../../.gitbook/assets/OpenID Connect Flow (1).png" alt=""><figcaption></figcaption></figure>

### 1. Add login with SSO as an option <a href="#default-log-in-flow" id="default-log-in-flow"></a>

On your login page you can add a login button or list for each registered provider.

<figure><img src="../../../../.gitbook/assets/Frame 4 (3).png" alt=""><figcaption></figcaption></figure>

### 2. Retrieve the authentication URL & redirect the user <a href="#retrieve-the-authentication-url" id="retrieve-the-authentication-url"></a>

Once the provider is selected we will need to redirect the user to that provider. The redirectUrl with the necessary parameters can be generated by using the following function.

```typescript
const url = await exh.auth.generateOidcAuthenticationUrl('google',{
    state: 'some-randomly-generated-string'
});
```

{% hint style="info" %}
A state parameter can be added to the URL. Supply the `state` property to this function and the state parameter will be included in the URL. If supplied, the provider will add the same state parameter and value again to the URL when redirecting the user is back to your application (the configured `redirectUri`). This can (and should) be used to protect against Cross-Site Request Forgery (CSRF) attacks.
{% endhint %}

{% hint style="info" %}
You can use the `state` to include information about the provider. This way your application can verify and use the authorization for the correct provider in [step 3.](./#handle-the-callback-and-parameters)&#x20;
{% endhint %}

### &#x20;**3.** Implement a callback url and retrieve the oAuth2 token <a href="#handle-the-callback-and-parameters" id="handle-the-callback-and-parameters"></a>

The user will be redirect to the callback url configured with the provider once the authentication is successful. Your application will need to capture the authorization code that is provided as a parameter in the callback url.

Next you can use the `authenticateWithOidc` function to exchange the authorization code for tokens:

```typescript
const token = await exh.auth.authenticateWithOidc('google',{
    authorizationCode: 'abcd********1234'
});
```

{% hint style="warning" %}
#### First time users

Extra Horizon copies the basic user information _(email, first name, lastname)_ from the SSO provider once when the user registers in Extra Horizon. After that this information can be edited independently from the SSO provider in Extra Horizon.

#### No profile <a href="#no-profile-will-be-created-for-users-that-register-through-an-sso-provider" id="no-profile-will-be-created-for-users-that-register-through-an-sso-provider"></a>

For users that register through an SSO provider, a profile will not be created automatically. If necessary a profile should be created manually.
{% endhint %}

{% hint style="danger" %}
#### Already registered Error

An \`EmailUsedError\` will be thrown if a user tries to register a new account by using SSO for an email that already exists. Make sure your application catches error and informs the user in a correct way.&#x20;

If a user wants to switch from a email based account to a SSO based account your application needs to implement the ability to link a SSP provider. [More info here](./#link-the-authenticated-user-to-an-oidc-provider)
{% endhint %}

{% hint style="danger" %}
#### Disabled providers

Extra Horizon provides you with the ability to disable providers. When a provider is disabled authentication attempts will trigger a \`IllegalStateError\`. Make sure your application catches error and informs the user in a correct way.&#x20;
{% endhint %}

{% hint style="danger" %}
#### Provider misconfiguration

When the authentication communication between Extra Horizon and Extra Horizon fails a \`OidcProviderResponseError\` is returned. Make sure your application catches error and informs the user in a correct way.&#x20;
{% endhint %}





