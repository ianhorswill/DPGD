---
pagetitle: A nice shorthand
status: alpha
---
Unfortunately, lines like these take some work to read:
```Step
# Try: [Give “Mary” “Mary” “a nice raise”]
Give ?giver ?giver ?item: ?giver gave [Reflexive ?giver] ?item

Reflexive “Mr. Boss”: himself
Reflexive “Mary”: herself
Reflexive ?: themself
```
Syntax highlighting makes it somewhat easier, but the code is still messy and confusing.  For a method like this, there isn’t much that can be done to improve it.  But there is a useful shorthand that slightly improves this method and is quite useful for long passages of text with a few tasks embedded in them.

Here’s the shorthand: rather than saying `[Task ?variable]`, you can just say `?variable/Task`.  It's a small change, but it lets us write the method as:
```Step
# Try: [Give “Mary” “Mary” “a nice raise”]
Give ?giver ?giver ?item: ?giver gave ?giver/Reflexive ?item

Reflexive “Mr. Boss”: himself
Reflexive “Mary”: herself
Reflexive ?: themself
```
Again, not a huge improvement.  But it makes a difference when you’re writing big chunks of text.
