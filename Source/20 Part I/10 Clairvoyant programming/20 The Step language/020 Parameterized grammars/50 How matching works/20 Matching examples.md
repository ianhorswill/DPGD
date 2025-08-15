---
pagetitle: Matching examples
status: alpha
---
We can summarize all this in a table:

| Method | `[Reflexive "Mr. Boss"]` | `[Reflexive "Mary"]` | `[Reflexive ?x]` |
|--------| --- | ----- | ----|
| `Reflexive “Mr. Boss”: himself` | 🟩 | 🟥 Fail | 🟩 `?x` = `"Mr. Boss"` | 
| `Reflexive “Mary”: herself` | 🟥 Fail | 🟩 | 🟩 `?x` = `"Mary"` | 
| `Reflexive ?who: themself` | 🟩 `?who`=`"Mr. Boss"` | 🟩 `?who`=`"Mary"` | 🟩 `?who`=`?x` | 

Here, a 🟩 means a successful match, and a 🟥 means a failed match.  For those that involve variables, we also list what the variable is connected to.

## Matching multiple parameters

When we match a call with multiple parameters, we just match each parameter in turn.  But since one parameter might connect a variable to a value (or another variable), it can affect the matching of other parameters.

### Easy case

When we match the call `[Give "Mary" "Jill" "a nice raise"]`
against the method:
```step
Give ?giver ?receiver ?item: ?giver gave ?receiver ?item.
```
Each variable is in a different parameter, so matching is easy:

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | `"Mary"`    | `"Jill"`    | `"a nice raise"` |
| Method | `Give` | `?giver`    | `?receiver`    | `?item` |
| Connection| 🟩  | 🟩 `"Mary"` = `?giver` | 🟩 `"Jill"` = `?receiver` | 🟩 `"a nice raise"` = `?item` | 

### Matching between parameters

What if we match the same call against the *other* method:
```step
Give ?giver ?giver ?item: ?giver gave [Reflexive ?giver] ?item
```
Then we have a problem.  Parameter 1 wants to connect `?giver` wtih `"Mary"` and parameter 2 wants to connect it with `"Jill"`.
It can't do both, so the match fails:

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | **`"Mary"`**    | **`"Jill"`**    | `"a nice raise"` |
| Method | `Give` | **`?giver`**    | **`?giver`**    | `?item` |
| Connection|🟩 `Give`=`Give` | 🟥 `"Mary"` = `?giver` | 🟥`"Jill"` = `?giver` |🟩 `"a nice raise"` = `?item` | 

On the other hand, the call `[Give "Mary" "Mary" "a nice raise"]` works fine, because both parameters want to connect `?giver` to the same value:

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | `"Mary"`    | `"Mary"`    | `"a nice raise"` |
| Method | `Give` | `?giver`    | `?giver`    | `?item` |
| Connection| 🟩`Give`=`Give` | 🟩`"Mary"` = `?giver` |🟩 `"Mary"` = `?giver` |🟩 `"a nice raise"` = `?item` | 

### Fancy example

Now let's match against the same method, but change the call slightly: 
```step
[Give "Mary" ?somebody "a nice raise"]
```
we might do this because we want to print something about Mary giving someone a raise, but we don't care about who.  This matches:

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | `"Mary"`    | `?somebody`    | `"a nice raise"` |
| Method | `Give` | `?giver`    | `?giver`    | `?item` |
| Connection| 🟩`Give`=`Give` | 🟩`"Mary"` = `?giver` | 🟩`?somebody` = `?giver` | 🟩`"a nice raise"` = `?item` | 

It connects the `?giver`, `?somebody` and `"Mary"` all together.

## Matching summary

Here's table of the matching results between different kinds of calls and different kinds of methods.  To save space, We'll just use two parameters and name it `Task`:

| Method          |`[Task 1 1]`   |`[Task 1 2]`        | `[Task 1 ?a]`       |`[Task ?a ?b]`       |`[Task ?a ?a]`|
|------           |------------   | -----------         |---------            | ---------           |-----------             |
|`Task 1 2: ...`  |🟥            |🟩                  |🟩`?a`=2           |🟩`?a`=`1`, `?b`=`2`  |🟥    |
|`Task 1 ?x: ...` |🟩`?x`=`1`    |🟩`?x`=`2`         |🟩`?a`=`?x`	    |🟩`?a`=`1`, `?b`=`?x` |🟩`?a`=`?x`=`1` |
|`Task ?x y: ...` |🟩`?x`=`y`=`1`| 🟩`?x`=`1`, `?y`=`2`|🟩`?x`=`1`, `?b`=`?y`|🟩`?a`=`?x`, `?b`=`?y`|🟩`?a`=`?x`=`y` 	|
|`Task ?x ?x: ...`|🟩`?x`=`1`    |🟥                  |🟩`?a`=`?x`=`1`    |🟩`?a`=`?x`=`?b`	  |🟩`?a`=`?x` 	    |
