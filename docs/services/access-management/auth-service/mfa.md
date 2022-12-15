# MFA

Extra Horizon supports multiple multifactor authentication methods. To obtain ExH access tokens you will always need the user credentials. Depending on the MFA settings of the user you will either receive the tokens or be prompted with an error requiring you to use a MFA method.

Currently Extra Horizon supports two MFA methods: **Recovery codes** and **Google Authenticator**.

The Extra Horizon SDK has not yet implemented these endpoints.



## First-time setup&#x20;

Follow the steps below to enable MFA for the first time for a user.

### Step 1 - Generate recovery codes for the user

The recovery codes should be shown to the user with an indication to store them in a safe place. They are needed to reset the MFA in case they lose access to the MFA device.\
Recovery codes can be generated using the `/mfa/users/{userId}/methods` endpoint of the Authentication service.\
****
