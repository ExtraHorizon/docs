# Profile Service

The Profile service is responsible for managing profiles. It's important to notice the difference between a User and a Profile. A User object concerns the name and contact details of a person. A Profile is a separate object. A Profile contains medical information like medication and medical history, as well as technical information, like what type of phone a user is using.&#x20;

The separation of profiles and users is important because a user could be deleted from the system, while the profile will not.&#x20;

This way the profile can be kept anonymous for later research purposes.

## References <a href="profile-example" id="profile-example"></a>

* [Profile Service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/profiles-service/1.1.3/openapi.yaml)
