---
pagetitle: Predicates
---
As we just discussed, it's possible for all the methods of a task to fail, in which case the call itself fails.  In many cases, that's an error.  So by default, Step treats that as an error.  However, as we've also just seen, it's useful to allow calls to fail and use the success or failure of the call as a way of answering questions.  Tasks that exist for the purpose of answering questions are called **predicates**.[^1]  

## The `[predicate]` declaration
Tagging a task with the declaration `[predicate]` tells Step not to consider a failed call to that task to be an error.  That's all it does.  So in the example:
```step
Cat morris.

[predicate]
Dog lassie.
```
Calling `[Dog morris]` will fail, but it won't be treated as an error that stops the program, because `Dog` is declared `[predicate]`.  However, if we call `[Cat lassie]`, we will get an error because `Cat` doesn't have the `[predicate]` declaration.

To make a task be a predicate, you only have to include the `[predicate]` declaration before one of it's methods.


## Predicates usually don't print

The primary use of predicates is to answer questions.  So they generally aren't written to generate output.  That said, there's nothing preventing you from writing tasks that print but are labeled `[predicate]`.

## Endnotes

[^1]: *Esoteric:* This term comes from the latin *praedicatum*, meaning "that which is said of the subject [of a sentence]." The sentence "Bill loves fruitcake", has a subject, Bill, and a predicate, "loves fruitcake."  [Logic](logic) adopts this terminology to refer to properties, such as "loving fruitcake", that can be true of things or not.  Bill loves fruitcake, my television does not.  Logic also extends the term predicate to include relationships, such as "loving", that can hold between things, such as Bill and fruitcake.  Bill loves fruitcake.  Fruitcake does not love Bill.
