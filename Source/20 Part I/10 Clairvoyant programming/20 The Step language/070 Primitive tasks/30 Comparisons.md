---
pagetitle: Comparisons
status: alpha
---
These predicates that test whether two values are the same or different. Many of these use unification, in which case they are testing whether the values can be made identical through binding variables.

* `[< `*x*`  `*y*`]`  
True when *x* and *y* are both numbers and *x* is smaller.
* `[<= `*x*`  `*y*`]`  
True when *x* and *y* are both numbers and *x* is no larger than *y*.
* `[> `*x*`  `*y*`]`  
True when *x* and *y* are both numbers and *x* is larger.
* `[>= `*x*`  `*y*`]`  
True when *x* and *y* are both numbers and *x* is at least as large as *y*.
* `[= `*a*`  `*b*`]`  
True when *a* and *b* match.  They need not be numbers; they can be any type.
* `[Different `*a*`  `*b*`]`  
True when *a* and *b* do not match.  They need not be numbers; they can be any type.

These are all deterministic, input-input-mode primitives.