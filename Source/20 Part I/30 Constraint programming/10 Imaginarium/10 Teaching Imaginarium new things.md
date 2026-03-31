---
pagetitle: Teaching it new things
status: alpha
---
*Imaginarium* is programmable in the sense that you can tell it about new kinds of things and it will generate them for you.  You teach it new things using simple English declarative sentences like `Tabbies are a kind of cat.`
Or, to be more honest, you program it using a programming language that is superficially similar to English, but is quite limited and lacking in nearly any of the subtleties of human language.

A given kind of entity will be defined by some set of attributes that it can have.  The system has been told, for example, that cats have a name, an age, a breed, and can be female, male, long haired, short haired, big, small, haughty, staid, white, black, ginger, etc.  Inventing a cat involves choosing a name, age, and breed for the cat, and deciding which of the above adjectives apply to it.  However, some combinations of attributes don’t make sense.  *Imaginarium* knows that a cat can’t be simultaneously big and small, for example.  These restrictions on possible combinations of attributes are called constraints.  *Imaginarium* is a “constraint solver” or “constraint-based programming language”, meaning that you tell it about attributes and constraints and then it finds combinations of attributes that satisfy the constraints.

Teaching *Imaginarium* about a new kind of entity involves telling it about its possible attributes and the constraints that apply to them.  Adding attributes expands the space of possible objects, while adding constraints restricts it.  For example, if we wanted to teach the system about magic users, we could say:
```Imaginarium
# Try: imagine a magic user
A magic user is dark or light
```
That tells the system that:

* There’s a kind of entity called a magic user
* They have dark and light as possible attributes
* They have to be one or the other
* They can’t be both

If we then say `imagine a magic user`, we’ll get a pretty boring output:

* The magic user is a dark magic user
* The magic user is a light magic user

The system doesn’t actually understand English, or much of anything about the world you haven’t told it.  In this case, it understands that magic users are a kind of entity, but it doesn’t know that they’re a kind of creature, or character, much less that they would normally have names.  For all the system knows, a magic user is a kind of furniture.[^furniture]  So when it refers to the object, it doesn’t have any better way of doing it than saying `the magic user`.

Moreover, the only thing we’ve told it about magic users besides that they exist is that they must be dark and light but not both.  So given what we’ve told it, there are only two possible magic users: a dark one and a light one.  There are no other possible magic users because there are no other possible combinations of attributes for them:

| Dark | Light | Valid? |
|------|-------|--------|
| X  | X | X |
| ✓ | X | ✓ |
| X | ✓| ✓ |
| ✓ | ✓| X |

Let’s change that by giving it some more possible attributes.  We’ll tell it about different kinds of magic users:

```Imaginarium
# Try: imagine 10 magic users
A magic user is dark or light
Thaumaturge, necromancer, neopagan, technopagan, and shaman are kinds of magic user.
```
When you tell the system that a kind of object (magic users) comes in a variety of subkinds (necromancer, etc.), it will ensure that any particular object it makes of that kind is always of one particular subkind.  Now we get slightly different results when we hit return:

* magic user 0 is a dark technopagan
* magic user 0 is a light shaman
* magic user 0 is a dark necromancer
* magic user 0 is a light necromancer

The system can generate more varied results because we’ve given it more to work with.  Instead of magic users only involving a dark/light choice, there’s now also a choice of type: thaumaturge, necromancer, etc.  We’ve told it about 5 types as well as the two dark/light varieties, so there are 10 possible magic users:

|  | Thaumaturge |	Necromancer |	Neopagan|	Technopagan|	Shaman|
|--|-------------|------------- | --------- | -----------  | ------- |
|Dark	|✓	|✓	|✓	|✓	|✓|
|Light	|✓	|✓	|✓	|✓	|✓|

The problem is that in many story worlds, there’s no such thing as a light necromancer.  So we might want to outlaw that combination by adding the constraints:

```Imaginarium
# Try: imagine 10 magic users
A magic user is dark or light
Thaumaturge, necromancer, neopagan, technopagan, and shaman are kinds of magic user.
Necromancers are dark
Thaumaturges are light
```
Now we’ve carved some bits out of the possibility space: 

|  | Thaumaturge |	Necromancer |	Neopagan|	Technopagan|	Shaman|
|--|-------------|------------- | --------- | -----------  | ------- |
|Dark	|X	|✓	|✓	|✓	|✓|
|Light	|✓	|X	|✓	|✓	|✓|

The system will guarantee not to generate combinations that violate the constraints you give it.

Of course the fun thing is to combine cats and magic:[^cats_and_magic]

```Imaginarium
# Try: imagine 10 magic user cats
A cat is a kind of person.
Persian, tabby, Siamese, manx, Chartreux, and Maine coon are kinds of cat.
Cats have an age between 1 and 20.
Cats are male or female.
A male cat has a name from male cat names
A female cat has a name from female cat names
Cats are long-haired or short-haired.
Cats can be big or small.
Cats can be cuddly or haughty.
A cat can be staid or crazy.
The plural of Chartreux is Chartreux.
The plural of Siamese is Siamese.
Chartreux are grey.
Siamese are grey.
Persians are long-haired.
Siamese are short-haired.
Maine coons are large.
Cats are black, white, grey, or ginger.

A magic user is dark or light
Thaumaturge, necromancer, neopagan, technopagan, and shaman are kinds of magic user.
Necromancers are dark
Thaumaturges are light
```


## Endnotes

[^furniture]: It should be pointed out that the system doesn’t know anything about furniture either, unless you tell it about it.

[^cats_and_magic]: Some would argue this is redundant.
