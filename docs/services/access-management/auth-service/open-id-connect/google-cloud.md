# Google Cloud



* Go to the credentials page: [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.01.45.png" alt=""><figcaption></figcaption></figure>

* Press `create project` or select a project with the dropdown on top

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.03.34.png" alt=""><figcaption></figcaption></figure>

* Configure your consent screen if needed by pressing oAuth consent screen in the sidebar
* If you already have a consent screen, you can `press edit app` next to the name

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.05.23.png" alt=""><figcaption></figcaption></figure>

* Make sure to add scopes in step 2

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.08.56.png" alt=""><figcaption></figcaption></figure>

* Following scopes should be added: `email` , `profile` and `openid`

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.09.44.png" alt=""><figcaption></figcaption></figure>

*   After completing the consent screen, g

    o back to credentials on the sidebar
* Now press the `create credentials` button on the top of the page

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.14.19.png" alt=""><figcaption></figcaption></figure>

Select `OAuth Client ID`

Select Web Application in the drop down on the following page

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.16.43.png" alt=""><figcaption></figcaption></figure>

Provide the application name and redirect uri’s and press create

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.18.22.png" alt=""><figcaption></figcaption></figure>

You will now be provided with your Client Id and Client Secret for your application

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-30 at 10.18.52.png" alt=""><figcaption></figcaption></figure>

Now you can go to [https://accounts.google.com/.well-known/openid-configuration](https://accounts.google.com/.well-known/openid-configuration) to receive the authorization url, token endpoint, user info endpoint and issuer id needed for creating the provider
