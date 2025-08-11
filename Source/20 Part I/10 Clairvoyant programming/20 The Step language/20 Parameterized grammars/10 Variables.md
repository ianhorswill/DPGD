---
pagetitle: Variables
status: alpha
---
```Step
# Try: [Greet dude]
[randomly]
Greet ?who: Hello, ?who.
Greet ?who: Hey, ?who.
Greet ?who: Good evening, ?who.
```
So what does **`?who`** mean in the methods above?  It’s a placeholder that can be filled in when `Greet` is called, and then used in the text template to fill in blanks.  These placeholders are called **variables**.[^1] In particular, they’re called “local variables” because if two different methods each have a variable named `?who`, they’re treated as different variables: they don’t interfere with one another.

To print the text in a variable, just list it on the right-hand side of the colon in a method:
```step
Greet ?who: Good evening, ?who.
```
Variables can also be passed on as parameters to other tasks.  For example:
```Step
# Try: [MissionBriefing “Mr. Phelps” “save the world from fascism”]
MissionBriefing ?who ?mission:
   [Greet ?who] Your mission, should you decide to accept it, is to ?mission.
[end]

[randomly]
Greet ?who: Hello, ?who.
Greet ?who: Hey, ?who.
Greet ?who: Good evening, ?who.
```
This task takes two parameters, who we’re briefing (`?who`), and what their mission is (`?mission`).  If we run:
```step
[MissionBriefing “Mr. Phelps” “save the world from fascism”]
```
It will start by calling `Greet` with `?who` as its parameter.  But `?who` is just a placeholder for `“Mr. Phelps”`.  So the system prints “Good evening, Mr. Phelps.”  Then it prints the “your mission” stuff and finally the mission and a period.  So we get:

> Good evening, Mr. Phelps.  Your mission, should you decide to accept it, is to save the world from fascism.

Notice we named this task `MissionBriefing` and not “`Mission briefing`”.  The reason for that is that if we put a space in the middle of the task name, Step would think it was named `Mission` and `briefing` was a parameter to it.  So variables and task names can’t have spaces in them.  Parameters can, but only if you use quotation marks to make clear that you mean the words in quotation marks as a single parameter.

## Technical: Assignment statements

Experienced programmers will be confused by the weird way variables work in Step.  Skip this section if you aren't an experienced programmer.

Step's local variables are unusual: they only get their values through the matching process.  That also means they're *write-once*: you can only give them a value once; then they have that value for all time.

If you're an experienced programmer, you're used to variables you can update endlessly using **assignment statements** `variable = newValue`.  Many languages that support matching, particularly [logic programming languages](logic_programming) like [Prolog](https://en.wikipedia.org/wiki/Prolog) specifically prohibit assignment statements.  [Functional languages](https://en.wikipedia.org/wiki/Functional_programming) are the same way.

There are arguments to be made both for and against assignment statements.  It is true, however, that they don't play well with pattern matching, and pattern is very useful.  So Step has two kinds of variables:

* Local variables, whose names begin with a `?`, get their values from matching and are write-once.[^2]
* Global variables, who names begin with capital letters, behave like variables in traditional languages.  Matching does not change their values, but they can be [updated using assignment statements](global_variables).  We'll talk about this more when we talk about [state](state).

## Notes
[^1]: Apologies to programmers who feel talked down to because they know what a variable is.  This is for those who don't know what a variable is.  But also, be warned that local variables in languages like Step behave wildly differently from variables in regular languages.  You'll see one example on [the next page](pattern_matching), and a much longer discussion in [the next chapter](logic_programming). The next page introduces a technique you probably haven't encountered before.

[^2]: These are often referred to as *logic variables* in the research literature because they were popularized in logic-programming languages.