# Access Management

## Access management

### Security

Security is critical to web services, this is why all of our services only respond to authorized requests.\
A request is considered authorized only when it carries a valid authentication token. Such a token can be requested from the authentication service with user login credentials.\
After acquiring an authentication token, requests to other EXHZ services can be made by including this token in the request authorization header.

Since authorization is required for other services, the authentication service is a prerequisite for all other functionality.

{% hint style="info" %}
The authentication service supports both oAuth 1.0 and oAuth 2.0
{% endhint %}

### User management

The structure of the user service, as is depicted in the graph below, relies on three core concepts; _Users_, _roles_, and _groups_. These concepts are explained in greater detail in the paragraphs below.

![](<../.gitbook/assets/Access Management - Overview scheme.png>)

#### Users

The Extra Horizon user service provides standard user management features. For example; It can be used to register or remove users, update passwords and other user-related operations. This service is used to manage users, which include patients as well as staff members.

#### Roles

A user's _role_ determines what actions a user is or is not allowed to perform, based on the permissions associated with that role. Roles that are granted to a user directly are called _global roles_. Global Roles determine the privileges a user has with respect to the EXHZ services; such as the services a user has access to, whether or not a user can view a resource, if the user can edit that resource, etc.

![](<../.gitbook/assets/Access Management - Roles scheme.png>)

#### Groups

A group is a collection of users, which typically encompasses a company or a medical practice. They are used to connect patients and medical services, as well as for staff management.

A user can be connected to a group either as a patient or as a staff member. Since patients and staff members are both _users_, the distinction that separates them is their relationship with regards to a group.

The relationship between a user and a group is referred to as an _enlistment_. Patients are connected to a group through a _patient enlistment_, and staff members through a _staff enlistment_.\
Evidently, numerous users can be enlisted to a single group; Likewise, a single user can be enlisted to multiple groups.

![](<../.gitbook/assets/Access Management - Groups scheme.png>)

**Patient enlistment**

When a patient is enlisted to a group, they entrust the group with their information in exchange for medical services. For this reason, patients are typically regarded as the _end users_ of an application.

**Staff enlistment**

Staff enlistments are used to register a staff member to a group. Depending on their privilege, staff members can have varying degrees of access to a group's data, or control over said data. With these privileges, a staff member utilizes the information provided by patients for medical services or research purposes. Staff privileges are granted to group members through _group roles_.

**Group roles**

Group roles are similar to global roles, with the notable difference that they relate to a group instead of the EXHZ services. Group roles determine the privilege levels of a _staff member_ within a _group_, and are not granted to a user directly but through a _staff enlistment_ with that group.

![](<../.gitbook/assets/Access Management - Group Roles scheme (1).png>)

For example, a medical practice could have three different group roles: _lab researcher_, _physician_, and _practice owner_.\
In this example, a **lab researcher** could be able to append the lab results of a sample to a patient's file, but not create or edit that file in any other way.\
**Physicians** could then consult these lab results to make their diagnose and prescribe a treatment to the patient.\
Finally, the **practice owner** has administrative control; which means they have control over their staff members or could register new patients to the practice. It is possible for a user to have more than one role within a group, which means the practice owner could be a physician too in this example.

### Related Pages

{% content-ref url="services/authentication.md" %}
[authentication.md](services/authentication.md)
{% endcontent-ref %}

{% content-ref url="services/user-service.md" %}
[user-service.md](services/user-service.md)
{% endcontent-ref %}
