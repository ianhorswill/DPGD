---
pagetitle: Tuples as lists
status: alpha
---
We've now written a `Believes` predicate that can be used to ask about the beliefs of a character.  When we call it, it only answers one belief of the character.  What if we wanted to know *all* of the character's beliefs?  We'd like some kind of predicate like `[BeliefsOf ?character ?beliefs]` that, given a `?character` tells us (all) their beliefs.  But `?beliefs` is just one argument; how can `BeliefsOf` communicate a whole list of items as a single parameter?

The answer is to put them in a tuple.  Each element of the tuple is a belief, but the number of elements depends on the number of beliefs the character has.  Such tuples that are used to represent lists of things are often referred to, unsurprisingly, as **lists**.  But a list is just a tuple.

Here's a definition for `BeliefsOf`.  It uses another predicate, `FindAll`, that we will discuss [later](higher-order_tasks).  For the moment just try running `[BeliefsOf john ?]` and `[BeliefsOf richard ?]`:
```Step
# Try: [BeliefsOf john ?]
[predicate]
BeliefsOf ?character ?beliefs: [FindAll ?b [Believes ?character ?b] ?beliefs]

[predicate]
Believes john god_exists.
Believes john [important money].
Believes richard god_exists.
Believes richard [important helping_people].
Believes john [Friends john richard].
Believes john [Friends john elon_musk].
Believes richard [Friends john richard].

[predicate]
Friends john richard.
```
When we run `[BeliefsOf john ?]` we get:
```step
?= [god_exists [important money] [Friends john richard] [Friends john elon_musk]]
```
The outer brackets mean that it's a tuple.  It has 4 elements, each representing one of John's beliefs:
* `god_exists`
* `[important money]`
* `[Friends john richard]`
* `[Friends john elon_musk]`

But when we run `[BeliefsOf richard ?]` we get:
```step
?= [god_exists [important helping_people] [Friends john richard]]
```
Again, a tuple with each element representing a belief.  But this time, there are only three beliefs.


