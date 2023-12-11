# Workflow 1: Analyze a measurement

In the previous section we created a schema to store our data and we managed to store & retrieve measurement documents. What we want to accomplish in this section, is to perform an _analysis_ on the measurements that are uploaded. &#x20;

Such an analysis implies that we have some code running in our backend which checks the documents, performs a calculation and then stores the result. In Extra Horizon parlance, this piece of code is called a _task_.&#x20;

For this section, we'll be using the `2-workflows` directory in the tutorial repository. The task we're creating is located in `2-workflows/tasks/analyze-blood-pressure`

## Basic task structure

The basic structure of a javascript task is fairly simple. A very, very basic task can just be

```javascript
exports.handler = async ({data}) => {
    console.log("Hello there!");
};
```

It only requires a single function which is exported. You can choose the name of the function, but you will have to tell the Extra Horizon backend what the name of the function is (more on that later). You can pass optional data to the task which is located in the `data` property as shown above.

## Transitions & task triggers

Given our data schema and a task, you feel that there is a connection missing here. When we upload a measurement, how will the task know that there is a new measurement and it needs to run?&#x20;

Schema transition actions to the rescue!

<pre class="language-json" data-line-numbers><code class="lang-json">{
  "name": "blood-pressure-measurement",
  ...
  "statuses": {
    "created": {},
<strong>    "analyzing": {},
</strong><strong>    "analyzed": {}
</strong>  },
  "creationTransition": { ... },
<strong>  "transitions": [
</strong><strong>    {
</strong><strong>      "name": "start-analysis",
</strong><strong>      "type": "automatic",
</strong><strong>      "toStatus": "analyzing",
</strong><strong>      "fromStatuses": [ "created" ],
</strong><strong>      "actions": [
</strong><strong>        {
</strong><strong>          "type": "task",
</strong><strong>          "functionName": "analyze-blood-pressure"
</strong><strong>        }
</strong><strong>      ]
</strong><strong>    },
</strong><strong>  ],
</strong>  "properties": {
<strong>    ...
</strong>  }
}
</code></pre>

In our `blood-pressure.json` schema, we've added a couple of things:

1. We added the `analyzing` & `analyzed` document states. By using these states we can clearly communicate to the outside world what state the blood pressure analysis is in.
2. We added a `transition`. Transitions are used to move a document from one state to the other. A transition can have _conditions_ attached to it. But it can also have _actions_ attached. More detailed info about transitions can be found [here](https://docs.extrahorizon.com/extrahorizon/services/manage-data/data-service/schemas#transitions). Using states & transitions you can create a veritable state machine for your document.
   * We've added a transition from the `created` state to the `analyzing` state. The action attached to it is a _task action_. This means that whenever this transition is invoked, the task specified by `functionName` will be called.
   * The transition is an `automatic` transition, which means that the transition will occur automatically when the document is in the `created` state.

This makes sure that whenever a new measurement is uploaded, a task is notified so it can perform its analysis.&#x20;

But what happens when the analysis is done? A task would need to:

* Store the result of the analysis
* Put the document in the `analyzed` state so that it's clear that analysis has concluded.

To do this we'll modify `blood-pressure-measurement` schema a bit further:

<pre class="language-json" data-overflow="wrap" data-line-numbers><code class="lang-json">{
  "name": "blood-pressure-measurement",
  "description": "Blood pressure measurement",
  "statuses": {
    "created": {},
    "analyzing": {},
    "analyzed": {}
  },
  "creationTransition": { ... },
  "transitions": [
    {
      "name": "start-analysis",
      "type": "automatic",
      "toStatus": "analyzing",
      "fromStatuses": [ "created" ],
      "actions": [
        {
          "type": "task",
          "functionName": "analyze-blood-pressure"
        }
      ]
    },
    {
<strong>      "name": "mark-as-analyzed",
</strong><strong>      "type": "manual",
</strong><strong>      "toStatus": "analyzed",
</strong><strong>      "fromStatuses": [ "analyzing" ],
</strong><strong>        "conditions": [
</strong><strong>          {
</strong><strong>            "type": "input",
</strong><strong>            "configuration": {
</strong><strong>              "type": "object",
</strong><strong>              "properties": {
</strong><strong>                "category": {
</strong><strong>                  "type": "string",
</strong><strong>                  "enum": ["normal", "elevated", "hypertension-stage-1", "hypertension-stage-2", "hypertensive-crisis"]
</strong><strong>                }
</strong><strong>              },
</strong><strong>              "required": ["category"]
</strong><strong>            }
</strong><strong>          }
</strong><strong>        ]
</strong><strong>    }
</strong>  ],
  "properties": {
    ...
<strong>    "category": {
</strong><strong>      "type": "string",
</strong><strong>      "description": "Category of the result"
</strong><strong>    },
</strong>    ...
  }
}
</code></pre>

We added

1. A `mark-as-analyzed` transition which will transition a document from the `analyzing` state to the `analyzed` state. Note that
   1. It's a `manual` transition, which means you need to manually trigger it from your code. Which makes sense in our case, since we want our task to call this transition when the analysis is done.
   2. You cannot trigger this transition from any state other than `analyzing`.&#x20;
   3. The transition has an _input condition_ attached to it. An input condition basically says "if you want to use this transition, you need to supply it with this structure of data". Coming back to our analysis, we want to be sure that when the document is in the analyzed state, that the `category` is guaranteed to be filled in. Therefore we have the input condition which requires the presence of our diagnosis which is stored in the `category`  property.
2. We also add the `category` property to our list of properties. Keep in mind that _any_ piece of data that you want to store in a document, needs to be listed in the `properties` section.

Let's summarize what we've done here:

1. We made sure that when a document is created, a task will be triggered to analyze it.
2. We've added a transition & property to ensure that the task will be able to store the result

See a visual representation below:

<figure><img src="../../../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>



All that is left now, is actually creating the task :)&#x20;

## Constructing the analyze-blood-pressure task

We want our task to:

1. Read the measurement document.
2. Calculate the diagnosis of the measurement
3. Mark the analysis as 'done'

In the repo, we've split this out into 2 files (in `2-workflows/tasks/analyze-blood-pressure/src`):

{% tabs %}
{% tab title="diagnose.js" %}
{% code overflow="wrap" %}
```javascript

// https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings
function getDiagnosis(systolic, diastolic) { ... }

async function analyzeDocument({sdk, document}) {

  // Analyze the measurement and assign a category to it
  const diagnosis = getDiagnosis(document.data.systolic, document.data.diastolic);

  // Find the id of the transition, needed for transitioning the document
  const schema = await sdk.data.schemas.findByName('blood-pressure-measurement');
  const transition = schema.transitions.find(transition => transition.name === "mark-as-analyzed");

  // Transition the document to analyzed
  await sdk.data.documents.transition(
      'blood-pressure-measurement',
      document.id,
      // Report property is added to the data to store the file service token
      { id: transition.id, data: { category: diagnosis }}
  );

  return diagnosis;
}

module.exports = {
  analyzeDocument
};
```
{% endcode %}
{% endtab %}

{% tab title="index-flow-1.js" %}
{% code overflow="wrap" %}
```javascript
const { getSDK } = require("./sdk");
const { analyzeDocument } = require("./diagnose");

exports.doTask =  async ({sdk, task}) => {
  //Read the blood pressure document
  const retrievedDocument= await sdk.data.documents.findById('blood-pressure-measurement', task.data.documentId);

  /* Analyze the document */
  await analyzeDocument({ sdk, document: retrievedDocument});
}

exports.handler = async (task) => {
  /* Get an authenticated SDK */
  const sdk = await getSDK();
  await exports.doTask({sdk, task});
};
```
{% endcode %}
{% endtab %}
{% endtabs %}

Please examine the code above to familiarize yourself with how we do this using the SDK.

The `getDiagnosis` function will take the blood pressure measurements and return a diagnosis. The actual code for this is not that important, you can look it up in the tutorial repo.&#x20;

Important to note:

* When a task is triggered by an action in a document, it receives both the `schemaId` and the `documentId` of that document in a `data` object (see `handler` function in `index-flow-1.js`).  Using this document ID we can uniquely identify the document that needs to be processed
* To call the transition of a document, you need to look up the transition ID that you need to call first.



## Upload (sync) your schema & task

Now that we've established that the task code is working, we can upload it to the backend.

First build & bundle the task. Go into `2-workflows` and do:

```
npm run build-flow-1
```

This will result in a single bundled `index.js` file in the `2-workflows/tasks/analyze-blood-pressure/build` directory. The tutorial uses [esbuild](https://esbuild.github.io) for this, you are of course free to choose which transpilers/compilers/bundlers you prefer to use.

Since our task will be running in the Extra Horizon backend, it will also need credentials to be able to do so. Best practice is to pass these credentials to your task through environment variables.

In the tutorial repo we're doing exactly that:

{% tabs %}
{% tab title="JavaScript (tasks/analyze-blood-pressure/src/sdk.js)" %}
<pre class="language-javascript" data-overflow="wrap" data-line-numbers><code class="lang-javascript">const { createClient } = require('@extrahorizon/javascript-sdk');

async function getSDK() {
  const sdk = createClient({
<strong>    host: process.env.API_HOST,
</strong><strong>    consumerKey: process.env.API_OAUTH_CONSUMER_KEY,
</strong><strong>    consumerSecret: process.env.API_OAUTH_CONSUMER_SECRET,
</strong>  });
  await sdk.auth.authenticate({
<strong>    token: process.env.API_OAUTH_TOKEN,
</strong><strong>    tokenSecret: process.env.API_OAUTH_TOKEN_SECRET,
</strong>  });

  return sdk;
}


module.exports = {
  getSDK
}
</code></pre>
{% endtab %}
{% endtabs %}

That still begs the question: how do we get those credentials **in** the environment variables in the first place?

Under `2-workflows/tasks/analyze-blood-pressure`  you'll find a file called `task-config.json` , which is also listed here:

{% tabs %}
{% tab title="JSON (tasks/analyze-blood-pressure/task-config.json)" %}
{% code overflow="wrap" lineNumbers="true" %}
```javascript
{
  "name": "analyze-blood-pressure",
  "description": "Function to categorize blood pressure measurements",
  "path": "./build",
  "entryPoint": "index.handler",
  "runtime": "nodejs16.x",
  "timeLimit": 60,
  "memoryLimit": 128,
  "environment": {
    "API_HOST":"FILL_IN",
    "API_OAUTH_CONSUMER_KEY":"FILL_IN",
    "API_OAUTH_CONSUMER_SECRET":"FILL_IN",
    "API_OAUTH_TOKEN":"FILL_IN",
    "API_OAUTH_TOKEN_SECRET":"FILL_IN"
 }
```
{% endcode %}
{% endtab %}
{% endtabs %}

This configuration file tells the CLI where to get the task code and how to configure it in the Extra Horizon backend. Important properties here:

1. `entryPoint`: this tells the backend which function to call. Remember in the beginning of this section we said you can name your handler to whatever you want? If you do, you'll need to modify the entry point. The format is `<file-without-extension>.<function>`. As it is configured above, the backend will call a function called `handler` in a file called `index.js`
2. The `path` should point to the code you've built. esbuild will put the bundled code in `build`
3. The variables contained in `environment` will be passed as environment variables to the function. Replace the template values with your actual credentials

When we've done this, we can just do (in the `2-workflows` directory):

```
npx exh sync
```

And the CLI will sync **both** the updated schema and the new task to the backend.

Now that everything is synced to the backend, feel free to play around with the scripts in `examples` to create measurement documents and verify that they transition to correct state automatically.

## Try it out!

{% code overflow="wrap" %}
```bash
➞  node create-measurement.js                                                                                                    
Enter systolic value: 6
Enter diastolic value: 12
🎉 Created a new measurement document with id 656742535a8b65e54ae3de65

➞  node get-measurement.js                                                                                                       
Enter document ID to retrieve: 656742535a8b65e54ae3de65
Retrieved document 656742535a8b65e54ae3de65
{
    "id": "656742535a8b65e54ae3de65",
    "groupIds": [],
    "userIds": [
        "6310a263cff47e0008fb2221"
    ],
    "creatorId": "6310a263cff47e0008fb2221",
    "status": "analyzed",
    "statusChangedTimestamp": "2023-11-29T13:53:54.635Z",
    "data": {
        "systolic": 6,
        "diastolic": 12,
        "timestamp": "2023-11-29T13:53:23.039Z",
        "category": "normal"
    },
    "updateTimestamp": "2023-11-29T13:53:54.641Z",
    "creationTimestamp": "2023-11-29T13:53:23.112Z"
}
```
{% endcode %}

## Test your task locally



Feel free to make some changes to the task.  During development, it's important to be able to test your task locally.

{% hint style="warning" %}
Important: when testing locally, make sure that the `analyze-blood-pressure` task is not running in the Extra Horizon backend. Otherwise any created measurement will automatically be process by that task. You can easily remove the task using the CLI:

```
npx exh tasks delete --name=analyze-blood-pressure
```
{% endhint %}

<pre class="language-bash" data-overflow="wrap"><code class="lang-bash">➞  node create-measurement.js                                                                                                    
Enter systolic value: 6
Enter diastolic value: 12
🎉 Created a new measurement document with id 656742535a8b65e54ae3de65

<strong>➞  node test-local-task-flow-1.js                                                                                                
</strong><strong>Enter document ID to process: 656742535a8b65e54ae3de65
</strong><strong>Task finished!
</strong>
➞  node get-measurement.js                                                                                                       
Enter document ID to retrieve: 656742535a8b65e54ae3de65
Retrieved document 656742535a8b65e54ae3de65
{
    "id": "656742535a8b65e54ae3de65",
    "groupIds": [],
    "userIds": [
        "6310a263cff47e0008fb2221"
    ],
    "creatorId": "6310a263cff47e0008fb2221",
    "status": "analyzed",
    "statusChangedTimestamp": "2023-11-29T13:53:54.635Z",
    "data": {
        "systolic": 6,
        "diastolic": 12,
        "timestamp": "2023-11-29T13:53:23.039Z",
        "category": "normal"
    },
    "updateTimestamp": "2023-11-29T13:53:54.641Z",
    "creationTimestamp": "2023-11-29T13:53:23.112Z"
}
</code></pre>

Check the `test-local-task-flow-1.js` script. It will call the `doTask` function in your task code which contains all the functionality of the task.

As you can see, the task has processed the document, concluded the blood pressure was normal ( `category` to `normal`) and transitioned the document to the `analyzed` state.
