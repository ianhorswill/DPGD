---
pagetitle: Magic
---
Let's add some more information to our cats and dogs example:
```step
[predicate]
Dog benji.
Dog lassie.

[predicate]
Cat morris.
Cat garfield.
Cat acoustic_kitty.

[predicate]
Animal ?x: [Dog ?x]
Animal ?x: [Cat ?x]

[predicate]
Human jason_bourne.

[predicate]
Spy acoustic_kitty.
Spy jason_bourne.
```
This is the same as before.  We just added an extra cat (`acoustic_kitty`), a human (`jason_bourne`) and declared them both to be spies.[^1]

## Interacting calls

Suppose we run:
```step
[Animal ?who] [Spy ?who] 
```
We already talked through how `[Animal ?who]` generates the answer `?who=benji`.  But if we then run `[Spy benji]`, that fails.  So what happens?  The answer is we don't get `?who=benji`, we get `?who=acoustic_kitty`.  We'll explain how it does that in a moment.  However, the guiding principle here is:

> Find values for variables that make *all* the calls succeed

Step will always leave you with values for the variables for which all calls succeed.  It's possible for it to fail because it missed a value for a variable that would work, but it will never give you a value for a variable that doesn't work in every call.

## Endnotes


[^1]: [Acoustic Kitty](https://en.wikipedia.org/wiki/Acoustic_Kitty) was a 1960s CIA program to use cats to spy on the soviets.  It worked as well as you would imagine.