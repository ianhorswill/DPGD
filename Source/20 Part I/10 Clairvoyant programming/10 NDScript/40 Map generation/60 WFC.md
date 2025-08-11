---
pagetitle: Constraint-based maps in the game industry
status: alpha
---
<img src="townscaper.png" alt="Source: https://wallpapercave.com/w/wp9779284" width="100%">
<br>
<br>


Constraint-based tilemap generation is better known in the game industry as the [WaveFunctionCollapse algorithm](wiki:Model_synthesis).  WFC includes an extremely clever innovation, however.  Whereas we had to specify the compatibility relation manually:
```ndscript
// What tiles can be adjaccent to what other tiles.
// Any combination is allowed EXCEPT water next to grass.
// This forces there to be a sand tile between any pair of
// water and grass tiles.
var compatible = relation(
   // You can put anything next to sand
   [sand, grass], [sand, water], [sand, sand],
   // You can put sand or more water next to water
   [water, water], [water, sand],
   // You can put sand or more grass next to grass
   [grass, grass], [grass, sand]);
```
WFC "learns" it from examples: the designer provides a set of example tilemaps, then WFC finds all the tile combinations that appear in at least one example, and construct a relation that accepts only those combinations.  The rest of the algorithm is the same.

WFC has been used in a number of games.  The best-known examples are those due to Oskar Stålberg: [*Bad North*](https://www.badnorth.com/) is a popular tower-defense-style real-time strategy game; [*Townscaper*](https://www.townscapergame.com/) is a constraint-based construction game for quaint, island towns.  You can try an online playable version of *Townscaper* [here](https://oskarstalberg.com/Townscaper/).  These both generate three-dimensional maps, but the underlying system is still constraint-propagation on a (3D) grid.