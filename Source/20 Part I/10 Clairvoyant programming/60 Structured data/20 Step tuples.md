---
pagetitle: Tuples in Step
status: alpha
---
The thing is, the `Mention` rules above are almost the same.  Rather than treating all these separately, we can unify them all by having a slightly more complex representation of beliefs: when we want to talk about the belief that something is important, we’ll write that in the code as `[important something]`, where `something` is the thing that’s supposed to be important.  Then we can write John and Richard’s beliefs as:
```step
[predicate] [randomly]
Believes john god_exists.
Believes john [important money].
Believes richard god_exists.
Believes richard [important helping_people].
```
By bracketing together the word important with the thing that’s important, we tell the system that they come as a unit, and they’re one parameter.  Now we can collapse the different `Mention` rules down to just:
```step
Mention [important ?thing]: whether ?thing is important.
```
These bracketed values are called **tuples** and they let us represent complex data relatively compactly.  The pattern matching process treats tuples largely the way it treats other data objects: if you match a tuple against a variable with no value, the variable is given the tuple as its value.  If you match a tuple against something that isn’t a tuple, that just fails, since they’re different.  The only thing that’s slightly complicated is that when you match tuples with one another: then they must have the same number of elements and those elements need to match.  So we can’t match `[important money]` to `[important]`, but we can match `[important money]` to `[important ?thing]` by setting `?thing` = `money`.

## Gee, tuples look an awful lot like calls

That's deliberate.

You’ve actually run into tuples before.  When we said:
```step
[Not [Believes ?c2 ?disagreement]]
```
We were actually calling `Not` with one argument that was a tuple: `[Believes ?c2 ?disagreement]`.  Not takes that tuple and tries to run the call it specifies, i.e. calling `Believes` with `?c2` and `?disagreement` as parameters.  If the call to `Believes` succeeds, then `Not` fails; if `Believes` fails, then `Not` succeeds.  `Not` just calls the task specified by the tuple, checks whether it failed or succeeded, and then does the opposite.

We call `Not` a **higher-order** predicate because it takes code as an argument rather than plain old data.[^1]   Higher-order tasks are very important, and we'll talk more about them [shortly](higher-order_tasks).

## Endnotes

[^1]: This is a little complicated, since as we just said, the “code” we passed into `Not` was really just a tuple and tuples just are data.  This is a fundamental and crucial property of computation: that code is just another kind of data.  So really, what we should have said is that a higher-order predicate takes arguments that are code rather than some other kind of data.