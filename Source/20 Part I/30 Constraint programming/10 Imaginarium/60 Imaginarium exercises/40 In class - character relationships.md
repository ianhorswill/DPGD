---
pagetitle: "In-class exercise: Character relationships"
status: released
---
Start by clicking on the following code to open it in Imaginarium:
```Imaginarium
# Try: imagine 10 characters
Characters have an age between 1 and 70.
A character is male, female or nonbinary.
A character is masculine-named or feminine-named.
A male character is masculine-named.
A female character is feminine-named
A character has a surname from English surnames.
A masculine-named character has a given name from male names.
A feminine-named character has a given name from female names.
A character is identified as "[given name] [surname]".
Do not mention being ma sculine-named.
Do not mention being feminine-named.
```
This version handles non-binary gender, but it does end up generating a disproportionately large number of non-binary characters.  If you prefer to use binary gender, use this:
```Imaginarium
# Try: imagine 10 characters
Characters have an age between 1 and 70.
A character is male or female.
A character has a surname from English surnames.
A male character has a given name from male names.
A female character has a given name from female names.
A character is identified as "[given name] [surname]".
```

## Create a setting

- Think of a setting
   - Not high school or college
- Think of some kinds of characters
- Think of some other kinds of entities in the setting
- What are the **story-relevant relationships** that might hold between them?
- Take notes on them

## Formalize the relationships

For each relationship ask:
- What **kinds of things** go on the left and right sides?
  - For example, owns is a relation between a person and a thing: in “$X$ owns $Y$”, $X$ is a person and $Y$ is a thing
  - Note that often the same kind of thing goes on both sides
     - For example, coworker of is a relation between people: “$X$ is a coworker of $Y$”, has person for both $X$ and $Y$
- In English, $X$ is called the **subject** and $Y$ the **object**
- In math, $X$ is called the **domain** of the relation and $Y$ its **codomain**
  - An important special case is when the domain and codomain are the same; that’s called a **homogeneous relation**
- If you don’t have any homogeneous relations in your collection, add some

## Think about formal properties

For each homogeneous relation, ask yourself whether there can be:
- **Self-relationships**
  - Can an object (character or something else) be related to itself?
     - Example: you can't be your own parent, but you can be in the same family as yourself
  - If so, must the objects always relate to themselves?
     - Example: you're always in the same family as yourself
  - In math, this property is called **reflexivity**
     - Reflexive relations: objects always relate to themselves
     - Anti-reflexive relations: objects never relate to themselves
- **Symmetry**
  - If $X$ is related to $Y$, can/must $Y$ be related to $X$?
  - In math, this is called symmetry
    - Symmetric relations: if $X$ relates to $Y$, then $Y$ always relates to $X$, so the relationship is **bidirectional**
    - Antisymmetric relations: $X$ relating to $Y$ means $Y$ can't relate to $X$, unless they're the same.

## Coding in Imaginarium

- Write your relations as verbs in Imaginarium
   - Write your one or more statements for each verb
- Test it with something like `imagine 10 characters`

## Relationship taxonomies

- Organize your homogenous relations in a hierarchy
   - What `is a way` of what?
   - If you have homogeneous relations for a few different kinds of things, just chose the kind of thing with the most relations
- Make sure there is a “top-level” relation
   - That all your other homogenous relations are ways of
   - Add something like “be related to” if there isn’t one already
- Put a constraint up “up to 2” on the top-level relation.  This lets you generate relations without having a trillion lines in the relations window

