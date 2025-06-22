---
pagetitle: Grandparents
status: alpha
---
Now we can start to define other relationships:
```Step
# Try: [Grandparent stan ?who]
[predicate]
Grandparent ?c ?g: [Parent ?c ?p] [Parent ?p ?g]

[predicate]
Parent bart marge.
Parent bart homer.
Parent lisa homer.
Parent lisa marge.
Parent stan sharon.
Parent stan randy.
Parent randy grandpa.
Parent jimbo grandpa.
```
Which says that `?g` is a grandparent of grandchild `?c` if `?p` is a parent of `?c`, *and* `?g` is a parent of `?p`.  Note that we’ve adopted the convention that the grandparent is the second parameter.  But we could have chosen it to be the other way around; the computer doesn’t care.  The code for `Grandparent` looks almost the same as the code for `Sibling` -- it's just a change in how the parameters match up between the calls -- but it gives us a different choice tree and solutions:

```mermaid
graph TB
    start("[Grandparent stan ?who]") -- "<b>Grandparent ?c ?g: [Parent ?c ?p] [Parent ?p ?g]</b> <br> ?c = stan <br> ?g = ?who" --> p1("[Parent stan ?p]")
    p1 -- "<b>Parent stan sharon.</b> <br> ?p = sharon" --> p1sharon("[Parent sharon ?g]") --> f(Fail)
    style f fill:red
    p1 -- "<b>Parent stan randy.</b> <br> ?p = randy" --> p1randy("[Parent randy ?g]") -- "<b>Parent randy grandpa.</b> <br> ?g = grandpa" --> s(Succeed)
    style s fill:green
```
The left branch fails because we haven't told the system anything about Sharon's parents.[^1]  But the right branch succeeds, because the database includes a parent for randy.