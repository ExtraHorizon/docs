# Mail Service

The Extra Horizon Mail Service is used to automatically compose and send emails in response to specific actions, such as user registration. These emails are either composed of plain-text entries or are based on a (multi-lingual) template from the [Template Service](../other/template-service/). The latter also enables the use of Localizations for language selection, as explained in [Localizations in Templates](../other/template-service/localizations.md) guide.

### Objects and Attributes

#### Mails

The Mail Service collects all data required to compose an email and to complete the sending process in a temporary object. Only a selection of (meta)data remains available in a permanent object (Mail) for record-keeping purposes:

* Metadata such as a unique identifier (`id`), a reference to the User that made the request (creator\_id), some information regarding the sending process with AWS (`aws_message_id`) and the views attribute used for email tracking,
* Contact information for sender and recipient(s), and
* Content-related data.

#### Contact information attributes

The Mail object includes the email addresses of the sender and intended recipients of the email. The attributes used to provide these are:

* `from`: The email address of the sender of the email,
* `reply_to`: An optional array of one or more email addresses to which a reply will be directed, and
* `recipients`: An object to specify the three types of recipients of the email (to, cc, and bcc). Each of these are specified as arrays that can contain multiple email addresses.

#### Attributes for the subject and body

An email has two textual elements: the email subject and the body. Which attributes are used to represent these texts depends on how the email was composed.

**Plain-text email**

The content of plain-text emails is directly provided as strings in the Send an email request. These values are stored in the respective attributes: subject and body. Note that this method of creating emails does not support HTML.

```json
{
  "recipients": {
      "to": ["john@example.com"]
  },
  "subject": "Test mail",
  "body": "This is my test email" 
}
```

**Template-based email**

Mail objects for template-based emails store a reference to the chosen Template (`template_name`) and the raw data required to resolve this Template with the Template Service: the `content` key-value pairs and/or the `language` code. In addition, the resolved text for the subject is stored to facilitate querying.

```json
{
  "recipients": {
      "to": ["john@example.com"]
  },
  "template_name": "my-email-template",
  "language": "EN",
  "content": {
      "firstname": "John" 
  }
}
```

{% hint style="info" %}
**Tip:** The `body` attribute can be used as a fallback solution to provide plain text to users without HTML support.
{% endhint %}

#### Attachments

Attachments can be included in an email by specifying a file name and Base64 encoded binary data (content) in the Send an email request. However, this data is not stored in the permanent Mail object. They are only passed on to the temporary object that is used to compose and send the email. An Attachment consists of a filename, Base64 encoded binary data (content) and a MIME type.

```json
{
  "recipients": {
      "to": ["john@example.com"]
  },
  "subject": "Test mail with attachments",
  "body": "Check the attachments!",
  "attachments": [
    {
      "name": "test.txt",
      "type": "text/plain",
      "content": "SGVsbG8sIFdvcmxkIQ=="
    }
  ]
}
```

### Email tracking

#### Tracking Process

The number of times an email is opened by the recipient(s), can be tracked by adding an (invisible) image to the email, such as a transparent, 1px by 1px “tracker pixel”. Every time this image is downloaded, the views counter for this email increases by one. The unique string value that links the image to the correct Mail object, is called a tracking hash code.

Tracking of template-based emails with a hash code involves the following steps:

1. The customer’s application or an Extra Horizon service makes a template-based Send an email request to the Mail Service.
2. The Mail Service makes the Resolve a Template request to the Template Service. By default, it adds a unique tracking\_hash code to the content parameter.
3. The Mail Service uses the response to compose and send the email. If the used Template implements the tracking\_hash code correctly, the email will contain a tracker pixel.
4. When the email is opened, a request containing the hash code is sent to the customer’s application to download the image.
5. The customer’s application must use the tracking\_hash code in the Register an email being opened request. As a result, the number of views in the associated Mail object increases with one.

{% hint style="info" %}
**Tip:** Be aware that loading the image only implies interaction with the email and does not guarantee the email was viewed or read. In addition, image loading must not be blocked by the receiving party in order to track views.
{% endhint %}

{% hint style="warning" %}
Tracking of plain-text emails is not enabled in this service.
{% endhint %}

#### Template requirements

To enable email tracking, the associated Templates must be designed as follows:

* The `tracking_hash` variable is declared in the `inputs` section of the Template, and
* The `outputs.body` attribute contains HTML code for an image of which the src is a hyperlink to the Extra Horizon cluster running the Mail Service. This URL must include something like:\
  `https://<my cluster>.extrahorizon.io/mail/v1/{{@inputs.tracking_hash}}/open`

```json
{
  "name": "my-tracking-email-template",
  "description": "My email using a tracking pixel",
  "inputs": {
    "tracking_hash": { "type": "string" }
  },
  "outputs": {
    "subject": "My email subject",
    "body": "My email content. <img src=\"https://<my cluster>.extrahorizon.io/mail/v1/{{@inputs.tracking_hash}}/open\">"
  }
}
```

### Actions

The sections below give an overview of the available Mail Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

#### Sending an email

The Mail Service accepts two parameter schemes to specify the content of an email: plain text-based or template-based. In the latter case, the Mail Service will first resolve the template, before sending the email via the AWS email functionality.

## Send an email

<mark style="color:green;">`POST`</mark> `/`

```json
{
  "recipients": {
      "to": ["john@example.com"]
  },
  "subject": "Test mail",
  "body": "This is my test email" 
}
```

{% hint style="info" %}
Note: AWS imposes some restrictions on the emails it sends. For example, the maximum message size is 10 MB and the amount of recipients must lie between 1 and 50. More information is available in the [Amazon SES API Reference](https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html)
{% endhint %}

## Registering the opening of an email

When implementing a tracker pixel to count the number of times an email is opened, the below endpoint must be called with each download of the included image. This increases the views value of the associated Mail object by one.

<mark style="color:blue;">`GET`</mark> `/{tracking_hash}/open`

## Retrieve existing Mails

The existing Mail objects can be retrieved (or queried) via the following endpoint.

<mark style="color:blue;">`GET`</mark> `/`
