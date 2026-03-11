# Workflow 3: Send an e-mail

So far we have created a PDF and saved it to the file service. In this section we will use the mail service to send the saved PDF file to the user's e-mail address. For more information about the mail service, see [here](https://docs.extrahorizon.com/extrahorizon/services/communication/mail-service).

## Basic Concepts

Before you can use the mail service, we must setup a template which will be used to format send e-mails. Templates provide a starting point for crafting messages and work similar to the template we've used to create our PDF file.

* A JSON file which holds general data, such as the subject and input fields that will be required when sending an email.
* A HBS file which represents the body of the email. As with the PDF template, you can insert input fields using `{{@inputs.field}}`.

## Create a template for your email

In the provided repository, you will find the email template we used at `templates/mail-analysis`. Within that folder you will find 2 files `body.hbs` and `template.json`.

{% tabs %}
{% tab title="2-workflows/templates/mail-analysis/body.hbs" %}
{% code overflow="wrap" %}
```handlebars
Dear {{@inputs.first_name}},

Your blood pressure measurement of {{@inputs.date}} was analyzed. The analysis is attached to this email.

Kind regards,
The team
```
{% endcode %}
{% endtab %}

{% tab title="2-workflows/templates/mail-analysis/template.json" %}
```json
{
  "description": "Template used to send an analysis email",
  "inputs": {
    "first_name": {
      "type": "string"
    },
    "date": {
      "type": "string"
    }
  },
  "outputs": {
    "subject": "Your measurement of $content.date was analyzed!"
  }
}
```
{% endtab %}
{% endtabs %}

## Update your function to trigger an email

Next, we need to update the task to send the actual email. The mail service requires the ID of the template, all input fields and the recipients.

The updated task will download the generated PDF & send it as an attachment to a user's email address.

{% tabs %}
{% tab title="2-workflows/tasks/analyze-blood-pressure/src/index-flow-3.js)" %}
<pre class="language-javascript" data-overflow="wrap"><code class="lang-javascript">const { getSDK } = require("./sdk");
const { analyzeDocument } = require("./diagnose");
const { createPDF } = require("./create-pdf");

exports.doTask = async ({ sdk, task }) => {
  // Read the blood pressure document
  const retrievedDocument = await sdk.data.documents.findById("blood-pressure-measurement", task.data.documentId);

  // Analyze the document
  const diagnosis = await analyzeDocument({ sdk, document: retrievedDocument });

  // Fetch the info of the user who created this document
  const user = await sdk.users.findById(retrievedDocument.creatorId);

  // Create the PDF
<strong>  const pdfFileToken = await createPDF({ sdk, user, document: retrievedDocument, diagnosis });
</strong><strong>
</strong><strong>  // Download the PDF from the file service using the file token
</strong><strong>  const pdf = await sdk.files.retrieve(pdfFileToken);
</strong><strong>
</strong><strong>  // Sending an email with the result of the analysis
</strong><strong>  await sdk.mails.send({
</strong><strong>    recipients: { to: [user.email] },
</strong><strong>    templateName: 'mail-analysis',
</strong><strong>    content: {
</strong><strong>      first_name: user.firstName,
</strong><strong>      date: retrievedDocument.data.timestamp.toLocaleString(),
</strong><strong>    },
</strong><strong>    attachments: [{
</strong><strong>      name: 'analysis.pdf',
</strong><strong>      content: pdf.toString('base64'),
</strong><strong>      type: 'application/octet-stream',
</strong><strong>    }],
</strong><strong>  });
</strong>}


exports.handler = async (task) => {
  const sdk = await getSDK();

  await exports.doTask({ sdk, task });
};
</code></pre>
{% endtab %}
{% endtabs %}

## Sync template & task via the CLI

In `2-workflows`, first build the task:

```
npm run build-flow-3
```

and then:

```
npx exh sync
```

## Try it out!

Create a measurement using `examples/create-measurements.js` & wait for the email to arrive containing your measurement report.
