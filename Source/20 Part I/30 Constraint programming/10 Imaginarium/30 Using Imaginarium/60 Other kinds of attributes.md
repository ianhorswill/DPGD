---
pagetitle: Other kinds of attributes
status: alpha
---
So far, the only kinds of attributes we’ve attached to entities are adjectives and relationships.  But there are a few other things you can attach.  One is numbers:
```imaginarium
A character has an age between 20 and 60
```
Tells the system characters have a property called `age`, that’s a number, and that it’s in the range 20-60 (inclusive).

You can also give characters names.  For example, our cat example has the lines:
```imaginarium
Male cats have a name from male cat names
Female cats have a name from female cat names
```
This presupposes there are files someplace called `male cat names.txt` and `female cat names.txt`.  The web version of *Imaginarium* currently has a few files like this packaged with it, but doesn't yet have a way of providing your own files.

A more complicated example is:
```imaginarium
male humans have a given name from male given names
female humans have a given name from female given names
Humans have a surname from surnames
A human is identified as "[given name] [surname]".
```
The first two of these tell the system that humans have both a given name and a surname, and from which lists to draw them.  The second tells the system that when referring to humans, rather than calling them “human 0”, it should refer to them by their given name, followed by their surname.

## Parts

You can tell the system that entities can have other entities as parts.  For example if you say:
```imaginarium
A bear has a hat called their favorite hat.
```
Then the system will know that when it makes a `bear` entity, it also needs to make a `hat` entity, and that they’re linked by the `favorite hat` relationship.  You can also say things like `a bear has two hats called their favorite hats` and it will make two separate favorite hat parts.  And you can omit the "`called` …" part if you like.

Please note that Parts are limited at the moment.  In particular, the system needs to know in advance what parts there will be.  So if you say something like:
```imaginarium
Orcs and balrogs are kinds of monster
Orcs have a film called their secret guilty pleasure
```
Then you can say `imagine an orc` and it will make both an `orc` and their `secret guilty pleasure` film, or you can say `imagine a balrog` and it will make just the `balrog` because they don’t have a `secret guilty pleasure` film.  But if you say `imagine a monster` and it happens to generate an `orc`, the `orc` won’t have a `secret guilty` pleasure film.
