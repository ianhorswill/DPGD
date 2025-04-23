---
pagetitle: Declarative programming in practice
---
Finally, declarative programming often does require thinking beyond the spec to how the spec will be used by the specific solver you’re using.  Returning to our connectedness definition from above, that nodes are connected to themselves and also connect to the things their neighbors are connected to:
```step
Connected ?x ?x. 
Connected ?x ?z: [Edge ?x ?y] [Connected ?y ?z]
```
This works fine in virtually any logic programming language.  But in many of them, it won’t work if we either reverse the order of the two rules, or if we reverse the order of the `[]`’ed expressions in the second rule.  This is simply because of the way their solvers work: they are order-sensitive.

This isn’t necessarily a problem.  Programmers internalize this knowledge and over time, to the point they forget that the other orderings are even possible.  But it’s a reminder that declarativity is an aspiration that can never be fully achieved.
