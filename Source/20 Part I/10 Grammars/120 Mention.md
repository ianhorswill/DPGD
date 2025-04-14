---
pagetitle: Mentioning
---
In fact, even just saying `?item` on the right hand side, is actually shorthand for `[Mention ?item]`.  So the method:
```step
Give ?giver ?giver ?item: ?giver gave ?giver/Reflexive ?item
```
is really shorthand for:
```step
Give ?giver ?giver ?item:
   [Mention ?giver] gave [Reflexive ?giver] [Mention ?item]
[end]
```
This gives us a way to control how things are printed by changing the definition of `Mention`.  This is super useful, and we'll return to it later.
