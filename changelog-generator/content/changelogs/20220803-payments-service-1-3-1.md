---
service: payments-service
version: 1.3.1
date: 2022-08-03
---

**🐞 Bugs Fixed**
* AppStore: Transactions with a changed `transaction_id` value do no longer cause issues.
* An active subscription being detached from a user will now correctly update the `expireTimestamp` of the relevant entitlement. 

**🚨 Deprecation Warnings**
* The `lastTransactionId` field in the App Store subscriptions is replaced by `lastWebOrderId`. App Store subscriptions are returned by the `GET /appStore/subscriptions endpoint`.