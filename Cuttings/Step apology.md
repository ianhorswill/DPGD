---
pagetitle: A brief introduction to the Step language
---
The examples in Part I will primarily be in the [the *Step* language](https://github.com/ianhorswill/Step).  It has the features of classical AI languages[^1] but began life as a text generation language[^2] targeted at writers.  It has a much gentler learning curve than the languages found in academia.  You can use the fancy features when you need them, but you don't have to know they exist if you aren't using them.  It doesn't force you to learn formal logic

*Step* is also open-source and designed to be an easy plug-in for games built in C# with engines such as Unity, Godot, or Monogame.  You can find it [here](https://github.com/ianhorswill/Step).

All this is a kind of apology and self-justification for using my own programming language.  The intention here is not that everyone use *Step* in their game; that will very likely involve authoring tools you build for yourself.  We use *Step* because it's easy to learn, and in so doing, you can learn what features you would want to incorporate in your tool.  Then [Part II](Part_II) will teach you how to make your own tools.

## If you are an experienced programmer

If you haven’t programmed before, you should skip ahead.

*Step* is a domain-specific language for text generation that uses a lot of ideas from the languages *PLANNER* and *Prolog* from the early 1970s.

Methods for *Step* tasks don’t have to work all the time.  You can specify many different possible methods to try.  *Step* will systematically try them until it finds one that works.  

Each of those methods might call other tasks with other fallible methods that call other tasks, and so on.
Step automatically searches the tree of possible method choices.  When the program completes, it’s as if Step has magically guessed all the right methods to use.

This feature is sometimes called **non-determinism**.[^3]  Step is a non-deterministic language.


## Notes

[^1]: For those who know these terms already, *Step* has nearly all the features of classical logic programming languages such as [*Prolog*](https://en.wikipedia.org/wiki/Prolog), and HTN planners such as [*SHOP*](https://www.cs.umd.edu/~nau/projects/shop).  It is both weaker and more powerful than [answer set programming](https://en.wikipedia.org/wiki/Answer_set_programming).  If you don't know what these terms mean, we will explain them later in the book.

[^2]: *Step* was originally "STeP", an acronym for "simple text planner."

[^3]: Actually, many different things get referred to as non-determinism in computer science.  In more or less every other context, non-determinism, which means many things could happen, is a bad thing because most of those things that can happen are the wrong thing.  In non-deterministic languages, the non-determinism is a good thing because the system guarantees it will filter out the wrong things and leave you with the right thing, or at least some right thing.  This kind of non-determinism is sometimes called *angelic non-determinism* as opposed to the bad *demonic non-determinism*. 
