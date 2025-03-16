---
pagetitle: Clarity of notation
---
Relations are an example of the use of math.  Most computer programs are built out of functions: things that take inputs and produce an output.  So for example, a program might have an “manager of” function: you call it with an employee, it gives you back their manager.

As we alluded to above, this is a problem when we want to go not from employees to managers but the other way around.  So database systems often describe data in terms of relationships rather than functions, which math class called “relations” rather than “relationships.”  Rather than a one-argument manager function $$M(underling)$$, we might have a two-argument manager relation M(underling,manager) that is true whenever the first argument’s manager is the second argument.  So rather than saying $$M(Jill)=Jenny$$, we say $$M(Jill,Jenny)$$ is true, whereas $$M(Jill,Shane)$$ is false.  This has lots of advantages, such as the ability to express that someone reports to multiple managers.

That said, you still want some compact notation for saying things like “Jill’s manager(s)” or or “Jenny’s underlings.”  We will write as $$\overrightarrow{M}(Jill)$$ and $$\overleftarrow{M}(Jenny)$$, respectively, using the arrow to indicate whether we’re moving from the left argument to the right, or from the right argument to the left.  That’s an example of introducing notation to improve clarity.
