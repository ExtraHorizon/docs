# Usage and Performance

The following are restrictions on data storage and operations in your Extra Horizon environment. We put these limits in place to maximise the stability of your environment.

## General Limits

| Operation | Limit      | Description                                                                                                |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| API Call  | 60 seconds | Any single API call can run for 60 seconds before timing out.                                              |
| Body Size | 10MB       | The size of the body of any API request, except for file uploads in the file service,  is limited to 10MB. |

## Service-specific limits

### Task Service

| Operation      | Limit     | Description                                     |
| -------------- | --------- | ----------------------------------------------- |
| Task Execution | 5 minutes | A task exectution will timeout after 5 minutes. |

### File Service

| Operation    | Limit | Description                                                    |
| ------------ | ----- | -------------------------------------------------------------- |
| File uploads | 100MB | File uploads to the file service are limited to files of 100MB |
