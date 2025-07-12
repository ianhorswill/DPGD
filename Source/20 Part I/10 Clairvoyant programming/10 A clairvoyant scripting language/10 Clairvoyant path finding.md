---
pagetitle: Clairvoyant pathfinding
status: alpha
---
Clairvoyance is most useful for planning and other search algorithms, so we'll start with a path planner.  We'll assume we have a 5x5 grid and that we're trying to get from the top-left corner to the bottom-right by moving only right or down.  So this won't be a *good* path planner. But it's illustrative, and it's notable that the basic algorithm can be written in one line:
```ndscript
while (!done()) choose right(); or down();
``` 

## The map

We'll represent the map as a 2D array of strings, each of which is the filename of a tile: `white.png` for a blank space, `red.png` for an obstacle:
```ndscript
var s = "white.png";     // free space
var X = "red.png";       // obstacle
var size = 5;
var map = grid([
                           [s, s, s, s, s],
                           [s, s, s, s, s],
                           [s, s, s, X, X],
                           [s, s, s, s, s],
                           [s, s, s, X, s]
                     ]);
```
And we'll use global variables to represent our position, which will initially be the top-left corner:
```ndscript
var x = 0;
var y = 0;
```
## The pathfinder

To start with, let's assume we only ever move down or to the right; we never have to back up to find a solution.  So our basic algorithm is just:
```ndscript
function solve()
{
   while (!done())
      choose
         right();
      or
         down();
}
```
The `right` and `down` functions just need to change our coordinates.  But we'll also mark our path so we'll be able to see it afterward, storing either `"right.png"` when we move right or `"down.png"` one when we move down:
```ndscript
function right() {
   map[x, y] = "right.png";
   x = x+1;
}

function down() {
   map[x, y] = "down.png";
   y = y+1;
}
```
But we do have to avoid obstacles.  So if we move into a tile that already has something, we `fail`:
```ndscript
function right() {
   map[x, y] = "right.png";
   x = x+1;
   if (map[x, y] != s) fail;
}

function down() {
   map[x, y] = "down.png";
   y = y+1;
   if (map[x, y] != s) fail;
}
```
And we should also fail if we move off the map:
```ndscript
function right() {
   map[x, y] = "right.png";
   x = x+1;
   if (x == size || map[x, y] != s) fail;
}

function down() {
   map[x, y] = "down.png";
   y = y+1;
   if (y == size || map[x, y] != s) fail;
}
```
You can try to the pathfinder by clicking below and then clicking Run.  Running it multiple times will give you different paths.  And you can modify the map if you like:
```NDScript
// Find a way from the top-left corner to the bottom-right
// using only down- and right-moves.  Moving off the board
// or hitting an obstacle (occupied square) is failure.
function solve()
{
   while (!done())
      choose
         right();
      or
         down();
}

// Design of the map
var s = "white.png";     // free space
var X = "red.png";       // obstacle
var size = 5;
var map = grid([
             [s, s, s, s, s],
             [s, s, s, s, s],
             [s, s, s, X, X],
             [s, s, s, s, s],
             [s, s, s, X, s]
           ]);

var x = 0;
var y = 0;

function right() {
   map[x, y] = "right.png";
   x = x+1;
   if (x == size || map[x, y] != s) fail;
   map[x, y] = "green.png";
}

function down() {
   map[x, y] = "down.png";
   y = y+1;
   if (y == size || map[x, y] != s) fail;
   map[x, y] = "green.png";
}

function done()
{
   return x == size-1 && y == size-1;
}

printLine("Starting map:");
printTilemap(map);
printLine();
solve();
printLine("Path:");
printTilemap(map);
```