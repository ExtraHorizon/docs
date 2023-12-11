# Demo login page

In the repository, you'll find sample project for a simple login page. The purpose of the login page is to demonstrate how you can integrate Extra Horizon into your application using the JavaScript-sdk.&#x20;

## Initiating the Web Application

Begin by navigating to the `4-oauth-frontend/front-end` folder. Within that folder, you will find the code for the login page. Proceed by installing the necessary dependencies by running:

```
npm init
```

The login page utilizes the `javascript-sdk`, which is not natively available in web browsers. If we would load the source code directly in the HTML page, the browser will show errors indicating that `javascript-sdk` doesn't exist. To rectify this problem, we can bundle the source code with the sdk. For the purpose of this tutorial, we have chosen [esbuild](https://esbuild.github.io) for bundling.&#x20;

After installing the dependencies, create a `.env` file and add two variables;

* **BACKEND\_URL**: The URI of your Extra Horizon cluster;
* **CLIENT\_ID**: The client ID generated in the previous section `Set up oAuth in your back-end`.

### Launch the Login Page

With the dependencies installed and the environment variables set, you are now ready to launch the login page. This can be done by running the following command:

```
npm run watch
```

After running the command, you should have a functional login page. By default, the page can be accessed by navigating to `http://localhost:3000` in your browser. The resulting page should match the image below:

<figure><img src="../../../../.gitbook/assets/image (2).png" alt=""><figcaption><p>Login Page</p></figcaption></figure>

## Next steps

The login page is written in plain JavaScript to keep it independent from frameworks and libraries. The drawback of having the code in plain JavaScript, is that we could not cover the entire authentication flow. For most applications, the authentication process can be split into three steps:

1. **Check if the user is already logged in**: This involves verifying if there are user credentials present (for example in localStorage or cookies). If credentials exist, check if they are still valid and lastly, use the found credentials to authenticate
2. **Prompt for login if necessary**: If there are no credentials, or if they're outdated, a login screen will be shown where the user needs to authenticate.
3. **Store the user's credentials**: Upon successful login, save the user's credentials for future sessions or usage.

Since the goal for the login page is to showcase how you can integrate the SDK in a web application, we decided to limit the implementation to solely step 2. Including redirections and cookie/storage management in the demo, would detract from the page's primary objective of integrating the Extra Horizon SDK in a web application.
