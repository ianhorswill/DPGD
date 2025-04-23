---
pagetitle: Tasks and methods
---
```step
[randomly]
Hello: Hello world!
Hello: Hola!
Hello: Hi there!
Hello: Bon jour!
```
This is a grammar with one kind of phrase, `Hello`, and several rules for it.  We're representing our grammar as a program in the Step language, and Step is more versatile than just a grammar system.  So let's mention how Step thinks of this program:

* `Hello` is called a **task** in Step terminology. Task just means little program.  Tasks are named, and their names must start with a capital letter.
* Each rule is called a **method** for its task.  Each gives a different way of performing the task.
* The `[randomly]` annotation at the beginning is a **declaration** telling Step something about the nature of the `Hello` task, in this case, to choose methods randomly.

A method (rule for how to perform a task) is a line that looks like:
```step
TaskName: stuff to print
```
However, it’s too limiting to require a method to fit on one line, so you can split it across many lines by ending the line at the colon and then putting in as many lines of text as you like, ending with the magic keyword, `[end]`.  So we can have a long method for saying Hello by saying:
```Step
# Try: [Hello]
Hello:
   Uh, yes.  Hello.  My name is, uh, Roylance.  Uh, Richard.  Richard Roylance.

   Yes.

   So, um, I’m here for the, um…

   Yes, that’s right.  The public speaking course.
[end]
```

## Esoterica

"Task" means basically the same thing as "procedure" or "subroutine" in other languages.  The term "task" is used because Step descends from a line of languages called "hierarchical task network planners", aka HTN planners.  HTNs, for their own reasons, used the term "task" rather than subroutine.  If you already know what an HTN planner is, then Step is a Turing-complete HTN planner.

"Method" means close to the same thing as "method" or "overload" in languages like C++ and C#.  However, unlike those languages, Step allows redundant methods that it will try to choose between intelligently.