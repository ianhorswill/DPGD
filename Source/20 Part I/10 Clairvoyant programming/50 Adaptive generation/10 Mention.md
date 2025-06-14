---
pagetitle: Customizing output using `Mention`
status: alpha
---
Let’s return to our `Greet` example that says hello to someone:
```step
Greet ?who: Hello, ?who.
```
Now, if we run `[Greet bill]`, it will print “Hello, bill.”  That’s fine, except we’d kind of like it to capitalize Bill.  We can’t just say `[Greet Bill]`, because within `[ ]` code, capitalized words are names of tasks, and Step will complain there’s no task named `Bill`.   So in the code, we use `bill` to refer to Bill the character.  But we’d like some way to tell the system to print bill as “Bill”.  Enter the `Mention` task.

When you tell the system to print the value of a variable by putting its name inside the text, like this:
```step
Greet ?who: Hello, ?who.
```
That’s actually a shorthand for a call to a task called `Mention`.  What Step actually executes is:
```step
Greet ?who: Hello, [Mention ?who].
```
If you don’t give the system a definition for `Mention`, it just treats it as a synonym for `Write`, a task that just prints its parameter verbatim.  But you can provide your own definition of `Mention` to customize its behavior.  For example, we can say:
```step
Mention bill: Bill
Mention ?anythingElse: [Write ?anythingElse]
```
This says that when we `Mention` something, we should just `Write` it,[^1] unless it happens to be `bill`, in which case it should capitalize it.  We can customize this however we like.  For example,
```step
Mention bill: Bill
Mention diana: Diana Ratcliffe, titan of industry
Mention ?anythingElse: [Write ?anythingElse]
```
Now, if we run `[Greet diana]`, it will say “Hello, Diana Ratcliffe, titan of industry.”  In fact, any time we print `diana`, it will print “Diana Ratcliffe, titan of industry.”  Of course, that might get annoying after a while.

## Endnotes

[^1]: You might think we would just write this as:
```step
Mention ?anythingElse: ?anythingElse
```
rather than bothering with `Write`.  However, remember that this is just shorthand for:
```step
Mention ?anythingElse: [Mention ?anythingElse]
```
which would mean mention called itself endlessly.  So when we want mention to print a variable, we have to use `Write` to do it.