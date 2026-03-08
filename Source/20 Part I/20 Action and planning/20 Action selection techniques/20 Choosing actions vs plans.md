---
pagetitle: Choosing actions vs. choosing plans
status: incomplete-draft
---
Thus far, we've assumed that the system chooses between discrete actions.  However, it's common for actions to be packaged together as sequences, often referred to as **plans** in the research literature.  For example, in *The Sims*, objects often advertise sequences of actions such as:
- Move here
- Pick me up
- Eat me
These are treated as a unit for purposes of action selection.  But execution requires waiting until all actions are finished rather than a single action.

## Action queues

The simplest and most common approach is to have a [queue](wiki:Queue_(abstract_data_type)) of pending actions. When a sequence of actions is selected, as in *The Sims*, the whole sequence is added to the queue.  The character then performs the actions one at a time until the queue is empty, at which time it chooses another action sequence.

The character's tick method then looks something like this:
```C
void Update() {
    if (!currentAction.IsDone)
        return;
    if (!actionQueue.Empty) {
        currentAction = actionQueue.Dequeue();
        currentAction.Start();
    } else
        // Queue empty; select a new set of actions
        actionQueue.AddAll(SelectNextActionSequence());
}
```

## Lazy chaining

An alternative to queueing two actions $A$ and $B$, is to design the system so that after choosing and executing $A$, it will automatically choose $B$.  This was actually how eating the toast was implemented in our previous example.  Eating the toast consists of two low-level game engine operations: going to the toast and then eating it.  The implementation of `[eat toast1]` is designed to eat the toast if it's nearby, otherwise perform the `[goto toast1]` action.  When that completes, the system reselects `[eat toast1]`, and the system finally eats the toast.

## Actions failure

In more complicated situations, the character will need to be able to handle actions failing and respond accordingly.  The simplest version of this is to empty the queue and reinitiate action selection.  However, more elaborate architectures are possible.  We'll discuss these when we discuss [execution monitoring](execution_monitoring).