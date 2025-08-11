---
pagetitle: Matching variable-length lists (technical)
status: alpha
---
This is somewhat technical and is only used in advanced Step code.  So non-programmers may want to skip over it, at least on a first reading.

Previously, when we've pattern-matched tuples, we've written down all the elements of the tuple:
```step
Mention [delusion ?who ?fact]: ?who’s crazy belief that ?fact.
Mention [Friends ?a ?b]: ?a and ?b are friends.
```
That's fine, but it means we need to know in advance how many elements there will be.  As you've seen, when tuples are used to represent **lists** of things, their lengths can be unpredictable.  How do we match lists of unknown length?

## Matching the beginning of a list

There's a special notation for matching variable-length lists:
```step
[ a | ?rest ]
```
This matches any list whose first element is the string `a`, and whose remaining elements  are the list `?rest`.[^1]   So if we match `[a | ?rest]` to the list `[a b c]`, it matches, and we get `?rest = [b c]`.  If we match it to the list `[a b c d]`, it still matches but now `?rest = [b c d]`.  But we can't match it to `[d c b a]` because their first elements are different.

We can specify a variable for the first argument:
```step
[ ?first | ?rest ]
```
This will match any list (any tuple) with at least one element.  If we match it to `[a b c]`, we get `?first = a`, `?rest = [b c]`.  But if we match it to `[a]`, we get `?first = a`, `?rest = []`, the **empty list** of no elements.

We can also specify multiple starting elements:
```step
[ a b c ?fourth | ?rest ]
```
This will match any list with at least four elements, the first three of which are `a`, `b` and `c`.  It will match `?fourth` to the 4th element and `?rest` to the remaining elements.

## Appending lists

We can use pattern matching to write standard list operations.  For example, we can write a predicate, `Append` that is true when its last argument is its first argument joined with its second argument:
```Step
# Try: [Append [a b c] [d e f] ?]
[predicate]
Append [] ?list ?list.
Append [?first | ?rest]  ?list  [?first | ?restAndList]: [Append ?rest ?list ?restAndList]
```
This is the standard definition for append you might see in a book on a language like Lisp, Racket, or Clojure.  Its methods say:
* Appending any `?list` to the empty list `[]` just gives you `?list`
* Appending `?list` to any other list gives you the first element of the other list followed by whatever you get when you append `?list` to the rest of the other list.

What's fun about this, and different from languages like Lisp, is that since Step (mostly) doesn't distinguish between parameters that are inputs and parameters that are outputs, we can run this "backwards."  If we call:
```step
[Append [a b c] [d e f] ?]
```
which asks "what do we get if we join `[a b c]` and  `[d e f]`?", we get:
```step
? = [a b c d e f]
```
as expected.  But we can also call:
```step
[Append [a b c] ? [a b c d e f]]
```
meaning "what do we need to add to the end of `[a b c]` to get `[a b c d e f]`?", we get:
```step
? = [d e f]
```
And similarly,
```step
[Append ? [d e f] [a b c d e f]]
```
meaning "what do we need to prepend to `[d e f]` to get `[a b c d e f]`?" gives us:
```step
? = [a b c]
```
`Append` is the goto example people use for logic programming because it has this nice property that you can choose any of its parameters to be the output. 

## Notes

[^1]: *Esoteric*: this is suggestive that tuples/lists are represented as linked lists internally.  And in conventional logic programming languages, this is true.  However, Step is made to interface with game engines and this kind of processing isn't very common in Step code anyway.  So Step uses arrays to represent tuples (in particular the C# `object?[]` type) by default and converts between that and linked lists as needed.