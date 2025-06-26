# Execution credentials for Tasks

Since the version `1.9.0` of the CLI we introduced the property `executionCredentials` to the `task-config.json` this allows the CLI to automatically create a User and Global Role with the defined permissions for the Task. Credentials for this User will be injected into the Task's `environment` automatically.

For existing Tasks managed by the CLI, there are two possible migration paths:

* **Let the CLI create new execution credentials**\
  Provisions new user credentials managed by the CLI for the Task.
* **Let the CLI reuse the credentials of the existing Task's User**\
  Reuses existing user credentials from the Task, by setting `executionCredentials.email`

A minimal `task-config.json` might look like the example below. This example assumes the credentials in the `environment` property belong to a user that already exists.

In this setup, credentials are forwarded from the CLI to the task, however, the required environment variables may be populated from another source.

```json
{
  "name": "my_example_task",
  "description": "My example task description",
  "path": "./",
  "entryPoint": "index.handler",
  "runtime": "nodejs22.x",
  "environment": {
    "API_HOST": "$API_HOST",
    "API_OAUTH_CONSUMER_KEY": "$API_OAUTH_CONSUMER_KEY",
    "API_OAUTH_CONSUMER_SECRET": "$API_OAUTH_CONSUMER_SECRET",
    "API_OAUTH_TOKEN": "$API_OAUTH_TOKEN",
    "API_OAUTH_TOKEN_SECRET": "$API_OAUTH_TOKEN_SECRET"
  }
}
```

{% hint style="danger" %}
If your current credentials use different environment variable names or are injected into the environment by other means, please proceed with caution.
{% endhint %}

## **Let the CLI create new execution credentials**

Make use of the new CLI feature by discarding the existing user's credentials and allowing the CLI to create a new User, Role, and credentials, follow these steps:

* Remove the following environment variables from the `environment` property:
  * `API_HOST`
  * `API_OAUTH_CONSUMER_KEY`
  * `API_OAUTH_CONSUMER_SECRET`
  * `API_OAUTH_TOKEN`
  * `API_OAUTH_TOKEN_SECRET`
* Add the `executionCredentials` property along with a list of permissions you want to assign to the Role created for the new User.

```json
{
  "name": "my_example_task",
  "description": "My example task description",
  "path": "./",
  "entryPoint": "index.handler",
  "runtime": "nodejs22.x",
  "executionCredentials": {
    "permissions": [
      "UPDATE_DOCUMENTS:my_first_schema",
      "VIEW_DOCUMENTS:my_second_schema"
    ]
  }
}
```

Run the CLI task sync using either `exh sync`  or `exh tasks sync --path <your task path>` , the CLI will detect that a new user needs to be created, then create the User with a Global Role and permissions.

## **Let the CLI reuse the credentials of the existing Task's User**

To migrate a Task and reuse the existing user credentials, refer to the first path's [instructions](execution-credentials-for-tasks.md#let-the-cli-create-new-execution-credentials) with one extra step:

* Set the `executionCredentials.email` property to the email address associated to the existing User credentials.

```json
{  
  "name": "my_example_task",
  "description": "My example task description",
  "path": "./",
  "entryPoint": "index.handler",
  "runtime": "nodejs22.x",
  "executionCredentials": {
    "email": "my.current.task.user.email@example.com"
    "permissions": [
      "UPDATE_DOCUMENTS:my_first_schema",
      "VIEW_DOCUMENTS:my_second_schema"
    ]
  }
}
```

Run the CLI task sync using either `exh sync` or `exh tasks sync --path <your-task-path>`. The CLI will detect that an existing user has been provided, then confirms that the current function credentials belong to the provided email.&#x20;

After syncing, the existing credentials will stay linked to the Task, but the Global Role and its permissions linked to the User will be managed by the CLI

## Conclusion

Once synced, your Task’s code will have access to the credentials via the following environment variables (without explicitly setting them in the `environment` property):

* `API_HOST`
* `API_OAUTH_CONSUMER_KEY`
* `API_OAUTH_CONSUMER_SECRET`
* `API_OAUTH_TOKEN`
* `API_OAUTH_TOKEN_SECRET`&#x20;

The Global Role and its permissions will be managed by the CLI and synchronized whenever the `executionCredentials.permissions` property is updated.

Please refer to the [CLI documentation](https://docs.extrahorizon.com/cli/commands/tasks#execution-credentials) for further information about this feature.
