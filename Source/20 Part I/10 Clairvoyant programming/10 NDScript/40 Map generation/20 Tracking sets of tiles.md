---
pagetitle: Tracking viable tiles
status: alpha
---
Checking in the neighborhood of a tile after placing it is helpful.  But it's even better if we never place bad tiles to begin with.  We can do that by keeping track of what tiles are valid in each location.  On this page, we'll use a $3\times 3$ grid for our examples rather than $10\times 10$, so it will fit the screen better.

We start with every cell being able to have every tile:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td><td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

## First choice

Now we choose a cell and **narrow** it to a single tile.  Let's say we make the center be grass, so that's the only candidate for the center position:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

Here's the key insight: once we decide that cell is grass, we've effectively decided that its neighbors aren't water, so we can remove water from the set of possible tiles for the neighbors:

<table class="centered">
<tr> <td width="auto"><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

## Second choice

Now, if we make the top-left corner be water:

<table class="centered">
<tr> <td width="auto"><img src="blue255.png" alt="sea" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

Then its neighbors can't be grass, removing grass from the candidates for those cells:

<table class="centered">
<tr> <td width="auto"><img src="blue255.png" alt="sea" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
        <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
</table>

We've effectively assigned those tiles to be sand because that's the only remaining option, even though we never explicitly decided that.

## Third choice

Now suppose we make the opposite corner also be water:

<table class="centered">
<tr> <td width="auto"><img src="blue255.png" alt="sea" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td> <img src="green200.png" alt="grass" width="auto"><img src="brown200.png" alt="sand" width="auto"></td>
        <td><img src="blue255.png" alt="sea" width="auto"> </tr>
</table>

Then that, again, rules out grass for the adjacent cells:

<table class="centered">
<tr> <td width="auto"><img src="blue255.png" alt="sea" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td> </tr>
<tr> <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="blue150.png" alt="sea" width="auto"><img src="green150.png" alt="grass" width="auto"><img src="brown150.png" alt="sand" width="auto"></td>
        <td><img src="brown255.png" alt="sand" width="auto"></td>
        <td><img src="blue255.png" alt="sea" width="auto"> </tr>
</table>

Three choices have fully determined the tiles of 7 cells.

## Finishing the map

We can set the remaining cells to any tiles we want --- they don't interact.  Let's say we make them both grass: 

<table class="centered">
<tr> <td width="auto"><img src="blue255.png" alt="sea" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td> </tr>
<tr> <td> <img src="brown255.png" alt="sand" width="auto"></td>
       <td><img src="green255.png" alt="grass" width="auto"></td>
       <td> <img src="brown255.png" alt="sand" width="auto"></td> </tr>
<tr> <td><img src="green255.png" alt="grass" width="auto"></td>
        <td><img src="brown255.png" alt="sand" width="auto"></td>
        <td><img src="blue255.png" alt="sea" width="auto"> </tr>
</table>

Even though we only made five choices, those five choices determined all nine cells.