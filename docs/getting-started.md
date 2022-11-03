---
description: >-
  This page provides the resources to start building your application on Extra
  Horizon (ExH).
---

# Getting Started

This getting started guide assumes you received credentials for an Extra Horizon environment. If you don't have credentials yet, get in touch via our [contact form](https://www.extrahorizon.com/contact).

## Access to Your Environment

Once your dedicated environment is set up, you will receive the information and credentials to connect to your environment:

| Variable                | Example                                      |
| ----------------------- | -------------------------------------------- |
| `HOST`                  | `api.customer.extrahorizon.io`               |
| `OAUTH_CONSUMER_KEY`    | `bb6c5186acf8aca8ed64ef`4`ef49e08bb4484c7c4` |
| `OAUTH_CONSUMER_SECRET` | `4808fbc315294aa7aeb2e40b76d84680c0b582ee`   |
| `e-mail`                | `john.doe@extrahorizon.com`                  |
| `password`              | `SomeDiff!UnguessableP8ssword`               |

{% hint style="warning" %}
If you received credentials to access the **sandbox** environment, please be aware that this is a **shared** environment only for testing purposes. Other **sandbox** users can view and modify your data. <mark style="color:red;">**Do not store any sensitive or PII data in the sandbox environment.**</mark>
{% endhint %}

Once you have the credentials, there are multiple methods to access your environment.

### Use the Web-based Interface

The web-based ExH Control Center interface, available at [app.extrahorizon.com](https://app.extrahorizon.com), is the easiest way to get familiar with your ExH environment. Through this interface, you can:

* Create and manage users&#x20;
* View existing data schemas and their properties
* Query the data in the data service
* View functions, task executions and task execution logs

<figure><img src=".gitbook/assets/image (4).png" alt=""><figcaption><p>Login screen of the ExH Control Center</p></figcaption></figure>

### Use the CLI Tool

The [Extra Horizon CLI](https://github.com/ExtraHorizon/exh-cli) is an open-source tool to manage your environment through the command line. You can also use this tool to automate certain actions through scripts and CI/CD pipelines.

<figure><img src=".gitbook/assets/Petrify 2022-11-02 at 11.31.11.png" alt=""><figcaption><p>Manage your environment using the ExH CLI</p></figcaption></figure>

Visit the [CLI Documentation](https://docs.extrahorizon.com/cli/) for more information and examples.

### Use the JavaScript SDK

The [JavaScript SDK](https://github.com/ExtraHorizon/javascript-sdk) offers first-class TypeScript support and makes it easy to interface with your environment from code.&#x20;

Visit the [SDK Documentation](https://docs.extrahorizon.com/javascript-sdk/) for more information and examples.&#x20;

### Use the REST API

The above mentioned methods to access your Extra Horizon environment all make use of the REST API. It is an HTTP interface to your environment and it uses standard HTTP headers and status codes.

Visit the [OpenAPI specifications](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) to learn more about all the endpoints available in your ExH environment.

To quickly get started with the REST API, we also provide a [Postman Reference Collection](api-reference/postman-reference-collection.md).

## Start Building Your Medical Backend

### Add Additional Users and Roles

1. Navigate to [https://app.extrahorizon.com](https://app.extrahorizon.com)
2. Login with the admin credentials that you received
3. Under the "Services" section, select "Users"
4. You can now add new users and assign the appropriate roles to them

### Create Your First Data Schema

The first step in building your application is to create one or more data schema's that define the type of data you want to store.&#x20;

Take a look at the Data Service documentation. There you can also find an instructional video that walks you through the steps of creating a data schema.

{% content-ref url="services/manage-data/data-service/" %}
[data-service](services/manage-data/data-service/)
{% endcontent-ref %}

### Create Your First Function

After defining and creating data schema's, the next step is to build the business logic. In Extra Horizon, business logic is implemented in Functions.&#x20;

{% content-ref url="services/automation/task-service/" %}
[task-service](services/automation/task-service/)
{% endcontent-ref %}

## Documentation and Support

Take a look at these resources for more information on how to build on Extra Horizon:

* The [docs.extrahorizon.com](https://docs.extrahorizon.com/extrahorizon/) website
* The [ExtraHorizon/examples ](https://github.com/ExtraHorizon/examples)GitHub repository
* The [Extra Horizon 101](https://www.youtube.com/watch?v=uIuGQ\_VZ4CM\&list=PLPA2gPofpVsTqJSflf4PKtTC7NCYRKEQH) YouTube playlist, which contains short instructional videos on how the different services can be used.
* Our [Postman Reference Collection](api-reference/postman-reference-collection.md) to quickly get started with the REST API.

If you can't find the answers to your questions, reach out to our support team at [support@extrahorizon.com](mailto:support@extrahorizon.com).&#x20;

