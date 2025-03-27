---
pagetitle: Images of relations
---
We often find ourselves wanting to talk about what objects a given relation might relate a given object to.  For the equality relation, for example, a given object is only equal to itself.  In fact, every object is equal to itself and not other object.  However for the $$<$$ relation for numbers, any given number is less than an infinite set of other numbers.

It's useful to have a notation for writing the set of things an element is related to.  For any $$R\subseteq A\times B$$, that is for any relation $$R$$ between elements of the sets $$A$$ and $$B$$, we define the **images of set elements** as:
$$
\begin{align}
\overrightarrow{R}(a)&=\{b \; | \; aRb\} \\
\overleftarrow{R}(b)&=\{a \; | \; aRb\}
\end{align}
$$
That is, 

* $$\overrightarrow{R}(a)$$ is the set of all the things on the right related to $$a$$, and
* $$\overleftarrow{R}(b)$$ is the set of things related on the left to $$b$$

The images of sets of elements are:
$$
\begin{align}
\overrightarrow{R}(X)&=\{b \; | \;  aRb \text{ for some } a\in X\} \\
\overleftarrow{R}(X)&=\{a \; | \; aRb \text{ for some } b\in X\}
\end{align}
$$
That is,

* $$\overrightarrow{R}(X)$$ is the set of everything on the right related to something in $$X$$, and
* $$\overleftarrow{R}(X)$$ is the set of everything on the left related to something in $$X$$

## Images of $$n$$-ary relations

We can also talk about the images of $$n$$-ary relations, but I've never seen a good notation for writing it.  It's a pity because it would be useful for writing about constraint solvers.