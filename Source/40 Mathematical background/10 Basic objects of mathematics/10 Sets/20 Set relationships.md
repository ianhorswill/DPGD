---
pagetitle: Basic relationships between sets and objects
---
Many of the questions we might want to answer about a given set involve its relationship to potential elements or to other sets.

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

As we mentioned before, two sets $$A$$ and $$B$$ are equal if and only if they have the exact same elements.  We notate that with an equals sign, just like with anything else:
$$
A=B
$$
If $$A\subseteq B$$ and also $$B \subseteq A$$, then $$A=B$$.

If $$A$$ and $$B$$ don't have identical, they're not equal: $$A\neq B$$.

## Disjoint sets

If two sets are no elements in common, then we way they are **disjoint**.  There's no special symbol for this relationship, although, as we will see in [set operations](Set_operations), we can express this by saying $$A\cap B = \emptyset$$.