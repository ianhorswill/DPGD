---
pagetitle: Relationships within a kind
status: alpha
---
The subject- and object-kinds of a verb are often the same:
```imaginarium
People can know many people.
```
This is a common case and *Imaginarium* understands a number of common special cases of these relations.  If you say:
```imaginarium 
People can know many people.
```
The system understands that `know` is a relation between `people`.  But if we say: 
```imaginarium
People can know each other.
```
The system still understands that `know` is a relation between `people`, but it also understands that if I know you, then you also know me; it's a [symmetric](Homogeneous_relations#symmetry) relationship.

If we say:
```imaginarium
A person can be friends with some people.
```
Then we leave open the possibility of a person being friends with themselves, which may or may not match your intent.  But if you say:
```imaginarium
A person can be friends with other people.
```
Then we rule out people being friends with themselves.  We could also achieve the same result by adding:
```imaginarium
People cannot be friends with themselves.
```

Alternatively, we can force people be friends with themselves by saying:
```imaginarium
People always are friends with themselves.
```
One last thing to point out: as far as the system is concerned here, the verb is `be friends with`,  not just `be friends` or `be`.  That is, it considers the preposition to be part of the verb.  Once you've set the name for the verb to involve the preposition, it’s not optional, it can’t be moved around, and it can’t be combined with other prepositions, because Imaginarium doesn’t know what a preposition is in the first place.
