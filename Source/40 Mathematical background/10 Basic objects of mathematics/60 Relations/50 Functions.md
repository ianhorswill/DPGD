---
pagetitle: Functions
---
Suppose we have a relation $$F\subseteq A\times B$$ that is both left-total (every element of $$A$$ relates to something) and right-unique (elements of $$A$$ only relate to one thing).  Then for any $$a\in A$$, $$\overrightarrow{F}(a)$$ is a set of one element, the unique element that $$a$$ relates to.  In cases like this, we don't care about the set, since we know it only has one element.  We want to know what the one element is.  So we adopt the completely unexpected notation:
$$
F(a) = \text{ the unique }b\text{ for which }aFb
$$
So:
$$
F(a)=b
$$
Is really just a nicer notation for $$aFb$$.

Such relations are, not surprisingly called functions.

In set theory, functions are just a special kind of relation with an extra bit of notation. A function $$F: A\rightarrow B$$ is just a relation (set) $$F\subseteq A\times B$$.  A two-argument function $$F: A\times B\rightarrow C$$ is a relation $$F\subseteq (A\times B)\times C$$.

## Special kinds of functions

We can also classify functions according to additional properties they have as relations:

* Injections (aka one-to-one functions, injective functions, invertible function)
    * Function (left-total, right unique relations) that are also left-unique, and so one-to-one
    * Every $$a$$ maps to exactly one $$b$$, which is only mapped to by that one $$a$$
    * But there may be some $$b$$'s that aren't mapped to at all
* Surjections (aka onto functions, surjective functions)
    * Functions (left-total, right unique relations) that are also right-total
    * Every $$a$$ maps to exactly one $$b$$, every $$b$$ to at least one $$a$$
* Bijections (aka one-to-one onto functions, bijective functions, one-to-one correspondence)
    * All the properties: left- and right- total and unique
    * Every $$a$$ maps to one $$b$$, every $$b$$ to one $$a$$ 

