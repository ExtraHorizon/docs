# API Functions

{% hint style="success" %}
Available since v1.4.0
{% endhint %}

API Functions enable you to create custom API endpoints using traditional [Functions](functions.md).

An API Function is a type of Function that can be triggered by a HTTP request. Instead of a Task for a traditional Function, an API Function will receive the HTTP request object as its input. The API Function can create an output object which resolves to a HTTP response.

## Creating an API Function

In this example you will learn how to create, deploy and execute an API Function.

### Create

The following code snippet illustrates a basic API function that returns the HTTP method used for the request in the response.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
exports.handler = async function (request) {
  const method = request.requestContext.http.method;

  return {
    statusCode: 200,
    body: {
      hello: `The request method was: ${method}`
    }
  };
};
```
{% endtab %}
{% endtabs %}

### Deploy

Similar to traditional Functions, API Functions can be deployed by referring to the documentation provided in the [Extra Horizon CLI: hello world (JS)](http://localhost:5000/s/xoM7jW7vVT9Wk3ulEGgO/features/tasks/hello-world-task) example.

### Execute

API functions can be executed by making requests to the `/tasks/v1/api/<function_name>` endpoint. This endpoint can be targeted using the common [HTTP methods](api-functions.md#http-methods). The URL can be extended by appending additional path parameters and a query string.

[The SDK](https://docs.extrahorizon.com/javascript-sdk/) can be used to execute the API Function using the following example:

{% tabs %}
{% tab title="JavaScript" %}
<pre class="language-javascript"><code class="lang-javascript">const response = await exh.tasks.api.get('my-function', '/');
<strong>
</strong><strong>// response = { hello: 'The request method was: GET' }
</strong></code></pre>
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Please refer to the [SDK documentation](https://docs.extrahorizon.com/javascript-sdk/) for further information on setting up the SDK.
{% endhint %}

## Working with requests

The API Function receives the HTTP request as its input. The request is transformed to the standardized [AWS API Gateway request format](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format) (version 2.0). By using this standardized format, we ensure that the API Functions can handle HTTP requests consistently across different programming languages.

### Example API Function input

Here is an example of a request object received by an API Function as its input:

```json
{
  "requestContext": {
    "http": {
      "method": "POST"
    }
  },
  "rawPath": "/my/path",
  "rawQueryString": "?parameter_a=value1&parameter_b=value2",
  "headers": {
    "x-exh-requesting-application-id": "58074811b2148f3b28ad75bd",
    "x-exh-requesting-user-id": "61fbe2a352faff0008aaf1e2",
    "content-type": "application/json",
    "content-length": "22",
    "my-custom-request-header": "my_value"
  },
  "isBase64Encoded": true,
  "body": "eyJteV9yZXF1ZXN0X2tleSI6MTIzfQ=="
}
```

### Request object properties

#### requestContext.http.method

The `requestContext.http.method` field represents the HTTP method used to target the API function. Currently this can be any of the following values: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`.

#### rawPath

The `rawPath` field refers to the path portion of the URL that comes after the Function name.

For the following URL:

<pre class="language-url"><code class="lang-url"><strong>/tasks/v1/api/my-function/hello/world?param1=value
</strong></code></pre>

The `rawPath` value would be `/hello/world`

#### rawQueryString

The `rawQueryString` field represents the unprocessed query string of the incoming HTTP request including the starting question mark.

For the following URL:

<pre class="language-url"><code class="lang-url"><strong>/tasks/v1/api/my-function/hello/world?param1=value
</strong></code></pre>

The `rawQueryString` value will be `?param1=value`

#### headers

The `headers` field represents the headers of the incoming HTTP request. It is structured as an object, where each key-value pair corresponds to a header name and its value.&#x20;

The header names within the `headers` field are transformed to be all lower case, to ensure consistent and case-insensitive handling of headers.

Following headers are added by Extra Horizon when invoking the API Function:

* `x-exh-requesting-user-id` contains the id of the user making the request.
* `x-exh-requesting-application-id` contains the application id of the oAuth application

The following HTTP request will create the resultant header object:

```http
GET /tasks/v1/my-function HTTP/1.1
Content-Type: application/json
Content-Length: 1024
...
```

```json
{
    "content-type": "application/json",
    "content-length": "1024"
}
```

#### isBase64Encoded

The `isBase64Encoded` property indicates if the `body` property of the request object has been Base64-encoded.

#### body

The `body` field represents the body of the incoming HTTP request as string. It can be Base64-encoded based on the `isBase64Encoded` property.

{% hint style="danger" %}
Always check the `isBase64Encoded` property to know if the `body` string needs to be Base64 decoded before usage.

No assumptions can be made for when the body is going to be Base64 encoded or not as it will vary.
{% endhint %}

## Working with responses

An API Function is expected to generate an output object which will be resolved to the HTTP response. The output is defined by the standardized [AWS API Gateway request format](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format) (version 2.0). By using this standardized format, we ensure that the API Functions can handle HTTP responses consistently across different programming languages.

### Example API Function output

Here is an example response object of an API Function:

```json
{
  "statusCode": 200,
  "headers": {
    "content-type": "application/json",
    "my-custom-response-header": "my_value"
  },
  "body": "{\"my_response_key\":42}",
  "isBase64Encoded": false
}
```

### Response object properties

#### statusCode

The `statusCode` field resolves to the status code in the HTTP response. The value can be between the `200` - `499` range. If a status code outside of that range is passed, an `INVALID_API_FUNCTION_RESULT` error will be returned.&#x20;

#### headers

The `headers` field resolves to the headers in the HTTP response. It is structured as an object, where each key-value pair corresponds to a header name and its value.

If no `Content-Type` header is present in the output, `application/json` will be set as the default value. It is recommend to always explicitly set a `Content-Type` header in the response object.

Also for the `Content-Type` header, `charset` could automatically be added to the header value in some cases. For example `text/plain` could resolve to `text/plain; charset=utf-8`.

The `Connection` and `Content-Length` header values are ignored as they're automatically added to the response.

#### body

The `body` field resolves to the body in the HTTP response.

In order to include binary data within a body, such as images or audio files, it is necessary to convert it into a Base64 string and assign it to the `body` field of the response object. Additionally, the `isBase64Encoded` field must be set to `true`.

If the response body does not contain binary data, you can directly include the data in its original format.

{% hint style="warning" %}
If the `isBase64Encoded` field is set to `true`, any other value then a Base64 string in the`body`field will result in an `INVALID_FUNCTION_RESULT` error.
{% endhint %}

#### &#x20;isBase64Encoded

The `isBase64Encoded` field must be set to `true` if the `body` field of the response object is a Base64 encoded string representing the raw response body.

## Permissions

To enable users to execute the function, appropriate permissions can be granted.

The `executionOptions.permissionMode` property of the [Function](functions.md) determines the execution restrictions based on its assigned value.

#### Permission Modes

One of the following values may be assigned to the `permissionMode` property to enforce their respective execution restrictions.&#x20;

`permissionRequired`\
A user requires a permission as stated in the [user permissions](api-functions.md#user-permissions) section. This is the default permission mode.

`allUsers`\
A user must be logged in, but no permission is required.

`public`\
Any party may execute this function without any restrictions.

#### User Permissions

Permissions for executing an API function can be assigned two levels of granularity.&#x20;

The `EXECUTE_API_FUNCTION` permission allows a user to execute all API functions.

The `EXECUTE_API_FUNCTION:<function_name>` permission allows a user to execute the API function specified by the `<function_name>`.

For further information regarding the application of permissions to users please refer to [global roles](../../access-management/user-service/global-roles.md).

## Errors

An API function allows for direct control over the HTTP response. However standard errors may still occur. For instance the `INVALID_FUNCTION_RESULT` error mentioned before. &#x20;

It is possible to receive errors related to problematic code, such as invalid syntax or unhandled exceptions within the API Function. These present themselves as a `LAMBDA_RUNTIME_EXCEPTION` including the original error.

```json
{
    "code": 1406,
    "name": "LAMBDA_RUNTIME_EXCEPTION",
    "message": "Invoking the Lambda function resulted in a runtime error.",
    "runtimeError": {
        "name": "Runtime.UserCodeSyntaxError",
        "message": "SyntaxError: Unexpected token ';'"
    }
}
```

{% hint style="info" %}
For a complete list of errors please refer to the [swagger documentation](../../../api-specs.md).
{% endhint %}

## Further Examples

### Working with the request body

As explained in the section about the [request object](api-functions.md#isbase64encoded), the body could be base64 encoded to support the reception of various content types. Consequently, to consume a received request within the function, it is necessary to pre-process the request body.&#x20;

{% tabs %}
{% tab title="JavaScript" %}
```javascript
export function handler(request) { 
  // Respond with an error if the Content Type is not plain text
  const contentType = request.headers['content-type'];
  if (!contentType || !contentType.startsWith('text/plain')) {
    return {
      statusCode: 400,
      body: {
        message: 'Only plain text input is expected'
      }
    }
  }

  // Transform the request body if needed
  let bodyString = request.body;
  if (request.isBase64Encoded) {
    const buffer = Buffer.from(request.body, 'base64');
    bodyString = buffer.toString();
  }
  
  // Respond with a JSON object containing a message
  return {
    statusCode: 200,
    body: {
      message: `Request body received: ${bodyString}`
    }
  };
}
```
{% endtab %}
{% endtabs %}

### Complex requests, responses and routing

API functions offer a wide range of possibilities, including the ability to create full web services. The request is transformed to the standardized [AWS API Gateway request format](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format) (version 2.0). By using this standardized format, allows the usage off existing 3th party packages to seamlessly integrate complex logic.

For instance when using the Node.js runtime, request routing can be implemented using a package like [serverless-http](https://github.com/dougmoscrop/serverless-http) and a popular web framework. Below is an example of an [express simple web service](https://expressjs.com/en/starter/hello-world.html) as an API Function.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

module.exports.handler = serverless(app);
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Please note that we are not affiliated with any of the specific packages mentioned above.
{% endhint %}

### Creating an API Function with the CLI

The full folder structure of an API Function in TypeScript can be easily created with the Extra Horizon CLI:

{% tabs %}
{% tab title="CLI" %}
```bash
exh tasks create-repo my-function-folder --repo https://github.com/ExtraHorizon/template-api-function
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Please refer to the [CLI documentation](https://docs.extrahorizon.com/cli/) for further information on setting up the CLI.
{% endhint %}

## Monitoring

{% hint style="success" %}
Available since v1.5.0
{% endhint %}

Every request made to an API Function is logged as an API Request, similar to how normal Function executions are saved as Tasks. These API Requests provide valuable information about the executed requests. The logs that an API Function generates during its execution are saved as API Request Logs.

### API Requests

API Requests are a summary of the requests made to API Functions. They can be helpful to monitor and debug API Function calls.

[The SDK](https://docs.extrahorizon.com/javascript-sdk/) can be used list API Requests using the following example:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const response = await exh.tasks.apiRequests.find();
```
{% endtab %}
{% endtabs %}

#### **Example of an API Request**

<pre class="language-json"><code class="lang-json">{
<strong>    "id": "64a2bb9a45f2a4622e065558",
</strong>    "functionName": "my-function",
    "method": "POST",
    "path": "/my/path",
    "userId": "61fbe2a352faff0008aaf1e2",
    "applicationId": "58074811b2148f3b28ad75bd",
    "timestamp": "2023-07-03T12:14:17.511Z",
    "statusCode": 400,
    "error": {
        "type": "response",
        "name": "INVALID_API_FUNCTION_RESULT",
        "message": "The status code is expected to be a number between 200 and 499. Returned value: 500"
    },
    "duration": 1.098
}
</code></pre>

**API Request Properties**

#### **functionName**

The `functionName` refers to the name of the API Function that was invoked in the request.

#### **method**

The `method` field represents the HTTP method used to target the API function.

#### **path**

The `path` field refers to the portion of the URL that comes after the Function name. The query string will be included in the path.&#x20;

For the following URL:

<pre class="language-url"><code class="lang-url"><strong>/tasks/v1/api/my-function/hello/world?param1=value
</strong></code></pre>

The `path` value would be `hello/world?param1=value`

#### userId

The `userId` field refers to the id of the Extra Horizon user that has performed the request.

#### applicationId

The `applicationId` field refers to the id of the Extra Horizon oAuth application that has performed the request.

#### statusCode

The `statusCode` field refers to the status code of the API Function's response or of a thrown error during its lifecycle

#### timestamp

The `timestamp` field refers to the time the API Function was executed.

#### duration

The `duration` field is the duration of the API Function execution in seconds.

#### error

When an error occurs during an API Function Request the error object is logged.

`error.type`

The error type defines where the error occurred during the API Function lifecycle and can have one of the following values:&#x20;

* `invocation`: errors that occur before invoking the API Function&#x20;
* `runtime`: errors that occurred during the execution of the API Function&#x20;
* `response`: errors that occur during the response validation after the API Function has been executed

`error.name`

The name of the caught error

`error.message`

The message of the caught error

### API Request Logs

API Functions may include logging statements during execution. These logs are saved as API Request Logs.

[The SDK](https://docs.extrahorizon.com/javascript-sdk/) can be used list API Request Logs using the following example:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const response = await exh.tasks.apiRequests.logs.find(apiRequestId);
```
{% endtab %}
{% endtabs %}

#### **Example of an API Request Log**

```json
{
    "message": "2023-07-03T12:24:36.474Z\tc8f9dc92-8df1-4cf9-a4a6-02abd2301ae7\tINFO\thello world!\n",
    "timestamp": "2023-07-03T12:24:36.474Z"
}
```

**API Request Log Properties**

#### timestamp

The `timestamp` field refers to the time the log was printed.

#### message

The `message` property contains the message being printed.

## Limitations

#### Request and response size

The request and response sizes are both limited to `6 Megabytes`, after conversion to the standardized formats.

#### Function configuration

Unlike normal Functions API functions are limited to a `timeLimit` of 30 seconds.

#### HTTP Methods

Currently the API Functions only support the `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS` and `HEAD` HTTP methods.

{% hint style="info" %}
Using an HTTP method that is not listed will result in an `ENDPOINT_EXCEPTION`
{% endhint %}

#### Status Codes

Currently the API Functions only support the status codes between 200 and 499.

#### RQL on the API Requests Logs endpoint

The RQL that can be used on the API Requests Logs endpoint is limited to only the `ge` operator in combination with the `timestamp` field.&#x20;

**Missing API Requests**

We prioritize providing the API Function result over saving the API Request. In the rare case that saving an API Request fails, no error message will be provided and the API Request record will be missing.&#x20;
