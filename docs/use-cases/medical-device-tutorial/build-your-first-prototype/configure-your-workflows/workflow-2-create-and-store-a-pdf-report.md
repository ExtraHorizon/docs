# Workflow 2: Create & store a PDF report

Now that the measurement is analyzed, let's create a simple PDF report which is stored in the file service & can be downloaded by your users.

## Basic concepts

In the previous workflow, we've used the data service to save measurement data to Extra Horizon. The data service is designed for storing structured data. However, not all data can be written in a structured manner.&#x20;

In this section, we'll leverage the file service to handle unstructured data. While the data-service is designed for storing structured data, the file service is ideal for managing unstructured data. In this section, you'll learn how to create a PDF document from a template and seamlessly interact with the file service using the SDK. You can learn more about the file service [here](https://docs.extrahorizon.com/extrahorizon/services/manage-data/file-service).

Every file stored in the file service receives a unique token. These tokens are essential for retrieving files from the file service. Within the function, we will add the token for the PDF to the blood pressure measurement. This way, users can effortlessly access their reports whenever needed.

## Create a PDF template

Extra horizon has a separate service for managing templates. This is typically used for creating mails or PDF's, but it's not necessarily limited to that. Because they are managed by a service, they can be updated independently of the tasks that are using them. For more information about the template service, see [here](https://docs.extrahorizon.com/extrahorizon/services/other/template-service).

Under `2-workflows/templates/pdf-analysis` you'll find the template that we're going to use.

{% tabs %}
{% tab title="JSON (templates/pdf-analysis/template.json)" %}
```json
{
  "description": "Template used to generate a pdf-analysis",
  "name": "pdf-analysis",
    "schema": {
    "type": "object",
    "fields": {
      "first_name": {
        "type": "string"
      },
      "category": {
        "type": "string"
      },
      "diastolic": {
        "type": "number"
      },
      "systolic": {
        "type": "number"
      },
      "date": {
        "type": "string"
      }
    }
  },
  "fields": {
  }
}
```
{% endtab %}

{% tab title="HTML (templates/pdf-analysis/body.html)" %}
```html
<!DOCTYPE html>
<head>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<html>
<body>

<h1>Your reading from $content.date</h1>

<table style="width:100%">
    <tr>
        <th>Diastolic</th>
        <td>$content.diastolic</td>
    </tr>
    <tr>
        <th>Systolic</th>
        <td>$content.systolic</td>
    </tr>
    <tr>
        <th>Category</th>
        <td>$content.category</td>
    </tr>
</table>
```


{% endtab %}
{% endtabs %}

This template consists of 2 files: an HTML file and a JSON file.&#x20;

The JSON file defines the structure of the template variables, while the HTML file is the template where those variables are used.

The reason why it is split in 2 files, is because mixing HTML and JSON in 1 file doesn't make for a pleasant developer experience.

When uploading the template, the CLI will read the HTML file, add it as a `body` property in the `fields` object in the JSON file and upload the result.&#x20;

## Update schema

We are going to update our schema a bit to accomodate this new feature:

* An additional property to store a _file token._
* A new status to indicate that the report is available, `report-available`
* Since we added a new status, we also need a new transition. We only allow transitions to the `report-availabe` state coming from the `analyzed` state.

{% hint style="info" %}
As mentioned in the introduction, a _file token_ is something you get back when you store a new file in the file-service. It's your personal key to access the file. Make sure to store this token in a secure way, because any user with this token is able to download the file.
{% endhint %}

{% tabs %}
{% tab title="JSON (2-workflows/schemas/blood-pressure.json)" %}
<pre class="language-json"><code class="lang-json">{
  "name": "blood-pressure-measurement",
  "description": "Blood pressure measurement",
  "statuses": {
    "created": {},
    "analyzing": {},
    "analyzed": {},
<strong>    "report-available": {}
</strong>  },
  "creationTransition": { ... },
  "transitions": [
    ...
<strong>    {
</strong><strong>      "name": "add-report",
</strong><strong>      "type": "manual",
</strong><strong>      "toStatus": "report-available",
</strong><strong>      "fromStatuses": [ "analyzed" ],
</strong><strong>        "conditions": [
</strong><strong>          {
</strong><strong>            "type": "input",
</strong><strong>            "configuration": {
</strong><strong>              "type": "object",
</strong><strong>              "properties": {
</strong><strong>                "report": {
</strong><strong>                  "type": "string"
</strong><strong>                }
</strong><strong>              },
</strong><strong>              "required": ["report"]
</strong><strong>            }
</strong><strong>          }
</strong><strong>        ]
</strong><strong>    }
</strong>  ],
  "properties": {
    ...
<strong>    "report": {
</strong><strong>      "type": "string",
</strong><strong>      "description": "File-token of the report"
</strong><strong>    }
</strong>  }
}
</code></pre>
{% endtab %}
{% endtabs %}



## Update your task to create a PDF

Next we need to update the task to create the PDF, upload it to the file service and store the file token in the document.&#x20;

{% tabs %}
{% tab title="2-workflows/tasks/analyze-blood-pressure/src/index-flow-2.js" %}
<pre class="language-javascript"><code class="lang-javascript">const { getSDK } = require("./sdk");
const { analyzeDocument } = require("./diagnose");
const { createPDF } = require("./create-pdf");

exports.doTask = async ({sdk, task}) => {
  //Read the blood pressure document
  const retrievedDocument= await sdk.data.documents.findById('blood-pressure-measurement', task.data.documentId);

  /* Analyze the document */
  const diagnosis = await analyzeDocument({ sdk, document: retrievedDocument});

<strong>  //Fetch the info of the user who created this document
</strong><strong>  const user = await sdk.users.findById(retrievedDocument.creatorId);
</strong><strong>
</strong><strong>  //Create the PDF
</strong><strong>  await createPDF({sdk, user, document: retrievedDocument, diagnosis });
</strong>}

exports.handler = async (task) => {
  const sdk = await getSDK();

  await exports.doTask({sdk, task});
};
</code></pre>
{% endtab %}

{% tab title="2-workflows/tasks/analyze-blood-pressure/src/create-pdf.js" %}
{% code overflow="wrap" %}
```javascript

async function createPDF({sdk, user, document, diagnosis}) {
     // Find the pdf template
    const pdfTemplate = await sdk.templates.findByName("pdf-analysis");

    // Generate the PDF with the template
    const pdf = await sdk.templates.resolveAsPdf(pdfTemplate.id, {
        "language": "NL",
        "time_zone": "Europe/Brussels",
        "content": {
            "first_name": user.first_name,
            "category": diagnosis,
            "diastolic": document.data.diastolic,
            "systolic": document.data.systolic,
            "date": new Date(document.data.timestamp).toDateString(),
        }
    });


    // Find the id of the transition, needed for transitioning the document
    const schema = await sdk.data.schemas.findByName('blood-pressure-measurement');
    const transition = schema.transitions.find(transition => transition.name === "add-report");

    // Upload the pdf to the file service
    const fileResult= await sdk.files.create(`measurement-${document.id}`, pdf);

    // Transition the document to analyzed
    await sdk.data.documents.transition(
        'blood-pressure-measurement',
        document.id,
        // Report property is added to the data to store the file service token
        { id: transition.id, data: { report: fileResult.tokens[0].token }}
    );
}

module.exports = {
  createPDF
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

Feel free to examine the code to see how we archieved this using the SDK.

## Deploy everything

First we need to build the task. In `2-workflows` do

```
npm run build-flow-2
```

And then to sync everything:

<pre><code><strong>npx exh sync
</strong></code></pre>

## Test the updated task

Use the scripts in  `examples` to test your task  as follows:

{% code overflow="wrap" %}
```bash
➞  node create-measurement.js                                                                                                    
Enter systolic value: 10
Enter diastolic value: 20
🎉 Created a new measurement document with id 6568537e5a8b65a7c7e3de77

➞  node get-measurement.js                                                                                                       
Enter document ID to retrieve: 6568537e5a8b65a7c7e3de77
Retrieved document 6568537e5a8b65a7c7e3de77
{
    "id": "6568537e5a8b65a7c7e3de77",
    "groupIds": [],
    "userIds": [
        "6310a263cff47e0008fb2221"
    ],
    "creatorId": "6310a263cff47e0008fb2221",
    "status": "report-available",
    "statusChangedTimestamp": "2023-11-30T09:19:07.591Z",
    "data": {
        "systolic": 108,
        "diastolic": 83,
        "timestamp": "2023-11-30T09:18:54.756Z",
        "category": "normal",
        "report": "6568538b657f242ca661d0a4-21254617-4848-4cb0-a83b-ee93ec9ef45d"
    },
    "updateTimestamp": "2023-11-30T09:19:07.598Z",
    "creationTimestamp": "2023-11-30T09:18:54.872Z"
}
➞  node get-file.js                                                                                                                 
Enter file token: 6568538b657f242ca661d0a4-21254617-4848-4cb0-a83b-ee93ec9ef45d
Retrieved file & stored as report.pdf
```
{% endcode %}

Go ahead and open the PDF file to see the report!

## Test your task locally

{% hint style="warning" %}
Important: when testing locally, make sure that the `analyze-blood-pressure` task is not running in the Extra Horizon backend. Otherwise any created measurement will automatically be process by that task. You can easily remove the task using the CLI:

```
npx exh tasks delete --name=analyze-blood-pressure
```
{% endhint %}

In `examples` there's a `test-local-task-flow-2.js` script to run the task locally.



