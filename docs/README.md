# Extra Horizon Documentation

## What is Extra Horizon?

![](<.gitbook/assets/image (5) (1) (1).png>)

[Extra Horizon](https://www.extrahorizon.com/medical-cloud-backend) is a medical Backend As A Service product that leverages existing cloud providers such as AWS, Google Cloud, Microsoft Azure to deliver an easy and fast roadmap towards fully certified and compliant cloud-connected medical devices. Currently, Extra Horizon compatibility is optimized with AWS. Future clouds are on the roadmap.

Extra Horizon exists of a set of web services that the customer can use to compose a custom backend-specific to their needs.

## A dedicated backend for your medical application

Every Extra Horizon environment is deployed on dedicated cloud resources. There is **no infrastructure sharing between customers!** Each cluster has an Extra Horizon infrastructure layer on which a set of modules can be deployed. You can access your deployment through a tailored API. Each of these modules is built according to IEC62304 standards and meets regulatory compliance.



{% embed url="https://www.youtube.com/watch?v=peVW49MFzrw" %}

## Available Modules

To get a general overview of the different modules that can be used on Extra Horizon, take a look at [this page.](https://www.extrahorizon.com/cloud-services)

### Identity & Access Management <a href="#identity-and-access-management" id="identity-and-access-management"></a>

Identity & Access Management (IAM) is at the center of each Extra Horizon setup. Here you can manage and create users, groups, define roles and allocate permissions, manage security settings such as 2FA and much more…

#### User Service <a href="#user-service" id="user-service"></a>

The user service is responsible for managing identities in an Extra Horizon Cluster. Each action you take always occurs in the context of such an identity.

The service has functionality ranging from registering new identities, managing roles, permissions, password management, etc…

#### Authentication Service <a href="#authentication-service" id="authentication-service"></a>

The authentication service's main responsibility is authenticating each incoming request and attaching an identity to that request.

The service supports multiple authentication mechanisms such as oAuth1.0, oAuth2.0, SSO, MFA,… You can register frontend applications and determine it's accessible functionality.

### Storage <a href="#storage" id="storage"></a>

#### Document Service <a href="#document-service" id="document-service"></a>

The document service allows you to configure collections of structured documents with their own data schemes that will act as validation for the API. You can create, read, update and delete the documents based on the defined permissions and validation schemes.

Besides updating documents, you can configure a state machine that allows more specific validation rules upon each transition.

The service allows you to:

* define your own queryable data models by utilising JSON Schema’s
* define workflows that can trigger other services or automation rules in the network.

The data service like all other services supports an extremely flexible querying language in the form of querying parameters.

#### File Service <a href="#file-service" id="file-service"></a>

The file service provides storage for non-queryable data such as images, video, raw ECG signals, etc. And in combination with the document module the combination can be made to accommodate for any storage need a customer might have.

### Automation <a href="#automation" id="automation"></a>

#### Task Service <a href="#task-service" id="task-service"></a>

The task service is the glue between all our services. Every client has specific business logic that needs to be implemented. Whether it ranges from sending an email when a person registers or sending a Text message when you have ordered a new product.

By using the Extra Horizon SDK you can write very small and simple scripts in a range of languages (Node. **js**, **Python**, **Java**, **Ruby**, C#, Go, and **PowerShell**)

#### Event Service <a href="#event-service" id="event-service"></a>

The event service is the backbone of an Extra Horizon cluster. Each action that happens within a service will also trigger an event. This service acts as the central message broker throughout the system.

You can link events to other services or use a task to execute a small piece of code to take care of some specific business logic.

### Communication <a href="#communication" id="communication"></a>

#### Mail Service <a href="#mail-service" id="mail-service"></a>

The mail service allows you to send custom emails to your registered identities.

#### Notification Service <a href="#notification-service" id="notification-service"></a>

The notification service is able to send push notifications to android and iOS.

#### Localization Service <a href="#localisation-service" id="localisation-service"></a>

The localization service handles translations of documents in your cloud, email and notifications to ensure an optimal and compliant user experience.

### Other Services <a href="#other-services" id="other-services"></a>

#### Payment Service <a href="#payment-service" id="payment-service"></a>

The payment service offers easy integration of multiple payment systems, supporting Apple IAP, Google Pay and Stripe.

#### Template Service <a href="#template-service" id="template-service"></a>

The template service allows you to make good-looking HTML templates for emails or make detailed pdf reports for a medical user.

## Where to get additional support?

**Support questions?** Reach out to our support team via [requests@extrahorizon.com](mailto:requests@extrahorizon.com)

**General questions?** Fill in [the form on our website](https://www.extrahorizon.com/contact) and we'll get in touch with you asap
