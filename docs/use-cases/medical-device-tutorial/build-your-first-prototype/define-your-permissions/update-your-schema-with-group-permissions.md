# Update your schema with group permissions

In the previous section we've seen how we can shield data between different patients. As a result, we now have 2 types of users: patients & admins. Either you're a patient and you only see _your own_ data. Or you're an admin and you can see _all_ data. Since the gap between these two is pretty wide, you'll eventually find yourself needing a bit more granularity in deciding who gets to see what.

So let's say we want to group certain patients together and allow some users to see data for all patients of a group. This is a very common scenario. For example, you might want to group patients per hospital or medical practice. In that case you want doctors & staff members of a hospital to be able to see data for their own patients. But data from other hospitals should be inaccessible to them.

Let's see how we can make that happen.

## Create a group

As mentioned in the introduction of _Define your permission_, a group is just a 24-character identifier. For our purpose, let's create a schema which represents our group concept. Then we will use the identifiers of the documents of that schema as our group ID's.

{% tabs %}
{% tab title="JSON" %}
```json
{
  "name": "blood-pressure-group",
  "description": "Blood pressure group",
  "createMode": "permissionRequired",
  "readMode": "enlistedInLinkedGroups",
  "updateMode": "linkedGroupsStaffOnly",
  "deleteMode": "permissionRequired",
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
    "name": {
      "type": "string",
      "description": "Group name"
    },
    "type": {
      "type": "string",
      "enum": [
        "high pressure",
        "low pressure"
      ],
      "description": "type of group"
    }
  }
}
```
{% endtab %}
{% endtabs %}

A few interesting things to note here.

Have a look at the different modes (`readMode`, `createMode`,...) in the schema. They are specified such that

1. Only people with global permissions can either create or delete a group.
2. Users can only read the groups which they are a member of (staff or patient)
3. Only staff members of a group can update the group, patient members can not.

See [here](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas#access-modes) for a more detailed explanation of the mode options.

As data properties we have `name` and `type` of group. Your concept of a group might need a lot more meta-data, so feel free to add anything you need.

Now let's create a group... In the `examples` directory of the repository, there's a `create-group.js` script which will create a new group. Go ahead and run it. The result of the script will be a 24-character ID which is the ID of your new group :tada:

## Add users to your group

Now that we've created our new group, we can add patients and staff members to it. In the `examples` directory you'll find 2 scripts:

1. `add-patient.js`: This script will add a user to a group as a _patient._
2. `add-staff.js`: this script will add a user to a group as a _staff member_.

Both scripts will prompt you for a  `user ID` and a `group ID`.  Eg.

{% code overflow="wrap" %}
```bash
➞  node add-staff.js                                                                                                             
Enter user ID: 65677c0451c0f5307421ddbc
Group ID: 656785135a8b657afee3de6a
Staff 65677c0451c0f5307421ddbc added to group 656785135a8b657afee3de6a
```
{% endcode %}

will add user ID `630f29b4cff47e0008346bcc` to group `630f29b4cff47e0008346bcc` as a patient. Feel free to examine the scripts to see how the linking was done in practice using the SDK.

Use the Control Center to create as many patients & staff members as you like. You can find their user ID's in the User table. Then use these scripts to add them to the group ID which was returned in the previous section.

Note that you can always look up the group ID again in Control Center by going to Data -> Documents and then clicking on `blood-pressure-group`. It's just a data schema like any other.

## Update schema

Okay! We have our patients, we have our staff members and we have them set up in groups. There's just one thing we need to take care of.&#x20;

Remember that we set up our `blood-pressure-measurement` schema in such a way that only admins or patients can read documents? In our new group setup, we would also like staff members of a group to see all data of patients in that group. Otherwise a doctor (staff member) would not be able to see any patient data. A little tweak to the `blood-pressure-measurement` schema is all we need:

<pre class="language-json" data-line-numbers><code class="lang-json">{
  "name": "blood-pressure-measurement",
  ...,
  "creationTransition": {
    "type": "manual",
    "toStatus": "created",
    "conditions": [],
    "actions": [
      {
        "type": "linkCreator"
      },
<strong>      {
</strong><strong>        "type": "linkEnlistedGroups"
</strong><strong>      }
</strong>    ]
  },
  ...
}
</code></pre>

We've added the `linkEnlistedGroups` action to the `creationTransition`. Whenever a patient creates a new measurement, it will add every group ID that this patient is member of, to the `groupIds` array of the document. Since the `readMode` of the schema is set to `default` (because that's the default), it will make sure that every staff member of those groups will be able to read the document.

Mission accomplished! :tada:

## Try it

Using the existing scripts in the `examples` directory, feel free to create different documents as different users and verify that each user can only see what they are entitled to.&#x20;

