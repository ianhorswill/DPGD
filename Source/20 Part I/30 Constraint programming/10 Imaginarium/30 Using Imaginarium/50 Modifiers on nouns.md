---
pagetitle: Modifiers on nouns
status: alpha
---
You can attach modifiers (adjectives and other nouns) to nouns in most of the places you can use nouns.  For example:
```imaginarium
Angry cats are dangerous
```
Tells the system that `cats` are `dangerous` when they are also `angry`.  But doesn’t say that non-`angry` `cats` need be `dangerous` or non-`dangerous`.  Right now there’s no construction like `cats are dangerous only when they’re angry`.  But you could achieve the same end in this case, but adding:
```imaginarium
Angry cats are dangerous
Dangerous cats are angry
```
These two statements together would specify that `cats` are `dangerous` if and only if they’re `angry`.
