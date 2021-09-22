---
description: >-
  The Extra Horizon Mail Service provides email functionality for other
  services. This guide provides a conceptual overview and is complementary to
  the API reference documentation.
---

# Mail service

## **Intro**

The Mail Service is used to automatically compose and send emails in response to specific actions, such as user registration. These emails are either composed of plain text entries or are based on a template from the Template Service. The latter also enables the use of localization keys for language selection, as explained in the Localization Service guide. 

![](https://lh4.googleusercontent.com/Jw6u5bNyP_Ep0eKGeVgiOBxKc8p60tx_pYddk7IBfKHunSJD4XpvOWS2FQt3m_P6tKKsq5GCvWZ7U0UidGro8pF6qjOCblk2Gowp2p_El2fKES3_8CuAfjGHQHaXVXZJd13fjow=s0)

### Objects and Attributes

#### Mails

The Mail Service collects all data required to compose an email and to complete the sending process in a temporary object. Only a selection of \(meta\)data remains available in a permanent object \(Mail\) for record-keeping purposes:

* Metadata such as a unique identifier \(id\), a reference to the user that made the request \(creator\_id\), some information regarding the sending process with AWS \(aws\_message\_id\) and the views attribute used for email tracking,
* Contact information for sender and recipient\(s\), and
* Content-related data.

![](https://lh6.googleusercontent.com/xuAEUH7oXFxTXwzo2vtEyLZVVA2IMD28stzAg3B8QnvRvhcsiUipjVHsKYE02n308T6SZwMj8HCsqFKj3tnILOyGEx9fdxU3bKWMnFXDh9898Sgj0YO9GGJxPjGvcuKpYhO6HWI=s0)

| For internal developers: The temporary object is referred to as QueuedMail. The Internal Process on how the Send an email request is processed, is described at the end of this guide.  |
| :--- |


#### Contact information attributes

The Mail object includes the email addresses of the sender and intended recipients of the email. The attributes used to provide these are:

* from: The email address of the sender of the email, 
* reply\_to: An optional array of email address\(es\) to which a reply will be directed.
* recipients: An object to specify the three types of recipients of the email \(to, cc, and bcc\). Each of these are specified as arrays that can contain multiple email addresses.

#### Attributes for the subject and body

An email has two textual elements: the email subject and the body. Which attributes are used to represent these texts depends on how the email was composed.

Plain text email 

The content of plain-text emails is directly provided as strings in the Send an email request. These values are stored in the respective attributes: subject and body.

Template-based email 

Mail objects for template-based emails store a reference to the chosen Template \(template\_id\) and the raw data required to resolve this Template: the content key-value pairs and/or the language code. In addition, the resolved text for the subject is stored to facilitate querying.   


| Tip: The body attribute can be used as a fallback solution to provide plain text to users without HTML support. |
| :--- |


#### Attachments

Attachments can be included in an email but are not stored in the \(permanent\) Mail object. They are only passed on to the temporary object that is used to compose and send the email. An Attachment consists of a filename, Base64 encoded binary data \(content\) and a MIME type.

![](https://lh3.googleusercontent.com/3TynKEp98GUWXxmY-AL-aJEgL6bC-qHY-H1sJesTH8JGhmBj2Eabkn5OP2YIZ_qqUpPHJyRkhjtJukv9WaBYvQRwyILXwmB0WBNXWN7jseXLXTdtJQRug4BJllYAPqKbD1r8_ow=s0)

Common timestamp attributes

All Extra Horizon Services keep track of the time of creation \(creationTimestamp\) and of the most recent update \(updateTimestamp\) of their stored objects.

| Note: The timestamp attributes in the Mail Service have a number format, whereas other services use a string\($date-time\) format. |
| :--- |


### Email tracking

The number of times an email is opened by the recipient\(s\), can be tracked by adding an \(invisible\) image to the email, such as a transparent, 1px by 1px “tracker pixel”. Every time this image is downloaded, a request is sent to the Mail Service, which increases the count of the views attribute in the associated Mail object. The unique string value that links the image to the correct object, is called a hash code. 

How to use hash codes in combination with Templates is described in the Template Service guide. The first step, adding a tracking\_hash to the content attribute of template-based Mails, is done by the Mail Service by default.

Tracking of plain-text emails is not enabled in this service.

| Tip: Be aware that loading the image only implies interaction with the email and does not guarantee the email was viewed or read. In addition, image loading must not be blocked by the receiving party in order to track views.  |
| :--- |


### Actions

The sections below give an overview of the available Mail Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

#### Sending an email

The Mail Service accepts two parameter schemes to specify the content of an email: plain text-based or template-based. If applicable, the Template and Localization Services are called by the Mail Service to resolve the email’s content. Next, the email is sent via the AWS email functionality. When the sending is successful, the Mail object receives the aws\_message\_id attribute.

* Send an email: POST /

| Note: If sending the email fails, the system will not retry to send the email. The client must repeat the request to the Mail Service. |
| :--- |


#### Registering the opening of an email

When implementing a tracking pixel to count the number of times an email is opened, the below endpoint must be called with each download of the included image. This increases the views value of the associated Mail object by one. 

* Register an email being opened: GET /{tracking\_hash}/open

#### Viewing Mails

The existing Mail objects can be retrieved \(or queried\) via the following endpoint. 

* List all Mails: GET /

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>For internal developers: A list of QueuedMails can be retrieved for debugging
          purposes.</p>
        <ul>
          <li>List all QueuedMails: GET /queued</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

Internal Process – For internal developers only

Email sending via AWS

The Extra Horizon Mail Service is built upon the Amazon Simple Email Service \([SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-formatted.html)\). The requirements to send an email via AWS are described in the [Amazon SES API Reference](https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html), which states for example that the maximum message size is 10 MB and that the amount of recipients must lie between 1 and 50. The data necessary to build the request parameters \(Destination and Message\) are first collected by the Extra Horizon Mail Service in a temporary object, called QueuedMail. This temporary storage allows for a fast response while the data is still being processed. 

The process can be summarized as follows:

1. A Send an email request is made for a plain text-based or template-based email.
2. A QueuedMail and a Mail object are created with the same identifier. The status of the QueuedMail is set to queued. 
3. Validity checks are performed on the QueuedMail object. When failed, the status of the QueuedMail is set to failed and the process ends after returning an error response. 
4. A success \(200\) response is sent.
5. If the email is template-based, the template is resolved via a request to the Template Service. The result is stored in the text and/or html attributes of the QueuedMail object. 
6. A [SendEmail](https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html) request to AWS is made. The status of the QueuedMail is set to sending.
7. The response is received, including the aws\_message\_id.
   1. Success: The Mail object is updated. It receives the aws\_message\_id and, if template-based, a copy of the subject from the QueuedMail object. The latter object is removed.
   2. Failure: The QueuedMail receives the aws\_message\_id and its status is set to failed. The Mail object is not updated.

| Note: At failure, neither the QueuedMail nor the Mail object are removed.  |
| :--- |


![](https://lh6.googleusercontent.com/C-RdEaTQbK_ZdppksHnacDukk_8FoQyRX3Z7CTHsqdMz4IaZF-DvSzTj0GqFFkA7GWf4oYZ6S010VWrfp6kkIHrj-Ynbk6ofe-4X3a_ye6_39Xwo4y3iiSyAx7Oq5QMXXo79JfE=s0)

Objects and Attributes

The QueuedMail object has a status attribute to indicate the progress of the request \(queued, sending or failed\). It contains similar attributes to the Mail object to include contact information and raw template-related data. However, for both plain text and template-based emails, QueuedMails store the \(resolved\) body text in a text and html attribute. In the text attribute, all markup language is removed. 

As mentioned above, only the temporary QueuedMail object stores the attachments that are added to an email. This attribute is an array of objects with a filename and Base64-encoded binary data \(content\).

Whereas the Mail object keeps track of which user made the request \(creator\_id\), the QueuedMail object contains the credentials of the requesting party \(an Extra Horizon service, a client application, or a user via a client application\).

The encoding and textEncoding attributes have fixed values which are used to prepare the input for the AWS [SendEmail](https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html) request.

![](https://lh3.googleusercontent.com/cn-FwlUvHGbEnHe36VZViRxxu-iOo_5SD2QisIxvOD8siQcuKt8JEIGJwt6olEPszMUg2UFPTumTBkberV4mR6mzW-50Y1Hcq0kDGHmzEvDTXXN8Efy5ILi9tVrRos3cWT-HlIE=s0)

