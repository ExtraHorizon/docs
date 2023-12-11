# Start familiarizing yourself with

## Start familiarising yourself with the Extra Horizon Platform

### Example: Creating a new user via the Control Center

* Navigate to [https://app.extrahorizon.com](https://app.extrahorizon.com)
* Login with the admin credentials that you received
* Under the "Services" section, select "Users"
* In the right top click on "New" where you  can now add a new user



### Example: Get to know the Extra Horizon API - **Fetching a user via the SDK**

This example shows how to:

* create an oAuth1 client in the SDK
* authenticate that client in the sdk
* do a .me call in the SDK

{% tabs %}
{% tab title="Javascript" %}
{% code overflow="wrap" lineNumbers="true" %}
```javascript
const { createOAuth1Client } = require('@extrahorizon/javascript-sdk');

retrieveMyUser();

async function retrieveMyUser() {
    // Create an OAuth1 client to connect to Extra Horizon
    const exh = createOAuth1Client({
        host: '<your_exh_host>', //TODO: FOUND AT
        consumerKey: '<your_consumer_key>', //TODO: FOUND AT
        consumerSecret: '<your_consumer_secret>', //TODO: FOUND AT
    });

    // Authenticate the client with your user credentials, this will generate new OAuth1 tokens
    await exh.auth.authenticate({
        email: '<your_user_email>', //TODO: FOUND AT
        password: '<your_user_password>', //TODO: FOUND AT
    });

    // Use the client to fetch your user information
    const me = await exh.users.me();
    console.log('User: ', me)
}
```
{% endcode %}
{% endtab %}
{% endtabs %}
