---
pagetitle: Feature structures
status: early-draft
---
**Note:** This chapter describes a future version of feature structures that isn't quite implemented yet.  295/296 students, just skip over this.

Suppose we want to write a task that prints someone's name:
```step
SayName ?name: ?name
```
That's easy when the name is one string, like `"Ben"`.  But what if the name is both a first and last name, i.e. a given name and a family name?  We could pass it in as a single string like `"Ben Ramsey"`, and that would work fine for `SayName`.  But what if you want two versions of `SayName`, one which gives the family name first, as in "Ramset, Ben", and the other which gives it last, as in "Ben Ramsey".  If the name is represented as a string, there's no way to access its parts individually.  So we could instead represent it as a tuple: `["Ben" "Ramsey"]`.  The we can write our two versions as:
```step
FamilyFirst [?givenName ?familyName]: ?givenName ?familyName
FamilyLast [?givenName ?familyName]: ?familyName, ?givenName 
```
Now suppose we want to change it allow:

* Middle names
* Hispanic dual surnames
* Titles like "Esq."
* Generational titles like "Jr." or "II"

Now we're looking at a tuple representation like: `[title firstName middleName surname secondSurname generationalTitle]`.  That's suboptimal for a number of reasons:

* We have to go find all the old tuples and change them to the new format
* Most people have most of those elements blank
* We have to remember what order they go in

It would be nice if we could write just the elements that are being used and refer to them by name.  That's what a feature structure is: a set of elements tagged with names, and surrounded by curly braces.  Ben Ramsey's name would be notated as:
```step
{ firstName: "Ben" surname: "Ramsey" }
```
But we can have more complicated names like:
```step
{ title:"Dr." firstName: "Maria" surname: "Cruz" secondSurname: "Sanchez" }
```
We can then have rules like:
```step
FamilyFirst { firstName: ?f surname: ?s1 secondSurname: ?s2} : ?f ?s1 ?s2
FamilyFirst { firstName: ?f surname: ?s1 } : ?f ?s1
```
The first prints out both surnames, if the character has two surnames, while the second handles people with only one surname.