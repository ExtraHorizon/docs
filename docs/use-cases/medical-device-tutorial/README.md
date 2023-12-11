---
description: >-
  This tutorial will walk you through how to configure a medical device
  application on Extra Horizon.
---

# Medical Device Tutorial

We will use the example of an application within the field of blood pressure monitoring. You will learn how to create and configure the main pillars by making use of Extra Horizon's REST API and tooling (CLI and SDK).&#x20;

### Extra Horizon Blood Pressure App

* **Baseline:** Measuring blood pressure through the usage of a new hardware device (e.g. bracelet, patch, ring), different from the cuff healthcare practitioners currently use
* **Key improvement:** Measuring blood pressure automatically and consistently throughout the day
* **Algorithm** that processes the data coming from the new hardware device
  * Goal 1: show accuracy/sensitivity is similar to the predicate device (cuff)
  * Goal 2: diagnosis of low/medium/high risk of hypertension
* **A web application:** available to patients where measurement can be initiated and results can be monitored and shared.&#x20;
* **CE Certification** as a Medical Device **Class IIa**



### **Understanding blood pressure readings**

Blood pressure is the pressure of blood pushing against the walls of your arteries. Arteries carry blood from your heart to other parts of your body.

Blood pressure is measured using two numbers. The first number, called systolic blood pressure, measures the pressure in your arteries when your heart beats. The second number, called diastolic blood pressure, measures the pressure in your arteries when your heart rests between beats. \


<table data-full-width="true"><thead><tr><th>Blood Pressure Category</th><th>Systolic mm Hg (Upper number)</th><th>Diastolic mm Hg (lower number)</th></tr></thead><tbody><tr><td><mark style="color:green;"><strong>NORMAL</strong></mark></td><td>Less than 120</td><td>Less than 80</td></tr><tr><td><mark style="color:yellow;"><strong>ELEVATED</strong></mark></td><td>120-129</td><td>Less than 80</td></tr><tr><td><mark style="color:orange;"><strong>HIGH BLOOD PRESSURE</strong></mark><br>(Hypertension Stage 1)</td><td>130-139</td><td>80-89</td></tr><tr><td><mark style="color:red;"><strong>HIGH BLOOD PRESSURE</strong></mark><br>(Hypertension Stage 2)</td><td>140 or higher</td><td>90 or higher</td></tr><tr><td><mark style="color:red;"><strong>HYPERTENSIVE CRISIS</strong></mark><br>(Consult doctor immediately)</td><td>Higher than 180</td><td>Higher than 120</td></tr></tbody></table>

{% embed url="https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings" fullWidth="true" %}

###





