---
pagetitle: Propagating constraints
status: alpha
---

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

Now let's change the constraints somewhat.  Let's say that only another grass tile can be to the left of a grass tile.  Then if we place a grass tile on the right side:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

Then it not only removes water from consideration for its neighbors, as before:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
</table>

But now it also forces the tile to the left to also be grass:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
         <td><img src="green255.png" alt="grass" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
</table>

That removes water from consideration for *its* neighbors:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
         <td><img src="green255.png" alt="grass" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
</table>

But then the cell to the left of it also has to be grass:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="green255.png" alt="grass" width="auto"></td>
         <td><img src="green255.png" alt="grass" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
</table>

which, again, restricts the cells above and below it:

<table class="centered">
<tr> <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
       <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="green255.png" alt="grass" width="auto"></td>
         <td><img src="green255.png" alt="grass" width="auto"></td>
        <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> 
        <td><img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
</table>

So setting one tile impacted the tiles of **every cell on the grid** and fully determined the tile of two other cells.

## Constraint propagation

This is called **constraint propagation**: as we narrow the choices of one cell, we update the choices of the neighboring cells.  This will never add new possibilities for the neighbors, but it can potentially remove them; when it does, we recursively update their neighbors, and so on, until no more cells can be narrowed.

There are two important possible outcomes for a cell.  If it is narrowed to a single possibility (aka a **singleton** set), then we know that cell has to have that tile.  On the other hand, if we remove all possibilities from a cell (we reduce it to the **empty** set), then we know that the choice that started the propagation process was incorrect, and we `fail`, meaning the solver has to reconsider one of the previous choices.

That's the basic algorithm for solving constraint satisfaction problems: start by allowing every cell to have every possible value.  Then gradually pick values for cells from among their possible values.  Each time, propagate that narrowing through the network of constraints, potentially narrowing the other cells.  If we narrow a cell to nothing, fail, if we're narrowed all cells to singletons, we're done.
