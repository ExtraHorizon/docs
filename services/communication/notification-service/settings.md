# Settings

## User Settings <a href="#docs-internal-guid-75d9a081-7fff-1efb-95c3-dc400f2518d4" id="docs-internal-guid-75d9a081-7fff-1efb-95c3-dc400f2518d4"></a>

When a new User object is created in the User Service, a Settings object with the same identifier is created automatically. Each User can subsequently update their own preferences but only an administrator can reset them via a DELETE request.

{% swagger method="put" path="/settings/{userId}" baseUrl=" " summary="Create/Update the Settings for a used" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="delete" path="/settings/{userId}" baseUrl=" " summary="Delete the Settings for a user" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% swagger method="get" path="/settings" baseUrl=" " summary="List all Settings" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% hint style="info" %}
Info: Requesting the removal of a User’s Settings will, in practice, reset the preferences to the default values. In addition, the key value will be null.
{% endhint %}
