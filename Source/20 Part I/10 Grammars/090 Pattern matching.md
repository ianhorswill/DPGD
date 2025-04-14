---
pagetitle: Patterns of parameters
---
Suppose we want to have a phrase/task that prints out statements of the form `?a gave ?b the ?c`.  We could do this with a task with three parameters:
```Step
# Try: [Give “Mary” “Jill” “a red rose”]
Give ?giver ?receiver ?item:
   ?giver gave ?receiver ?item.
[end]
```
If you then say:
```step
[Give “Mary” “Jill” “a red rose”]
```
it responds:

> Mary gave Jill a red rose.

But if we say:
```step
[Give “Mr. Boss” “Mr. Boss” “a nice raise”]
```
it responds:

> Mr. Boss gave Mr. Boss a nice raise.

Which isn’t fluent.  We can fix this by having another method that specifically detects the case of someone giving something **to themself**:
```Step
# Try: [Give “Mr. Boss” “Mr. Boss” “a nice raise”]
Give ?giver ?giver ?item: ?giver gave themself ?item
Give ?giver ?receiver ?item: ?giver gave ?receiver ?item.
```
If you don’t tag a task with `[randomly]`, then Step will always try its methods in the order they appear in the file.  But because the first method lists
`?giver` for both its first and second parameters, it can only run when its first two parameters are the same.  In the Mr. Boss example, they are, and so we get:

> Mr. Boss gave themself a nice raise.
    
But in the Mary/Jill example, the parameters can’t match to that first method.  So Step abandons that method and moves on to the next method, which works properly.
