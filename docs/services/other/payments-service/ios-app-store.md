# iOS App Store

As of version 1.1 of the payments service it has support for (auto-renewing) subscriptions. The other payment options that apple provide are currently not supported by the payment service.

### Configuring products <a href="#configuring-products" id="configuring-products"></a>

Before a "purchase" can be made, a product needs to be defined.

#### Subscription products <a href="#subscription-products" id="subscription-products"></a>

For subscriptions the product needs to be defined in two places:

* App Store Connect
* Payments service

How to define a product in the App Store Connect? We will point you towards the documentation of Apple, as we do not control this information and thus do not know if it has been updated or not. Therefore, it is easier to just point to the documentation of Apple as that will always be the most up-to-date information. You can find Apple's documentation [here](https://help.apple.com/app-store-connect/#/dev06f89ce98).

How to define a product on the Payments service: We developed the endpoint `POST /appStore/subscriptions/products`.

This endpoint takes the following properties in the body of the request:

```
{
  "name": "FibriCheck Premium Monthly",
  "appStoreAppBundleId": "com.qompium.fibricheck",
  "appStoreProductId": "fibricheck-premium-monthly",
  "subscriptionGroup": "fibricheck",
  "subscriptionTier": "premium"
}
```

The property `name` will be used as the name that will be displayed towards the user in the Mobile App, Web App, ...

The property `appStoreAppBundleId` needs to match with the bundleId as you had filled in when configuring the product on the App Store Connect page. It represents the unique name for the application. Apple uses this to differentiate which products belong to which app.

The property `appStoreProductId` needs to match with the productId as you had filled in when configuring the product on the App Store Connect page. It represents the **unique** name for the product. Apple uses this to differentiate which product it is that the user wants to purchase.

The property `subscriptionGroup` needs to match with the subscription group as you had filled in when configuring the product on the App Store Connect page.

The property `subscriptionTier` needs to match with the tier as you had filled in when configuring the product on the App Store Connect page.

After a product has been configured, the rest of the business logic for the App Store (completeTransaction, server2server notifications and subscription status re-evaluator) will lookup the product in the database by the appStoreProductId field.
