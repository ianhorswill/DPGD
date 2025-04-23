---
pagetitle: Pattern matching in detail
---
# Under construction

#nopublish
When you run a task, also known as calling the task, the system searches for a method that matches the parameters of the call.  In particular, it matches the parameters of the call to the part of the method before the colon, known as its head.  The head of the method:
```step
SomeTask 1 ?x: Bla bla bla
```
is the part that says `SomeTask 1 ?x:`.  It’s the part that specifies what parameters this method is appropriate for.  Parameters can either be variables, such as `?x`, that match anything or specific values that such as `1`, `john`, or `“Some quoted text”`.  Things that aren’t variables are called **constants**.  Constants can only match to themselves: 1 matches 1, but not 2; john matches john, but not 1 or 2.

## Examples 

### All constants

```step
SomeTask 1 2: bla bla bla
```
Will only match a call with `1` and `2` for the parameters.

### Mixing constants and variables

```step
SomeTask 1 ?x: bla bla bla
```
Will match any call that has `1` for the first parameter.  The second parameter doesn't matter since `?x` can match anything.  However, `?x` will get set to whatever the second parameter is.
```step
SomeTask ?x 1: bla bla bla
```
Will match any call that has `1` for the second parameter, and `?x` will be set to the first parameter.

### All variables

```step
SomeTask ?x ?y: bla bla bla
```
Will match any call at all.  `?x` will be set to the first parameter, and `?y` the second.
```step
SomeTask ?x ?x: bla bla bla
```
Will match any call at all in which *the two parameters are the same*.  `?x` will be set to that shared value.

The last example here brings up an important point: if a variable appears more than once in a method, it must have the same value each time.

Let’s look at which methods each of the following calls would match.  To save space, I’ve changed the name of the task from `SomeTask` to just `Task`:

|            |	`Task 1 2:`	|`Task 1 ?x:`	|`Task ?x 1:`	|`Task ?x ?y:`       |	`Task ?x ?x:`|
|----------- |--------------|---------------|---------------|------------------- |------------   |
|`[Task 1 1]`|	No          |	Yes: `?x`=1	| Yes: `?x`=1	|Yes: `?x`=1, `?y`=1 |	Yes: `?x`=1  |
|`[Task 1 2]`|	Yes         |	Yes: `?x`=2	|No	            |Yes: `?x`=1, `?y`=2 |	No           |
|`[Task 1 3]`|	No	        |Yes: `?x`=3	|No	            |Yes: `?x`=1, `?y`=3 |	No           |
|`[Task 2 1]`|	No          |	No          |	Yes: `?x`=2	|Yes: `?x`=2, `?y`=1 |	No           |
|`[Task 2 2]`|	No          |	No          |	No          |Yes: `?x`=2, `?y`=2 |	Yes: `?x`=2  |
|`[Task 2 3]`|	No	        |No             |	No          |Yes: `?x`=2, `?y`=3 |	No           |
