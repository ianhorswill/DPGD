---
pagetitle: Global variables and set commands
status: alpha
---
Step has two kinds of variables, local and global.  We've mostly discussed local variables, whose names start with a "`?`".  They're "local to" the particular method they appear in, meaning that if two different methods have variables named `?x`, those are different variables in the same way that two people named "Jennifer" are still different people.  Local variables start without a value, acquire a value through matching, and then never change that value.

**Global** variables, whose names start with capital letters, are shared by all methods; hence the term "global."  We'll talk about these now.

## Tasks are stored in global variables

Names like `Siblings` and `Parent` are global variables.  In this case, the values they refer to are tasks, and so we tend to just say "`Parent` is a task", or "`Parent` is a predicate" rather than the pedantically correct "`Parent` is a global variable whose value is a task."  Technically, when we define a method, such as:
```step
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent] [Different ?a ?b]
```
we're telling the system to find the task that `Siblings` refers to and then add a method to that task.  The first time you do that, there is no variable called `Siblings`.  So it makes one, along with a new task with just that one method, and sets `Siblings` to refer to that new task.

When you call `[Siblings bart ?who]`, it looks up the value of `Siblings`, and calls that with `bart` and `?who` as parameters.

## Global variables don't have to be tasks

So global variables aren't wholly unfamiliar to you.  But it turns out you can give them values that aren't tasks; you can set a global variable to any value you like.  For example, in [tracking discourse context](pronouns), we'll show how you can use globals to keep track of what terms different pronouns refer to.

## Making and updating global variables

To store a value into a global variable, you say:
```step
[set Variable = value]
```
Note that `set` is lower-case.

After you run that, the variable will have that new value.[^1]  To give an initial value to a variable, just define a method for the task named `initially`, as in:

```step
initially: [set X = 7]
```

We'll show a more substantive example [shortly](pronouns).  But for the moment, here's an example just to show you that setting values to variables works.  Note that [`Mention`](mention), which we'll talk about shortly, just prints its parameter out.  Give it a try:
```Step
# Try: [Test]
initially: [set X = 0]

Test: [Mention X] [set X = X + 1] [Mention X] [set X = X + 1] [Mention X]
```
It should print:

> 0 1 2

Because first it prints `X`, then adds 1 to it, then prints it again, then adds 1 again, then prints it one last time.

## *Omake*: printing global variables

You can print a local variable like `?x` just by putting it in the list of things to output, as in our example:
```step
Greet ?x: Hello, ?x
```
When Step sees `?x` there, it treats it as a call to [mention](mention): `[Mention ?x]`.  It can do that because it's pretty unambiguous what the author's intention is.[^2]  However, if we wanted to print the value of the global variable `X`, we can't just say:
```step
Greet: Hello, X
```
because Step wouldn't have any way of knowing that X was a global variable to print but Hello was just text to print.  That's why we had to say `[Mention X]` above.  But it's *nice* not to have to say that, so Step allows you to print global variables by putting a `^` before them.  That means we can write the code above like this:
```Step
# Try: [Test]
initially: [set X = 0]

Test: ^X [set X = X + 1] ^X [set X = X + 1] ^X
```

## Endnotes

[^1]: Reminder for experienced programmers: the system behaves as if it only ever runs the one path it finally selects.  So don't worry about other paths making changes to variable values.

[^2]: At least I'm not aware of any human languages in which it would be normal for a '?' to be followed immediately by a letter without an intervening space.

