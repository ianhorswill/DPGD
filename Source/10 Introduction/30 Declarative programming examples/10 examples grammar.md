---
pagetitle: Grammars
---

A formal grammar is a set of rules that define the syntax of a language.  In programming, we generally use some variation on context-free grammars, which specify a set of possible tokens (words), a set of possible phrase types, and rules for how phrased types can be replaced by different sequences of tokens and/or other phrase types.  A given phrase may have many different rules for alternative constructions of the phrase. 
Formal grammars are used in games for generating random text.  For example, the game [*Caves of Qud*](https://en.wikipedia.org/wiki/Caves_of_Qud) generates procedural histories using rules like (adapted from [Grinblat GDC 2018](https://www.gdcvault.com/play/1024990/Procedurally-Generating-History-in-Caves)):

$$
\begin{align}
Event &\rightarrow \text{Acting against Injustice,}\; SultanName \; \text{led an army to the gates of } Location. \\
Injustice &\rightarrow \text{the persecution of}\; FactionName
\end{align}
$$
Different rules can be added for different kinds of events, injustices, and so on, allowing the system to be extended in a data-driven manner.
A less obvious, but more pervasive use case is to build parsers for compilers.  Parsing programming languages is hard.  Even writing something simple like a parser for arithmetic expressions is difficult, since the program can only read one token at a time but the correct interpretation of the current token often depends on tokens the program hasn’t read yet.  Standard practice is to write a grammar for the language to be parsed, such as (here the vertical bar means “or”):

$$
\begin{align}
Expression & \rightarrow Expression+Expression\; | \;Expression-Expression\; |\;  Term \\
Term & \rightarrow Term*Term\; |\; Term / Term\; |\;  Factor \\
Factor & \rightarrow Number\; |\; Variable \; |\;  ( Expression )
\end{align}
$$
A parser generator then reads this declarative specification and automatically produces the imperative code for a parser from it.
What makes this declarative programming is that the grammar specifies what the language is without specifying directly how to parse or generate strings within it.
