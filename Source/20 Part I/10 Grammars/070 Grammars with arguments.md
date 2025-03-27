---
pagetitle: Grammars with arguments
---
We’ve seen how you can use tasks as templates that fill in parts of themselves using other tasks.  But what if you want them to fill in the blanks using text you specify yourself?  You can do that by adding a parameter to your task.  Parameters are extra information you specify after the name of the task when you run it or write a method for it.  For example, 
```step
[randomly]
Greet ?who: Hello, ?who.
Greet ?who: Hey, ?who.
Greet ?who: Good morning, ?who.
```
This says that Greet takes one piece of extra information, namely who is being greeted.  When you run `Greet`, you specify who should be greeted.  So instead of just typing `[Greet]` to run Step, you’d type something like:
```step
[Greet “Mr. Daniels”]
```
And this would generate text such as “Hello, Mr. Daniels.” or “Good Morning, Mr. Daniels.”  The quotation marks around “Mr. Daniels” are there so that if `Greet` takes more than one parameter, it can tell where the text of one ends and where the text of another begins.  They’re not necessary if the text you specify is in lower case and doesn’t have any spaces in it.  So you can just say:
```step
[Greet dawg]
```
Which is a little less typing than:
```step
[Greet “dawg”]
````
But they both mean the same thing.  Both can generate text such as “Hey, dawg.”

