---
pagetitle: Type testing
status: alpha
---
**Type predicates** take a single parameter and test whether it's a specific kind of object:
* `[Number `*x*`]` is true when *x* is a number
* `[String `*x*`]` is true when *x* is a string
* `[Tuple `*x*`]` is true when *x* is a tuple
* `[FeatureStructure `*x*`]` is true when *x* is a feature structure

Because the sets of numbers, string, tuples, and feature structures are effectively infinite, these predicates only work in **input mode** and so are **deterministic**.  So the *x* above can't be an unbound variable.  You can say `[Number 7]` or `[Number foo]`, although there would be little reason to because the answer would be obvious.  But you can only say `[Number ?x]` when `?x` has already been given a value.

There are a few type predicates, however, that can work in both input and output mode because there are relatively few objects of those types.  The predicate `CompoundTask` is true when its parameter is a task defined by methods (isn't primitive).  Since there's a relatively small set of these, it can operate in both input mode (test if an obejct is a compound task) and output mode (enumerate the existing compound tasks).