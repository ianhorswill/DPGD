---
pagetitle: Design-rule checking
status: alpha
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

This more often gets used to check for relationships between specific types of tasks.  For example, in our [planner example](planning_using_reflection), we can check that for every precondition of every action, there is some action that has that precondition as an effect.

First, remember the `Achieves` predicate that tells us when an `?action` has an `?effect`:
```step
Achieves ?action ?effect: [Action ?action] [Method ?action ?subgoals] [Member [Effect ?effect] ?subgoals]
```
We can write an equivalent that tells us when an `?action` has a `?precondition`, just by changing `Effect` to `Require`:
```step
Precondition ?action ?precondition: [Action ?action] [Method ?action ?subgoals] [Member [Require ?precondition] ?subgoals]
```
Now we can check for problems, just by making sure every `Require`d precondition has some task that `Achieves` it:
```step
CheckActionDefinitions: [Precondition ?a ?p] [Not [Achieves ? ?p]] The action ?a has a precondition ?p that no action can achieve.
CheckActionDefinitions: No problems detected.
```
Now if you run `[CheckActionDefinitions]`, it will look for unachievable preconditions and alert you if it finds one.  Otherwise, it will print "No problems detected."