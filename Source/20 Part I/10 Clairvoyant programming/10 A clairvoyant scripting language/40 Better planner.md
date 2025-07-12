---
pagetitle: A more realistic pathfinding problem
shorttitle: Moving up and left
status: alpha
---
In real life, pathfinding may require moving up or left rather than just right or down.  That's easy to add.  We just add `left` and `up` functions and include them in our choices:
```ndscript
function solve()
{
   while (!done())
      choose right(); or left(); or up(); or down();
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
```
This works, but it produces some decidedly peculiar paths.  This is because the contract `choose` follows is that it  only choose choices that lie on *some* solution path.  But that doesn't say that they are short or otherwise good solutions.  Clairvoyance/nondeterminism by iteself doesn't provide any optimality guarantees.

Try it out a few times:
```NDScript
// Find a way from the top-left corner to the bottom-right.
// Moving off the board or hitting an obstacle (occupied square) is failure.
function solve()
{
   while (!done())
      choose right(); or left(); or up(); or down();
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
solve();
printLine("Path:");
printTilemap(map);
```