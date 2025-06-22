---
pagetitle: Matching as equations
---
There's a reason we notated the connections between variables and values above as `?x`=`1` or `?a`=`?x`.

A call matches a method if each part of the call is the same as the corresponding part of the method.  But "the same as" is just an informal way of saying "is equal to": the first parameters of the call and method have to be equal, as do the second parameters, and so on. The process of matching is simply one of finding what values for the variables would allow that to be true: it's **solving for** the variables.

When we match a call like:
```step
[Task 1 ?a]
```
Against a method like:
```step
Task ?x ?x: ...
```
We're saying `1` and `?x` must be the same, and that `?a` and `?x` must be the same.  Again, that's the same as saying that they're equal, and so the matching process is really setting up the system of equations:

* `?x` = `1`
* `?a` = `?a`

And then solving for the values of `?x` and `?a`, which tells us that they're both 1.

This can be a useful way of looking at it when we think of how different calls interact with one another, as we'll see in the next section.
