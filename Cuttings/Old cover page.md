---
pagetitle: Declarative Programming for Game Design
shorttitle: DPGD
---
This book seeks to demystify the various forms of declarative programming: how to use different kinds of solvers, as well as how they work internally and how to write your own or use ideas from declarative programming for other kinds of projects.

Although the book is addressed in large part to game designers, it does not require any specific game knowledge, and can be used by anyone seeking to understand the basic technologies involved. Although much of the book assumes significant familiarity with programming, and [Part II](Part_II) assumes background comparable to a computer science degree, my goal is for the book to be useful to a range of readers from designers with relatively little programming background to graduate students focused on research.  As a result, when we encounter formal systems, I'll try to give a substantive informal description of things and leave the full mathy formal description as a separate discussion. 

[Part I](Part_I) teaches you to be a user of solvers.  We’ll discuss grammars, logic programming, constraint satisfaction systems, and planners.  This necessarily means teaching you specific languages and formalisms, and I will generally use languages that I designed myself (sorry) and that are open source (not sorry).  Where relevant, I’ll discuss their differences from other languages.

[Part II](Part_II) discusses the techniques used to implement solvers.  These use a number of shared tools: non-determinism, backtracking, constraint variables and constraint propagation, so-called logic variables and unification, search and heuristics.  And these tools get combined into into standard algorithms with cryptic names that are frequently used for specific kinds of problems: SLDNF resolution, AC-4, DPLL, and so on.

The appendices provide background on the mathematical systems used in the text for those who are unfamiliar with them or who need a refresher.
