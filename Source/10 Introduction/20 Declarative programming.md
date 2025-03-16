---
pagetitle: Declarative programming
---

These problems might be simplified if we could give the spec directly to the computer rather than writing bespoke algorithms.  Declarative programming basically seeks an approximation to this.

The term declarative programming comes from a distinction in linguistics and philosophy between different kinds of utterances.  Imperatives, from the latin *imperare* (“to command”), tell the person addressed to do something.  Declaratives tell them something is true.

Most programming languages are referred to as imperative languages.  Programs in them are sequences of commands to execute in order.  An **imperative program** specifies how to compute a solution.

**Declarative programs** consist of true statements about the problem domain.  They specify what a solution would look like, without specifying how to find one.  A declarative programming language gives the programmer a way of describing such statements in a way that can be understood by a special program, often called a **solver**, that can find a solution given the statements.  To varying degrees, these allow you to give a spec to the solver without the need to specify an algorithm.

Depending on the type of formalism, solvers go by different names: solvers, obviously, but also compilers, interpreters, planners, query engines, parsers, and generators.  To reduce the proliferation of jargon, and to emphasize their similarities, I’ll use the term solver uniformly unless there’s a compelling reason not to.
