---
pagetitle: Kinds of relationships
status: alpha
---
Just as you can say that one noun is a special case of another noun by using the `is a kind of` construction, you can tell the system that one verb is a special case of another using the `is a way of` construction:
```imaginarium
Being friends with is a way of knowing
Being coworkers with is a way of knowing
```
This tells the system that if $A$ `is friends with` $B$ or `is coworkers with` $B$, then $A$ also `knows` $B$.  As with the `kind of` construction, if a verb has special cases like this, then the system will make sure that exactly one special case applies.  In this case, if two characters know each other, they must also be friends with or coworkers with one another, but they cannot be both.
