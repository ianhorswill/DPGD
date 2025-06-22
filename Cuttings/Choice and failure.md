If you're new to programming, I'd suggest you skip to the next page at this point.  But experienced programmers curious what a nondeterminism would look like in a conventional language, read on.

## Choice and failure (technical)

As we [discussed earlier](part_i), an `if` statement combines the options available with guidance on how to choose between them.  This is inconvenient for problems involving delayed feedback.  Nondeterministic languages provide a way of breaking those functions apart, so that the guidannce can come *after* the choice.  These are typically described in terms of **choice**, where the program guesses which option is best, and **failure**, which tells the system that a previous choice was incorrect.  It's the system's job to try different sequences of choices until it can find a way to run the program without failure.  But as a programmer, you think of the system as always guessing right.

Concretely, we could make a nondeterministic version of C# (or C, C++, Python, etc.) by adding a new statement, `choose`, which is basically a `switch` statement without a control variable:
```C#
choose {
    option: // do something
    option: // do something else
}
```
Or we could instead add a `choose` expression that chooses and element of an array and returns it:
```C#
var element = choose myArray;
```
A `choose` with no options always fails.  It tells the system that this execution path make an incorrect choice along the way, so the system should try a different one. It's common to add a separate `fail` to signal failure more clearly, but you can think of it as a shorthand for either `choose {}` or `choose myArray` where `myArray` has no elements.   

Using `choose`, the algoritm to find a node in a tree with some property `P` is then just:
```C#
Node FindP(Node n) => P(n) ? n : FindP(choose n.Children);
```
In other words: "if `n` is the node we're looking for return it, otherwise choose the correct child and recurse on it."  We pretend it always chooses the correct child even though, under the hood, the implementation of clairvoyant choice would be doing a tree search.

This isn't the most impressive example; tree searches aren't difficult to write.  But as you will see in the coming pages, we can use clairvoyant choice to implement logical inference, parsers, planners, and natural language generators.
