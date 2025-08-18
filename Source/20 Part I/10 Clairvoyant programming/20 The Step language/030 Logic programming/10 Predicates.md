---
pagetitle: Predicates
status: alpha
---
As we just discussed, it's possible for all the methods of a task to fail, in which case **the call itself fails**.  In many cases, that's a bug, so Step normally treats that as an error.  If we try running `[Dog morris]` below, we get an error:
```Step
# Try: [Dog morris]
Dog benji.
Dog lassie.

Cat morris.
Cat garfield.
```
  However, as we've also just seen, it's useful to allow calls to fail and use the success or failure of the call as a way of answering questions.  Tasks that exist for the purpose of answering questions are called **predicates**.[^1]  

## The `[predicate]` declaration
Tagging a task with the declaration `[predicate]` tells Step not to consider a failed call to that task to be an error.  That's all it does.  So in the example:
```Step
# Try: [Dog morris]
[predicate]
Dog benji.
Dog lassie.

[predicate]
Cat morris.
Cat garfield.
```
Calling `[Dog morris]` will fail, but it won't be treated as an error that stops the program, because `Dog` is declared `[predicate]`.  Instead, the system just responds "no": Morris is not a dog, given what the system knows.

To make a task be a predicate, you only have to include the `[predicate]` declaration before one of its methods. That will apply it to the task more generally.

## It's okay that predicates don't print

The primary use of predicates is to answer questions.  So they generally aren't written to print text.  There's nothing preventing you from writing tasks labeled `[predicate]` that print.  But you usually wouldn't want your question-answering tasks to print things.

## Notes

[^1]: *Esoteric:* This term comes from the Latin *praedicatum*, meaning "that which is said of the subject [of a sentence]." The sentence "Bill loves fruitcake", has a subject, Bill, and a predicate, "loves fruitcake."  [Logic](logic) adopts this terminology to refer to properties, such as "loving fruitcake", that can be true of things or not.  Bill loves fruitcake, my television does not.  Logic also extends the term predicate to include relationships, such as "loving", that can hold between things, such as Bill and fruitcake.  Bill loves fruitcake.  Fruitcake does not love Bill.
