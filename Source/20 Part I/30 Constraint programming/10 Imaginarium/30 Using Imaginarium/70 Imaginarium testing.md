---
pagetitle: Automated testing (technical)
status: alpha
---
When you make complex generators, it’s possible to introduce bugs.  They could just be typos or they could involve your constraints being over-broad, ruling out thing you didn’t intend to rule out, or over-narrow, allowing things you didn’t intend to allow.  That means you need to test the system out by checking that the things that ought to exist do (i.e. it can indeed generate the kinds of things it ought to be able to generate), and that the things that ought not to exist don’t (it can’t generate things that it shouldn’t be able to).

So in practice, you don’t just write your code, you try it out – you kick the tires on it and generally check that it seems to be behaving the way you’d expect.  When you find something wrong, you change the code.  But changing the code may or may not fix the problem, and it might also introduce a new bug.  So if you really want things to be perfect, you have to go back and test all over again.  This is just the nature of software development.  People all around the world spend their days fixing and testing.

But it’s a pain to have to keep retyping the same tests over and over again.  And in addition, you might forget one, mistype it, or otherwise introduce new errors in the testing itself.  So in practice, software designers tell the machine the tests to perform but then have the machine run the tests itself and just report the results.  This is called automated testing.

You can automate testing of your generators by adding tests to your .gen files.  Imaginarium will remember them, but otherwise ignore them until you give the command “test”, at which point it will run all the tests you’ve specified.  Tests are of the forms:

* *Noun phrase* `should not exist`
* *Noun phrase* `should exist`
* `Every kind of` *noun phrase* `should exist`

Where *noun phrase* is either a noun or a noun with some modifiers (e.g. adjectives).  For example:
```imaginarium
Short haired Persians should not exist
```

When you run the `test` command, *Imaginarium* finds all the tests you gave it and tries to `imagine` each of their noun phrases, looking to see if it can successfully generate instances of them.  If it can generate one that’s labeled `should not exist`, it displays an error message and gives you the instance it generated.  Alternatively if it can’t generate one that was labeled `should exist`, then it prints an error message about that.

The `every kind of` test is the most useful.  It tells the system to find all the different subkinds, subsubkinds, etc., of the noun you specify and test them individually.  So if you say:
```imaginarium
Every kind of haughty cat should exist
```
It will go through every individual breed of cat and test to make sure it can imagine a `haughty` one.
