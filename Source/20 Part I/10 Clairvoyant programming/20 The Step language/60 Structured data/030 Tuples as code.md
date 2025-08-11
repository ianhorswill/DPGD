---
pagetitle: Tuples look an awful lot like calls
shorttile: Tuples as code
status: alpha
---
At this point, you may be confused by the fact that tuples look indistinguishable from calls.  If not, skip this page.  You can always come back later if you get confused.

If it does confuse you, let's clarify since the similarity is deliberate and useful.

When you say something like:
```step
MyMethod [foo bar baz]: [Task1 [a b c]] [Task2 a b c]
```
* The outermost bracketed expressions after the colon: `[Tast1 ...]` and `[Task2 ...]` are **always calls**.
* Any brackets before the colon or inside a call are **always tuples**.
* However, since tuples can look like calls,[^1] you can use them to represent code that you would like to pass to another task for execution.  That means some of the tuples are actually **both**.

You’ve actually run into tuples before.  When we said:
```step
[Not [Believes ?c2 ?disagreement]]
```
We were actually calling `Not` with one argument that was a tuple: `[Believes ?c2 ?disagreement]`, that is, it's a data object containing the sequence of data objects:

* The task `Believes`
* The variable `?c2`
* The variable `?disagreement`

`Not` takes that tuple and tries to run the call it specifies, i.e. calling `Believes` with `?c2` and `?disagreement` as parameters.  If the call to `Believes` succeeds, then `Not` fails; if `Believes` fails, then `Not` succeeds.  `Not` just calls the task specified by the tuple, checks whether it failed or succeeded, and then does the opposite.

We call `Not` a **higher-order** predicate because it takes code as an argument rather than plain old data.[^2]   Higher-order tasks are very important, and we'll talk more about them [shortly](higher-order_tasks).


## Notes

[^1]: *Esoteric*: this property of data structures looking like code is called [homoiconicity](https://en.wikipedia.org/wiki/Homoiconicity).  Some programmers hate it, some can't live without it.  But it's extremely useful and most logic programming languages have the property.

[^2]: This is a little complicated, since as we just said, the “code” we passed into `Not` was really just a tuple and tuples just are data.  This is a fundamental and crucial property of computation: that code is just another kind of data.  So really, what we should have said is that a higher-order predicate takes arguments that are code rather than some other kind of data.