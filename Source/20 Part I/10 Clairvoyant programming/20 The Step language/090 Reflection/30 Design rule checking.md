---
pagetitle: Design-rule checking
status: incomplete-draft
---
Reflection can be used to write custom static-analysis routines to verify things about your program.  Here are some examples.

## Dead code detection

You can check whether there are any unused tasks in your program.  For example, the predicate:
```step
DeadCode ?task: [CompoundTask ?t] [Not [TaskCalls ? ?t]]
```
is true if `?task` is a task with methods that nothing calls.  Given that, you can add:
```step
[Not [DeadCode ?]]
```
to your unit tests to alert you if you have dead code in your program.

## Custom checkers

This more often gets used to check for relationships between specific types of tasks.  For example, suppose you are implementing a [storylet](https://emshort.blog/2019/11/29/storylets-you-want-them/) system, that breaks stories or quests up into little fragments (the storylets) with preconditions for when they can be used.