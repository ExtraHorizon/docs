# oAuth2

oAuth2.0 standard: [\[rfc6749\]](https://datatracker.ietf.org/doc/html/rfc6749)

### Making an authenticated request

An example request to the User Service which is authenticated by OAuth2 looks like this:

{% code lineNumbers="true" %}
```
GET users/v1/me HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Authorization: Bearer 93a4d85654c24bd5a59c9b41f94f49e7
```
{% endcode %}

The role of the `Bearer` prefix in the **Authorization header** specifies that a token value is expected, implying a token-based authentication. In the case of OAuth2, this token value is the Access Token.

**Using the Extra Horizon SDK**

The Extra Horizon sdk solves the problem of making authenticated requests for you and will attach the right headers to the calls you are making in the background.

## Grants

### Password Grant

The Password Grant accepts your username and password, then returns an Access Token and a Refresh token. As mentioned before the Access Token can be used to authenticate API requests. These Access Tokens are short lived (A lifetime of 5 minutes for the flow described in the example below).

{% tabs %}
{% tab title="Javascript" %}
{% code lineNumbers="true" %}
```javascript
await exh.auth.authenticate({
    username:'john.doe@example.com'
    password:'myPassword1234'
});
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Not that in case this user has MFA enable this function will throw a `MfaRequiredError`. With the information in the error you can follow the [Mfa Grant](oauth2.md#mfa-grant) to complete the authentication.
{% endhint %}

### Mfa Grant

When MFA is enabled for a user and you try to authenticate using the password grant you will receive a `MfaRequiredError` . You can catch the error and use the Mfa Grant to complete the authentication.

{% tabs %}
{% tab title="Javascript" %}
{% code lineNumbers="true" %}
```javascript
try {
  await exh.auth.authenticate({
    password: '',
    username: '',
  });
} catch (error) {
  if (error instanceof MfaRequiredError) {
    const { mfa } = error.response;

    // Your logic to request which method the user want to use in case of multiple methods
    const methodId = mfa.methods[0].id;

    await exh.auth.confirmMfa({
      token: mfa.token,
      methodId,
      code: '', // code from ie. Google Authenticator
    });
  }
  // handle other possible authentication errors
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Authorization Grant

In most cases you will want to use to authorization Grant flow for external applications that are not under your direct control. E.g. partners that you allow to have an integration with your platform.

You don't want them to handle your users credentials and will require these applications to obtain an authorization grant code by redirecting you a /authorize endpoint hosted by one of your trusted applications.

An example of such a webpage would look like this:

{% code lineNumbers="true" %}
```
/authorize/?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}
```
{% endcode %}

When the user is authenticated on that page he/she will be redirected back to the URI specified in the client registration and the query parameter. this redirect will contain an authorization code that you can then use in the SDK to obtain an authentication.

{% code lineNumbers="true" %}
```javascript
await exh.auth.authenticate({
  code: '{yourAuthorizionCodeHere}',
});
```
{% endcode %}

### Refresh Token Grant

The Refresh Token Grant is a mechanism to obtain a new Access Token. The grant accepts a Refresh Token and returns a new Access Token and a new Refresh Token. That way, the application keeps a valid access token without having the user to provide its credentials again.

When an access token is expired the SDK will use the refresh token stored in memory to refresh the tokens and make sure your call to the api is tried again.

When you want your user to stay authenticated when he reopens you app you will need to store the refreshToken and initiate the SDK authentication with the stored token.

{% code lineNumbers="true" %}
```javascript
await exh.auth.authenticate({
  refreshToken: 'myRefreshToken',
});
```
{% endcode %}

{% hint style="danger" %}
Note that the refresh token changes every time a new access token is obtained. Therefore you will need to add a listener to the SDK to be notified when a new refresh token is received and for your app to safely and securely store it.
{% endhint %}

Each time the SDK refreshes the `accessToken` the `freshTokensCallback` is called with the response. You can store this data in `localStorage` or any other persistant data store. When you restart your application, you can check the data store for a `refreshToken` and use that to authenticate with the SDK.

{% code lineNumbers="true" %}
```javascript
const exh = createOAuth2Client({
  host: '',
  clientId: '',
  freshTokensCallback: tokenData => {
    localStorage.setItem('tokenData', tokenData);
  },
});
```
{% endcode %}

## Tokens

### Retrieve a list of active tokens

You can retrieve a list of active tokens and the applications they correspond to.

{% code lineNumbers="true" %}
```javascript
await exh.auth.oauth2.getAuthorizations({
    rql: //optional rql query
});
```
{% endcode %}

### Revoking tokens

You can revoke tokens by use the deleteAuthorization function.

{% code lineNumbers="true" %}
```javascript
await exh.auth.oauth2.deleteAuthorization('');
```
{% endcode %}

##
