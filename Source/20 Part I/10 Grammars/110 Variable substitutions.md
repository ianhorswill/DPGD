---
pagetitle: A nice shorthand
---
You may have noticed by now that lines such as:
```step
Give ?giver ?giver ?item: ?giver gave [Reflexive ?giver] ?item
```
can take some work to read.  The formatting makes it somewhat easier, but the code is still messy and confusing.  For a method like this, there isn’t a whole lot that can be done to improve it.  But there is a useful shorthand that slightly improves this method and is quite useful for long passages of text with a few tasks embedded in them.

Here’s the shorthand: rather than saying `[Task ?variable]`, you can just say `?variable/Task`.  So we can simplify the above method to:
```step
Give ?giver ?giver ?item: ?giver gave ?giver/Reflexive ?item
```
Again, not a huge improvement.  But it makes a different when you’re writing big chunks of text.
