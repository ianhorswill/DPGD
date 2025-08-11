---
pagetitle: Clairvoyant languages in real life
status: alpha
---
We began with NDScript for two reasons.  First, it's a "normal" language with just `choose` and `fail` added to it.  So if you already know normal languages, there isn't a lot more to learn.  Second, the pseudocode for "nondeterministic algorithms" that often appeals in textbooks and the research literature basically looks like NDScript code.  So NDScript lets you try running them directly without having to convert them into deterministic search algorithms.  In [Part II](part_ii), we'll generally start by giving the nondeterministic version of an algorithm first and then discuss different strategies for converting it into a normal deterministic algorithm.  So learning reading code with `choose` and `fail` is valuable.

That said, it's difficult to find a language like NDScript in use in real life.  I'm guessing that's largely for implementation reasons.  It's hard to compile an optimized version of NDScript that's competitive with C.  Any time the program makes any kind of change (print statement, assignment statement, procedure call), the compiler has to be prepared for it to be backtracked.  That means it has to either save a new "copy" of the system state[^functionalData] or keep a log of all the things that it has to undo if you backtrack[^trailing].

We'll now move to *Step*, a much more powerful language that's more like the languages you see in real life.  It has clairvoyance, but no explicit `choose` operation.  Instead, it lets you specify multiple, redundant methods for a given task.  When you call a task, it clairvoyantly guesses the correct one to use.

But there are a lot of other things that are *also* different from "normal" languages, but that aren't directly related to clairvoyance:

* It can **match** expressions to other expressions.  For example, if you match the expression `[Color grass ?]` to the pattern `[Color grass green]`, the matching process assigns `green` to the variable `?`.
* Matching is used for procedure calls.  When you call a task, it tries to match the arguments in the call to the arguments in the method.  It only tries methods that match.
* Calls don't return values because the matching process lets you pass data in both directions (both inputs and outputs).  So the system doesn't prejudge what arguments are inputs or outputs.  On a good day, this lets you write code that can be run normally (specify inputs get output) or "backwords" (specify out, get the inputs that would generate it).
* All of this pushes you toward a mostly functional style of programming.

All this ends up being very useful for AI, but it's also why we didn't muddy the waters by starting with it.

Let's start it now.

## Notes

[^functionalData]: This is less awful than it sounds.  You use so-called ["immutable"](https://learn.microsoft.com/en-us/dotnet/api/system.collections.immutable) or "functional" data structures.  These avoid making a full copy, and you only pay an $O(\log n)$ cost for each update.  But that's still a lot more expensive than just writing memory directly.  This is the approach used in NDScript and Step.

[^trailing]: This is the implementation technique generally used in compiled logic programming languages.  It keeps a stack of things it needs to undo, called the **trail** and whenever it backtracks, it does the things specified on the trail.  That's a very efficient loop in logic programming because the only state change is giving a value to a previously undefined variable.  So the trail is just a stack of variables to un-define.