---
pagetitle: Variables
---
We’ve carefully stepped around the question of what “?who” means in the methods above.  You may have guessed that it’s a placeholder that can be filled in when Greet is called, and then used in the text template to fill in blanks.  These placeholders are called **variables**.  In particular, they’re called “local variables” because if two different methods both have a variable named ?who, they’re treated as different variables so they don’t interfere with one another (if you don’t get why that might be an issue, don’t worry about it).

To print the text in a variable, just list it on the right-hand side of the colon in a method:
```step
Greet ?who: Good evening, ?who.
```
Variables can also be used passed on as parameters to other tasks.  For example:
```step
MissionBreifing ?who ?mission:
   [Greet ?who] Your mission, should you decide to accept it, is to ?mission.
[end]
```
This task takes two parameters, who we’re briefing (?who), and what their mission is (?mission).  If we run:
```step
[MissionBriefing “Mr. Phelps” “save the world from fascism”]
```
It will start by calling Greet with ?who as its parameter.  But ?who is just a placeholder for “Mr. Phelps”.   So the system prints “Good evening, Mr. Phelps.”  Then it prints the “your mission” stuff and finally the mission and a period.  So we get:

> Good evening, Mr. Phelps.  Your mission, should you decide to accept it, is to save the world from fascism.

Notice, by the way, that we named this task `MissionBriefing` and not “`Mission briefing`”.  The reason for that is that if we put a space in the middle of the task name, Step would think it was named `Mission` and `briefing` was a parameter to it.  So variables and task names can’t have spaces in them.  Parameters can, but only if you use quotation marks to make clear that you mean the words in quotation marks as a single parameter.
