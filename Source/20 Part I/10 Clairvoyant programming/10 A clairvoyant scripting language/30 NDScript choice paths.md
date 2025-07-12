---
pagetitle: Choice paths
status: alpha
---
NDScript is a variation of what Alan Turing called a *choice machine*.[^1]   As a program repeatedly executes `choose`, it creates a tree of possibilities.  Some of those branches end prematurely with the execution of `fail`, while others complete successfully.

Visualizing the complete choice tree for our planner is too big to fit nicely on the page here.  But lets say we start at coordinates (1,2) rather than (0,0).  Then we get this tree of possible executions
```mermaid
graph TB
   s["(1,2)"] -- right -->  r["(2,2)"] -- right --> rr["(3,2) obstacle"]
   style rr fill:red
   r -- down --> rd["(2,3)"] -- right --> rdr["(3,3)"] -- right --> rdrr["(4,3)"] -- right --> rdrrr["(5,3) off map"]
   style rdrrr fill:red
   rdrr -- down --> rdrrd["(4,4)"]
   style rdrrd fill:green
   rdr -- down --> rdrd["(3,4) obstacle"]
   style rdrd fill:red
   rd -- down --> rdd["(2,4)"] -- right --> rddr["(3,4) obstacle"]
   style rddr fill:red
   rdd -- down --> rddd["(2,5) off map"]
   style rddd fill:red
   s -- down --> d["(1,3)"] -- right --> dr["(2,3)"]
   dr["(2,3)"] -- right --> drr["(3,3)"] -- right --> drrr["(4,3)"] -- right --> drrrr["(5,3) off map"]
   style drrrr fill:red
   drrr -- down --> drrrd["(4,4)"]
   style drrrd fill:green
   drr -- down --> drrd["(3,4) obstacle"]
   style drrd fill:red
   dr -- down --> drd["(2,4)"] -- right --> drdr["(3,4) obstacle"]
   style drdr fill:red
   drd -- down --> drdd["(2,5) off map"]
   style drdd fill:red
   d -- down --> dd["(1,4)"] -- right --> ddr["(2,4)"] -- right --> ddrr["(3,4) obstacle"]
   style ddrr fill:red
   dd -- down --> ddd["(1,5) off map"]
   style ddd fill:red
   ddr -- down --> ddrd["(2,5) off map"]
   style ddrd fill:red
```
This has two green (success/solution) paths and a lot of red (fail) paths.  Again, the contract of the system is that it will always choose a green success path, if one exists.  NDScript is written to choose the path randomly, but most nondeterministic languages choose the leftmost successful path.

## Endnotes

[^1]: [Turing, A. M. *On Computable Numbers, with an Application to the Entscheidungsproblem."](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230).