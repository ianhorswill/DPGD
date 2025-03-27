---
pagetitle: Tasks as text templates
---
Suppose we had a task like this:
```Step
[randomly]
Sentence: the cat ate the dog
Sentence: the cat chased the dog
Sentence: the cat plotted world domination with the dog
```
Notice that all these methods have the same text, with just the verb changed.  That means that every time we want to add a new sentence, we have to retype the cat and dog parts.  Rather than doing that, we can define the verb part as its own task:
```Step
[randomly]
Verb: ate 
Verb: chased 
Verb: plotted world domination with
```
Then we can incorporate the `Verb` task inside the Sentence task, by enclosing it in brackets:
```Step
Sentence: the cat [Verb] the dog
```
Now we only need one method for the sentence.  Moreover, we can be egalitarian and allow the dog to be the actor sometimes and not just the cat:
```Step
[randomly]
Sentence: the cat [Verb] the dog
Sentence: the dog [Verb] the cat
```
