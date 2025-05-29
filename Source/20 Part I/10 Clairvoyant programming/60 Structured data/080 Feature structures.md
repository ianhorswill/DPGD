---
pagetitle: Feature structures
status: alpha
---
Suppose we want to represent information about a character.  We [previously](fancier_mentioning) represented it by representing the character as a string like `diana` and then put all the supporting information in different predicates:
```step
[predicate]
Character diana.
Age diana: 34
Occupation diana: titan of industry
GivenName diana: Diana
FamilyName diana: Ratcliffe

Character bill.
Age bill: 26
Occupation bill: plumber
GivenName bill: Bill
FamilyName bill: Holmquist

Mention (Character ?who): ?who/GivenName ?who/FamilyName
```
This works well when we're hand-authoring the character.  It can be a little more cumbersome if we're writing a program to automatically generate characters.  Then the procedure for generating the characters has to use the `now` command a lot.  In those cases, it might be more convenient to put all that information in one data object.  We could use [tuples](step_tuples), putting each piece of information in one element of the tuple, as in:
```step
["Diana" "Ratfliffe" 34 "tital of industry"]
```
And use that whole tuple to represent the character.  Then our character database might look like:
```step
[predicate]
Character ["Diana" "Ratfliffe" 34 "tital of industry"].
Character ["Bill" "Holmquist" 26 plumber].
```
And then we would change `Mention` to print characters this way:
```step
Mention [?givenName ?familyName ?age ?occupation]: ?givenName ?familyName
```
That works, so far as it goes.  But it doesn't scale well as we try to add more information to our characters.  If we have 50 possible pieces of information to represent, then we have to type 50-element tuples every time we want to use a character.  Worse, we have to remember whether their birthday (or whatever) is the 31st element or the 32nd element.  And if we want to add a 51st piece of information, we have to go back and change all the existing tuples.

A better choice is to represent the character as a collection of **features** and their associated **values**.  In linguistics, this is known as [feature structure](https://en.wikipedia.org/wiki/Feature_structure), although most programming languages have similar things, often called *dictionaries* or *property lists*.

A feature structure is notated in Step as `{ feature1: value1 feature2: value2 ...}`.  It pairs each feature with its value and wraps them all in `{}`.  The order in which you list them doesn't matter; `{ feature1: value1 feature2: value2 }` and `{ feature2: value2 feature1: value1 }` can be used interchangeably.

This lets us represent Diana like this:
```step
{ givenName: "Diana" familyName: "Ratfliffe" age: 34 occupation: "tital of industry" }
```
This is more typing than the tuple verison:
```step
["Diana" "Ratfliffe" 34 "tital of industry"]
```
But it's easier to keep track of what parts mean what.  Our database then looks like:
```step
[predicate]
Character { givenName: "Diana" familyName: "Ratfliffe" age: 34 occupation: "tital of industry" }.
Character { givenName: "Bill" familyName: "Holmquist" age: 26 occupation: plumber }.
```
