---
description: >-
  This page answers some general questions around the deployment and
  configuration of Extra Horizon clusters.
---

# General

#### How does an Extra Horizon setup look like?

We deploy every customer cluster in a dedicated isolated environment. Every cluster lives in its own VPC (Virtual Private Cloud). This ensures that infrastructure is isolated for each customer, and data resides within the customer’s environment.

#### I am getting CORS errors when developing my frontend application?

Browsers are quite restrictive when it comes to deciding where your frontend application can fetch data from. Typically you cannot make XHR requests to domains other than the domain where the frontend is loaded from.&#x20;

But there are ways around it and that is where **CORS headers** come into play. The server/domain that you're targeting with your XHR request, in your case probably the Extra horizon cloud, can add special http headers to its response. These headers indicate which source domains are allowed to make requests to it.

Unfortunately, managing these CORS headers is not something that our customers are able to do themselves _yet_. So if you need to have those headers changed, please contact Extra horizon [support](../exh-platform/support.md) through the appropriate channels and we'll expedite this change for you.&#x20;

Please state clearly which uri you want to add, including protocol, host and port. For example, if you're developing your frontend application on http, host localhost and port 3000, the full url to supply would be `http://localhost:300`. For deployed applications it might be `https://myportal.mycompany.com`
