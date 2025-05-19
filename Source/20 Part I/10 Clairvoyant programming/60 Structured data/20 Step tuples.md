---
pagetitle: Tuples in Step
status: alpha
---
The thing is, those `Mention` rules are almost the same: 
```step
Mention helping_humanity_is_important: whether helping humanity is important.
Mention money_is_important: whether money is important.
Mention status_is_important: whether status is important.
```
Rather than treating all these separately, we can unify them all by having a slightly more complex representation of beliefs: when we want to talk about the belief that something is important, we’ll write that in the code as `[important something]`, where `something` is the thing that’s supposed to be important.  Then we can write John and Richard’s beliefs as:
```step
[predicate] [randomly]
Believes john god_exists.
Believes john [important money].
Believes richard god_exists.
Believes richard [important helping_people].
```
By bracketing together the word `important` with the thing that’s important, we tell the system that they come as a unit, and they’re one parameter.  Now we can collapse the different `Mention` rules down to just:
```step
Mention [important ?thing]: whether ?thing is important.
```
Now, as we add more character beliefs about what's important, we don't have to keep adding new `Mention` rules.

These bracketed values are called **tuples** and they let us represent complex data relatively compactly.  The pattern matching process treats tuples largely the way it treats other data objects: if you match a tuple against a variable with no value, the variable is given the tuple as its value.  If you match a tuple against something that isn’t a tuple, that just fails, since they’re different.  The only thing that’s slightly complicated is that when you match tuples with one another: then they must have the same number of elements and those elements need to match.  So we can’t match `[important money]` to `[important]`, but we can match `[important money]` to `[important ?thing]` by setting `?thing` = `money`.
