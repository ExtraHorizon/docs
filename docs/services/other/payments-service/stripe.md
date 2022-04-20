# Stripe

Stripe.com offers 2 different APIs for payments :

* [Payment intent (API)](https://stripe.com/docs/payments/payment-intents)
* [Legacy API](https://stripe.com/docs/payments/legacy-apis)
  * Charge
  * [Source](https://stripe.com/docs/api/sources/create)

In our code base we have implemented both APIs. The preferred is the payment intent API.

> As of September 2019, a regulation called [Strong Customer Authentication](https://stripe.com/docs/strong-customer-authentication) (SCA) requires businesses in Europe to request additional authentication for online payments. Businesses in Europe must start building their Stripe integrations with the [Payment Intents](https://stripe.com/docs/payments/payment-intents) and [Payment Methods](https://stripe.com/docs/payments/payment-methods#transitioning) APIs instead of the Sources API to be ready for these rule changes.

### Usage guide <a href="#usage-guide" id="usage-guide"></a>

#### Complete a basic payment for a basic order <a href="#complete-a-basic-payment-for-a-basic-order" id="complete-a-basic-payment-for-a-basic-order"></a>

1. Make a product (when no product exist in your environment) `POST /products`
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with in the body the property productId with the value from the product of step 1
3. In the response body from the request, in step 2, will be the property `stripeClientSecret` store its value as well as the `orderId`
4. Make sure you can [handle the payment method details on your frontend](https://stripe.com/docs/payments/accept-a-payment#web-collect-card-details)
5. Use the "stripeClientSecret" (from step 3) in the [stripe.confirmCardPayment method to complete the payment on the stripe.com service](https://stripe.com/docs/payments/accept-a-payment?integration=elements#set-up-stripe-elements)
6. Poll the order page with the id (from step 3) `GET /orders?id=...` until the response contains the property `status` with value `task_started` (if it never changes to `task_started`, contact the Extra Horizon team)
7. You have now successfully completed a payment for an order

#### Payment in a currency different from the default (EUR) <a href="#payment-in-a-currency-different-from-the-default-eur" id="payment-in-a-currency-different-from-the-default-eur"></a>

1. Make a product `POST /products` with the body containing `"prices": { "eur": { "amount": 1000 }, "usd": { "amount": 1500 } }`
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with the body containing `"productId": ...(from step1), "currency": "usd"`
3. Follow step 3, 4, 5 and 6 from "Complete a basic payment for a basic order"
4. You have now successfully completed a payment with a currency different from the default (EUR)

#### Payment method type different from the default (card) <a href="#payment-method-type-different-from-the-default-card" id="payment-method-type-different-from-the-default-card"></a>

In this service we have implemented 4 different payment method types from the stripe.com api: The default payment method type is `card` (visa, mastercard, ...). The other 3 supported types are: `bancontact`, `giropay` and `ideal`.

1. Follow step 1 from "Complete a basic payment for a basic order"
2. Create an order linked to a payment intent `POST /stripe/paymentIntents` with the body containing `"productId": ...(from step1), "paymentMethodType": "bancontact"`
3. Follow step 3 and 4 from "Complete a basic payment for a basic order"
4. Use the "stripeClientSecret" (from step 3) in the [stripe.confirmBancontactPayment method to complete the payment on the stripe.com service](https://stripe.com/docs/payments/bancontact/accept-a-payment#confirm-bancontact-payment)
5. Follow step 6 from "Complete a basic payment for a basic order"
6. You have now successfully completed a payment with a different payment method type (bancontact) than the default (card)

You can repeat the process above but instead of specifying `bancontact` as the paymentMethodType (in step 2) specify `giropay` or `ideal`. You'll need to use the respective `confirm...Payment` method in step 4.

See stripe.com documentation for more information about the `confirm..Payment` method: [bancontact](https://stripe.com/docs/js/payment\_intents/confirm\_bancontact\_payment) [giropay](https://stripe.com/docs/js/payment\_intents/confirm\_giropay\_payment) [ideal](https://stripe.com/docs/js/payment\_intents/confirm\_ideal\_payment)

#### Recurring payments <a href="#recurring-payments" id="recurring-payments"></a>

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

#### Setup payment details without initial payment <a href="#setup-payment-details-without-initial-payment" id="setup-payment-details-without-initial-payment"></a>

First create a setup intent with the `setupPaymentMethodReuse` option set to `offSession`:

`POST /stripe/setupIntents`

```
{
  "setupPaymentMethodReuse": "offSession"
}
```

Use the returned `stripeClientSecret` to complete the setup with Stripe using the `confirmCardSetup` method in stripe.js.
