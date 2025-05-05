---
pagetitle: Basic relationships between sets and objects
status: early-draft
---
Many of the questions we might want to answer about a given set involve its relationship to potential elements or to other sets.

## Summary if you have math anxiety

The most basic thing you can ask about a set $S$ is whether some object $o$ is a member of it.  If it is, our shorthand for that is $o \in S$.  Based on that we can ask whether the elements of one set $S_1$ are also elements of another set $S_2$.  If they are, we say $S_1$ is *contained in* $S_2$, and write it as $S_1 \subseteq S_2$.  If the two sets are each contained in the other, they're the same set and we say $S_1 = S_2$.

Feel free to skip to the next page.

## Membership: $$\in$$ and $$\notin$$

Membership is a relationship between an object and a set. If an object $$x$$ is a member of a set $$S$$, we write that as:
$$
x\in S
$$
If it's not a member, then we write:
$$
x\notin S
$$

## Containment: $$\subset$$, $$\subseteq$$ and $$\not\subseteq$$

A set $$A$$ is a **subset** of another set $$B$ if all of $$A$$'s members are also members of $$B$$.  We might also say $$A$$ is **contained in** $$B$$.  We notate containment as:
$$
A \subseteq B
$$
We consider sets to be contained in themselves (to be subsets of themselves), hence the $$\subseteq$$ symbol having the bar on the bottom to make it look a little more like an equals sign.  In situations where $$B$$ has elements that $$A$$ doesn't we say that $$A$$ is a **proper subset** of $$B$$ and notate it without the extra bar:
$$
A \subset B
$$
If $$A$$ has elements that $$B$$ doesn't, then it's not contained in $$B$$, notated:
$$A\not\subseteq B$$


## Equality: $$=$$ and $$\neq$$

As we mentioned before, two sets $$A$$ and $$B$$ [are equal when they have the exact same elements](extensionality).  We notate that with an equals sign, just like with anything else:
$$
A=B
$$
If $$A\subseteq B$$ and also $$B \subseteq A$$, then $$A=B$$.

If $$A$$ and $$B$$ don't have identical, they're not equal: $$A\neq B$$.

## Disjoint sets

If two sets are no elements in common, then we way they are **disjoint**.  There's no special symbol for this relationship, although, as we will see in [set operations](Set_operations), we can express this by saying $$A\cap B = \emptyset$$.