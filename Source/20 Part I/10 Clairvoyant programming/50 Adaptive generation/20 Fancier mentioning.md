---
pagetitle: Fancier `Mention`ing
status: alpha
---
Let's start by telling the system about our characters.  We'll start by telling it they're characters, for one thing:
```step
[predicate]
Character diana.
Character bill.
```
But let's also tell it about their names, ages, jobs, etc.:
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
```
Now we can define `Mention` to give first and last names for characters:
```step
Mention ?c: [Character ?c] [GivenName ?c] [FamilyName ?c]
Mention ?anythingElse: [Write ?anythingElse]
```
The first line calls `[Character ?c]`.  Since `Character` is a predicate, this will fail if `?c` isn't a character.  So it prevents this method from being used to print anything other than characters.  The rest of the method prints out their first and last names.  If `?c` isn't a character, it moves on to the second method which just prints its argument verbatim.

## Useful shorthands

This isn’t critical for you to learn, but there are some shorthands you can use to simplify the first method and make it more readable.  If you say:
```step
Mention (Character ?c): [GivenName ?c] [FamilyName ?c]
```
The computer understands that you mean this is a method that only applies when `?c` is a `Character`.  And you can simplify the part after the colon by saying:
```step
Mention (Character ?c): ?c/GivenName ?c/FamilyName
```
If you say `?var/Task`, it just treats it as a shorthand for `[Task ?var]`.  You can even simplify it further to:
```step
Mention (Character ?c): ?c/GivenName+FamilyName
```
Step treats `?var/Task1+Task2` as a shorthand for `[Task1 ?var] [Task2 ?var]`.  Step treats all these shorthands as identical to the original, longer version.  But the intention is that it will make the code look a little less like code and a little more like text.  Your mileage may vary, so use whichever form looks best to you.  Step doesn’t care.

## Specializing first use of a name

Suppose we say:
```step
Introduce ?who:
  ?who is ?who/Age years old. ?who is a ?who/Occupation.
[end]
```
And run `[Introduce diana]`, we get:

> Diana Ratcliffe is 34 years old.  Diana Ratcliffe is a titan of industry.

It feels clunky to use her full name both times.  Once she's introduced, we would expect it to use something shorter, probably either just her first name or just her last name, depending on how intimate we want the reader to feel with the character.  This is a common pattern: wanting to hand the first mention of something differently than subsequent ones.  That's easy to implement by using a [fluent](fluents) to track which characters have already been introduced.  We'll call this fluent `Mentioned`:
```step
fluent Mentioned ?who.
```
This just tells Step that `Mentioned` is a fluent, without adding a method for it.  Now we can modify our definition of `Mention` to take advantage of it:
```step
Mention (Character ?c): [Mentioned ?c] ?c/GivenName
Mention (Character ?c): ?c/GivenName+FamilyName [now [Mentioned ?c]]
Mention ?anythingElse: [Write ?anythingElse]
```
Now, the first time we `Mention` a character it will use the second method, which prints their full name.  But the `now` command will cause it to remember that character has been mentioned, and so when `Mention` is called on that same character in the future, it will just print their first name.  Now when we run `[Introduce diana]`, we get:

> Diana Ratcliffe is 34 years old.  Diana is a titan of industry.

Of course, the most fluent thing to do here would be to use a pronoun.  We'll show you how to do that next.