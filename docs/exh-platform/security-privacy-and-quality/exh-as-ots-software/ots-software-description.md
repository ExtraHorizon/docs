---
description: >-
  This description acts as an example document that Extra Horizon platform
  customers can use to full-fill it's requirements on their OTS Software
  Description of the Extra Horizon platform.
hidden: true
---

# OTS Software Description

## General Description

**Title:** Extra Horizon Medical Device Cloud Platform

**Manufacturer:** Extra Horizon n.v.

**Version Level:**

| Web Service            | Version                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| Authentication Service | [v2.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Users Service          | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Files Service          | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Data Service           | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Events Service         | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Dispatchers Service    | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Tasks Service          | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Logs Service           | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Template Service       | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Configurations Service | [v2.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Localizations Service  | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Mail Service           | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Notifications Service  | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |
| Payment Service        | [v1.x.x](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) |

### Rationale for Selecting OTS Software

_<mark style="color:blue;">Why is this OTS software appropriate for this medical device?</mark>_

Extra Horizon provides an Off The Shelf (OTS) cloud solution that is an ideal fit for us in integrating with \[our product]. It allows us to concentrate on the critical aspects of clinical safety and the implementation of our medical product, leveraging Extra Horizon's robust security and comprehensive cloud expertise. This ensures that we can deliver a highly secure and efficient system while minimizing the complexity and resources usually required to manage cloud infrastructure. By trusting Extra Horizon's well-established platform, we can enhance our operational focus and innovation in ensuring optimal patient outcomes.

Our choice of Extra Horizon as a partner is not only driven by their technical capabilities but also by their compliance with international standards like ISO 13485 and ISO 27001. This certification ensures that Extra Horizon adheres to stringent quality management systems applicable in the medical device sector and maintains robust information security protocols. Such compliance is critical for us, as it aligns with our commitment to maintaining the highest standards of reliability, safety, and performance across all services, from Authentication to Users Service, assuring both our business and regulatory compliance needs are met effectively.

### Expected Limitations

_<mark style="color:blue;">What are the expected design limitations of the OTS software?</mark>_

Although Extra Horizon's platform offers remarkable flexibility due to its generic nature and comprehensive functionalities, the expected limitations include the necessity for technical knowhow to configure and optimize the system effectively. However, this requirement can also be viewed as an advantage, as it provides us with the ability to adjust the platform in accordance with our unique operational needs and strategic goals. This balance of complexity and adaptability empowers us to implement tailored solutions, fostering innovation while meeting the specific demands of our medical device applications.

## Computer System Specifications

Extra Horizon delivers a managed backend as a service, which means they take full responsibility for maintaining and operating the platform. This managed approach ensures that the service functions properly and efficiently, relieving customers of the need to manage hardware specifications themselves.

### Hardware Specifications

_<mark style="color:blue;">Processor (manufacturer, speed, and features), RAM (memory size), hard disk size, other storage, communications, display, etc.</mark>_

&#x20;Not Applicable, managed Saas

### Software Specifications

_<mark style="color:blue;">Operating system, drivers, utilities, etc. The software requirements specification (SRS) listing for each item should contain the name (such as Microsoft Windows Operating System, Microsoft Windows Drivers, etc.), specific version levels (such as 4.1, 5.0, etc.) and a complete list of any patches that have been provided by the OTS software manufacturer.</mark>_

Not Applicable, managed Saas

## Ensuring End User Compliance and Correct Use

* _<mark style="color:blue;">How will you assure appropriate actions are taken by the End User?</mark>_\
  Extra Horizon is en embedded OTS Cloud platform. This means the user will not have any interactions with the OTS and doesn't have any control over it's use.
* _<mark style="color:blue;">What aspects of the OTS software and system can (and/or must) be installed/configured?</mark>_\
  Extra Horizon is integrated into the medical Device by the legal manufacturer. The end-user will have no control over how it's used and does not require to install or make any configurations.

## Functionality of the OTS Software

_<mark style="color:blue;">What does the OTS do?</mark>_

Extra Horizon is a comprehensive managed cloud platform designed specifically for cloud-connected medical devices. It provides a suite of compliant web services that facilitate the seamless operation and management of medical devices. By utilizing these services, manufacturers can fully outsource their backend infrastructure needs, ensuring a reliable and efficient backbone for their devices.

## Verification

_<mark style="color:blue;">How do you know it works?</mark>_

Extra Horizon's platform is certified under ISO13485, ISO27001 & ISO27701 and has a frequently audited management system in place that mandates the precise and correct use of software development procedures, risk management & testing. As a result Extra Horizon produces a set of documents compliant to IEC62304 that customers can use to showcase the system is verrified.

* SRS (Software Requirement and design Specification)
* Verification plan & report
* Product Anomaly list

{% hint style="info" %}
The identified documentation Level (i.e. Basic or Enhanced) will determine what documentation you will need to include in your MD submission. The Software Requirements, Design specifications & verification evidence can be used by the customer and provided to the regulatory bodies when requested.
{% endhint %}

## Lifecycle Management and Control of OTS Components

_<mark style="color:blue;">How will you keep track of (control) the OTS Software?</mark>_

Extra Horizon provides a [Service Level Agreement (SLA)](https://docs.extrahorizon.com/service-level-agreement) as part of it's [cloud subscription agreement](https://docs.extrahorizon.com/cloud-subscription-agreement) that include specific controls that are in place to ensure the legal manufacturer is in full control of the OTS Software.

<mark style="color:blue;">Measures to prevent the introduction of incorrect versions / changes?</mark>&#x20;

Extra Horizon make use of semantic versioning and guarantees the correct operation and backwards compatibility of it's MINOR and PATCH Releases. Only MAJOR Release will include non-backwards compatible changes. As the medical device software targets Extra Horizon services on major version the legal manufacturer will have to make a change to it's endpoints before it will be targeted. More information can be found in our [SLA - Updates to the platform](https://docs.extrahorizon.com/service-level-agreement#id-5.-updates-to-the-platform).

<mark style="color:blue;">How to maintain Extra Horizon platform configurations</mark>

Extra Horizon configurations are managed within a git repository and can be synchronized to dedicated clusters using the Extra Horizon CLI.

<mark style="color:blue;">Where and how will you store the OTS software?</mark>

&#x20;Extra Horizon is a managed cloud platform and will operate and manage the storage and archiving of the OTS Software and it's current and previous versions

<mark style="color:blue;">How will you ensure proper installation of the OTS software?</mark>

Extra Horizon has a procedure in place for the correct deployment and retraction of webservices in customers environments. The procedure includes pre deployment and post deployment checks as well as correct verification of the deployment.

<mark style="color:blue;">How will you ensure proper maintenance and life cycle support for the OTS software?</mark>

Extra Horizon's platform is certified under ISO13485, ISO27001 & ISO27701 and has a frequently audited and certified management system in place. As a supplier we can request evidence of proper management (i.e. audit reports, Penetration testing results, ...).

The [Service Level Agreement (SLA)](https://docs.extrahorizon.com/service-level-agreement) provided with Extra Horizon also provides the necessary contractual arrangements for Extra Horizon with regard to the general support and maintenance of the web services provided.

