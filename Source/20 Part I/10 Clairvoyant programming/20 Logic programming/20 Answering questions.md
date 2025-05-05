---
pagetitle: Predicates answer questions
status: alpha
---

Here's a little database of characters and what kinds of cuisine they like.  We use `[Likes tanya sushi]` to tell the computer that Tanya likes sushi.  More generally, `[Likes ?who  ?what]` means `?who` likes `?what`: 
```Step
# Try: [Likes tanya ?]
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

