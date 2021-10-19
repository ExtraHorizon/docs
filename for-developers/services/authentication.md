---
description: >-
  Provides authentication functionality. The Authentication service supports
  both OAuth 1.0a and OAuth 2.0 standards.
---

# Authentication

The **Auth Service **is responsible for both Authentication and Authorization and supports both OAuth 1.0a and OAuth 2.0 standards.

## oAuth2

oAuth2.0 standard: [\[rfc6749\]](https://datatracker.ietf.org/doc/html/rfc6749)

### Making an authenticated request

{% tabs %}
{% tab title="Curl" %}
An example request to the User Service which is authenticated by OAuth2 looks like this:

```
GET users/v1/me HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Authorization: Bearer 93a4d85654c24bd5a59c9b41f94f49e7
```

The role of the `Bearer` prefix in the **Authorization header** specifies that a token value is expected, implying a token-based authentication. In the case of OAuth2, this token value is the Access Token.
{% endtab %}

{% tab title="JavaScript" %}
**Authorization Header**

The [Extra Horizon sdk](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/PBohhdoDnU7Kj1aCVLWD/) solves the problem of making authenticated requests for you and will attach the right headers to the calls you are making in the background.
{% endtab %}
{% endtabs %}

### Password Grant



### Mfa Grant

### Authorization Grant

### Refresh Token Grant

{% tabs %}
{% tab title="Curl" %}

{% endtab %}

{% tab title="JavaScript" %}
When an access token is expired the [sdk](https://app.gitbook.com/o/-MkCjSW-Ht0-VBM7yuP9/s/PBohhdoDnU7Kj1aCVLWD/) will use the refresh token stored in memory to refresh the tokens and make sure your call to the api is tried again.
{% endtab %}
{% endtabs %}

### Revoking tokens

## oAuth1

### Creating Tokens

### SSO

## MFA

## Applications

Applications represent the&#x20;

### Creating an application

### Adding a version

### Deprecating versions

### Removing an application

##

### Snippet for authentication flow in Browser

Each time the SDK refreshes the `accessToken` the `freshTokensCallback` is called with the response. You can store this data in `localStorage` or any other persistant data store. When you restart your application, you can check the data store for a `refreshToken` and use that to authenticate with the SDK.

```javascript
import { createOAuth2Client } from '@extrahorizon/javascript-sdk';

const sdk = createOAuth2Client({
  host: '',
  clientId: '',
  freshTokensCallback: tokenData => {
    localStorage.setItem('refreshToken', tokenData.refreshToken);
  },
});

try {
  const refreshToken = await localStorage.getItem('refreshToken');

  if (refreshToken) {
    await sdk.auth.authenticate({
      refreshToken,
    });
  } else {
    // redirect to /login
  }
} catch (error) {
  localStorage.removeItem('refreshToken');
  // redirect to /login
}
```

### OAuth1

#### Token authentication with optional skip

The `skipTokenCheck` saves \~300ms by skipping validation on your `token` and `tokenSecret`.

```javascript
import { createOAuth1Client } from '@extrahorion/javascript-sdk';

const sdk = createOAuth1Client({
  host: 'dev.fibricheck.com',
  consumerKey: '',
  consumerSecret: '',
});

await sdk.auth.authenticate({
  token: '',
  tokenSecret: '',
  skipTokenCheck: true,
});
```

#### Email authentication

```java
import { createOAuth1Client } from '@extrahorizon/javascript-sdk';

const sdk = createOAuth1Client({
  host: 'dev.fibricheck.com',
  consumerKey: '',
  consumerSecret: '',
});

await sdk.auth.authenticate({
  email: '',
  password: '',
});
```

### OAuth2

#### Password Grant flow

```javascript
import { createOAuth2Client } from '@extrahorizon/javascript-sdk';

const sdk = createOAuth2Client({
  host: '',
  clientId: '',
});

await sdk.auth.authenticate({
  password: '',
  username: '',
});
```

#### Authorization Code Grant flow with callback (Only for Fibricheck)

* Open [https://pages.dev.fibricheck.com/authorize/?client\_id=CLIENT\_ID\&response\_type=code\&redirect\_uri=REDIRECT\_URI](https://pages.dev.fibricheck.com/authorize/?client\_id=CLIENT\_ID\&response\_type=code\&redirect\_uri=REDIRECT\_URI)
* click Authorize
* Capture the query params on the redirect uri
* Authenticate with the code query param

```javascript
import { createOAuth2Client } from '@extrahorizon/javascript-sdk';

const sdk = createOAuth2Client({
  host: '',
  clientId: '',
  freshTokensCallback: tokenData => {
    localStorage.setItem('tokenData', tokenData);
  },
});

await sdk.auth.authenticate({
  code: '',
});
```

#### Refresh Token Grant flow

```javascript
import { createOAuth2Client } from '@extrahorizon/javascript-sdk';

const sdk = createOAuth2Client({
  host: '',
  clientId: '',
});

await sdk.auth.authenticate({
  refreshToken: '',
});
```

#### Password Grant flow with two-step MFA in try / catch

```javascript
import {
  createOAuth2Client,
  MfaRequiredError,
} from '@extrahorizon/javascript-sdk';

const sdk = createOAuth2Client({
  host: '',
  clientId: '',
});

try {
  await sdk.auth.authenticate({
    password: '',
    username: '',
  });
} catch (error) {
  if (error instanceof MfaRequiredError) {
    const { mfa } = error.response;

    // Your logic to request which method the user want to use in case of multiple methods
    const methodId = mfa.methods[0].id;

    await sdk.auth.confirmMfa({
      token: mfa.token,
      methodId,
      code: '', // code from ie. Google Authenticator
    });
  }
}
```

#### Confidential Applications

```
const sdk = createClient({
  host: 'https://api.dev.fibricheck.com',
  clientId: '',
  clientSecret: '',
});
```

![](https://github.com/ExtraHorizon/javascript-sdk/raw/dev/docs/assets/refresh.webp)

## OAuth 2.0 support

The Authentication Service provides OAuth 2.0 authentication, allowing access to the other services within the system.

For instance a request to the User Service which is authenticated by OAuth2 looks like this:

```
GET users/v1/me HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Authorization: Bearer 93a4d85654c24bd5a59c9b41f94f49e7
```

The role of the `Bearer` prefix in the **Authorization header** specifies that a token value is expected, implying a token-based authentication. In the case of OAuth2, this token value is the Access Token.

In OAuth 2.0, Access Tokens can be obtained by different kind of Grants. For now the relevant Grants are:

* Password Grant
* Refresh Token Grant

The Password Grant accepts your username and password, then returns an Access Token and a Refresh token. As mentioned before the Access Token can be used to authenticate API requests. These Access Tokens are short lived (A lifetime of 5 minutes for the flow described in the example below).

The Refresh Token Grant is a mechanism to obtain a new Access Token. The grant accepts a Refresh Token and returns a new Access Token and a new Refresh Token. That way, the application keeps a valid access token without having the user to provide its credentials again.

#### Examples

The requests made using OAuth2 are bound within the context of an Application. An Application instance is identified by a Client ID. The Client ID should be specified in the creation phase of the tokens.

We will authenticate using the `password` grant type, when authenticating with a client ID along with the credentials, the service will respond with the required tokens, a corresponding User ID, and an Application ID. The access token from the response will provide access to the other platform services

In the following examples it is assumed that a valid OAuth 2.0 application exists, with a client id `0f4061a353c848eb0e02b80a2fe7bbc2254f1f77`.

### **Password Grant**

**Request:**

```
POST /auth/v2/oauth2/tokens HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Content-Type: application/x-www-form-urlencoded

grant_type=password\
&client_id=0f4061a353c848eb0e02b80a2fe7bbc2254f1f77\
&username=john@example.com\
&password=secr3t
```

_Extra line breaks are for display purposes only._

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "token_type": "bearer",
  "expires_in": 300,
  "access_token": "72bc81dceb58fe53bddee9969d54f76913bb29d8",
  "refresh_token": "1f9de38da7a5df5b2056800be5356f2d4b9e79c5",
  "user_id": "60758d7159080100071a3d9b",
  "application_id": "5c77a981b03575a7c499c892"
}
```

### **Refresh Token Grant**

**Request:**

```
POST /auth/v2/oauth2/tokens HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=1f9de38da7a5df5b2056800be5356f2d4b9e79c5
&client_id=0f4061a353c848eb0e02b80a2fe7bbc2254f1f77\
```

_Extra line breaks are for display purposes only._

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "token_type": "bearer",
  "expires_in": 300,
  "access_token": "3f350e4e3bb358fd1e0a2a1d2cd5f41ffd62e3be",
  "refresh_token": "760a7c2d4bfa43d3369e0cedc06b8d90a4d2d3bf",
  "user_id": "60758d7159080100071a3d9b",
  "application_id": "5c77a981b03575a7c499c892"
}
```

### **Request with an expired Access Token**

When an access token is used which is no longer valid, an error is returned. This can be used to detect if the Refresh Token Grant should be used to obtain a new Access Token.

**Request:**

```
GET users/v1/me HTTP/1.1
Host: api.<environment>.<​company>.extrahorizon.io
Authorization: Bearer 93a4d85654c24bd5a59c9b41f94f49e7
```

**Response:**

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "code": 117,
  "name": "ACCESS_TOKEN_UNKNOWN_EXCEPTION",
  "message": "The access token is unknown"
}
```

### Further readings

* OAuth 2.0: https://tools.ietf.org/html/rfc6749
  * Security considerations: https://tools.ietf.org/html/rfc6819
  * PKCE: https://tools.ietf.org/html/rfc7636
  * PKCE S256 tool: https://tonyxu-io.github.io/pkce-generator/

## API Specification&#x20;

