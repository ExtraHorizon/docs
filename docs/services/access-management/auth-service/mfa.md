# MFA

Extrahorizon supports multiple multifactor authentication methods. To obtain ExH access tokens you will always need the users credentials. Depending on the MFA settings of the user you will either receive the tokens or be prompted with an error requiring you to use a MFA method.

Currently Extra Horizon supports two MFA methods: **Recovery codes** and **Google Authenticator**.

The Extra Horizon SDK has not yet implemented these endpoints. You can use them by connecting directly with our REST Api's: [MFA endpoints](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/auth-service/2.0.4-dev/openapi.yaml#/MFA)
