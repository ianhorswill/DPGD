---
pagetitle: Debugging tools
status: alpha
---
We can use reflection to write programs to help us debug our other code.  My favorite such program is `Why`, which tells you which rule is used when you run a particular call:
```Step
# Try: [Why [Animal bruce] ?]
Why ?call ?code: [Method ?call ?code] [Succeeds [And | ?code]]

[predicate]
Animal ?a: [Dog ?a]
Animal ?a: [Cat ?a]

[predicate]
Dog ?d: [Labrador ?d]
Dog ?d: [Collie ?d]

[predicate]
Collie lassie.
[predicate]
Labrador bruce.
```
If we run
```step
[Why [Animal bruce] ?]
```
We get back `?=[[Dog bruce]]`, i.e. "Bruce is an animal because Bruce is a dog."  The extra set of brackets around `[[Dog bruce]]` is there because it's a list of all the things that have to be true simultaneously to make Bruce be an animal.  In there case, it's a one-element list.  Now if we run
```step
[Why [Dog bruce] ?]
```
We get back `?=[[Labrador bruce]]`, i.e. "Bruce is a dog because Bruce is a Labrador."  

Here's a somewhat fancier version that reconstructs the rule used and prints it:
```Step
# Try: [Why [Animal bruce]]
Why ?call: [Method ?call ?subgoals] [Succeeds [And | ?subgoals]] Because of the rule:[NewLine] [WriteRule ?call ?subgoals]
Why ?call: Actually, ?call/WriteVerbatim fails when I run it.

[predicate]
Animal ?a: [Dog ?a]
Animal ?a: [Cat ?a]

[predicate]
Dog ?d: [Labrador ?d]
Dog ?d: [Collie ?d]

[predicate]
Collie lassie.
[predicate]
Labrador bruce.

WriteRule ?call []: ?call/WriteItems.
WriteRule ?call ?body: ?call/WriteItems : ?body/WriteItems
# Prints items of a list without the surrounding set of brackets
WriteItems ?list: [AccumulateOutput [Member ?item ?list] [Write ?item]]
```
Note that when this prints the rule explaining why `[Animal bruce]`, it doesn't print the original rule:
```step
Animal ?a: [Dog ?a]
```
But rather the rule with its variables as they were after execution:
```step
Animal bruce: [Dog bruce]
```
There are ways to override that, but this is generally more useful anyway.

This is a simple case of a [meta-circular evaluator](wiki:Meta-circular_evaluator): an interpreter for a language that's written in the language itself.