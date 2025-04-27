---
pagetitle: Self-referential rules
---
So far, so good.  We can define the `Parent` relationship and then define most everything else in terms of that: grandparents and grandchildren, great-grandparents, siblings, etc. But what about ancestors?  An ancestor is your parent or grandparent or great-grandparent or great, great-grandparent, etc. We could write:
```step
[predicate]
Ancestor ?c ?a: [Parent ?c ?a]
Ancestor ?c ?g: [Grandparent ?c ?g]
Ancestor ?c ?g: [Greatgrandparent ?c ?g]
Ancestor ?c ?g: [Greatgreatgrandparent ?c ?g]
```
And so on, forever.  But forever is a lot of typing.

What we can do instead, that doesn't involve literally typing for eternity, is to define an ancestor as either:

* Your parent, or
* An ancestor of your parent.

We can write that in Step using just two rules that do the equivalent work of an infinite number of rules:
```step
[predicate]
Ancestor ?c ?p: [Parent ?c ?p]
Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]
```
In mathematics, logic, and computer science, this is called a **recursive** definition, and when the `Ancestor` rule turns around and calls `Ancestor` again, that’s called **recursion**.  

## How to write a recursive definition

Recursive definitions have a fairly standard format:

* They **don't say `[randomly]`**
* They start with a rule that doesn’t recurse (doesn't call the predicate we're defining).  This is called a **base case**.  It notices when it can decide immediately without having to recurse. 
* Then there’s another rule called, unsurprisingly, the **recursive case**, that ends with a recursive call (a call to the predicate being defined).

There are exceptions to all these rules.  But if you don't put the base case first or you put the recursive call early in the recursive case, it's possible for the program to run forever.  We'll discuss this in more detail when we talk about [how code gets executed](sld_resolution), but for now, just remember: base case first, recursive call last, and don't `[randomize]` a recursive task.

## Taxonomies

Taxonomic relationships come up a lot in games.  Dogs and cats are kinds of animals, Collie and Labrador are kinds of dogs.  We can express those relationships using rules:
```Step
# Try: [Animal ?x]
[predicate]
Animal ?a: [Dog ?a]
Animal ?a: [Cat ?a]

[predicate]
Dog ?d: [Labrador ?d]
Dog ?d: [Collie ?d]

[predicate]
Collie lassie.
[predicate]
Labrador bruce.
```
Now suppose we run `[Animal lassie]`, i.e. we ask “is Lassie an animal?”  The system will start by running the first `Animal` method, which will call `Dog` to check if Lassie is a dog.  It then tries the first Dog method, which calls `Labrador` to check if Lassie is a Labrador.  That fails, since Bruce is the only Labrador.  So the system abandons the first `Dog` method and tries the second, which says to call `Collie`.  That succeeds, meaning it’s verified Lassie is a collie.  That then means that the method it was running for `Dog`, which had called Collie, also succeeds.  So the system has verified Lassie is a dog.  That then means that the method for `Animal` succeeds, and so it’s verified that Lassie is an animal.

We could instead have run `[Animal ?x]`, meaning “who’s an animal?”  It would then have run the first `Animal` rule, as before, but now it’s running `[Dog ?x]` rather than `[Dog lassie]`.  Then it will again start with the first `Dog` rule, which runs `[Labrador ?x]`.  Where the `Labrador` call failed in the `Lassie` example, it succeeds here because its parameter is a variable with no value.  So the call to `Labrador` actually succeeds, and binds `?x` to `bruce` (i.e. it sets `?x` to be `bruce` now).  Since `Labrador` succeeded, the `Dog` rule succeeds, which means the `Animal` rule succeeds, but in this case, it returns the answer that `?x=bruce`, i.e. “Bruce is an animal.”

Note that it gave us the answer `Bruce` simply because that’s the first answer it ran into.  If we were to swap the order of the rules for `Dog`, we would have looked for `Collie`s before `Labrador`s instead of the other way around, and so we would get the answer `lassie` instead.  Or alternatively, we could have added `[randomly]` to our rules.








