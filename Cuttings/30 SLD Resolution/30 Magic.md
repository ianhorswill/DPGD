---
pagetitle: Magic
---
The magic of logic programming comes when we use multiple calls to ask complex questions.

Let's look at a slightly more complex example of our dog and cat example.  First, let's add some more information to our cats and dogs example.  We're just going to add an extra cat (`acoustic_kitty`[^1]), a human (`jason_bourne`) and declared them both to be spies:
```Step
# Try: [Animal ?who] [Spy ?who] 
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
If we query `[Animal ?who] [Spy ?who]` against the code above, it will run `[Animal ?who]`, and then run `[Spy ?who]`.  A variable can only have one value, so the only way this can work is if it finds a value for `?who` that is both an animal *and* a spy.  There's only one spy animal in the database, so it reports `?who=acoustic_kitty`.  Try it now (click the code to open it in Step).

## Sequences of calls effectively mean "and"

Just as `[Animal ?who]` effectively means "find me an animal" and `[Spy ?who]` effectively means "find me a spy", the sequence `[Animal ?who] [Spy ?who]` effectively means "find me someone who is an animal **and** a spy."

## The laws of magic

Classical logic programming languages make two guarantees to you: if you ask it to find values of variables, and it succeeds, then the values it gives you are correct.  And subject to some fine print, if it fails, then there are no correct values to be found.

For the moment, *how* it finds these is irrelevant.  As a programmer, you get to assume it will find them if they exist.

### The fine print (technical)
Here's the full version with the fine print:

* **Soundness**: if a program succeeds and reports values for its variables, then every call in the program works with those values.  For example, 
if you run `[A ?x] [B ?x] [C ?x]`, etc. and it reports `?x=7`, then `[A 7]`, `[B 7]`, and `[C 7]` are all true.
* **Completeness**: for simple programs[^2], if there's a set of values you that will make the query work, it will find one.

## Notes


[^1]: [Acoustic Kitty](https://en.wikipedia.org/wiki/Acoustic_Kitty) was a 1960s CIA program to use cats to spy on the soviets.  It worked as well as you would imagine.
[^2]: *Esoteric*: as you might have guessed, the phrase "for simple programs" is doing a lot of work here.  A program is simple in this sense if it doesn't use recursion, and only calls predicates defined by methods.  Such a program is called a **definite** program.  Improperly written recursions can cause it to miss answers that would make it work if the recursions were written properly.  And there are a number of "primitive" predicates that are written in C# rather than through methods.  Many of these do not give completeness guarantees, and so anything that calls them isn't guaranteed complete.  The really problematic one here is that the `Not` primitive, used for asking when something is false, is not complete.  There were literally 30 years of Ph.D. dissertations on trying to deal with the recalcitrance of `Not`.