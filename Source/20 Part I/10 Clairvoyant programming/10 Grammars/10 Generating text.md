---
pagetitle: Grammar rules
status: alpha
---
A context-free grammar consists of a set of **phrase types** and, for each type, a set of **rules** for how to generate phrases of that type in terms of words and other types of phrases.  For example, a [salutation](https://en.wikipedia.org/Saltuation) (a greeting) is a kind of phrase.  In Step, the rule:
```Step
# Try: [Hello]
Hello: Hello world!
```
effectively says that a "Hello world!" is a kind of `Hello` phrase.  Technically, the part before the colon tells us that we’re defining a little program called `Hello` and when we run it, it should print “Hello world!”  Click on the box above, press the Run button, and you should see something like this:

> Hello world!

## Theme and variation

We can define several different salutations:
```step
Hello: Hello world!
Hello: Hola!
Hello: Hi there!
Hello: Bon jour!
```
Each of these lines specifies a different way of saying hello.  For reasons that become clear [soon](pattern_matching), if two rules will both work, Step will prefer the one that appears first in the list.  But we can override this by adding the annotation `[randomly]` at the beginning, which tells it to choose the rules randomly:
```Step
# Try: [Hello]
[randomly]
Hello: Hello world!
Hello: Hola!
Hello: Hi there!
Hello: Bon jour!
```
Again, try clicking the code above and pressing Run.  But press it several times.  You should get different results.