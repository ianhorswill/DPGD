---
pagetitle: Choice paths
status: alpha
---
NDScript is a variation of what Alan Turing called a "choice machine."[^1]   Each time it executes `choose`, there are multiple ways it can proceed.  These form a tree of possible executions, branching each time we `choose`.  Some of those branches end prematurely with the execution of `fail`, while others complete successfully.

Visualizing the complete choice tree for our planner is too big to fit nicely on the page here.  But lets say we start at coordinates (1,2) rather than (0,0).  Then we get this tree of possible executions.  We mark success states (where we reach the goal) in green, and fail states (running into an obstacle or off the map) in red:
```mermaid
graph TB
   s["(1,2)"] -- right -->  r["(2,2)"] -- right --> rr["(3,2) obstacle"]
   style rr fill:red
   r -- down --> rd["(2,3)"] -- right --> rdr["(3,3)"] -- right --> rdrr["(4,3)"] -- right --> rdrrr["(5,3) off map"]
   style rdrrd fill:green
   style rdrrr fill:red 
   rdrr -- down --> rdrrd["(4,4)"]
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
This has two success paths (paths that end up at green) everything else is a fail path (ends up at red).  The system's job is to always choose a success path.  Again, this is hard because it doesn't know which choices lead to success until it either finishes (success) or it executes `fail`.

That said, we can illustrate it for ourselves by coloring the interior nodes so that they're green if they're on a success path and red if otherwise.  Then we get this:
```mermaid
graph TB
   s["(1,2)"] -- right -->  r["(2,2)"] -- right --> rr["(3,2) obstacle"]
   style s fill:green
   style r fill:green
   style rr fill:red
   r -- down --> rd["(2,3)"] -- right --> rdr["(3,3)"] -- right --> rdrr["(4,3)"] -- right --> rdrrr["(5,3) off map"]
   style rd fill:green
   style rdrrr fill:red
   style rdr fill:green
   style rdrr fill:green
   rdrr -- down --> rdrrd["(4,4)"]
   style rdrrd fill:green
   rdr -- down --> rdrd["(3,4) obstacle"]
   style rdrd fill:red
   rd -- down --> rdd["(2,4)"] -- right --> rddr["(3,4) obstacle"]
   style rdd fill:red
   style rddr fill:red
   rdd -- down --> rddd["(2,5) off map"]
   style rddd fill:red
   s -- down --> d["(1,3)"] -- right --> dr["(2,3)"]
   style d fill:green
   style dr fill:green
   style drd fill:red
   style drr fill:green
   style drrr fill:green
   style dd fill:red
   style ddr fill:red
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
Again, the contract of the system is that it will always choose a successful path, provided one exists.  When there are multiple successful paths, NDScript is written to choose one randomly.  But most nondeterministic languages choose the leftmost one.

## Notes

[^1]: [Turing, A. M. *On Computable Numbers, with an Application to the Entscheidungsproblem."](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s2-42.1.230).