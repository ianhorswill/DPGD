---
pagetitle: Declarative programming
status: early-draft
---

These problems would be simplified if we could give the spec directly to the computer rather than writing bespoke algorithms.  Declarative programming is an approximation to this.

The term declarative programming comes from a distinction in linguistics and philosophy between different kinds of utterances.  Imperatives, from the Latin *imperare* (“to command”), are commands: they tell the hearer to do something.  Declaratives are statements of fact: they declare something to be true.

Most programming languages are referred to as **imperative languages**.  Programs in them are sequences of commands to execute in order.  They specify how to compute a solution.

**Declarative programming language** give the programmer a way of describing what a solution would look like in a way that can be understood by a special program, a **solver**, that finds a solution given the description.  To varying degrees, these allow you to give a spec to the solver without the need to specify an algorithm.

Depending on the type of formalism, solvers go by different names: solvers, obviously, but also compilers, interpreters, planners, query engines, parsers, and generators.  To reduce the proliferation of jargon, and to emphasize their similarities, I’ll use the term solver uniformly unless there’s a compelling reason not to.
