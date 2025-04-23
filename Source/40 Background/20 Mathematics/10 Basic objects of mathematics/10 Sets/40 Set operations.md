---
pagetitle: Basic operations on sets
---
Just as with numbers, there are a number of ways we can combine or otherwise modify sets.

## Summary
Given two sets $A$ and $B$,

* $A\cup B$, the *union* of the sets, is the set you get by merging the elements of the two
* $A \cap B$, the *intersection* of the two, is set of elements common to both
* $A-B$, the *difference* of the sets, is the set of elements of $A$ that aren't also in $B$.
* $2^A$, the powerset of $A$, is the set of subsets of $A$.  So the powerset of $\{a,b\}$ is the set of its four possible subsets: $\{\{\}, \{a\}, \{b\}, \{a,b\}\}$.
* $A\times B$, the *Cartesian product* of the sets is the set of all possible [pairs](tuples) formed from an element of $A$ followed by an element of $B$.  Will talk about tuples next.

## Union $$\cup$$

The union of two sets $$A$$ and $$B$$ is just the set containing all the elements of both:
$$
A \cup B = \{ x \; | \; x\in A \text{ or } x\in B\}
$$
Since sets can only have an element or not (they can't have an element twice), if an element is in both sets, it's only contained in the union once.

## Intersection $$\cap$$

The intersection of two sets $$A$$ and $$B$$ is just the set of elements common to both:
$$
A \cap B = \{ x \; | \; x\in A \text{ and } x\in B\}
$$
If the sets are disjoint, then $$A \cap B = \emptyset$$.

## Difference of two sets

The set of elements in $$A$$ but not $$B$$ is written $$A-B$$:
$$
A-B = \{ x \; | \; x\in A \text{ but } x\notin B \}
$$

## Powerset

We often want to think about subsets of another set (sets contained in the original set).  The set of all possible subsets of a set $$A$$ is called the powerset of $$A$$ and is written $$2^A$$:
$$
2^A = \{ S \; | \; S \subseteq A\}
$$
To understand why we notate it $$2^A$$, consider the following.  The empty set $$\{\}$$ has zero elements and one subset, itself (remember that subset includes equality).  A set with one element, e.g. $$\{ 1 \}$$, has two subsets: itself and the empty set.  A set with two elements, e.g. $$\{ 1, 2 \}$$ has four possible subsets: $$\{\}$$, $$\{ 1\}$$, $$\{ 2\}$$, and $$\{1,2\}$$.  In general, when choosing subsets, we choose whether or not to include each element.  For a set with $$n$$ elements, there are $$n$$ such choices, with 2 options per choice (include it or not) and so the total number of combinations is $$2^n$$. So we use the notation $$2^A$$ to express the set of subsets of $$A$$ because the number of such sets is 2 to the number of elements in the set.

**Important**: $$2^A$$ is different from $$A^2$$, defined below.

## Cartesian product: $$\times$$

We haven't talked about [pairs and tuples](Tuples) yet, so don't worry if you don't understand this yet. But tuples are simple: they're just lists.  We're including it here so it's together with the other operations. The Cartesian[^1] product makes sets of from other sets.  $$A\times B$$ is the set of all pairs of elements drawn from $$A$$ and $$B$, respectively:
$$
A \times B = \{ (a,b) \; | \; a\in A, b\in B \}
$$
More products make longer tuples: $$A\times B \times C$$ is the set of all triples formed from elements of $$A$$, $$B$$, and $$C$$, respectively:
$$
A \times B \times C = \{ (a,b,c) \; | \; a\in A, b\in B, c\in C \}
$$
More generally, the product of $$n$$ sets is an $$n$$-tuple (list of $$n$$ elements):
$$
S_1 \times S_2 \times ... \times S_n = \{ (s_1,s_2, ..., s_n) \; | \; s_i\in S_i, \text{ for each } i \}
$$

## Exponentiation

The the power of a set is defined analogously to  powers of numbers: $$S^2 = S\times S$$, $$S^3 = S \times S \times S$$, and so on.  More generally, $$S^n$$ is the set of all $$n$$-tuples (lists of $$n$$ elements) whose elements are all drawn from $$S$$.

**Important** $$S^2$$, the set of pairs of elements drawn from $$S$$, is unrelated to $$2^S$$, the set of all subsets of $$S$$, other than both involving $$S$$.

## Cardinality (size of a set)

The number of elements in a set $$S$$ is just written $$|S|$$.  For the moment, we will assume $$S$$ has a finite number of elements.  The esoterica includes a discussion of how to think about the sizes of infinite sets, which turns out to be shockinglyy hard and counter-intuitive. 

## Remembering the symbols

It's more important to understand the ideas than the notation.  That said, here are some mnemonics for remembering the notation:

* $$A\cup B$$ is a union because it has a little "u"
* $$A \cap B$$ is an intersection because it has an upside-down "u" and intersection is a kind of opposite of union
* $$A-B$$ is subtracting the elements of $$B$ from $$A$$
* For the multiplication-like operations
   * The powerset of a $$A$$ with $$a$$ elements is $$2^A$$ because has $$2^a$$ elements (there are $$2^a$$ possible subsets of $$A$)
   * The set of tuples formed from a set $$A$$ with $$a$$ elements and a set $$B$$ with $$b$$ elements is notated $$A\times B$$ because it has $$a\times b$$ elements.
   * The set of $$n$$-tuples formed from the elements of a set $$A$$ with $$a$$ elements is $$A^n$$ both because it is $$A$$ multiplied by itself repeatedly, and becuase it has $$a^n$$ elements.



## Footnotes

[^1]: It's called the Cartesian product because it's named after Descartes, who invented it.