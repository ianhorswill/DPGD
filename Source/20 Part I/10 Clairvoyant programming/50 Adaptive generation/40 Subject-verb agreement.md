---
pagetitle: Subject-verb agreement
status: alpha
---
Now we have a new problem, though.  When we run `[Introduce diana]`, it will print “Diana Ratcliffe is 34 years old.  She are a titan of industry.”  We don’t want “are” there, we want “is”.  But Bill goes by “they” so we still want to be able to generate “are” when talking about them.  So we need to keep track of some more context information.  In particular, we need to track whether the subject is in third person singular (he/she/it/Diana) or third person plural (they).
To do this, we just change the definition of `Mention` a little:
```step
Mention They:
  [PreferredPronoun They ?pronoun] [Write ?pronoun] [SetInflection ?pronoun]
[end]

Mention (Character ?c):
  ?c/GivenName+FamilyName
  [set They = ?c] [set ThirdPersonSingular = true]
[end]
Mention ?anythingElse: [Write ?anythingElse] [set ThirdPersonSingular = true]
SetInflection they: [set ThirdPersonSingular = false]
SetInflection ?: [set ThirdPersonSingular = true]
```
This will set `ThirdPersonSingular` to true any time we Mention something unless we end up using the pronoun “they”.  Now we just write a task, `Is`, to print either “is” or “are” depending on what inflection we need:
```step
Is: [ThirdPersonSingular] is
Is: are
```
This says that when running `Is`, we print “is” for third person singular, and “are” otherwise.  This ignores a bunch of other things like first person, but we’ll leave that for another day.

Finally, we change our text from always saying “is” to instead calling the smart task `Is`:
```step
Introduce ?who:
  ?who is ?who/Age years old. ?who [Is] a ?who/Occupation.
[end]
```
Now this will generate the right text for any character, regardless of pronouns.

