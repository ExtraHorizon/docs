# Configuration

### Password Policy <a href="#password-policy" id="password-policy"></a>

{% hint style="success" %}
Password policy configuration was added in v.1.1.8
{% endhint %}

The password policy enforces new passwords to adhere to its requirements. The policy can be changed at any time and will require all new passwords (registration, password forgotten, ...) to adhere to its requirements. Old passwords will still be valid and don't require changing. An example of a password policy is:

#### Example <a href="#example-2" id="example-2"></a>

```
{
  "minimum_length": 8,
  "maximum_length": 128,
  "upper_case_required": true,
  "lower_case_required": true,
  "symbol_required": false,
  "number_required": true
}
```

#### Fields <a href="#fields" id="fields"></a>

* minimum\_length: the minimum amount of characters that a password must contain.
* maximum\_length: the maximum amount of characters that a password must contain.
* upper\_case\_required: if set to true, the password must contain an uppercase character: `A-Z`.
* lower\_case\_required: if set to true, the password must contain a lowercase character: `a-z`.
* symbol\_required: if set to true, the password must contain a special character: ``~!`@#$%^&*()_-+={[}]|\\:;\"'<,>.?/.``
* number\_required: if set to true, the password must contain a digit: `0-9`.

### Logins <a href="#logins" id="logins"></a>

Users can log in with an e-mail/password combination.

After each failed login attempt for an email address that is assigned to a user in the system. The failed login attempts counter for that user is incremented by 1. When a user has a successful login the counter of that user is reset to 0.

| Failed login attempts               | Restrictions                                              |
| ----------------------------------- | --------------------------------------------------------- |
| 0 - 49                              | User can attempt one login every second                   |
| Every 10th request (10, 20, 30, 40) | User has to wait 60 seconds before attempting a new login |
| 50                                  | User can't do any login login attempts anymore            |

When a user has 50 failed login attempts this can be reset to 0 by any user with the global `RESET_FAILED_LOGIN_ATTEMPTS` permission by performing following call:

```
POST /{userId}/reset_failed_login_attempts
```
