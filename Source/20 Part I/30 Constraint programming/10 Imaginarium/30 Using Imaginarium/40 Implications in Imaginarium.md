---
pagetitle: Implications
status: alpha
---
There are a number of other kinds of things you can tell Imaginarium.  Probably the most important of these are various forms of implication.  For example, you can tell it that certain adjectives always apply to certain kinds of entities:
```imaginarium
Persians are long-haired
Main coons are large and long-haired
```
You can also state implications for verbs.  If you say:
```imaginarium
People can know each other
People can be friends with each other
People can love other people 
Being friends with implies knowing
Loving implies knowing
```
You’re saying that `knowing` is a symmetric relation (if $A$ `knows` $B$, then $B$ `knows` $A$), and so is `being friends with`.  Moreover, you can’t `be friends with` someone without `knowing` them.  But `love` is a relation that *isn’t* necessarily symmetric: $A$ can `love` $B$, without $B$ `loving` $A$.  But `love` still implies `knowing`.  So if $A$ `loves` $B$, then $A$ `knows` $B$, and so $B$ `knows` $A$, but $B$ may or may not `love` $A$ ☹.
