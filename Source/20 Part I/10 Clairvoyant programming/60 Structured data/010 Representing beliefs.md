---
pagetitle: Representing character beliefs
status: alpha
---
Suppose we’re writing a story generator that, among other things, generates text to describe characters having a falling out.  It would probably want to be parameterized by what they were arguing about.  We would first want some way of finding something for them to argue about.  So let’s assume that we have a predicate, `Believes`, that lets us tell whether a character believes something or not.  For example:
```step
[predicate] [randomly]
Believes john god_exists.
Believes john money_is_important.
Believes richard god_exists.
Believes richard helping_humanity_is_important.
```
Then we could write a predicate that holds when two characters disagree on something:
```step
[predicate] [randomly]
Disagreement ?c1 ?c2 ?disagreement: [Believes ?c1 ?disagreement] [Not [Believes ?c2 ?disagreement]]
Disagreement ?c1 ?c2 ?disagreement: [Believes ?c2 ?disagreement] [Not [Believes ?c1 ?disagreement]]
```
And write a task to generate a plot point about disagreement:
```step
FallingOut ?c1 ?c2: [Disagreement ?c1 ?c2 ?dis] ?c1 and ?c2 had a falling out over ?dis.
```
which might generate some text like:

> John and Richard had a falling out over helping humanity is important.

That gets the idea across, but it’s not awesome grammar.  We can improve it by telling the system how to print things like `helping_humanity_is_important`:
```step
Mention helping_humanity_is_important: whether helping humanity is important.
Mention money_is_important: whether money is important.
Mention status_is_important: whether status is important.
```
This at least generates more fluent text (emphasis added):

> John and Richard had a falling out over *whether* helping humanity is important.

Here's the complete code, if you want to try it:
```Step
# Try: [FallingOut john richard]
[predicate] [randomly]
Believes john god_exists.
Believes john money_is_important.
Believes richard god_exists.
Believes richard helping_humanity_is_important.

[predicate] [randomly]
Disagreement ?c1 ?c2 ?disagreement: [Believes ?c1 ?disagreement] [Not [Believes ?c2 ?disagreement]]
Disagreement ?c1 ?c2 ?disagreement: [Believes ?c2 ?disagreement] [Not [Believes ?c1 ?disagreement]]

FallingOut ?c1 ?c2: [Disagreement ?c1 ?c2 ?dis] ?c1 and ?c2 had a falling out over ?dis.

Mention helping_humanity_is_important: whether helping humanity is important.
Mention money_is_important: whether money is important.
Mention status_is_important: whether status is important.
Mention ?x: [Write ?x]
```
