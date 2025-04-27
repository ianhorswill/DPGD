---
pagetitle: What is a solution?
---
Let's return to our dogs, cats, and spies example:
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
When we query:
```step
[Animal ?who] [Spy ?who]
```
We are asking the system to find a way to execute this query such that it succeeds rather than fails.  That means making a series of clairvoyant choices about what methods to choose for each call such that:

* The parameters of each call match the parameters of the chosen method
* Each variable has a consistent value throughout execution: we never ask a variable to have two different values at once

As we said before, the choices defined by a program form a tree:
```mermaid
graph TB
    a("[Animal ?x]") -- "Animal ?x: [Dog ?x]" --> d("[Dog ?x]")
    style a fill:green
    style d fill:red
        d -- "Dog benji." --> benji("[Spy benji]")  -- "Spy acoustic_kitty." --> f1(fail)
        style benji fill:red
        style f1 fill:red
        benji  -- "Spy jason_bourne." --> f1a(fail)
        style f1a fill:red
        d -- "Dog lassie." --> lassie("[Spy lassie]") -- "Spy acoustic_kitty." --> f2(fail)
        style lassie fill:red
        style f2 fill:red
        lassie -- "Spy jason_bourne." --> f2a(fail)
        style f2a fill:red
    a("[Animal ?x]") -- "Animal ?x: [Cat ?x]" --> c("[Cat ?x]")
        c -- "Cat morris." --> morris("[Spy morris]")  -- "Spy acoustic_kitty." --> f3(fail)
        style morris fill:red
        style c fill:green
        style f3 fill:red
        morris -- "Spy jason_bourne." --> f3a(fail)
        style f3a fill:red
        c -- "Cat garfield." --> garfield("[Spy garfield]") -- "Spy acoustic_kitty." --> f4(fail)
        style garfield fill:red
        style f4 fill:red
        garfield -- "Spy jason_bourne." --> f4a(fail)
        style f4a fill:red
        c -- "Cat acoustic_kitty." --> ak("[Spy acoustic_kitty]") -- "Spy acoustic_kitty." --> s(success)
        style ak fill:green
        style s fill:green
        ak -- "Spy jason_bourne." --> f5(fail)
        style f5 fill:red
```
A solution is an execution of the program that doesn't dead end at a red **fail** node, but rather gets all the way to a green **success** node: a green path.  In this particular example, there's only one successful path, but there are often many possible successful paths.  We generally don't care which one we get.  We just want some successful path and we don't want to have to think about how to find it.