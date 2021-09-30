---
description: >-
  The User Service handles user management and general role base access control
  functionality.
---

# Users

## Intro

The user service handles user management and a general role based access control system. At a basic level every user in the system starts out as basic user without any permissions. Based on the type of application you want to build you can create roles on system and group level and assign permissions to them.

In addition to role base access controls this service also provides registration and password management functionality.

## **Users**

{% tabs %}
{% tab title="List" %}
| Attribute | Description |
| :--- | :--- |
| `id` | The identifier of the user. |
| `first_name` | First name of the user. |
| `last_name` | Last name of the user. |
| `email` | email address of the user. |
| `phone_number` | phone number of the user. |
| `activation` | Boolean indicating the email address has been activated true or false. |
| `roles` | Array containing a description of the roles this user has obtained. |
| `staff_enlistments` | Array containing a description of the staff enlistments this user has within one or more groups. |
| `patient_enlistments` | Array containing a description of the patient enlistments this user has within one or more groups. |
| `last_failed_timestamp` | Epoch timestamp Information about when the last password login attempt failed. |
| `failed_count` | The number of consecutive password login attempts. |
| `creation_timestamp` | Epoch timestamp when the user was created. |
| `update_timestamp` | Epoch timestamp when this user object was last updated. |
{% endtab %}

{% tab title="Json" %}
```javascript
{
    "id": "abcdef0123456789abcdef01",
    "first_name": "John",
    "last_name": "Doe",
    "language": "EN",
    "email": "john.doe@example.com",
    "phone_number": "+32012345678",
    "timeZone": "Europe/London",
    "activation": true,
    "roles":[...],
    "staff_enlistments":[...],
    "patient_enlistments":[...]
    "last_failed_timestamp": 1632733680,
    "failed_count": 0,
    "creation_timestamp": 1632733681,
    "update_timestamp": 1632733682
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
When using the Javascript SDK fields are transformed into a **camelCase**. **snake\_case** will be phased out for the user service and all other ExtraHorizon Services in the future.
{% endhint %}

### Register a new user

You can make use of the ExtraHorizon SDK to create new users from your application.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const myNewSchema = await sdk.users.createAccount({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Secret1234',
    phoneNumber: '+32012345678',
    birthday: '1987-06-05',
    country: 'UK',
    gender: 1,
    language: 'EN',
    timeZone: 'Europe/London'
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Notice **birthday**, **country** & **gender** is part of the registration fields but is not returned when Querying for the user. This is because of the underlying integration with the ExtraHorizon Profile Service. During account creation a user profile is created and these fields are stored there.
{% endhint %}

### Email verification

After registration the activation attribute will default to `false`. While email verification is not blocking the use of any API services, it is blocking the possibility to initiate a password reset. If you are not providing password reset functionality inside your application you can skip this step. For other applications it is highly recommended as you want to prevent sending emails to the wrong person.

The user service can be configured to hold a reference to an html template in the template service. When a registration occurs the user service will try to send an email by using this template.

{% hint style="danger" %}
Currently the configuration of a templateId is not possible through the API. Contact ExtraHorizon support in order to set this variable.
{% endhint %}

The user service will provide the users **firstname, lastname** and **activation\_hash** to the email service. The email service will add the **tracking\_hash** before it reaches the template service. Thus you have the option to use these three fields in your email template. Please check the [Template Service ](template-service.md)for more details.

```javascript
...,
"schema": {
    "type": "object",
    "fields": {
        "firstname": {
            "type": "string"
        },
        "lastname": {
            "type": "string"
        },
        "activation_hash": {
            "type": "string"
        },
        "tracking_hash": {
            "type": "string"
        }
    },
}
...
```

#### Resending email verification

When you make an application where email verification is a prerequisite or when you want to provide password reset capabilities you want your user to be able to trigger the email verification mail again.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestEmailActivation('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

You can choose to set a different templateId for this email in the [User Service](user-service.md). Currently this functionality is not supported through the API. Contact ExtraHorizon support in order to set this variable.

#### Performing a user activation

With the steps above you can provide your user with an email containing an activation token. Typically this is embedded inside a url or deeplink towards your application. You can then use that token to activate the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.validateEmailActivation({
    hash: '6ca1691b4c5b4dbfa5def4c49b910657',
});
```
{% endtab %}
{% endtabs %}

### Reset password

Users not remembering their password is common and you want to deal with it safely in your applications. The ExtraHorizon SDK provides you with the ability to do so.

#### Requesting a password reset email

Much like the email verification flow, the password reset flow provides you with a reset token that you can use to set a new password for your users account. The user service again contains a templateId for this email, contact ExtraHorizon support in order to set this variable.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.requestPasswordReset('john.doe@example.com');
```
{% endtab %}
{% endtabs %}

#### Resetting a password

With the steps above you can provide your user with an email containing a reset token. Typically this is embedded inside a url or deeplink towards your application. You can then use that token to reset the password of the user.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
await sdk.users.validatePasswordReset({
    hash: 'be7ab8ebe9094588ac3693cd6ec9d5b7',
    newPassword: 'myNewSecret1234',
});
```
{% endtab %}
{% endtabs %}

## Groups

Groups are entities that combine users together. Allowing us to create access control policies for the entire group or for users with a specific role within that group. 

The user service was build specifically for medical applications where patients and medical staff can collaborate and share information. With this in mind you can join a group from a patient and/or from a staff member perspective. While the **patient\_enlistement** is a role that is a dedicated for patients without the ability to add more specific permissions the **staff\_enlistments** allow you to create roles within a group where you can attach any kind of permissions to create the role base access system you need for you application.

### Creating a group

A group is no more than the collection of its members. Creating a group thus is as simple as attaching your first patient or staf member to a group or a shared identifier. If the group doesn't exist a user with a system level permission will need to create a group as there is no user yet with ar groupRole containing the **ADD\_STAFF** permission.

### sdf

```javascript
await sdk.users.groupRoles.addUsersToStaff({
    groups: ['841e55106a2a40c39ed6359b2c137a19'],
});

// or


```





There are two types of end-users for a medical application: patients and staff members. The Extra Horizon User Service provides a system to connect both types of users in a group and to assign the correct permissions to the staff members via a system of roles.

The User Service allows Extra Horizon customers to create **Users** which can be enlisted in groups as **staff member** or **patient**. Staff members can receive specific **GroupRoles** that determine which type of actions the User is allowed to perform within the group. In addition, Users can receive global **Roles**, which are independent of group enlistments. The latter typically include the roles of administrator or IT support helpdesk of the customer’s application.

Tip:       A **group** is a collection of Users joined together by a group\_id. It typically is the digital representation of a specific **company or medical practice**. Groups are used to manage staff members and to connect patients with medical services.

### Staff Membership

#### Enlistments

An enlistment is an object that connects a User to a specific group by means of the group\_id. These objects do not have an identifier and can only be accessed via the associated User. There are two types of enlistments:

·       PatientEnlistment

The optional expiry\_timestamp attribute in the PatientEnlistment object can be used to limit the time a patient has access to a specific group. This access right is represented by the expired attribute \(true/false\).

| Note:    The expiry\_timestamp cannot be updated\[NB1\] . The PatientEnlistment must be removed and recreated \[NB2\] to extend the subscription to the specific group. |
| :--- |


·       StaffEnlistment

Staff members can be in charge of a range of actions in a group, such as managing the group’s userbase or processing the patients’ medical data. To specify which actions each staff member is allowed to perform, the StaffEnlistment object can include an array of GroupRoles \(roles\).

In contrast, Users cannot be assigned a GroupRole via a PatientEnlistment relationship.

## 

### Patient Membership

### 

### Actions

The sections below give an overview of the available User Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API Reference documentation.

#### I. User Management Actions

In general, only a small selection of Users is expected to manage \(Group\)Roles and \(Patient/Staff\)Enlistments. Accordingly, the endpoints for user management require specific permissions and/or scopes.

**Managing Enlistments**

The enlistment process for patients differs somewhat from the one for staff members. Whereas multiple staff members can be assigned to one or more groups with a single API request, patients must be added to a group one at a time.

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>Patient</b>
      </th>
      <th style="text-align:left"><b>Staff member</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">
        <p>o Add a PatientEnlistment to a User</p>
        <p>POST /{userId}/patient_enlistments/</p>
        <p>o Remove a PatientEnlistment from a User
          <br />DELETE /{userId}/patient_enlistments/{groupId}</p>
      </td>
      <td style="text-align:left">
        <p>o Add StaffEnlistment(s) to User(s)
          <br />POST /add_to_staff</p>
        <p>o Remove StaffEnlistment(s) from User(s)
          <br />POST /remove_from_staff</p>
      </td>
    </tr>
  </tbody>
</table>

Note:    While the permission ADD\_PATIENT is required to enlist a patient to a group, any User can withdraw themselves from a group by removing the associated PatientEnlistment object. In contrast, the ADD\_STAFF permission is always required to manage staff members, including yourself.

**Managing Roles**

GroupRoles and global roles are managed via similar endpoints. The URIs provided below are those for the global Roles. See the API Reference documentation for the exact URIs for GroupRoles.

The following actions are available to set up Roles:      

o   List all permissions:                      GET    /permissions

o   List all Roles:                                GET    /roles

o   Create a Role \(step 1\):         POST   /roles

o   Update a Role:              PUT    /roles/{id}

o   Remove a Role:                            DELETE /roles\*

\*The Remove a GroupRole URI includes the path parameter {roleId}.

o   Add permissions to Role\(s\) \(step 2\):POST /roles/add\_permissions

o   Remove permissions from Role\(s\): POST /roles/remove\_permissions

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Note: Creating a new Role is a two-step process:</p>
        <p>1. Create the object, i.e. specify a name and description.</p>
        <p>2. Add permissions.</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

The following endpoints can be used to assign Roles to Users:

o    Add Role\(s\) to User\(s\):         POST   /add\_roles

o    Remove Role\(s\) from User\(s\):    POST   /remove\_roles

#### II. Common User Actions

Some actions \(indicated with\) require the user’s confirmation via a link send to their email address. These emails are handled by the Mail Service and are based on a template created by the Extra Horizon customer via the Template Service. By clicking the link, the user forwards the included hash code to the Extra Horizon customer’s client application, which must then send the correct follow-up request to the User Service. The hash code expires after xxx\[NB3\] . However, for email verification\[NB4\]  actions, an email with a new code can be sent via the following endpoint:

o   Resend the verification email: GET /activation

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Important: Before [NB5] the User Service can be deployed, the customer
          must create the following templates and provide [NB6] the associated id&#x2019;s
          to the Extra Horizon configurator:</p>
        <p>&#xB7; Email address activation (Registration of a new User)</p>
        <p>&#xB7; Email address activation (Update email address)</p>
        <p>&#xB7; Password reset (Forgot password flow)</p>
        <p>The attributes that are passed along to the Mail Service (and thus can
          be used in the templates) are:</p>
        <p>&#xB7; first_name</p>
        <p>&#xB7; last_name</p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

\*\*\*\*

**Registration of a new User**

To check whether an email address can still be used to create a new account, the following endpoint can be consulted by the customer’s application, e.g. at the start of the registration process:

o   Check availability of an email address: GET /email\_available

The actual User registration is a two-step process. Upon creation of the user account, a verification email is sent to the provided email address.

1. Create a user account:         POST   /register

2. Activate the email address:       POST   /activation

**Forgot password flow**

Users can request a password reset by providing the email address linked to their account. When the user clicks the reset password link in the resulting email, the Extra Horizon customer’s client application must obtain a new password from the user and complete the password reset process. The required endpoints are:

1. Request a password reset:    GET    /forgot\_password

2. Complete a password reset:      POST   /forgot\_password

**Managing user data**

Once logged in, each user can make changes to their own account. In addition, users with the correct permissions and scopes, for example administrators, can make changes to all Users.

The following actions are available:

o   Update email address

a.  Update the email address:   PUT    /{userId}/email

b.  Activate the email address:   POST   /activation

o   Change password:                                PUT    /password

o    Delete profile picture\[NB7\] :                   DELETE /{userId}/profile\_image

o   Update personal information:               PUT    /{userId}

o   Remove a User:                     DELETE /{userId}

| **Important**: When a User is removed by the User Service, the other Extra Horizon Services are /customer’s application is\[NB8\]  notified of this event. The Extra Horizon customer is responsible for the implementation of the functionality to remove all personally identifiable information from the Extra Horizon Services, as required by the applicable governmental rules, such as the GDPR. |
| :--- |


The Extra Horizon customer can implement \[NB9\] an extra layer of security for certain actions, e.g. account deletion, by requiring the \(logged in\) user to confirm the action with their password.

o   Confirm action with password:             POST   /confirm\_password

**Viewing User data**

With the correct permissions or the correct enlistment, users can view \(a selection of\) the data of other Users.

| Example: Patients can request a list of \(the names of\)\[NB10\]  all staff members in the group\(s\) to which they are enlisted as patient. However, they cannot access other patients’ data. |
| :--- |


The following endpoints can be used to view:

o   The current logged in User:      /me

o   A specific User:                                    /{userId}

o   A list of Users:                         /

o   A list of patients:                      /patients

o   A list of staff members:                        /staff  


#### III. Back-end Actions\[NB11\] 

The following actions allow back-end communication between the Extra Horizon Services.

**Authentication**

Users are authenticated at the Auth Service with their email address and password. However, these credentials are stored by the User Service and must therefore be validated by the latter.

o   Authenticate a User: POST /authenticate

| Note:    For security \[NB12\] reasons, an account will be frozen/ blocked when … To unblock an account… |
| :--- |


**Health Check**

See xxx. &lt; Op centrale pagina bespreken; geldt voor alle services.&gt;

 \[NB1\]correct zo?

er is geen PUT, dus expiry kan niet verlengd worden? Of kan dat via POST \(RESOURCE\_ALREADY\_EXISTS\_EXCEPTION" lijkt te suggereren van niet\)?

 \[NB2\]or “A new PatientEnlistment must be created”?

 \[NB3\]To be checked.

 \[NB4\]correct zo? GET activation werkt voor registratie én update email \(maar dus niet voor password reset\)

 \[NB5\]Is dit hoe het werkt? Waarom zou er niet eerst een default template klaargezet worden met een id die reeds gelinkt kan worden aan de user service. De klant kan dan later die template aanpassen.

 \[NB6\]+ “provide the link to which the hash code must be forwarded”?

hier vermelden? Hoort eerder bij deployment workflow?

 \[NB7\]is deze dan ook deprecated?  \[NB7\]

\[deprecated\] U \[NB7\]pdate profile picture PUT /{userId}/profile\_image \(laat weg uit docs\)

 \[NB8\]Kobe:“ services zijn een manier om data op te slaan, dus als user gedelete wordt, kan er een taak getriggerd worden, die dan info gaat weghalen bij andere services”

Gaat het event naar de andere services of naar de app van de klant?

\(indien 2e: hoe “onderschep”/lees je dit event als client app? elders in docs stuk info over events toevoegen?\)

 \[NB9\]Correct?

Is het de customer’s app die zelf kiest welke acties nog eens bevestigd moeten worden met een wachtwoord? \(niet per se enkel bij delete user?\)

 \[NB10\]In swagger: “limited set of fields” \(maar fullUser in example response\); wat wordt effectief teruggegeven?

Kobe: nog na te vragen

 \[NB11\]Te bespreken of dit wel in publieke docs moet komen

\(info komt beter bij Auth Service pagina\)

-         \[NB12\]Na hoeveel failed logins bevroren/geblokeerd?

-         Hoe lang bevroren?

-         hoe blokkade opheffen? \(zou API call voor moeten komen, maar kan zijn dat die er vandaag nog niet is\)

Kobe: nog na te vragen

## System Roles

Many API requests to the Extra Horizon Services require a specific permission and/or scope in the access token that accompanies the request \(see the Auth Service\). To facilitate granting permissions to Users, Roles with predefined sets of permissions can be created.

| Tip:       The permissions that are applicable within the Extra Horizon Services can be consulted via the List all \(group\) permissions endpoints. |
| :--- |


The Extra Horizon Services make a distinction between two types of roles:

·       GroupRoles, which only apply within the scope of a specific group. They are linked to a User via a StaffEnlistment object.

·       Global Roles, which are independent of groups. They are assigned directly to the User object.

The same type of Role, possibly with the same name, can exist on both levels. A User can have multiple GroupRoles and/or multiple global Roles.

| Example:  - Jane is a practicing physician in group A \(a GroupRole\) and can therefore prescribe medication to patients enlisted to this same group. However, she cannot do so for patients enlisted to group B.  - In addition, Jane is configurator of the application \(a global Role\) and can therefore add staff members to both groups, A and B.  - Karim has a configurator role within group B \(a GroupRole\). He cannot add staff members to group A, in contrast to Jane. |
| :--- |


## 

