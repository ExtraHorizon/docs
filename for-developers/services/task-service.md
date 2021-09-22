---
description: >-
  The Extra Horizon Task Service handles the creation of Task objects, which
  enable the (scheduled) execution of code on demand.
---

# Task Service

## Intro

The Task Service can be used to coordinate the execution of code defined in [AWS Lambda](https://aws.amazon.com/lambda/), a serverless compute service. A “task” invokes a specified AWS Lambda function and provides it with the required key-value pairs. Tasks can be scheduled in time and the creation of new tasks can be automated.

## Objects and Attributes

#### Tasks

A Task object is uniquely identified within the Task Service by its id. It contains a number of attributes that enable the Task Service to: 

* Invoke an AWS Lambda function,
* Schedule the code’s execution,
* Track the execution status, and
* Trace the origin of a series of automated Tasks.

![](https://lh3.googleusercontent.com/eQ0F4Qq-zv3rrAhsBrmlM4IR3lkTjtWUacXCnjYPwsLPYwl3w7d0OR2um2KZKAje1P4gAQARgt_cmWQiuyx1P0d2rHW_TxzUfdwH9j5k4n3-dp2w1gsp3MbO1V9JCGVWhdne66k=s0)

#### Invoking the AWS Lambda function: functionName and data

AWS Lambda functions are stored and executed by [AWS Lambda](https://aws.amazon.com/lambda/). They must be created with the AWS account that is linked to the Extra Horizon Services of the customer. The Task Service can invoke a function via its identifier, which is specified in the functionName attribute of the Task object. The \(optional\) input for the function is specified by key-value pairs in the data attribute.

| Tip: To change the AWS account associated to your Extra Horizon Services, contact Extra Horizon.  |
| :--- |


#### Scheduling of Tasks: startTimestamp and priority 

The startTimestamp attribute determines the time at which the AWS Lambda function must be invoked by the Task Service. 

When many Tasks need to be executed within a short timeframe, the Tasks are queued chronologically by the value of their startTimestamp attribute. However, in a queue, the priority attribute takes precedence over the startTimestamp attribute. Tasks with a higher priority value will be handled first. 

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Example: When the following Tasks are delayed at, for example 00:03, Task
          2 will be executed first even though Task 1 was scheduled earlier.</p>
        <p>
          <img src="https://lh3.googleusercontent.com/76us0Q5coMTdlFLz4LvePrFUVK2A5ck5LWWp8ZKp8u373pI1IudCiXb06aHGTBfwmxLv9-suLfAn5vohTB9BBM-kBIqaC3xQ4rehfHBPFXIOOIpRMgnDWZg2JOVN8B_HO_UZOmc=s0"
          alt/>
        </p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

#### Keeping track: status

The status and statusChangedTimestamp attributes are updated according to the Task’s progress in the execution process. A newly created Task \(status: new\) can be revoked via the Cancel a Task endpoint \(canceled\). Once the Task Service invokes the specified AWS Lambda function, the Task receives the inProgress status and the execution of the code cannot be halted via Extra Horizon. Upon \(un\)successful execution of the code, AWS Lambda reports back to the Task Service and the Task status is updated accordingly \(complete or failed\). However, if AWS Lambda does not report within 5 minutes, the Task Service automatically sets the status of the associated Task to failed.

| Note: The Extra Horizon customer is responsible for the detection and handling of failed Tasks. To rerun a \(failed\) Task, a new Task must be created with the same parameters.  |
| :--- |


![](https://lh6.googleusercontent.com/af5KNmsUUbeSMWvMsNd27lX2m1O5sQlQq4UyIZFC6pYtUlNFJioAG6OiDVidT52T8nt1iClUDsmaDveT71ej6QkVmRQGrgkxt8CztZTOkcw0IBrACEQhEYf5jw_wEMKNmZabTac=s0)

#### Tracing: tags 

Optionally, a list of tags can be added to a Task. Tags are descriptive keywords that improve the search experience. They can be used to trace automated Tasks by adding the Task id’s to the tags list.

![](https://lh6.googleusercontent.com/PW2W8o26gksG1xY0iigUXredPdTQuv_iH-FfdYewqXNqp1rLAGQKrSSXuGeQMAavZYF9E3WtzbmnY2_KIJE07rdJmlyfPoyJal-U6eM62vrRCXllCTqbF7jQP-eaTnteZZt_Gi4=s0)

#### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation \(creationTimestamp\) and of the most recent update \(updateTimestamp\) of their stored objects.

## Task scheduling

AWS Lambda functions can perform many types of actions, among which the creation of a Task by calling the Task Service. Tasks can thus trigger the creation of other Tasks and an automatic scheduling of Tasks can be established with some logic in the AWS code. 

* To repeat the same Task at regular intervals, create a recurring Task that triggers the scheduling of an identical Task with startTimestamp = {previous startTimestamp + N}.
* To automate the execution of multiple repeating actions, set up a \(recurring\) Task that triggers the scheduling of a collection of Tasks.

![](https://lh5.googleusercontent.com/MBbXkcRf4eh3FeHU34PhUDVURT5LFVnEWWCIxFSFCYH1-xVhJGtZTimJcqB0xZoSGK45E2gzRmK1eD_x-eIPhvu1bB7Kk3AvT3NFR4L17BqgO0MtJjI9hShhlkCh_MR4EvFNKtg=s0)

| Tip: To stop an infinitely recurring Task, use the Cancel a Task endpoint while the status of the Task is new. If the Task does not remain in the new status long enough to call this endpoint, disable the execution of the function in AWS. |
| :--- |


## Actions 

This section provides an overview of the available Task Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

### Managing Tasks

The following actions are available to set up Tasks:

* List all Tasks: GET /
* Create a Task: POST / 
* Cancel a Task\*: POST /{taskId}/cancel \*Only a Task with status new can be canceled.   

