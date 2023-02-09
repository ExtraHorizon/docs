# ⏱ Usage and Performance

The following are restrictions on data storage and operations in your Extra Horizon environment. We put these limits in place to maximize the stability of your environment.

{% hint style="warning" %}
In case you want an increase on the limits described below. Please contact the Extra Horizon Team through your dedicated slack channel or via support@extrahorizon.com.
{% endhint %}

## Gateway Limits

| Operation                          | Limit      | Description                                                                                               |
| ---------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| API Call                           | 60 seconds | Any single API call can run for 60 seconds before timing out.                                             |
| Max body size                      | 10MB       | The size of the body of any API request, except for file uploads in the file service, is limited to 10MB. |
| Max body size for the file service | 100MB      | The size of the body for file uploads in the file service, is limited to 100MB.                           |

## Service-specific limits

### Task Service

| Operation        | Limit     | Description                                                                                   |
| ---------------- | --------- | --------------------------------------------------------------------------------------------- |
| Task execution   | 5 minutes | A task execution will timeout after 5 minutes.                                                |
| Task concurrency | 5         | Number of tasks that can run at the same time. (Contact support if you need a limit increase) |

### File Service

| Operation    | Limit | Description                                                  |
| ------------ | ----- | ------------------------------------------------------------ |
| File uploads | 8MB   | File uploads to the file service are limited to files of 8MB |

You as an applications builder needs to be aware of the performance impact and user experience in the  applications you are building. Theoretically the file service can handle files up to 5 TB. However, uploading large files can take a long time and when internet connections fail it can result in a bad user experience. Therefore when you are expecting your application to process large files, please have a talk with our Solution Architecture Team, we are here to help.&#x20;

Please contact the Extra Horizon Team through your dedicated slack channel or via support@extrahorizon.com

\
\
