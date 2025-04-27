---
pagetitle: Inference
---

## Recap

At this point, we have enough tools to let the computer do something that we might call “reasoning.”  We have predicates, which are tasks that answer questions by succeeding or failing.  We think of calling a predicate as asking a question.  For example, we might call `[Loves rover fluffy]`.  If it succeeds, the answer is yes: Rover loves Fluffy.  If it fails, then answer is no; poor Fluffy.

We can also ask “who/what” questions by passing in a variable and letting the predicate fill it in.  If we run the command `[Loves rover ?x]`, we’re effectively is asking “who does Rover love?”  If it succeeds and fills in a value for `?x`, then we know Rover loves whoever was filled in for `?x`.  Rover might love other characters too, but we at least know one of them.


## Rules for reasoning

We’ve also seen how we can specify methods for predicates that are general rules about the truth of one predicate in terms of the truth of others.

For example, let's assume we've defined a predicate `Parent` so that `[Parent ?x ?y]` is true (succeeds) whenever `?x`’s parent is `?y`.  If we want to reason about sibling relationships, we don’t have to separately store who is a sibling of whom; we could derive that information from `Parent`:
```step
[predicate]
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent]
```
As far as the computer is concerned, that’s just a rule that says “if trying to run `Siblings`, one way to do it is to first run `[Parent ?a ?parent]`, and if that succeeds, run `[Parent ?b ?parent]`”.

But another way of looking at it is that the method can only succeed if `?a` and `?b` have the same parent.  So we could read it as a rule that effectively says “people are siblings if they share a parent”.

This is a general technique we can use to write rules of the form “this is true if these things are also true.”  If we want to say A is true if B is true, we write:
```step
[predicate]
A: [B]
```
If we want to say A is true when B, C, and D are all true, then we say:
```step
[predicate]
A: [B] [C] [D]
```
If we want to say “A is true when either B is true or C and D are both true”, we can write two methods:
```step
[predicate]
A: [B]
A: [C] [D]
```
If we add parameters to the rules, everything needs to match up as it would for any of the other code we’ve seen.

## Reasoning about family relationships

Let’s return to our definition of siblinghood:
```step
[predicate]
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent]
```
It’s worth pointing out that under this definition, people are their own siblings.  If you call `[Siblings fred fred]`, it will first run `[Parent fred ?parent]`, which will succeed, assuming Fred has a parent, and then it will run it again, so it will presumably succeed again.  So it thinks Fred is his own sibling.  That might work for your purposes or not.  If you want to rule out self-siblinghood, you can just add an extra condition to the rule that requires `?a` and `?b` be different:
```step
[predicate]
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent] [Different ?a ?b]
```
Here, `Different` just tests if its parameters are different.

Now we can start to define other relationships:
```step
[predicate]
Grandparent ?c ?g: [Parent ?c ?p] [Parent ?p ?g]
```
Which says that `?g` is a grandparent of grandchild `?c` if `?p` is a parent of `?c`, and `?g` is a parent of `?p`.  Note that we’re just choosing the convention that the grandparent is the second parameter.  We could have chosen it to be the other way around; the computer doesn’t care.

Or we can say:
```step
[predicate]
Aunt ?c ?a: [Parent ?c ?p] [Siblings ?p ?a]
```
Which says that the aunt of a child is the sibling of a parent of a child.  We haven’t been paying attention to gender in these definitions, but since there isn’t a good gender-neutral word for aunt-or-uncle, we’ll just say aunt.  If you want to track gender, then just add some predicates for Male and Female, and then add the predicate to the rule:
```step
[predicate]
Aunt ?c ?a: [Parent ?c ?p] [Siblings ?p ?a] [Female ?a]
```
