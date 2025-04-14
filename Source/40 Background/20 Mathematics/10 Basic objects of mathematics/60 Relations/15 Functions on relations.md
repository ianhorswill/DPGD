---
pagetitle: Functions on relations
---
There are a number of operations that make new relations from old ones.

## Composition

Let $$R\subseteq A\times B$$ be a relation on $$A$$ and $$B$$ and $$S\subseteq B \times C$$ be a relation on $$B$$ and $$C$$.  Then their composition $$RS\subseteq A\times C$$ is a relation on $$A$$ and $$C$$ defined by:

* $$aRSc$$ is true if and only if there is some $$b$$ for which $$aRb$$ and $$bSc$$.  Or equivalently,
* $$RS = \{ (a,c) \; | \; aRb \text{ and } bSc \text{ for some } b \}$$

## Converse/inverse

Let $$R\subseteq A \times B$$ be a relation on $$A$$ and $$B$$.  Then the converse of $$R^{-1}\subseteq B\times A$$ is simply $$R$$ with its left- and right- arguments reversed:

* $$bR^{-1}a$$ is true whenever $$aRb$$ is true.  Or equivalently,
* $$R^{-1} = \{ (b, a) \; | \; (a,b)\in R\}$$