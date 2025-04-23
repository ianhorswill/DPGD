---
pagetitle: Grammars
---

A formal grammar is a set of rules that define the syntax of a language.  Most commonly, these are variations on **context-free grammars**.  They specify a set of possible possible phrase types and templates for how a given type of phrase can be constructed from other phrases. 

## Text generation

Formal grammars are used in games for generating random text.  For example, the game [*Caves of Qud*](https://en.wikipedia.org/wiki/Caves_of_Qud) generates procedural histories using rules like (adapted from [Grinblat GDC 2018](https://www.gdcvault.com/play/1024990/Procedurally-Generating-History-in-Caves)):
```step
Event: Acting against [Injustice], [SultanName] led an army to the gates of [Location].
Injustice: the persecution of [FactionName]
```
Rules can be added for different kinds of events, injustices, and so on, extending the system in a data-driven manner.  Here, I've added a few more rules of my own to make a version in the Step language that you can run.  Click below to try it and pres the Run button a few times:
```Step
# Try: [Event]
[randomly]
Event: Acting against [Injustice], [SultanName] led an army to the gates of [Location].
Event: [SultanName] set out on a quest to find the lost city of [Location]
[randomly]
Injustice: the persecution of [FactionName]
Injustice: the enslavement of innocents

[randomly]
SultanName: [Name] [SerialNumber]
SultanNAme: [Name] the [Attribute]

[randomly]
Name: Dragobar
Name: Biralley
Name: Equibina
Name: Samuel

[randomly]
SerialNumber: I
SerialNumber: II
SerialNumber: III
SerialNumber: IV
SerialNumber: V

[randomly]
Attribute: Horrible
Attribute: Just
Attribute: Great
Attribute: Extremely Polite

[randomly]
FactionName: antelopes
FactionName: cats
FactionName: Daughters of Exile
FactionName: Consortium of Phyta

[randomly]
Location: Margaritaville
Location: Gyllaba
Location: Rhepa
Location: Ebullia
```

## Parsing

A more pervasive use case is to build parsers for compilers.  Parsing programming languages is hard.  Even writing something simple like a parser for arithmetic expressions is difficult, since the program can only read one token at a time but the correct interpretation of the current token often depends on tokens the program hasn’t read yet.  Standard practice is to write a grammar for the language to be parsed, such as:
```step
Expression: [Expression] + [Expression]
Expression: [Expression] - [Expression]
Expression: [Term]
Term: [Term] * [Term]
Term: [Term] / [Term]
Term: [Factor]
Factor: [Number]
Factor: [Variable]
Factor: ( [Expression] )
```
A [parser generator](https://en.wikipedia.org/wiki/Comparison_of_parser_generators) then reads this declarative specification and automatically produces the imperative code for a parser from it.
What makes this declarative programming is that the grammar specifies what the language is without specifying directly how to parse or generate strings within it.
