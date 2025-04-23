---
pagetitle: Matching variables with variables
---
# Under construction

#nopublish
In the table above, we only included variables in the method heads, not in the calls.  But you can include a variable in a call too.  This behaves differently, depending on whether the system has already matched that variable to a value.  If we say `[Task ?a 2]` but the system has already matched `?a` to `1`, then we’re really just doing `[Task 1 2]`, and we can use the previous table.  But if the system has never matched `?a` to anything, then `?a` can be matched freely.  That means three things:

* Specifying the variable in the call doesn’t restrict the methods that can be used, since it will match anything
* The variable in the call can be given a value by the method being called, as a result of the matching.
* The matching process can result in the system deciding that two variables must have the same value, without yet having a value for either (see below).

Let’s look at what does and doesn’t match when we put variables in the call:

|              |`Task 1 2:`       |`Task 1 ?x:`         |`Task ?x 1:`           |`Task ?x ?y:`           |`Task ?x ?x:`|
|------        |-----------       |---------            | ---------             |-----------             |-----------  |
|`[Task 1 ?a]` | Yes; `?a`=2      |Yes: `?a`=`?x`       |Yes: `?x`=1, `?a`=2    |Yes: `?x`=1, `?y`=`?a`  |Yes: `?x`=1, `?a`=1 |
|`[Task ?a 1]` |No	              |Yes: `?x`=2, `?a`=1  |Yes: `?a`=`?x`         |Yes: `?x`=`?a`, `?y`=1  |Yes: `?x`=1, `?a`=1 |
|`[Task ?a ?b]`|Yes: `?a`=1,`?b`=2|Yes: `?a`=1,`?b`=`?x`|Yes: `?a`=`?x`,`?b`=1	|Yes: `?x`=`?a`,`?y`=`?b`|	Yes: `?a`=`?b`=`?x`|
|`[Task ?a ?a]`|No	              |Yes: `?a`=`?x`=1	    |Yes: `?a`=`?x`=1	    |Yes: `?x`=`?y`=`?a`	 |Yes: `?x`=`?a` |
  
**FIXTHIS:** Notice that for many of these, specifically the ones in green, the system is able to match the variables, but doesn’t come away from it knowing what the values of some of the variables are.  It only knows that certain variables have have the same values as one another.  It remembers that, so that if it matches either variable to a value in the future, then it will know that both variables must have that value.
