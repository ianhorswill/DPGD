---
pagetitle: "Okay, it's not magic"
shorttitle: Behind the magic
---
Note to non-programmers: you may want to skip this.


Again, here's our cats, dogs, and spies example:
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

## Predicates can have many solutions

Normal tasks can only succeed; failure is an error.  Predicates are special in that they're allowed to fail.  But they're also special in that they're allowed to **succeed more than once**.  The call `[Dog ?x]` has two different solutions: `benji` and `lassie`.  The call `[Cat ?x]` has `morris`, `garfield`, and `acoustic_kitty`.  And the call `[Animal ?x]` has all five: `benji`, `lassie`,`morris`, `garfield`, and `acoustic_kitty`.

Predicates only find one solution at a time.  So when we call `[Dog ?x]`, we get `?x=benji` as we said.  But the predicate remembers where it left off, so that if it needs to find an alternate solution, it can continue executing.

## Chained calls are nested loop

When we run:
```step
[Animal ?who] [Spy ?who] 
```
It really means:

* For each solution to `[Animal ?who]`
    * Check if `[Spy ?who]`
        * If so, succeed

It gets run as nested loops.

## Backtracking

it really tries each solution to the first call, until it finds a solution to the second.  So the internal execution looks like this:

* Run `[Animal ?who]`
    * Animal tries its first method
        * That method runs `[Dog ?who]`
            * `Dog` succeeds with `?who=benji`
            * So `Animal` succeeds with `?who=benji`
                * Run `[Spy benji]`
                    * That fails
            * Restart `[Animal ?who]`, which restarts `Dog`
            * It picks up where it left off, giving us `?who=lassie`
               * Run `[Spy lassie]`, it fails again
            * Restart `[Animal ?who]`, which restarts `Dog`
                * `Dog` has run out of methods, so it fails
        * So `Animal`'s first method fails
    * Animal tries its second method
        * That method runs `[Cat ?who]`
            * `Cat` succeeds with `?who=morris`
            * So `Animal` succeeds with `?who=morris`
                * Run `[Spy morris]`
                    * That fails
            * Restart `Animal`, which restarts `Cat`, which yields `?who=garfield`, which also doesn't work
            * Restart `Animal`, which restarts `Cat`, which yields `?who=acoustic_kitty`
                * Run `[Spy acoustic_kitty]`
                    * Success!

