# Subscriptions



### Entitlements <a href="#entitlements" id="entitlements"></a>

An example of what an active subscription entitlement might look like:

```
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

*   `userId`

    The id of the user the subscription entitlement belongs to.
*   `source`

    The source of the subscription entitlement. The name of a payment vendor unless otherwise defined.
*   `sourceProductId`

    The id of the product as defined by the payment vendor specific implementation.
*   `subscriptionGroup`

    The name of the subscription group which could contain multiple subscription tiers.
*   `subscriptionTier`

    The name of subscription tier which could represent multiple different products in the same tier within a subscription group.
*   `statusCategory`

    The name of the category the entitlement status belongs to. More information is found in the [Entitlement Statuses and Status Categories](https://developers.extrahorizon.io/services/payments-service/1.2.0/subscriptions.html#entitlement-statuses-and-status-categories) section.
*   `status`

    The name of the status the subscription entitlement is in. More information is found in the [Entitlement Statuses and Status Categories](https://developers.extrahorizon.io/services/payments-service/1.2.0/subscriptions.html#entitlement-statuses-and-status-categories) section.

### Entitlement Statuses and Status Categories <a href="#entitlement-statuses-and-status-categories" id="entitlement-statuses-and-status-categories"></a>

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

#### The `acquiring` Status Category <a href="#the-acquiring-status-category" id="the-acquiring-status-category"></a>

Statuses in this category indicate the subscription is active but using a free trial or reduced pricing.

*   The `using_free_trial` Status.

    An active subscription using a free trial.
*   The `using_introductory_pricing` Status.

    An active subscription using a reduced introductory pricing.
*   The `using_promotion` Status.

    An active subscription using a reduced pricing by offer code or other promotion mechanism.

#### The `engaged` Status Category <a href="#the-engaged-status-category" id="the-engaged-status-category"></a>

Statuses in this category indicate the subscription is active and will automatically renew at the end of the current subscription period.

*   The `active_with_renewal` Status.

    An active subscription which will automatically renew at the end of the current subscription period.

#### The `active_but_losing` Status Category <a href="#the-active-but-losing-status-category" id="the-active-but-losing-status-category"></a>

Statuses in this category indicate the subscription is active but will **not** automatically renew at the end of the current subscription period.

*   The `active_without_renewal` Status.

    An active subscription for which the user chose to no longer automatically renew after the current subscription period.
*   The `switching_product` Status.

    An active subscription for which the user chose to switch to another product at the end of the current subscription period.
*   The `awaiting_price_change_confirmation` Status.

    An active subscription where the product changed its price. Confirmation by the user is required before the subscription can be automatically renewed.
*   The `in_grace_period` Status.

    An active subscription for which automatic renew failed. Automatic renewal is retried but user action may be required to resolve the reason the renewal failed.

#### The `inactive_and_losing` Status Category <a href="#the-inactive-and-losing-status-category" id="the-inactive-and-losing-status-category"></a>

Statuses in this category indicate the subscription is no longer active but automatic attempts are performed to reactivate the subscription.

*   The `in_billing_retry` Status.

    An inactive subscription for which automatic renewal failed. Automatic renewal is retried but user action may be required to resolve the reason the renewal failed.

#### The `lost` Status Category <a href="#the-lost-status-category" id="the-lost-status-category"></a>

Statuses in this category indicate the subscription is no longer active and **no** automatic attempts will be performed to reactivate the subscription.

*   The `expired_voluntarily` Status.

    An inactive subscription for which the user chose to no longer automatically renew.
*   The `switched_product` Status.

    An inactive subscription for which the user chose to change to another product.
*   The `expired_from_billing` Status.

    An inactive subscription for which automatic renewal failed and is no longer retried.
*   The `failed_to_confirm_price_change` Status.

    An inactive subscription where the product changed its price. The user did not perform the required confirmation.
*   The `revoked` Status.

    An inactive subscription for which the payment provider decided to revoke access to.
*   The `refunded` Status.

    An inactive subscription for which the user was refunded.
*   The `refunded_for_issue` Status.

    An inactive subscription for which the user was refunded after reporting an issue.

### Events <a href="#events" id="events"></a>

All subscription events are also published to the [Events Service](https://developers.extrahorizon.io/services/?service=events-service\&redirectToVersion=1). The `type` of the published Events Service event is prefixed with `payments.subscriptions`. So, for the `started_with_free_trial` subscription event, an event in the Events Service is published with `"type": "payments.subscriptions.started_with_free_trial"`.

For example a `started_with_free_trial` Event might look like this:

```
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

*   `userId`

    The id of the user the subscription event belongs to.
*   `source`

    The source of the subscription event. The name of a payment vendor unless otherwise defined.
*   `sourceProductId`

    The id of the product as defined by the payment vendor specific implementation.
*   `subscriptionGroup`

    The name of the subscription group which could contain multiple subscription tiers.
*   `subscriptionTier`

    The name of subscription tier which could represent multiple different products in the same tier within a subscription group.
*   `eventTimestamp`

    The moment the event happened, as reported by the payment vendor.
*   `creationTimestamp`

    The moment the event was created in our system.

Fields specific to their event type are documented together with the event types below.

### Event Types <a href="#event-types" id="event-types"></a>

A list of all event types, a brief description and the event specific fields:

*   The `started` Event.

    The user its first subscription started.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `started_with_free_trial` Event.

    The user its first subscription started using a free trial.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `started_with_introductory_pricing` Event.

    The user its first subscription started using a reduced introductory pricing.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `started_with_promotion` Event.

    The user its first subscription started by using an offer code (App Store) or other promotion mechanism.

    The subscription will be active until the date reported by the `expireTimestamp` field.

    The `promotionReference` field contains a reference to the relevant promotion campaign.
*   The `renewed` Event.

    Time was added to the subscription.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `renewed_with_free_trial` Event.

    The user renewed its subscription using a free trial.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `renewed_with_introductory_pricing` Event.

    The user renewed its subscription using a reduced introductory pricing.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `renewed_with_promotion` Event.

    The user renewed its subscription using an offer code (App Store) or other promotion mechanism.

    The subscription will be active until the date reported by the `expireTimestamp` field.

    The `promotionReference` field contains a reference to the relevant promotion campaign.
*   The `renewal_disabled` Event.

    The user chose to disable automatic renewal of their subscription.

    If set, the date reported by the `expireTimestamp` field indicates the adjusted moment of expiry.
*   The `renewal_enabled` Event.

    The user chose to enable automatic renewal of their subscription.

    If set, the date reported by the `expireTimestamp` field indicates the adjusted moment of expiry.
*   The `expired_voluntarily` Event.

    The user chose to disable automatic renewal and the active subscription period ended.
*   The `switching_product` Event.

    The user requested to switch to another product at the end of the current active subscription period.

    The product the user requested to switch to is reported by the `newProductId` field.
*   The `switched_product` Event.

    The subscription for this product ended because the user switched to another product.

    The product the user switched to is reported by the `newProductId` field.
*   The `grace_period_started` Event.

    Automatic renewal failed but the subscription is still active and other automatic renewal attempts will be made.

    If set, the date reported by the `expireTimestamp` field indicates the adjusted moment of expiry.
*   The `billing_retry_started` Event.

    Automatic renewal failed and the subscription is no longer active. Other automatic renewal attempts will still be made.
*   The `expired_from_billing` Event.

    Automatic renewal failed and the subscription is no longer active. No automatic renewal attempts will be performed.
*   The `price_change_confirmation_requested` Event.

    The price of the subscription product changed. Confirmation from the user is required to continue automatic renewal of the subscription.
*   The `failed_to_confirm_price_change` Event.

    The user did not perform the required price change confirmation and the active subscription period expired.
*   The `revoked` Event.

    The payment provider decided to revoke access from this user for this subscription.
*   The `refunded` Event.

    The user was refunded for this subscription and no longer has access.

    The subscription will be active until the date reported by the `expireTimestamp` field.
*   The `refunded_for_issue` Event.

    The user was refunded after reporting an issue for this subscription and no longer has access.

    The subscription will be active until the date reported by the `expireTimestamp` field.
