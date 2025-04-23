---
pagetitle: Computability
---
Then there are a number of technical issues with declarative programming.  The first is often referred to as [uncomputability or undecidability](https://en.wikipedia.org/wiki/Undecidable_problem): there are valid specifications for problems for which answers exist, but for which there (provably) can be no algorithm to find those answers.

The first and most famous example of this is Turing’s Halting Problem.  The spec is “given a procedure (program) and an inputs for it, say whether it will ever return if called on those inputs.”  That problem is uncomputable: there cannot be a procedure that implements that spec perfectly.  Here's why.  Suppose there were such a procedure:
```C#
bool Halts(Func<int> procedure, int argument) {
    // Do magic to decide if procedure(argument) would ever return
}
```
Then we could write another procedure, call it `Smartass` that worked like this:
```C#
void Smarass(int input) {
    if (Halts(Smartass, input))
        while (false) { }     // Run forever
    else
        return;
}
```
This procedure calls `Halts` to ask it to predict the future: "will I halt?".  Then it does the opposite.  So `Halts` could never give a right answer: whatever answer it gave would be wrong.  So a perfect `Halts` can never exist. That’s not to say we can’t write heuristic programs that do a pretty good job.  But Quicksort *always* sorts the array.  It doesn’t sort it 90% or 99.999% of the time. It’s perfect.  We provably can never have a perfect program for solving the halting program.

So this tells us that there's at least one declarative program we can't write: `Halts`.  But in fact, there are a lot of things we'd like to write, such as "decide if this statement in logic is true" that are also undecidable.[^1]  It's easy for declarative languages to shade into undecidable territory.

## Endnotes

[^1]: In particular, deciding the truth of statements in [first order logic](https://en.wikipedia.org/wiki/First-order_logic), the most commonly used logic, is undecidable.  Simpler logics, such as [propositional logic](https://en.wikipedia.org/wiki/Propositional_calculus), are decidable.