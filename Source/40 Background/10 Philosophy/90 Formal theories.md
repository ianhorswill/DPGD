---
pagetitle: Formal systems
---
This book is about better formalisms for game designers.  If you’re writing a computer game, you’re using formalisms.  Different formalisms have different strengths and weaknesses, and this book seeks to introduce you some that may be better suited than the ones you know.

Formalism is an intimidating word, in part because college courses tend to use it without explaining what it means.  Students are exposed to formalisms without discussing why formalizing something might be useful.

Formalisms are idealized models of something we want to talk about.[^1]  However, “model” gets used to mean something specific[^2], so instead the word *theory* is more common: a formalism is a theory of an idealized version of something we want to talk about.

Games often incorporate idealized theories of some aspect of like.  *Monopoly* has an theory of capitalism.  Chess has an theory of warfare.  The *GUMSHOE* table-top RPG system has theory of particular kinds of mystery stories.  Platformer games have theories of gravity, certain kinds of space traversal (running and jumping), and certain kinds of combat.

Some of those theories are “formal" and others aren’t.  The *form* of something is how its pieces are put together.  Its *content* is what it means.  A formal theory is one whose rules you can apply using only their form, without having to already know what the terms mean (its content).

Table-top roleplaying games aren’t formal in this sense, and it wouldn’t even be desirable for them to be formal.  When a TTRPG has a rule like “if an action puts a player at risk of falling then roll using these rules …”, that rule sits atop all the background knowledge of its players.  There cannot be a table of every possible player action and which of them put the player at risk of falling because players can and do constantly think of new actions the designers didn’t anticipate.  

Computer games on the other hand, *must* be formal because the computer doesn’t know what gravity is.  Inside any given platformer game will be a rule like:

> *If there is no platform under the player, set the Y component of their velocity to -10* 

Provided there are other rules to tell the computer when to set and clear the “on a platform” flag, this rule is formal: it doesn’t require the computer to already understand anything beyond how to read and write memory locations.

In academic usage, a **formal theory** is one that can be expressed purely in terms of manipulating words or other symbols based on [their form rather than their content](form_and_content).

Historically, the theory of formal theories come out of late 19th century and early 20th century mathematics and philosophy (specifically analytic philosophy), who were engaged in the project of trying to come up with a formal basis for all of mathematics that could be used 

## Endnotes
[^1]: *Esoteric*: Formalisms are sufficiently important that there are also people who study formalism for its own sake without thinking about how the formalism represents something else.  However, that isn’t relevant to us here.

[^2]: *Esoteric*: In formal logic, a model is something that is accurately described by a theory.  So one talks about something “being a model of a theory” (or not).