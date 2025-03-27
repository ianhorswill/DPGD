---
pagetitle: Homogeneous relations
---
A relation $$R\subseteq A\times A$$ between a set $$A$$ and itself is called a homogeneous because both its arguments come from the same set.  Homogeneous relations come up frequently in math and computer science.  Math examples include: $$=, <, >, and \subseteq$$.  Examples from everyday life are any kind of relation between people (e.g. familiar relationships).  Examples from programming include the subclass relation graphs and tree, which are essentilly homogeneous relations (see [graphs](Graphs)).

## Special properties of homogeneous relations

Homogeneous relations can have nice properties that other relations can't.  Not all have them, 

### Reflexivity

A relation $$R\subseteq A\times A$$ is **reflexive** if all elements relate to themselves.  That is, if $$aRa$$ for all $$a\in A$$.

$$R$$ is **antireflexive** if elements never relate to themselves.  That is, if $$aRa$$ is false for all $$a\in A$$.

### Symmetry

A relation $$R\subseteq A\times A$$ is **symmetric** if (equivalently):

* Order of arguments doesn't matter
* $$aRb$$ if and only if $$bRa$$
* $$R=R^{-1}$$

You would expect antisymmetry to be the opposite, that if $$aRb$$ is true then $$bRa$$ must be false and vice-versa.  The problem with that is that then $$aRa$$ can never be true, i.e. that definition of antisymmetry would force the relation to *also* be antireflexive.

So instead we define $$R$$ to be **antisymmetric** if for all $$a,b\in A$$ $$aRb$$ and $$bRa$$ can only be true when $$a=b$$.

### Transitivity

A relation $$R\subseteq A\times A$$ is **transitive** if $$aRb$$ and $$bRc$$ imply $$aRc$$ for all $$a,b,c \in A$$.

## Important kinds of homogeneous relations

### Equivalence

Much of mathematics is based on making things that are similar to other things.  **Equivalence relations** are things that are similar to the $$=$$ relation.
In particular, $$=$$ has the formal properties of:[^1]

* Reflexive: things are equal to themselves
* Symmetric: if $$a=b$$ then $$b=x$$
* Transitive: if $$a=b$$ and $$b=c$$ then $$a=c$$

Any relation that shares these properties ends up seeming very "equalsish".  
The thing is, lots of relationships have these properties.  For example, any relationship of the form "same $$X$$ as": same company as, same state as, same genre as, etc.  A game has the same genre as itself.  If $$A$$ has the same genre as $$B$$ then $$B$$ has the same genre as $$A$$.  If $$A$$ has the same genre as $$B$$ and $$B$$ as $$C$$, then $$A$$ has the same genre as $$C$$.

**FINISHME**

### Orderings

Similarly, orders are things that are similar to the $$\leq$$ relation on numbers.  The $$\leq$$ relation has the properties:

* Reflexive: $$x\leq x$$ for all $$x$$
* Antisymetric: $$x\leq y$$ and $$y\leq x$$ simultaneously only when $$x=y$$
* Transitive: if $$x\leq y$$ and $$y \leq z$$ then $$x\leq z$$

An **order** is any relation $$R\subseteq A \times A$$ with the same properties:

* Reflexive: $$aRa$$ for all $$a\in A$$
* Antisymetric: $$aRb$$ and $$bRa$$ simultaneously only when $$a=b$$
* Transitive: if $$aRb$$ and $$bRc$$ then $$aRc$$

**FINISHME**


## Endnotes

[^1]: It's also anti-symmetric.  But $$=$$ is the only relation that is all those things plus antisymmetric, so it's not useful