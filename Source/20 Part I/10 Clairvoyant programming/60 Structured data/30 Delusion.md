---
pagetitle: Belief and delusion
status: alpha
---
Suppose we have a predicate, `Friends`, that expresses when two characters are friends.  So we would assert than John and Richard are friends with:
```step
Friends john richard.
```
And we can do the usual things with `Friends` that we do with other predicates: we can ask if John and Richard are friends by running:
```step
[Friends john richard]
```
and we can also ask who John’s friends are by running
```step
[Friends john ?who]
```
But now we can also represent John’s beliefs about his friends by combining `Believes` and `Friends`:
```step
Believes john [Friends john richard].
Believes john [Friends john elon_musk].
```
If we assume that in this story world, John has never actually met Elon Musk, then John has one true belief about his friends, and one false one.
We can now write a variant of `Believes`, called `Delusion`, that tells us about things a character believes that **aren’t true** within the story world:
```step
Delusion ?who ?fact: [Believes ?who ?fact] [Not ?fact]
```
Now if we add the rules:
```
Disagreement ?c1 ?c2 [delusion ?c1 ?fact]: [Delusion ?c1 ?fact] [Not [Believes ?c2 ?fact]]

Mention [delusion ?who ?fact]: ?who’s crazy belief that ?fact.
Mention [Friends ?a ?b]: ?a and ?b are friends.
```
The system can generate output like:

> John and Richard had a falling out over John’s crazy belief that John and Elon Musk are friends.

Here's a runnable version if you want to try it:
```Step
# Try: [FallingOut john richard]
[predicate]
Friends john richard.
[predicate] [randomly]
Believes john [Friends john richard].
Believes john [Friends john elon_musk].

[predicate] 
FallingOut ?c1 ?c2: [Disagreement ?c1 ?c2 ?dis] ?c1 and ?c2 had a falling out over ?dis.

Disagreement ?c1 ?c2 [delusion ?c1 ?fact]: [Delusion ?c1 ?fact] [Not [Believes ?c2 ?fact]]

Delusion ?who ?fact: [Believes ?who ?fact] [Not ?fact]

Mention [delusion ?who ?fact]: ?who’s crazy belief that ?fact.
Mention [Friends ?a ?b]: ?a and ?b are friends.
Mention ?x: [Write ?x]
```