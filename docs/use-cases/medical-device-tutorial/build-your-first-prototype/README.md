# Build your first prototype

## Milestones

{% hint style="info" %}
You will learn how to:&#x20;

* Define your data model using **data schemas**&#x20;
* Setup 3 **workflows**&#x20;
  * Perform an analysis on a blood pressure measurement
  * Create a measurement report and upload it to your Extra Horizon's file service
  * Send an email with this report to a healthcare practitioner&#x20;
* Setup basic **permissions** for your users
* Setup your **oAuth** flow in the backend
{% endhint %}

## Architectural Overview

<figure><img src="../../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

1. User performs a measurement
2. Task is triggered to analyse the measurement
3. The result of the analysis is returned
4. A PDF with the analysis is generated
5. A PDF is stored in the Extra Horizon file service
6. An email is created containing the PDF report
7. The email is sent to a recipient

