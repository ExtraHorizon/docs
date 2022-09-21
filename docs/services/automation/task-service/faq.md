---
description: Common questions regarding how the task service works can be found here.
---

# FAQ

### How to schedule a task at regular intervals?

To repeat the same Task at regular intervals, create a recurring Task that triggers the scheduling of an identical Task with `startTimestamp = {previous startTimestamp + N}`.

### How to schedule multiple tasks at once?

![Execute multiple tasks at once](https://lh5.googleusercontent.com/MBbXkcRf4eh3FeHU34PhUDVURT5LFVnEWWCIxFSFCYH1-xVhJGtZTimJcqB0xZoSGK45E2gzRmK1eD\_x-eIPhvu1bB7Kk3AvT3NFR4L17BqgO0MtJjI9hShhlkCh\_MR4EvFNKtg=s0)

To automate the execution of multiple repeating actions, set up a (recurring) task that triggers the scheduling of a collection of tasks.
