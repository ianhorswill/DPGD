---
pagetitle: Sentences
status: alpha
---
Here's a wildly simplistic grammar for English:
```Step
# Try: [Sentences]

### Oh boy!  English grammar!
### Thrils!  Chills!

Sentences: [Sentence] [NewLine] [Sentence] [NewLine] [Sentence] [NewLine] [Sentence] [NewLine] [Sentence] [NewLine]

# A sentence in a noun phrase (the subject), followed by a verb phrase (the predicate)
Sentence: [NP] [VP]

# A noun phrase is a person's name or an article (the/a) followed by a noun
[randomly]
NP: [Person]
NP: [Article] [Noun]

[randomly]
Article: the
Article: a

[randomly]
Noun: dog
Noun: cat
Noun: cheese
Noun: accordion

# A verb phase is an intransitive verb, a transitive verb with a NP (its object),
# or a ditransitive verb with two NPs (its direct and indirect objects).
[randomly]
VP: [IntransitiveVerb]
VP: [TransitiveVerb] [NP]
VP: [DitransitiveVerb] [NP] [NP]

[randomly]
IntransitiveVerb: stopped
IntransitiveVerb: died
IntransitiveVerb: ran away

[randomly]
TransitiveVerb: ate
TransitiveVerb: loved
TransitiveVerb: forgot

[randomly]
DitransitiveVerb: gave
DitransitiveVerb: brought
DitransitiveVerb: called
DitransitiveVerb: denied

# Lots of random names for people
[randomly]
Person: Alexandra
Person: Alexis
Person: Alyssa
Person: Angel
Person: Aniyah
Person: Brianna
Person: Chloe
Person: Destiny
Person: Diamond
Person: Gabrielle
Person: Hailey
Person: Hannah
Person: Imani
Person: Isis
Person: Jada
Person: Jasmine
Person: Jayla
Person: Jordan
Person: Kayla
Person: Kennedy
Person: Kiara
Person: Laila
Person: Madison
Person: Makayla
Person: Nevaeh
Person: Sydney
Person: Taylor
Person: Tiana
Person: Trinity
Person: Anthony
Person: Brandon
Person: Caleb
Person: Cameron
Person: Christian
Person: Christopher
Person: Daniel
Person: David
Person: Elijah
Person: Ethan
Person: Gabriel
Person: Isaiah
Person: James
Person: Jayden
Person: Jaylen
Person: Jeremiah
Person: Jordan
Person: Joseph
Person: Joshua
Person: Josiah
Person: Justin
Person: Kevin
Person: Malik
Person: Matthew
Person: Michael
Person: Nathan
Person: Tyler
Person: William
Person: Xavier
Person: Zion
```

## Adding vocabulary

Now try adding some rules to it for:

* **Nouns**, so rules of the form "`Noun:`" followed by some word.
* **Verbs** (same, but have the task name be `IntransitiveVerb`, `TransitiveVerb` or `DitransitiveVerb`)

**Remember**: Code is case-sensitive.  `Noun`, `TransitiveVerb`, etc., must be capitalized.