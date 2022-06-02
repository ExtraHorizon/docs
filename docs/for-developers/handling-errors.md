---
description: >-
  This page contains some general information about handling errors in the Extra
  Horizon (ExH) platform.
---

# Handling Errors

All errors reported by the API have a HTTP status code and follow [the standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

When an error happens, the error response body is always a JSON object with the following fields:

```
{
  "code": 13,
  "name": "EMPTY_BODY_EXCEPTION",
  "message": "The request body is empty"
}
```

### Common Errors <a href="#markdown-header-authentication-errors" id="markdown-header-authentication-errors"></a>

| Error code | HTTP status | Name                   | Description                                   |
| ---------: | ----------: | ---------------------- | --------------------------------------------- |
|         21 |         401 | LONG\_QUERY\_EXCEPTION | The query exceeds the maximum execution time. |

### Authentication Errors <a href="#markdown-header-authentication-errors" id="markdown-header-authentication-errors"></a>

Possible errors that are thrown by endpoints requiring authentication:

| Error code | HTTP status | Name                                | Description                                                                                                                                                                                           |
| ---------: | ----------: | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         10 |         401 | NO\_PERMISSION\_EXCEPTION           | The endpoint expected the user to have a specific permission, but the authenticated user did not.                                                                                                     |
|        104 |         401 | USER\_NOT\_AUTHENTICATED\_EXCEPTION | The endpoint expected that user authentication was present, but it was missing.                                                                                                                       |
|        107 |         401 | OAUTH\_KEY\_EXCEPTION               | The supplied OAuth 1 consumer key is unknown.                                                                                                                                                         |
|        108 |         401 | OAUTH\_TOKEN\_EXCEPTION             | The supplied OAuth 1 token is unknown (in combination with the consumer\_key).                                                                                                                        |
|        109 |         401 | OAUTH\_SIGNATURE\_EXCEPTION         | The supplied OAuth 1 signature did not match the signature calculated by the API. Possibly the token secret or consumer secret was wrong. Or the signature generation it self is not setup correctly. |
|        110 |         401 | DUPLICATE\_REQUEST\_EXCEPTION       | The supplied OAuth 1 parameters where already send once before. Make sure the time and nonce parameters are updated for each request authenticated with OAuth1.                                       |
|        117 |         401 | ACCESS\_TOKEN\_UNKNOWN\_EXCEPTION   | The supplied OAuth 2 access token is unknown.                                                                                                                                                         |
|        118 |         401 | ACCESS\_TOKEN\_EXPIRED\_EXCEPTION   | The supplied OAuth 2 access token is expired.                                                                                                                                                         |

### Request Body Errors <a href="#markdown-header-request-body-errors" id="markdown-header-request-body-errors"></a>

Possible errors that are thrown by all endpoints accepting a request body:

| Error code | HTTP status | Name                                 | Description                                                                    |
| ---------: | ----------: | ------------------------------------ | ------------------------------------------------------------------------------ |
|         13 |         400 | EMPTY\_BODY\_EXCEPTION               | The endpoint expected a request body, but it was missing.                      |
|         14 |         400 | MISSING\_REQUIRED\_FIELDS\_EXCEPTION | The endpoint expected a field to be specified, but it was missing.             |
|         15 |         400 | FIELD\_FORMAT\_EXCEPTION             | The provided body contained a field with a value that did past the validation. |
|         22 |         400 | BODY\_FORMAT\_EXCEPTION              | The provided body could not be interpreted correctly.                          |

### RQL Errors <a href="#markdown-header-rql-errors" id="markdown-header-rql-errors"></a>

Possible errors for endpoints that accept RQL:

| Error code | HTTP status | Name                    | Description                                                                                                     |
| ---------: | ----------: | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
|         19 |         400 | INVALID\_RQL\_EXCEPTION | Possibly an error in the syntax of the supplied RQL. Look out for spaces, comma's and other special characters. |
|         20 |         400 | EMPTY\_RQL\_EXCEPTION   | The endpoint expected RQL to be supplied, but was missing.                                                      |
