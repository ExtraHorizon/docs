---
service: payments-service
version: 1.3.0
date: 2022-07-14
---

**🎁 Features**
* Complete a purchase for another user
  * When the payment details of a Play Store or App Store purchase are known, it is now possible to complete the purchase process for another user. This allows users with administrative privileges to move a subscription from one user to another or help users with (technical) difficulties.
* Re-evaluate the state of a Play Store or App Store subscription
  * We now allow to trigger a re-evaluation of the subscription state. If the Play Store or App Store subscription state is out of sync, a re-evaluation will bring the state back in sync with the information reported by the payment provider.
* Detach a Play Store or App Store subscription from a user
  * It is now possible to remove a Play Store and App Store subscription. This allows the subscription to be moved to another user.


**⚒️ Improvements**
* Improved the integration with Play Store and App Store
  * The Play Store integration got a big overhaul and the stability of the App Store integration has been improved.
* Automatically detach subscriptions on user removal
  * When a user account is deleted, the subscriptions linked to the account are removed. This allows users that deleted their account to reclaim their subscription when creating a new account.

**🐞 Bugs Fixed**
* Play Store subscriptions no longer end up in the `expired_from_billing` status after a successful renewal
* App Store receipts with awkward ordering are now handled correctly
* Invalid RQL queries are now reported with the correct error