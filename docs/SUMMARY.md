# Table of contents

* [Extra Horizon Documentation](README.md)
* [Getting Started](getting-started/README.md)
  * [Start familiarizing yourself](getting-started/start-familiarizing-yourself-with.md)
* [Tutorials](use-cases/README.md)
  * [Medical Device Tutorial](use-cases/medical-device-tutorial/README.md)
    * [Preparation](use-cases/medical-device-tutorial/preparation.md)
    * [Build your first prototype](use-cases/medical-device-tutorial/build-your-first-prototype/README.md)
      * [Define a data model](use-cases/medical-device-tutorial/build-your-first-prototype/define-a-data-model.md)
      * [Configure your workflows](use-cases/medical-device-tutorial/build-your-first-prototype/configure-your-workflows/README.md)
        * [Workflow 1: Analyze a measurement](use-cases/medical-device-tutorial/build-your-first-prototype/configure-your-workflows/workflow-1-analyze-a-measurement.md)
        * [Workflow 2: Create & store a PDF report](use-cases/medical-device-tutorial/build-your-first-prototype/configure-your-workflows/workflow-2-create-and-store-a-pdf-report.md)
        * [Workflow 3: Send an e-mail](use-cases/medical-device-tutorial/build-your-first-prototype/configure-your-workflows/workflow-3-send-an-e-mail.md)
      * [Define your permissions](use-cases/medical-device-tutorial/build-your-first-prototype/define-your-permissions/README.md)
        * [Update your schema with user permissions](use-cases/medical-device-tutorial/build-your-first-prototype/define-your-permissions/update-your-schema-with-user-permissions.md)
        * [Update your schema with group permissions](use-cases/medical-device-tutorial/build-your-first-prototype/define-your-permissions/update-your-schema-with-group-permissions.md)
      * [Build the Front-End](use-cases/medical-device-tutorial/build-your-first-prototype/build-the-front-end/README.md)
        * [Set up oAuth in your backend](use-cases/medical-device-tutorial/build-your-first-prototype/build-the-front-end/set-up-oauth-in-your-backend.md)
        * [Demo login page](use-cases/medical-device-tutorial/build-your-first-prototype/build-the-front-end/demo-login-page.md)
    * [Summary & Wrap up](use-cases/medical-device-tutorial/summary-and-wrap-up.md)
  * [Polysomnography (PSG) Tutorial](use-cases/polysomnography-psg.md)
  * [Retool - Building dashboards Tutorial](use-cases/building-dashboards-with-retool.md)

## FAQ

* [General](faq/general.md)

## Services

* [Identity and Access Management](for-developers/access-management/README.md)
  * [User service](services/access-management/user-service/README.md)
    * [Users](services/access-management/user-service/users.md)
    * [Groups](services/access-management/user-service/groups.md)
    * [Global roles](services/access-management/user-service/global-roles.md)
    * [Configuration](services/access-management/user-service/configuration.md)
  * [Auth Service](services/access-management/auth-service/README.md)
    * [Applications](services/access-management/auth-service/applications.md)
    * [OAuth2](services/access-management/auth-service/oauth2.md)
    * [OAuth1](services/access-management/auth-service/oauth1.md)
    * [MFA](services/access-management/auth-service/mfa.md)
    * [OpenID Connect](services/access-management/auth-service/open-id-connect/README.md)
      * [Google Cloud](services/access-management/auth-service/open-id-connect/google-cloud.md)
      * [Azure ADFS](services/access-management/auth-service/open-id-connect/azure-adfs.md)
* [Data Management](for-developers/manage-data/README.md)
  * [File Service](services/manage-data/file-service.md)
  * [Data Service](services/manage-data/data-service/README.md)
    * [Schemas](services/manage-data/data-service/schemas.md)
    * [Documents](services/manage-data/data-service/documents.md)
    * [FAQ Data Service](services/manage-data/data-service/faq-data-service.md)
* [Automation](for-developers/automation/README.md)
  * [Task Service](services/automation/task-service/README.md)
    * [Functions](services/automation/task-service/functions.md)
    * [Tasks](services/automation/task-service/tasks.md)
    * [API Functions](services/automation/task-service/api-functions.md)
    * [Examples](services/automation/task-service/examples/README.md)
      * [Hello world (JS)](services/automation/task-service/examples/hello-world-js.md)
      * [Hello world (Py)](services/automation/task-service/examples/hello-world-py.md)
      * [Hello world (Docker)](services/automation/task-service/examples/hello-world-docker.md)
    * [FAQ](services/automation/task-service/faq.md)
  * [Dispatchers Service](services/automation/dispatchers-service.md)
  * [Event Service](services/automation/event-service/README.md)
    * [System Events](services/automation/event-service/system-events.md)
* [Communication](services/communication/README.md)
  * [Notification Service](services/communication/notification-service/README.md)
    * [User Settings](services/communication/notification-service/settings.md)
    * [Notifications](services/communication/notification-service/notifications.md)
  * [Mail Service](services/communication/mail-service.md)
* [Other](for-developers/other/README.md)
  * [Localization Service](services/other/localizations-service/README.md)
    * [Language Codes](services/other/localizations-service/language-code.md)
  * [Template Service](services/other/template-service/README.md)
    * [Localizations](services/other/template-service/localizations.md)
  * [Payments Service](services/other/payments-service/README.md)
    * [Subscriptions](services/other/payments-service/subscriptions.md)
    * [Stripe](services/other/payments-service/stripe.md)
    * [iOS App Store](services/other/payments-service/ios-app-store.md)
  * [Configurations Service](services/other/configurations-service.md)

## API Reference

* [OpenAPI Specifications](api-specs.md)
* [📦 Changelog](changelog-chronological.md)
  * [Per-service Changelog](changelog-service.md)
* [Postman Reference Collection](api-reference/postman-reference-collection.md)

## Tools

* [SDK](https://docs.extrahorizon.com/javascript-sdk/)
* [CLI](https://docs.extrahorizon.com/extrahorizon-cli/)
* [Control Center](https://app.extrahorizon.com/login/)

## Additional Resources

* [Resource Query Language (RQL)](for-developers/resource-query-language-rql.md)
* [Handling Errors](for-developers/handling-errors.md)
* [GitHub](https://github.com/ExtraHorizon)
* [API interaction (Python)](additional-resources/api-interaction-python.md)

***

* [Migration Guides](migration-guides/README.md)
  * [Enabling verification request limiting](migration-guides/migration-guide-enabling-verification-request-limiting.md)
  * [Execution credentials for Tasks](migration-guides/execution-credentials-for-tasks.md)

## ExH Platform

* [🙋 Support](exh-platform/support.md)
* [⏱️ Usage and Performance](exh-platform/usage-and-performance.md)
* [🗺️ Regions](exh-platform/regions.md)
* [⚖️ Cloud Subscription Agreement](https://docs.extrahorizon.com/cloud-subscription-agreement)
* [✅ Compliance](exh-platform/compliance/README.md)
  * [🔖 Certification](exh-platform/compliance/certification/README.md)
    * [🇫🇷 Hébergeur de Données de Santé (HDS)](exh-platform/compliance/certification/hebergeur-de-donnees-de-sante-hds.md)
  * [🔓 Security](exh-platform/compliance/security.md)
  * [🇺🇸 CFR 21 Part 11](exh-platform/compliance/cfr-21-part-11.md)
  * [ExH as OTS Software](exh-platform/compliance/exh-as-ots-software/README.md)
    * [OTS Software Description](exh-platform/compliance/exh-as-ots-software/ots-software-description.md)
    * [OTS Cloud Risks](exh-platform/compliance/exh-as-ots-software/ots-cloud-risks.md)
  * [🤝 Shared Responsibility Model](exh-platform/compliance/shared-responsibility-model.md)
