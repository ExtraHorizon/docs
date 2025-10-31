---
description: >-
  This page outlines the different security measures of the Extra Horizon
  platform.
---

# 🔓 Security

## Dedicated Cloud Infrastructure

The publicly facing HTTPS load balancer is the only component of the infrastructure that is publicly accessible. All other services are deployed in a private network that's shielded from the public internet.

![](<../../../.gitbook/assets/image (1) (1) (1).png>)

## HTTPS-Only Communication

To make sure that all your data is secure in transit, only HTTPS communication is allowed.

### SSL Termination

**Supported protocols:**

* TLS v1.2
* TLS v1.3

**Supported cipher suites:**

* ECDHE-ECDSA-AES128-GCM-SHA256
* ECDHE-RSA-AES128-GCM-SHA256
* ECDHE-ECDSA-AES256-GCM-SHA384
* ECDHE-RSA-AES256-GCM-SHA384
* TLS-AES-128-GCM-SHA256
* TLS-AES-256-GCM-SHA384

{% hint style="info" %}
The above-mentioned list of protocols and cipher suites holds for **new environments**. We are currently in the process of migrating all existing environments to reflect the protocols and cipher suites mentioned here.
{% endhint %}
