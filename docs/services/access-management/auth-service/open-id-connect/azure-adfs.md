# Azure ADFS

* Go to Azure Active Directory

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-29 at 16.53.20 (1) (1).png" alt=""><figcaption></figcaption></figure>

* Press App registrations in the side bar
* Press `new registration`
* Fill in all the details to set up your application

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-29 at 16.47.29.png" alt=""><figcaption></figcaption></figure>

* Press `register`
* You will now be in the app screen where you can immediately see the `application (client) ID` which you will need as the client id of the application

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-29 at 16.47.51.png" alt=""><figcaption></figcaption></figure>

* Now you can press the end points button on the top

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-29 at 16.49.13.png" alt=""><figcaption></figcaption></figure>

* Here you can find the token endpoint and the authorization endpoint
* You can use the `OpenID Connect metadata document` endpoint to get the issued id and the user info endpoint
* Now you can press `certificates and secrets` here in the side bar

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-03-29 at 16.48.05.png" alt=""><figcaption></figcaption></figure>

* Click on client secrets and new client secret
* Add the description and an expiry date
* Now you will get a `value` which is the secret
