---
description: >-
  A set of services responsible for managing Identities and access within our
  platform.
---

# Identity and Access Management

### Authentication

Security is critical to web services. All our API endpoints only respond to authenticated requests.

A request is considered authenticated when it carries a valid authentication token. Such a token can be requested from the authentication service by exchanging user login credentials.

\
After acquiring an authentication token, requests to other ExH services can be made by including this token in the request authorization header.

{% hint style="info" %}
The authentication service supports both oAuth 1.0 and oAuth 2.0 authentication mechanisms.
{% endhint %}

{% content-ref url="../../services/access-management/auth-service/" %}
[auth-service](../../services/access-management/auth-service/)
{% endcontent-ref %}

### Authorization

The service endpoints that a user is allowed to use depend on the required permissions for a specific endpoint and the permissions that a user has been given through the roles assigned to that user (see below).

The required permissions for each endpoint can be found in the corresponding API reference documentation (Swagger)

{% hint style="info" %}
**Example:** To enable a user to trigger a task within the Task service, looking at the [API specification](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/tasks-service/1.0.4/openapi.yaml#/Tasks/post\_) they need to have the `CREATE_TASKS` permission&#x20;
{% endhint %}

{% content-ref url="../../services/access-management/user-service/" %}
[user-service](../../services/access-management/user-service/)
{% endcontent-ref %}

