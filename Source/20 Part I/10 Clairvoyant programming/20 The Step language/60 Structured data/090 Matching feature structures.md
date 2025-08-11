---
pagetitle: Matching feature structures
status: alpha
---
The other nice thing about feature structures is that when you match them, you only have to include the features that you care about.  In effect, every feature structure has an implicit "..." at the end that can match any features not otherwise listed.  So the `Mention` rule:
```step
Mention { givenName: ?g familyName: ?f }: ?g ?f
```
will match any feature structure that has a `givenName` and a `familyName`, regardless of what other features it might have.

Now suppose we have a slightly bigger database of characters:
```step
[predicate] [randomly]
Character { givenName: "Diana" familyName: "Ratfliffe" age: 34 occupation: "tital of industry" }.
Character { givenName: "Mario" familyName: "Holmquist" age: 26 occupation: plumber }.
Character { givenName: "Luigi" familyName: "Holmquist" age: 26 occupation: plumber }.
Character { givenName: "Wario" familyName: "Holmquist" age: 28 occupation: antagonist }.
Character { title: "Princess" givenName: "Peach" age: 26 occupation: royalty }.
Character { givenName: "Bowser" occupation: antagonist }.
```
If we run:
```step
[Character { occupation: plumber }]
```
It will randomly choose one of the `Character` methods whose argument specifies `plumber` for its occupation --- either Mario or Luigi.  But remember that matching means **make these things be the same** by filling parts in.  So far, that has consisted of filling in variables.  But it can also fill in features in a feature structure.  Let's try the following bit of code:
```Step
# Try: [Plumber ?x] [Character ?x]
[predicate] [randomly]
Character { givenName: "Diana" familyName: "Ratfliffe" age: 34 occupation: "tital of industry" }.
Character { givenName: "Mario" familyName: "Holmquist" age: 26 occupation: plumber }.
Character { givenName: "Luigi" familyName: "Holmquist" age: 26 occupation: plumber }.
Character { givenName: "Wario" familyName: "Holmquist" age: 28 occupation: antagonist }.
Character { title: "Princess" givenName: "Peach" age: 26 occupation: royalty }.
Character { givenName: "Bowser" occupation: antagonist }.

[predicate]
Plumber { occupation: plumber }.
```
The value it prints for `?x` should be one of (the order of the features may be different):
```step
?x = { occupation:plumber givenName:"Mario" familyName:"Holmquist" age:26 }
```
or:
```step
?x = { occupation:plumber givenName:"Luigi" familyName:"Holmquist" age:26 }
```
Here's how that works.  The call says we need to find a value for `?x` that satisfies both `Plumber` and `Character`, i.e. that's both a plumber and a character.  The definition for plumber:
```step
[predicate]
Plumber { occupation: plumber }.
```
says that `?x` must have the `occupation:` feature to have the value `plumber`.  The definition for `Character` allows many different collections of features.  But it only allows the `occupation:` to be `plumber` with the two rules:
```step
Character { givenName: "Mario" familyName: "Holmquist" age: 26 occupation: plumber }.
Character { givenName: "Luigi" familyName: "Holmquist" age: 26 occupation: plumber }.
```
but only if `?x` *also* has the other features listed in the rule being matched.  So the only solutions are those two specific feature structures.