# MFA

Extra Horizon supports multiple multifactor authentication methods. To obtain ExH access tokens you will always need the user credentials. Depending on the MFA settings of the user you will either receive the tokens or be prompted with an error requiring you to use a MFA method.

Currently Extra Horizon supports two MFA methods: **Recovery codes** and **Google Authenticator**.

## Setting up MFA&#x20;

Follow the steps below to enable MFA for the first time for a user.

### Step 1 - Generate a presence token

The following endpoints require a presence token to prove the correct user is currently present. Ask for the users password and perform following request to retrieve the presence token.

```javascript
const presence = await exh.auth.confirmPresence({
  password: 'myPassword1234'
});

const presenceToken = presence.token;
```

### Step 2 - Generate recovery codes for the user

The recovery codes should be shown to the user with an indication to store them in a safe place. They are needed to reset the MFA in case they lose access to the MFA device.\


```javascript
const recoveryMethod = await exh.auth.users.addMfaMethod(
  user.id, 
  {
    presenceToken,
    type: 'recoveryCodes',
    name: 'Recovery Codes',
  }
);
```

The recovery codes that should be displayed to the user can be found in `recoveryMethod.codes`.

### Step 3 - Generate a Google Authenticator Secret

In this step we will create a secret that the user has to use in their Google Authenticator app to add an account.&#x20;

```javascript
const totpMethod = await exh.auth.users.addMfaMethod(
  user.id, 
  {
    presenceToken,
    type: 'totp',
    name: 'Google Authenticator',
  }
);

```

The secret that the user needs can be found in `totpMethod.secret`. Display the secret (for instance as a QR code) to the user and ask them to set up the account in Google Authenticator.

### Step 4 - Confirm Google Authenticator is set up correctly&#x20;

Request a code given by Google Authenticator to confirm that the MFA method is setup correctly. Verify it by making the following call:

```javascript
await exh.auth.users.confirmMfaMethodVerification(
  user.id,
  totpMethod.id,
  {
    presenceToken,
    code: '<CODE COPIED FROM THE AUTHENTICATOR APP>',
  }
);
```

### Step 5 - Enable MFA

The user is now ready to start using MFA on their account. Enable MFA for the user by performing:

```javascript
await exh.auth.users.enableMfa(auth.user.id, { presenceToken });
```

## Using MFA during authentication&#x20;

When a user authenticates with an email address and password and MFA is enabled, an error will be returned. You will need to catch that error and provide the One Time Password (which is a recovery code or a code given by Google Authenticator) as follows:

```javascript
try {
  await exh.auth.authenticate(tokenOrPassword);
} catch (error) {
  if (error instanceof MfaRequiredError) {
    const { mfa } = error;
    
    // Your logic to select which method the user want to use in case of multiple methods
    // As an example we simply always select the TOTP method here
    const totpMethod = mfa.methods.find(method => method.type === 'totp');

    await exh.auth.confirmMfa({
      token: mfa.token,
      methodId: totpMethod.id,
      code: "<CODE COPIED FROM THE AUTHENTICATOR APP>",
    });
    
    // The SDK is now authenticated
  }
}
```
