---
pagetitle: Tasks and methods
---
We’ve implicitly introduced a few different ideas here.  One is the idea you can write “little programs” like `Hello`.  The official term for these is **tasks**.  A task is something you can ask the system to do.  Tasks are named.  The task we’ve been talking about is called `Hello`.  Task names have to start with a capital letter.

We’ve also seen that you can specify how to do a task by giving the name of the task, a colon, and then some text to print.  But you can specify many different ways to carry out a task.  Each of these lines that explain how to perform a task is called a **method**.  So a method is a line that looks like:
```step
TaskName: stuff to print
```
However, it’s too limiting to require a method to fit on one line, so you can split it across many lines by ending the line at the colon and then putting in as many lines of text as you like, ending with the magic keyword, `[end]`.  So we can have a long method for saying Hello by saying:
```step
Hello:
   Uh, yes.  Hello.  My name is, uh, Roylance.  Uh, Richard.  Richard Roylance.

   Yes.

   So, um, I’m here for the, um…

   Yes, that’s right.  The public speaking course.
[end]
```
The last thing we’ve seen so far are little annotations that can be attached to methods to change how they behave.  In particular, we’ve seen `[randomly]`, which states that the methods for the task being defined should be tried in random order.  We’ll see a bunch of other annotations shortly.
