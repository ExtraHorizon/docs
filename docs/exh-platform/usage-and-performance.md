# ⏱️ Usage and Performance

The following are restrictions on data storage and operations in your Extra Horizon environment. We put these limits in place to maximize the stability of your environment.

{% hint style="warning" %}
In case you want an increase on the limits described below. Please contact the Extra Horizon Team through your dedicated Slack channel or via support@extrahorizon.com.
{% endhint %}

## Gateway limits

| Operation     | Limit      | Description                                                                                           |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| API Call      | 60 seconds | Any single API call can run for 60 seconds before timing out.                                         |
| Max body size | 10MB       | The size of the body of any API request. Except for file uploads, see the limits of the File Service. |

## Task Service limits

| Operation        | Limit     | Description                                                                                           |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| Task execution   | 5 minutes | A task execution will timeout after 5 minutes.                                                        |
| Task concurrency | 5         | Number of tasks that can run at the same time.                                                        |
| Task data size   | 250KB     | The size of the data supplied to a task should not exceed this threshold. (measured as a JSON string) |

## File Service

| Operation    | Limit | Description                                                    |
| ------------ | ----- | -------------------------------------------------------------- |
| File uploads | 8MB\* | File uploads to the file service are limited to files of 8MB\* |

_\* The limit can be increased, but you as an application builder need to be aware of the performance impact and user experience in the applications you are building. Theoretically the file service can handle files up to 5 TB. However, uploading large files can take a long time and when internet connections fail it can result in a bad user experience. Therefore when you are expecting your application to process large files, please have a chat with our Solution Architecture Team, we are here to help._&#x20;

## User Service

### Login timeout restrictions <a href="#logins" id="logins"></a>

| Failed login attempts               | Restrictions                                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 0 - 49                              | User can attempt one login every second. The `LOGIN_TIMEOUT_EXCEPTION` is returned to the user.                   |
| Every 10th request (10, 20, 30, 40) | User has to wait 60 seconds before attempting a new login. The `LOGIN_FREEZE_EXCEPTION` is returned to the user.  |
| 50                                  | User can't do any login login attempts anymore. The `TOO_MANY_FAILED_ATTEMPTS_EXCEPTION` is returned to the user. |

### Restrictions for account activation requests

| Restriction               | Limit      | Description                                                                                                                |
| ------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Hash lifetime             | 60 minutes | The time an activation request is valid, using the default hash mode.                                                      |
| Hash mode initiations     | 5          | The maximum amount of times the activation flow can be initiated without a successful attempt using the default hash mode. |
| Pin code lifetime         | 15 minutes | The time an activation request is valid, using the pin code mode.                                                          |
| Pin code attempts         | 3          | The maximum attempts per initiation with a pin code.                                                                       |
| Pin code mode initiations | 3          | The maximum amount of times the activation flow can be initiated without a successful attempt using the pin code mode.     |
| Time between initiations  | 5 minutes  | The minimum time required between activation flow initiations.                                                             |

### Restrictions for forgot password requests

| Restriction               | Limit      | Description                                                                                                                     |
| ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Hash lifetime             | 60 minutes | The time a forgot password request is valid, using the default hash mode.                                                       |
| Hash mode initiations     | 5          | The maximum amount of times the forgot password flow can be initiated without a successful attempt using the default hash mode. |
| Pin code lifetime         | 15 minutes | The time a forgot password request is valid, using the pin code mode.                                                           |
| Pin code attempts         | 3          | The maximum attempts per initiation with a pin code.                                                                            |
| Pin code mode initiations | 3          | The maximum amount of times the forgot password flow can be initiated without a successful attempt using the pin code mode.     |
| Time between initiations  | 5 minutes  | The minimum time required between forgot password flow initiations.                                                             |

\
\
