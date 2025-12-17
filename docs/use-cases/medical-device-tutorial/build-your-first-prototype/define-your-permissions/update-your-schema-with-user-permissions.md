# Update your schema with user permissions

As mentioned in the previous section, we've assumed so far that every user has access to all the documents. Of course, this is not how medical applications are supposed to work.

We want our patients to have access to their own information only. They should not be able to see information about other patients. So let's change this!

## Create a patient

Head to your Control Center and press the `NEW` button under Users -> Users.

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-11-23 at 15.15.22.png" alt=""><figcaption></figcaption></figure>

Fill in the details, note down the password you've used and click `CREATE` to the create the new user

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-11-23 at 15.18.49.png" alt=""><figcaption></figcaption></figure>

So now we've created a new user. Note that user doesn't have **any** permissions because we didn't assign a global role. And that's fine, because a patient doesn't need any global permission. We just want our patients to see their own data.

## Update your schema

This brings us to the following problem: if our new patient would create a measurement, they would not be able to retrieve it. Why not? Since we did not specify a `readMode` in our schema, it's set to `default` . As also mentioned in the permissions introduction, this means the following users can read:

* users whose userId is in the `userIds` array of a document.
* users that have a **staff membership** in a group whose group ID is in the `groupIds` array of a document.

Neither of these conditions apply to our newly-created patient. But, as you know by now, there's a solution for this: `linkCreator`

{% tabs %}
{% tab title="JSON" %}
<pre class="language-json" data-overflow="wrap" data-line-numbers><code class="lang-json">{
  "name": "blood-pressure-measurement",
  "description": "Blood pressure measurement",
  "statuses": {
    "created": {},
    "analyzing": {},
    "analyzed": {}
  },
  "creationTransition": {
    "type": "manual",
    "toStatus": "created",
    "conditions": [],
    "actions": [
<strong>      {
</strong><strong>        "type": "linkCreator"
</strong><strong>      }
</strong>    ]
  },
  ...
}
</code></pre>
{% endtab %}
{% endtabs %}

Adding `linkCreator` ensures that the userId of a patient is added to the `userIds` array of the document _he created_. Yes, only to his documents and not to other patient documents.

## Test it out

In the `examples` directory of the repository, you'll find a `patient-measurement.js` script, which creates a document, reads it again and dumps its content. It will prompt you for email / password credentials.

Feel free to play around with it further. For example: create another measurement using another patient you created. Then you can verify that they are not able to see each other document.

Head over to the control center, log in with your own user and go to Data -> Documents. Select the `blood-pressure-measurement` schema from the table and you'll see all blood pressure measurement documents that have been created, including the ones from your patients

<figure><img src="../../../../.gitbook/assets/Screenshot 2023-11-23 at 15.39.28 (1).png" alt=""><figcaption></figcaption></figure>

Alternatively, you can always use the `get-measurement.js` script to fetch a particular measurement.
