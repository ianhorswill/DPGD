---
pagetitle: Properties of relations
---
We can classify relations in terms of their images.  Once again, I'll restrict myself to binary relations, since it's notationally simpler.  But these definitions could be extended to general relations.

## Totality

A relation $$R\subseteq A \times B$$ is left-total (or right-total) if every element on the left (right) is related to some element on the right:

* Left-total: (the following are all equivalent definitions)
   * Every element of $$A$$ is related to some element of $$B$$
   * $$\overleftarrow{B}=A$$
   * For every $$a\in A$$, there's some $$b\in B$$ for which $$aRb$$
   * No $$a\in A$$ has an empty right image / every $$a$$ has a non-empty right image
   * For all $$a\in A$$, $$\overrightarrow{R}(a)\neq\emptyset$$
* Right-total: (the same, but reversed)
   * Every element of $$B$$ is related to some element of $A$$
   * $$\overrightarrow{A}=B$$
   * For every $$b\in B$$, there's some $$a\in B$$ for which $$aRb$$
   * No $$b\in B$$ has an empty left image / every $$b$$ has a non-empty left image

## Uniqueness

A relation $$R\subseteq A \times B$$ is left-unique (or right-unique) if every element on the right (left) relates at most one thing on the left (right):

* Left-unique: (the following are equivalent)
    * Elements of $$B$$ are each related to at most one element of $$A$$
    * For all $$b\in B$$, $$|\overleftarrow{R}(b)|\leq 1$$
    * For all $$b\in B$$, if $$a_1 R b$$ and $$a_2 R b$$ then $$a_1=a_2$$
* Right-unique: (the same, but reversed)
    * Elements of $$A$$ are each related to at most one element of $$B$$
    * For all $$a\in A$$, $$|\overrightarrow{R}(a)|\leq 1$$
    * For all $$a\in A$$, if $$a R b_1$$ and $$a R b_2$$ then $$b_1=b_2$$

## Combination properties

Different combinations of these properties make for important special kinds of relations:

* One-to-one: both left- and right-unique
* One-to-many: left-unique and not right-unique
* Many-to-one: right-unique, but not left
* Many-to-many: neither


