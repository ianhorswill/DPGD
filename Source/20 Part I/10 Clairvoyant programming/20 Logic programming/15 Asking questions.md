---
pagetitle: Asking questions of predicates
---

Here's a little database of characters and what kinds of cuisine they like.  `[Likes tanya sushi]` means that Tanya likes sushi.  More generally, `[Likes ?who  ?what]` means `?who` likes `?what`: 
```Step
# Try: [Likes tanya sushi]
[predicate]
Likes tanya sushi.
Likes tanya burgers.
Likes tanya mexican.
Likes jayden burgers.
Likes jayden ethiopean.
# Kimiko likes everything
Likes kimiko ?.
# Everyone likes pizza.
Likes ? pizza.
```
You ask a predicate a question by calling it.  It succeeds if the answer is yes.  It fails if the answer is no.  If the answer is yes and one or more of the parameters in the call are variables, it will fill them in with values that make it true.  So we can ask different questions with different patterns of variables in the calls:

|Call                  | Meaning                                 | Result                             |
|----------------------|-----------------------------------------|------------------------------------|
|`[Likes tanya sushi]` | Does Tanya like sushi?                  | Yes (call succeeds)                |
|`[Likes jayden sushi]`| Does Jayden like sushi?                 | No (call fails)                    |
|`[Likes tanya ?]`     | What does Tanya like?                   | `?=sushi` (call succeeds)            |
|`[Likes ? sushi]`     | Who likes sushi?                        | `?=tanya` (call succeeds)            |
|`[Likes ?a ?b]`       | What's something that somebody likes?   | `?a=tanya`,`?b=sushi` (call succeeds)  |

In this case, we've just listed the first solution to the queries that had `?`s.  But if `Likes` were marked `[randomly]`, then it would generate different valid results on different calls:

* `[Likes tanya ?]` could generate: sushi, burgers, Mexican, or pizza.
* `[Likes ? sushi]` could generate Tanya or Kimiko

## Complex queries

Now let's say we have it do multiple calls in a row: `[Likes tanya ?what] [Likes jayden ?what] [Likes kimiko ?what]`.  That's asking: is there a single `?what` that all three of them like?  That has two answers: burgers and pizza.  Try it out now.  You'll find it always answers `burgers`, because that's the first answer in the list.  But if you add `[randomly]` after the `[predicate]` declaration, then it will randomly switch between the two.
```Step
# Try: [Likes tanya ?what] [Likes jayden ?what] [Likes kimiko ?what]
[predicate]
Likes tanya sushi.
Likes tanya burgers.
Likes tanya mexican.
Likes jayden burgers.
Likes jayden ethiopean.
# Kimiko likes everything
Likes kimiko ?.
# Everyone likes pizza.
Likes ? pizza.
```