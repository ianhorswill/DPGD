---
pagetitle: Randomization primitives
status: alpha
---
Tasks that choose random numbers or list elements.

* `[RandomElement `*list*`  `*element*`]`  
Sets *element* to a random element of *list*.  It is non-deterministic; it will try all elements, but it tries them in a random order, so it chooses a random successful branch of the choice tree.
* `[RandomFloat `*min*`  `*max*`  `*random*`]`  
Sets *random* to a random number[^1] such that *min* $<=$ *random* $<=$ *max*.  It is *deterministic*: it will only try one random number; if it doesn't work, the call fails.
* `[RandomIntegerExclusive `*min*`  `*max*`  `*random*`]`  
Sets *random* to a random integer (whole number) such that *min* $<=$ *random* $<=$ *max*.  It is *deterministic*: it will only try one random number; if it doesn't work, the call fails.
* `[RandomIntegerInclusive `*min*`  `*max*`  `*random*`]`  
Sets *random* to a random integer such that *min* $<=$ *random* $<$ *max*.  It is *deterministic*: it will only try one random number; if it doesn't work, the call fails.

## Notes

[^1]: The name comes from the fact that it can generate numbers that aren't whole numbers.  These are known as "floating-point" numbers or `float`s in most programming languages.  