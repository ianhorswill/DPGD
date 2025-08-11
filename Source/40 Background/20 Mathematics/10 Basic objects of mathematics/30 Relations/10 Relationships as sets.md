---
pagetitle: Relationships as sets
status: early-draft
---
We often want to be able to treat a relationship, such as the $$M$$ (motherhood) relation discussed previously, as a mathematical object so we can reason about it.  Such an object is called a **relation**.  In most respects, relation is just the math word for relationship.

What kind of mathematical object is a relation?  One way to think about this is to as what makes one kind of relationship different from or the same as another.  There are basically two ways to answer this:

* Two relationships are the same if they mean the same thing.  This is called an *intensional* definition.
* Two relationships are the same if they are true of the same pairs of objects.  This is called an *extensional* definition.

The first of these is extremely complicated to reason about and so is almost never used in math, although it's important in philosophy, linguistics, and logic.

The second works for most mathematics and will work for everything we do here.[^1] It's the definition used in set theory.  The set of pairs of objects a relationship is true of is called its **extension**.  In set theory, two relationships are the same if they have the same extension.  And the relation object is just the extension.  So relations are sets of pairs.  The motherhood relation would be defined as:
$$
M = \{(m,c) \; | \; m \text{ is the mother of }c\}
$$

This means that when we type $$mMc$$, it's really just a shorthand for $$(m,c)\in M$$.

## Relations and the Cartesian product

Again, relations in set theory are just sets of pairs.  So any relation $$R$$ between two sets $$A$$ and $$B$$ is going to be some set of pairs whose first element comes from $$A$$ and whose second comes from $$B$$.  That means $$R$$ is a subset of the Cartesian product of $$A$$ and $$B$$:
$$
R\subseteq A\times B
$$

As a result, it's very common for writers to say things like "let $$R\subseteq A\times B$$ be a relation" rather than the more verbose "let $$R$$ be a relation between elements of $$A$$ and elements of $$B$$".

## Notes

[^1]: *Esoteric*: The extensional definition does introduce some technical weirdnesses, which is why there are people who study intensional definitions.  For example, the "can pilot" relationship between dogs and airplanes is, to the best of my knowledge, the empty set: no dogs can pilot airplanes.  So is the "can eat" relationship between airplanes and cats.  But it seems wrong to say those are the "same relation", even though they are extensionally equivalent. Indeed, there is only one "empty relation" in set theory, because relations are sets and sets are defined extensionally.