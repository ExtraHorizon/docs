---
description: >-
  The payment service provides integration with In-App Payments (Android, iOS)
  and Stripe.
---

# Payment Service

### One-off purchases

Using [Stripe](https://developers.extrahorizon.io/services/payments-service/1.1.1/stripe.html) we support one-off purchases.

By setting up a payment method reuse, the same payment method could be saved for later usage.

Stripe.com offers 2 different APIs for payments :

* [Payment intent (API)](https://stripe.com/docs/payments/payment-intents)
* [Legacy API](https://stripe.com/docs/payments/legacy-apis) - Charge - [Source](https://stripe.com/docs/api/sources/create)

In our code base we have implemented both APIs. The preferred is the payment intent API.

{% hint style="warning" %}
As of September 2019, a regulation called Strong Customer Authentication (SCA) requires businesses in Europe to request additional authentication for online payments. Businesses in Europe must start building their Stripe integrations with the Payment Intents and Payment Methods APIs instead of the Sources API to be ready for these rule changes.
{% endhint %}

### Complete a basic payment for a basic order <a href="markdown-header-complete-a-basic-payment-for-a-basic-order" id="markdown-header-complete-a-basic-payment-for-a-basic-order"></a>

1. Make a product (when no product exist in your environment) `POST /products`
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with in the body the property productId with the value from the product of step 1
3. In the response body from the request, in step 2, will be the property `stripeClientSecret` store its value as well as the `orderId`
4. Make sure you can [handle the payment method details on your frontend](https://stripe.com/docs/payments/accept-a-payment#web-collect-card-details)
5. Use the "stripeClientSecret" (from step 3) in the [stripe.confirmCardPayment method to complete the payment on the stripe.com service](https://stripe.com/docs/payments/accept-a-payment?integration=elements#set-up-stripe-elements)
6. Poll the order page with the id (from step 3) `GET /orders?id=...` until the response contains the property `status` with value `task_started` (if it never changes to `task_started`, contact the Extra Horizon team)
7. You have now successfully completed a payment for an order

### Payment in a currency different from the default (EUR) <a href="markdown-header-payment-in-a-currency-different-from-the-default-eur" id="markdown-header-payment-in-a-currency-different-from-the-default-eur"></a>

1. Make a product `POST /products` with the body containing `"prices": { "eur": { "amount": 1000 }, "usd": { "amount": 1500 } }`
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with the body containing `"productId": ...(from step1), "currency": "usd"`
3. Follow step 3, 4, 5 and 6 from "Complete a basic payment for a basic order"
4. You have now successfully completed a payment with a currency different from the default (EUR)

### Payment method type different from the default (card) <a href="markdown-header-payment-method-type-different-from-the-default-card" id="markdown-header-payment-method-type-different-from-the-default-card"></a>

In this service we have implemented 4 different payment method types from the stripe.com api: The default payment method type is `card` (visa, mastercard, ...). The other 3 supported types are: `bancontact`, `giropay` and `ideal`.

1. Follow step 1 from "Complete a basic payment for a basic order"
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with the body containing `"productId": ...(from step1), "paymentMethodType": "bancontact"`
3. Follow step 3 and 4 from "Complete a basic payment for a basic order"
4. Use the "stripeClientSecret" (from step 3) in the [stripe.confirmBancontactPayment method to complete the payment on the stripe.com service](https://stripe.com/docs/payments/bancontact/accept-a-payment#confirm-bancontact-payment)
5. Follow step 6 from "Complete a basic payment for a basic order"
6. You have now successfully completed a payment with a different payment method type (bancontact) than the default (card)

You can repeat the process above but instead of specifying `bancontact` as the paymentMethodType (in step 2) specify `giropay` or `ideal`. You'll need to use the respective `confirm...Payment` method in step 4.

See stripe.com documentation for more information about the `confirm..Payment` method: [bancontact](https://stripe.com/docs/js/payment\_intents/confirm\_bancontact\_payment) [giropay](https://stripe.com/docs/js/payment\_intents/confirm\_giropay\_payment) [ideal](https://stripe.com/docs/js/payment\_intents/confirm\_ideal\_payment)

### Recurring payments <a href="markdown-header-recurring-payments" id="markdown-header-recurring-payments"></a>

First create a payment intent with the `setupPaymentMethodReuse` option set to `offSession`:

`POST /stripe/paymentIntent`

```
{
  "productId": "5ce26e7a2b9e674d0c7fd3d6",
  "setupPaymentMethodReuse": "offSession"
}
```

Use the returned `stripeClientSecret` to complete the payment with Stripe.

Then the `payment_method` returned by Stripe can be submitted reuse it later on:

`POST /stripe/users/5d3f321b59080100065b2ee7/paymentMethods`

```
{
  "stripeId": "pm_1FPngmI6N8mPcPA74shsTsmP"
}
```

Now that the payment method is saved it can be used for future payments.

The saved payment method can be specified during the creation of a payment intent. Adding the `paymentMethodId` and `offSession: true` to the request make the API try to automatically complete the payment intent:

`POST /stripe/paymentIntent`

```
{
  "productId": "5ce26e7a2b9e674d0c7fd3d6",
  "paymentMethodId": "5d961cd8adf66e0402c188ca",
  "offSession": true
}
```

### Setup payment details without initial payment <a href="markdown-header-setup-payment-details-without-initial-payment" id="markdown-header-setup-payment-details-without-initial-payment"></a>

First create a setup intent with the `setupPaymentMethodReuse` option set to `offSession`:

`POST /stripe/setupIntents`

```
{
  "setupPaymentMethodReuse": "offSession"
}
```

Use the returned `stripeClientSecret` to complete the setup with Stripe using the `confirmCardSetup` method in stripe.js.

## Subscriptions <a href="markdown-header-subscriptions" id="markdown-header-subscriptions"></a>

Subscriptions are supported through Apple's [App Store](https://developers.extrahorizon.io/services/payments-service/1.1.1/appStore.html).

### Entitlements <a href="markdown-header-entitlements" id="markdown-header-entitlements"></a>

An example of what an active subscription entitlement might look like:

```json
{
  "id": "6082986545bb91774914a5ad",
  "userId": "60817e436b2f070007e55d79",
  "source": "appStore",
  "sourceProductId": "60745ea1b1a935bd02567a59",
  "subscriptionGroup": "fibricheck",
  "subscriptionTier": "essential",
  "statusCategory": "engaged",
  "status": "active_with_renewal",
  "expireTimestamp": "2021-04-22T16:50:38.000Z",
  "creationTimestamp": "2021-04-23T09:50:29.078Z"
}
```

A brief explanation of the fields:

|                     |                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `userId`            | The id of the user the subscription entitlement belongs to                                                                    |
| `source`            | The source of the subscription entitlement. The name of a payment vendor unless otherwise defined.                            |
| `sourceProductId`   | The id of the product as defined by the payment vendor specific implementation.                                               |
| `subscriptionGroup` | The name of the subscription group which could contain multiple subscription tiers.                                           |
| `subscriptionTier`  | The name of subscription tier which could represent multiple different products in the same tier within a subscription group. |
| `statusCategory`    | The name of the category the entitlement status belongs to.                                                                   |
| `status`            | The name of the status the subscription entitlement is in.                                                                    |

### Entitlement Statuses and Status Categories <a href="markdown-header-entitlement-statuses-and-status-categories" id="markdown-header-entitlement-statuses-and-status-categories"></a>

Each Entitlement Status belongs to a Status Category. A list of each category and the statuses that belong to them:

* `acquiring`
* `using_free_trial`
* `using_introductory_pricing`
* `using_promotion`
* `engaged`
* `active_with_renewal`
* `active_but_losing`
* `active_without_renewal`
* `switching_product`
* `awaiting_price_change_confirmation`
* `in_grace_period`
* `inactive_and_losing`
* `in_billing_retry`
* `lost`
* `expired_voluntarily`
* `switched_product`
* `expired_from_billing`
* `failed_to_confirm_price_change`
* `revoked`
* `refunded`
* `refunded_for_issue`

In the next section the specific Status Categories and their statuses are explained in more detail.

#### The `acquiring` Status Category <a href="markdown-header-the-acquiring-status-category" id="markdown-header-the-acquiring-status-category"></a>

Statuses in this category indicate the subscription is active but using a free trial or reduced pricing.

* The `using_free_trial` Status.

An active subscription using a free trial.

* The `using_introductory_pricing` Status.

An active subscription using a reduced introductory pricing.

* The `using_promotion` Status.

An active subscription using a reduced pricing by offer code or other promotion mechanism.

#### The `engaged` Status Category <a href="markdown-header-the-engaged-status-category" id="markdown-header-the-engaged-status-category"></a>

Statuses in this category indicate the subscription is active and will automatically renew at the end of the current subscription period.

* The `active_with_renewal` Status.

An active subscription which will automatically renew at the end of the current subscription period.

#### The `active_but_losing` Status Category <a href="markdown-header-the-active_but_losing-status-category" id="markdown-header-the-active_but_losing-status-category"></a>

Statuses in this category indicate the subscription is active but will **not** automatically renew at the end of the current subscription period.

* The `active_without_renewal` Status.

An active subscription for which the user chose to no longer automatically renew after the current subscription period.

* The `switching_product` Status.

An active subscription for which the user chose to switch to another product at the end of the current subscription period.

* The `awaiting_price_change_confirmation` Status.

An active subscription where the product changed its price. Confirmation by the user is required before the subscription can be automatically renewed.

* The `in_grace_period` Status.

An active subscription for which automatic renew failed. Automatic renewal is retried but user action may be required to resolve the reason the renewal failed.

#### The `inactive_and_losing` Status Category <a href="markdown-header-the-inactive_and_losing-status-category" id="markdown-header-the-inactive_and_losing-status-category"></a>

Statuses in this category indicate the subscription is no longer active but automatic attempts are performed to reactivate the subscription.

* The `in_billing_retry` Status.

An inactive subscription for which automatic renewal failed. Automatic renewal is retried but user action may be required to resolve the reason the renewal failed.

#### The `lost` Status Category <a href="markdown-header-the-lost-status-category" id="markdown-header-the-lost-status-category"></a>

Statuses in this category indicate the subscription is no longer active and **no** automatic attempts will be performed to reactivate the subscription.

* The `expired_voluntarily` Status.

An inactive subscription for which the user chose to no longer automatically renew.

* The `switched_product` Status.

An inactive subscription for which the user chose to change to another product.

* The `expired_from_billing` Status.

An inactive subscription for which automatic renewal failed and is no longer retried.

* The `failed_to_confirm_price_change` Status.

An inactive subscription where the product changed its price. The user did not perform the required confirmation.

* The `revoked` Status.

An inactive subscription for which the payment provider decided to revoke access to.

* The `refunded` Status.

An inactive subscription for which the user was refunded.

* The `refunded_for_issue` Status.

An inactive subscription for which the user was refunded after reporting an issue.

### Events <a href="markdown-header-events" id="markdown-header-events"></a>

All subscription events are also published to the [Events Service](payment-service.md#markdown-header-events). The `type` of the published Events Service event is prefixed with `payments.subscriptions`. So, for the `started_with_free_trial` subscription event, an event in the Events Service is published with `"type": "payments.subscriptions.started_with_free_trial"`.

For example a `started_with_free_trial` Event might look like this:

```json
{
  "id": "608036c95fd8eaae0f83bdc0",
  "userId": "6080362459080100071a3da2",
  "source": "appStore",
  "sourceProductId": "60745e99b1a9352cbd567a58",
  "subscriptionGroup": "fibricheck",
  "subscriptionTier": "essential",
  "type": "started_with_free_trial",
  "expireTimestamp": "2021-04-21T14:31:26.000Z",
  "creationTimestamp": "2021-04-21T14:29:29.882Z"
}
```

The following fields are common for all events:

|                     | Description                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `userId`            | The id of the user the subscription event belongs to.                                                                         |
| `source`            | The source of the subscription event. The name of a payment vendor unless otherwise defined.                                  |
| `sourceProductId`   | The id of the product as defined by the payment vendor specific implementation.                                               |
| `subscriptionGroup` | The name of the subscription group which could contain multiple subscription tiers.                                           |
| `subscriptionTier`  | The name of subscription tier which could represent multiple different products in the same tier within a subscription group. |
| `eventTimestamp`    | The moment the event happened, as reported by the payment vendor.                                                             |
| `creationTimestamp` | The moment the event was created in our system.                                                                               |

### Event Types <a href="markdown-header-event-types" id="markdown-header-event-types"></a>

A list of all event types, a brief description and the event specific fields:

|                                       | Description                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `started`                             | <p>The user its first subscription started.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                                                          |
| `started_with_free_trial`             | <p>The user its first subscription started using a free trial.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                                       |
| `started_with_introductory_pricing`   | <p>The user its first subscription started using a reduced introductory pricing.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                     |
| `started_with_promotion`              | <p>The user its first subscription started by using an offer code (App Store) or other promotion mechanism.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p><p>The <code>promotionReference</code> field contains a reference to the relevant promotion campaign.</p> |
| `renewed`                             | <p>Time was added to the subscription.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                                                               |
| `renewed_with_free_trial`             | <p>The user renewed its subscription using a free trial.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                                             |
| `renewed_with_introductory_pricing`   | <p>The user renewed its subscription using a reduced introductory pricing.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                           |
| `renewed_with_promotion`              | <p>The user renewed its subscription using an offer code (App Store) or other promotion mechanism.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p><p>The <code>promotionReference</code> field contains a reference to the relevant promotion campaign.</p>          |
| `renewal_disabled`                    | <p>The user chose to disable automatic renewal of their subscription.</p><p>If set, the date reported by the <code>expireTimestamp</code> field indicates the adjusted moment of expiry.</p>                                                                                                                                      |
| `renewal_enabled`                     | <p>The user chose to enable automatic renewal of their subscription.</p><p>If set, the date reported by the <code>expireTimestamp</code> field indicates the adjusted moment of expiry.</p>                                                                                                                                       |
| `expired_voluntarily`                 | The user chose to disable automatic renewal and the active subscription period ended.                                                                                                                                                                                                                                             |
| `switching_product`                   | <p>The user requested to switch to another product at the end of the current active subscription period.</p><p>The product the user requested to switch to is reported by the <code>newProductId</code> field.</p>                                                                                                                |
| `switched_product`                    | <p>The subscription for this product ended because the user switched to another product.</p><p>The product the user switched to is reported by the <code>newProductId</code> field.</p>                                                                                                                                           |
| `grace_period_started`                | <p>Automatic renewal failed but the subscription is still active and other automatic renewal attempts will be made.</p><p>If set, the date reported by the <code>expireTimestamp</code> field indicates the adjusted moment of expiry.</p>                                                                                        |
| `billing_retry_started`               | Automatic renewal failed and the subscription is no longer active. Other automatic renewal attempts will still be made.                                                                                                                                                                                                           |
| `expired_from_billing`                | Automatic renewal failed and the subscription is no longer active. No automatic renewal attempts will be performed.                                                                                                                                                                                                               |
| `price_change_confirmation_requested` | The price of the subscription product changed. Confirmation from the user is required to continue automatic renewal of the subscription.                                                                                                                                                                                          |
| `failed_to_confirm_price_change`      | The user did not perform the required price change confirmation and the active subscription period expired.                                                                                                                                                                                                                       |
| `revoked`                             | The payment provider decided to revoke access from this user for this subscription.                                                                                                                                                                                                                                               |
| `refunded`                            | <p>The user was refunded for this subscription and no longer has access.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                                             |
| `refunded_for_issue`                  | <p>The user was refunded after reporting an issue for this subscription and no longer has access.</p><p>The subscription will be active until the date reported by the <code>expireTimestamp</code> field.</p>                                                                                                                    |

## References

* [Payment Service API Reference](https://developers.extrahorizon.io/swagger-ui/?url=https://developers.extrahorizon.io/services/payments-service/1.1.1/openapi.yaml)
