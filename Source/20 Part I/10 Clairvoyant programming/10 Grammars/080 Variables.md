---
pagetitle: Variables
---
```Step
# Try: [Greet dude]
[randomly]
Greet ?who: Hello, ?who.
Greet ?who: Hey, ?who.
Greet ?who: Good evening, ?who.
```
So what does `?who` mean in the methods above?  It’s a placeholder that can be filled in when `Greet` is called, and then used in the text template to fill in blanks.  These placeholders are called **variables**.[^1]  In particular, they’re called “local variables” because if two different methods each have a variable named `?who`, they’re treated as different variables -- they don’t interfere with one another.

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
It will start by calling `Greet` with `?who` as its parameter.  But `?who` is just a placeholder for `“Mr. Phelps”`.   So the system prints “Good evening, Mr. Phelps.”  Then it prints the “your mission” stuff and finally the mission and a period.  So we get:

> Good evening, Mr. Phelps.  Your mission, should you decide to accept it, is to save the world from fascism.

Notice we named this task `MissionBriefing` and not “`Mission briefing`”.  The reason for that is that if we put a space in the middle of the task name, Step would think it was named `Mission` and `briefing` was a parameter to it.  So variables and task names can’t have spaces in them.  Parameters can, but only if you use quotation marks to make clear that you mean the words in quotation marks as a single parameter.

## Endnotes
[^1]: Apologies to programmers who feel talked down to because they know what a variable is.  This is for those who don't know what a variable is.  But also, be warned that local variables in languages like Step behave wildly differently from variables in regular langauges.  You'll see one example on [the next page](pattern_matching), and a much longer discussion in [the next chapter](logic_programming). The next page introduces a technique you probably haven't encountered before.