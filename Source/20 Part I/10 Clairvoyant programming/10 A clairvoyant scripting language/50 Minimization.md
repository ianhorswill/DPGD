---
pagetitle: Finding minimum-cost solutions
shorttitle: Minimization
status: alpha
---
We can solve this problem by adding two new primitive functions:

* `cost(integer)` does nothing, but it "costs" the specified number of points.  The total cost of a solution path is the sum of all the `cost` calls along it.
* `minimize(function)` runs `function()` but guarantees to use a minimum `cost` solution path.[^1]

Given these primitives, we just add a `cost(1)` call to our `while` loop:
```ndscript
function solve()
{
   while (!done()) {
      cost(1);
      choose right(); or left(); or up(); or down();
   }
}
```
And we change our call at the end from just `solve()` to:
```ndscript
minimize(solve);
```
This will still generate random paths, but they will all be length 8, which is the minimum-length path. 

Try it yourself:
```NDScript
// Find a way from the top-left corner to the bottom-right.
// Moving off the board or hitting an obstacle (occupied square) is failure.
function solve()
{
   while (!done()) {
      cost(1);
      choose right(); or left(); or up(); or down();
   }
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

function left() {
   map[x, y] = "left.png";
   x = x-1;
   if (x < 0 || map[x, y] != s) fail;
   map[x, y] = "green.png";
}

function up() {
   map[x, y] = "up.png";
   y = y-1;
   if (y < 0 || map[x, y] != s) fail;
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
minimize(solve);
printLine("Path:");
printTilemap(map);
```

## Endnotes

[^1]: We say **a** minimum-cost solution because there can be, and in this case are, many different minimum-cost solutions with the same (minimum) cost.