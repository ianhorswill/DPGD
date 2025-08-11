---
pagetitle: "Fluents: predicates with state"
status: alpha
---
Fluents are predicates you can change during the execution of the program.  In particular, you can use the `now` to change them to be newly true or false for specific sets of parameter values:

* `[now [Predicate a b]]` says that henceforth, `[Predicate a b]` is true (that is, it should succeed), regardless of whether it was true before.
* `[now [Not [Predicate a b]]]` says that it's false (should fail), regardless of whether it was false before.

In order to use `now` to update a predicate, it must have been marked with the `[fluent]` annotation.

For example, suppose we want to keep track of our characters' possessions.  We might add a predicate named `Owner` to keep track of who owns what:
```step
[predicate]
Owner watch jayda.
Owner pc reggie.
Owner iphone bruce.
Owner car yifan.
```
If we want to make ownership changeable, we just declare it to be fluent:
```step
[fluent]
Owner watch jayda.
Owner pc reggie.
Owner iphone bruce.
Owner car yifan.
```
Having done that, we can transfer ownership from one character to another like this:
```step
Give ?giver ?receiver ?item:
  [now [Owner ?reciver ?item]]
  [now [Not [Owner ?giver ?item]]]
[end]
```
Note that the `now` command *only* updates the table of methods inside `Owner`.  It doesn't understand any consequences of the change.  For example, it doesn't understand that objects usually only have one owner.  So making `?receiver` the owner of something automatically makes its previous owner stop owning it in our minds but not for the computer.  Thus, we have to use two `now` commands, one to give it to the receiver and own to take it away from the giver.

## Functions

That said, it's so common for relationships to have this sort of "only one" property, that there's a special name for it in [set theory](basic_objects_of_mathematics): such relationships are called **[functions](functions)**: we might say, for example, that ownership is a function from an object to a person (the owner).  In saying that, you are saying that an object can't have multiple owners.

If we tag `Owner` with the `[function]` annotation, the system will understand that an object can only have one owner, and so when transferring ownership, we don't have to explicitly remove the old owner.  This simplifies updates considerably:
```step
[fluent] [function]
Owner watch jayda.
Owner pc reggie.
Owner iphone bruce.
Owner car yifan.

Give ?giver ?receiver ?item: [now [Owner ?reciver ?item]]
```
In particular, the `[function]` annotation tells Step that you can't have multiple values for the last parameter if the previous parameters are the same.

## Try it
This will let you test the `Give` task out:
```Step
# Try: [TestGiving jayda iphone]
TestGiving ?receiver ?item:
   [Owner ?item ?who] ?item is currently owned by ?who.
   [Give ?who ?receiver ?item]
   [Owner ?item ?who2] After transfer, it's owned by ?who2.
[end]

[fluent] [function]
Owner watch jayda.
Owner pc reggie.
Owner iphone bruce.
Owner car yifan.

Give ?giver ?receiver ?item: [now [Owner ?reciver ?item]]
```
