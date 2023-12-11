---
description: >-
  Start by creating an application in Extra Horizon that will integrate with
  your frontend application to let your users securely login
---

# Set up oAuth in your backend

## OAuth Applications

Before creating a Front-End application, we need to setup the infrastructure which will enable users to authenticate to Extra Horizon. This is done by using an oAuth application.

### What is an OAuth Application?

Every (frontend) application and its users must authenticate themselves to establish their identity with Extra Horizon. Authentication can be achieved through either the oAuth1 or oAuth2 protocol.

By registering an application in your cluster, you create a distinct identity within Extra Horizon for your application. The registration generates and provides the necessary credentials for your application to use with the selected protocol.

### What is the difference between an oAuth1 and oAuth2 application?

OAuth1 relies on cryptographic signatures for security, complicating implementation but adding an extra layer of protection. In contrast, oAuth 2 takes a simpler approach by leveraging an already secure communication channel, such as HTTPS. This simplicity makes oAuth 2 more flexible and more suited for applications with user interactions.

### What is the difference between a confidential and non-confidential oAuth2 application?

When choosing the oAuth2 protocol for your application, either a confidential or non-confidential application can be created.&#x20;

#### Confidential

A confidential oAuth2 application should be able to securely store secrets and therefore needs to be a somewhat controlled environment, like a server or a script on a local machine.

Both a client id and a client secret need to be supplied to be able to identify the application.  In return, some security mechanisms can be setup to be more convenient. Refresh tokens are allowed to have a longer lifetimes and can be reused multiple times.

#### Non-confidential

A non-confidential oAuth2 application is meant to represent an application in a less controlled environment, like a web application running in a user its browser.

The client id is enough to identify the application. However, the security mechanisms are more strict for these applications. Refresh tokens have a limited lifetime and are consumed on use.

## Creating the oAuth2 application

The script `examples/create-oauth2-application.js` will create a new oAuth2 application and a version. When running this script, note down the clientId. This ID will be needed in the next section.

{% tabs %}
{% tab title="JavaScript (examples/create-oauth2-application.js)" %}
{% code overflow="wrap" %}
```javascript
const { getSDK } = require('../auth.js');

(async () => {
  const sdk = await getSDK();

  const application = await sdk.auth.applications.create({
    name: 'blood-pressure-application',
    description: 'This oauth application is used for the login page of the blood pressure application.',
    type: 'oauth2',
    redirectUris: ['https://localhost']
  });

  const version = await sdk.auth.applications.createVersion(application.id, {
    name: 'v1',
  });

  console.log({application, version});
})();
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Output

{% code overflow="wrap" %}
```json
{
  "application": {
    "name": "blood-pressure-application",
    "description": "This oauth application is used for the login page of the blood pressure application.",
    "type": "oauth2",
    "redirectUris": [ "https://localhost" ],
    "confidential": false,
    "versions": [],
    "updateTimestamp": "2023-11-29T13:06:11.511Z",
    "creationTimestamp": "2023-11-29T13:06:11.511Z",
    "id": "65673743331902d28605a43a"
  },
  "version": {
    "id": "65673743331902626c05a43c",
    "name": "v1",
    "creationTimestamp": "2023-11-29T13:06:11.577Z",
    "clientId": "10776bf875b004bba742b4ff7244b737cd3fa14c"
  }
}
```
{% endcode %}

##

##
