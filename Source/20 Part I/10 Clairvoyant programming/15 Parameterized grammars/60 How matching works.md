---
pagetitle: How matching works
status: alpha
---
In the `Give` example on the previous pages, we talked about calls matching or not matching methods, but we didn't explain how matching worked.  So let's say a little bit about that now.

A call matches a method if every part of the call --- the task and each of the parameters --- match the corresponding part of the method.  So for example, the call:
```step
[Give "Mary" "Jill" "a nice raise"]
```
Doesn't match the method:
```step
Hello ?who: Hello, who!
```
Both because the tasks are different (`Give`≠`Hello`), and because they have different numbers of parameters (three in the call, one in the method).

## Matching a single parameter

Parameters can either be specific values, like `7` or `"a nice raise"`, or variables like `?giver`.  In this code, the first two methods specify values for their parameters, and the last specifies a variable:

```step
Reflexive “Mr. Boss”: himself
Reflexive “Mary”: herself
Reflexive ?who: themself
```

Similarly, a call can specify either a value or a variable for the parameter.

### Matching values to values

When both the call and the method give specific values for a parameter, then they match only if they give the same value.  So the call
`[Reflexive "Mr. Boss"]` matches the first method above, but not the second.[^1]  And the call `[Reflexive "Mary"]` matches the second but not the first.

### Matching variables to values

When one specifies a variable and the other a value, they match.  However, the system **connects** that variable with that value: any subsequent uses of the variable will use that value instead.  So the call `[Reflexive "Mr. Boss"]` matches the third method above, but would connect the method's variable `?who` to the value `"Mr. Boss"`.

Note that the variable doesn't have to appear on the method side.  It can appear in the call instead.  If we do the call `[Reflexive ?x]`, it matches each of the above methods, but also **connects `?x` to the parameter in the chosen method**.  That gives programmers a way not only of calling a task with a parameter that means "I don't care which", but also find out what value was chosen.

### Matching variables to variables

Finally, it's possible for both the caller and the method to list a variable for the parameter, for example when we match the call `[Reflexive ?x]` to the method:
```step
Reflexive ?who: themself
```
When we do this, the match succeeds.  But rather than connecting the variables to a value, we **connect the variables to each other**.  Then, should we connect either to something else in the future, we will be connecting both. 

### Summary

We can summarize all this in a table:

| Method | `[Reflexive "Mr. Boss"]` | `[Reflexive "Mary"]` | `[Reflexive ?x]` |
|--------| --- | ----- | ----|
| `Reflexive “Mr. Boss”: himself` | 🟩 | 🟥 Fail | 🟩 `?x` = `"Mr. Boss"` | 
| `Reflexive “Mary”: herself` | 🟥 Fail | 🟩 | 🟩 `?x` = `"Mary"` | 
| `Reflexive ?who: themself` | 🟩 `?who`=`"Mr. Boss"` | 🟩 `?who`=`"Mary"` | 🟩 `?who`=`?x` | 

Here, a 🟩 means a successful match, and a 🟥 means a failed match.  For those that involve variables, we also list what the variable is connected to.

## Matching multiple parameters

When we match a call with multiple parameters, we just match each parameter in turn.  But since one parameter might connect a variable to a value (or another variable), it can affect the matching of other parameters.[^2]

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

## Matching as an equation

There's a reason we notated the connections between variables and values above as `?x`=`1` or `?a`=`?x`.

A call matches a method if each part of the call is the same as the corresponding part of the method.  But "the same as" is just an informal way of saying "is equal to": the first parameters of the call and method have to be equal, as do the second parameters, and so on. The process of matching is simply one of finding what values for the variables would allow that to be true: it's **solving for** the variables.

When we match a call like:
```step
[Task 1 ?a]
```
Against a method like:
```step
Task ?x ?x: ...
```
We're saying `1` and `?x` must be the same, and that `?a` and `?x` must be the same.  Again, that's the same as saying that they're equal, and so the matching process is really setting up the system of equations:

* `?x` = `1`
* `?a` = `?a`

And then solving for the values of `?x` and `?a`, which tells us that they're both 1.

This can be a useful way of looking at it when we think of how different calls interact with one another, as we'll see in the next section.



## Endnotes

[^1]: It also matches the third, but we'll talk about variables shortly.

[^2]: It turns out not to matter what order the matching is done in, however.  You can match the first parameter first, or you can match it last; you get the same answer regardless.