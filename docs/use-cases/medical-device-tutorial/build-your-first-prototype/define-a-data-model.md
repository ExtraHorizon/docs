# Define a data model

Data modelling is the process of defining how data is used and stored within the system.&#x20;

When configuring your data model on Extra Horizon, you will start by creating [data schemas](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas). In these schemas you describe how your data is structured.&#x20;

When you've created a schema, you can add one or multiple **documents** to it. Each one of those documents need to conform to the schema you've defined. In developer terms, if you squint a little, you can look at schemas as being a class, and documents being the class instances of that class.

Depending on your data model, a single schema might not be enough. That's okay since you can create as many schema's as you want. Think in advance about how the documents of these schemas will be used & queried most efficiently in your application and design them accordingly.\
\
For the purpose of the tutorial,  we keep it simple. So we will create a schema called `blood-pressure-measurement` where each document represents a measurement.

In the tutorial repository, we'll be using the `1-data-model` directory if you want to try this out.

## Defining properties for your data model

We need to create a data model to support the creation of blood pressure measurements. Therefore we will create a Schema with the following properties:

* `systolic`: A number defining the pressure during a heart beat
* `diastolic`: A number defining the pressure in between heart beats
* `timestamp`: The date and time the measurement was taken

\
For more detailed information regarding properties and their types please refer to the [documentation](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas#properties).

In the example below you see how we defined the properties for our blood pressure measurements. We also gave our data Schema a sensible name and a description. The name is important because that is the 'friendly name' which can be used to refer to the schema throughout your application implementation.

{% tabs %}
{% tab title="JSON (schemas/blood-pressure.json)" %}
```json
{
  "name": "blood-pressure-measurement",
  "description": "Blood pressure measurement",
  "statuses": {
    "created": {}
  },
  "creationTransition": {
    "type": "manual",
    "toStatus": "created",
    "conditions": [],
    "actions": []
  },
  "properties": {
    "systolic": {
      "type": "number",
      "description": "Systolic pressure in mmHg"
    },
    "diastolic": {
      "type": "number",
      "description": "Diastolic pressure in mmHg"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp when the measurement was taken"
    }
  }
}
```
{% endtab %}
{% endtabs %}

In the `schemas` directory of `1-data-model`, you will find this model in `blood-pressure.json`.

We've added a single status `created` & made a `creationTransition` which just sets the initial status to `created`. Finally we list our properties under `properties`.

Please refer to the documentation [here](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas) to learn more in detail about schemas.

### Synchronize the Schema

&#x20;We must now synchronize this schema to the ExH data service. This can be achieved by using the [ExH CLI](https://docs.extrahorizon.com/cli/). In the `1-data-model` directory, do:

```
npx exh sync
```

This is a global sync command available in the CLI, which will sync schemas, tasks, templates... you name it. It's a one-stop solution for syncing your entire project. By default, it makes a couple of assumptions about where these things are located. For example, it expects schemas to be in a `schemas` directory, tasks in a `tasks` directory, etc ...

This is fine for our purposes. If you want to customize this behaviour, your can create a `repo-config.json` file to change the paths where it will look for things. More information, see [here](https://docs.extrahorizon.com/cli/features/repository-configuration).

For our schema, `exh sync` performs a couple of key operations:

1. **Validation**: It checks all JSON files within the `schemas` directory to verify that they are syntactically correct & consistent.
2. **Synchronization**: Once validated, it syncs the local schemas with the ExH data service. In this instance, a new schema titled `blood-pressure-measurement` will be created in the data service.

### Use the created Schema

In the `examples` directory in the root of the repository, you can find the following scripts:

* `create-measurement.js`: creates new measurements
* `get-measurement.js`: retrieves a created measurement
* `delete-measurement.js`: deletes an existing measurement

Please familiarize yourself with the contents of these script. They will show you how to use the SDK to create, read & delete blood pressure measurements.&#x20;

Example: create a new measurement. The script will prompt to enter a blood pressure measurement.

```bash
➞  node create-measurement.js                                                                                                     [git:remove-step-folders] ✔
Enter systolic value: 10
Enter diastolic value: 12
🎉 Created a new measurement document with id 6566153f5a8b656f2ae3de4c
➞
```

And then retrieve the measurement you've just created:

```sh
➞  node get-measurement.js                                                                                                        [git:remove-step-folders] ✔
Enter document ID to retrieve: 6566153f5a8b656f2ae3de4c
Retrieved document 6566153f5a8b656f2ae3de4c
{
    "id": "6566153f5a8b656f2ae3de4c",
    "groupIds": [],
    "userIds": [
        "6310a263cff47e0008fb2221"
    ],
    "creatorId": "6310a263cff47e0008fb2221",
    "status": "created",
    "statusChangedTimestamp": "2023-11-28T16:28:47.199Z",
    "data": {
        "systolic": 10,
        "diastolic": 12,
        "timestamp": "2023-11-28T16:28:46.843Z"
    },
    "updateTimestamp": "2023-11-28T16:28:47.206Z",
    "creationTimestamp": "2023-11-28T16:28:47.154Z"
}
➞
```
