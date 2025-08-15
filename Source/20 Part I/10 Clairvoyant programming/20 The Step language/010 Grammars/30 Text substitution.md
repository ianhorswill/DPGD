---
pagetitle: Text substitution
status: alpha
---
Suppose we had a grammar like this:
```Step
# Try: [Sentence]
[randomly]
Sentence: the cat ate the dog
Sentence: the cat chased the dog
Sentence: the cat plotted world domination with the dog
```
Notice that all these methods have the same text, with just the verb changed.  That means that every time we want to add a new sentence, we have to retype the cat and dog parts.  Rather than doing that, we can define the verb part as its own phrase type/task:
```Step
# Try: [Verb]
[randomly]
Verb: ate 
Verb: chased 
Verb: plotted world domination with
```
Then we can incorporate the `Verb` phrase/task inside the `Sentence` phrase/task, by enclosing it in brackets.  Any time we include a phrase/task in brackets in the text for a rule, the system runs the task and replaces the bracketed text with the task's output:
```step
Sentence: the cat [Verb] the dog
```
Now we only need one method for the sentence.  Moreover, we can be egalitarian and allow the dog to be the actor sometimes and not just the cat:
```Step
# Try: [Sentence]
[randomly]
Sentence: the cat [Verb] the dog
Sentence: the dog [Verb] the cat

[randomly]
Verb: ate 
Verb: chased 
Verb: plotted world domination with
```

## Calls

Running a task by placing it in brackets is referred to as **calling** it.  The bracketed expression itself is referred to as **a call to** the task.

I honestly have no idea what the origin of this terminology is.  Another term that gets used is **invocation**, which sounds cooler since you invoke spells, curses, and demons.  But call is the more common term, whether because it sounds more wholesome or just because it has fewer syllables.

Suffice it to say that from hereon in, when we say "a call to `X`" we mean someplace in the code where it says `[X]` or `[X` ... *more stuff* ... `]`.  We'll talk about the "more stuff" part shortly.
