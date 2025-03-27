---
pagetitle: Mentioning
---
In fact, even just saying `?item` on the right hand side, is actually shorthand for `[Mention ?item]`.  So the method above is really shorthand for:
```step
Give ?giver ?giver ?item:
   [Mention ?giver] gave [Reflexive ?giver] [Mention ?item]
[end]
```
The only reason this matters is that it means you can control how things are printed by giving different methods for `Mention`.  This is super useful, as we’ll talk about shortly.
