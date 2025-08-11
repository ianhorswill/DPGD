---
pagetitle: A clairvoyant map generator
status: alpha
---
Let's write a generator in NDScript.  If you don't want to think about code for the moment, skip to [the end of this page](#try-it-out), and you can click on a runnable version of it.

As we did in the example, we'll use a brown tile to represent sand, green for grass, and blue for water.  However, we'll put those names in variables with more meaningful names:
```ndscript
var sand = "brown";
var grass = "green";
var water = "blue";
```

## Data structures

We'll represent the map as a grid, as we did in the pathfinder.  However, this time the entries in the grid will be sets of tiles rather than individual tiles:
```ndscript
// 10x10 grid with each cell initialized to the set: { sand, grass, water }
var g = makeGrid(10, 10, setOf(sand, grass, water));
```
If you haven't encountered [sets](sets) before, they're a lot like lists or arrays.  The difference is that lists and arrays track what position an element is in (i.e. `[1, 2]` is a different array than `[2, 1]`) and can allow the same value to be in many positions (i.e. `[1, 1]` is different from just `[1]`).  Sets don't make either of those distinctions.  Something either is an element of a set or it isn't, but it can't be in it multiple times or in different positions. 

We'll represent the constraint using a [relation](relations).  For the moment, you can think of a relation as a function from two inputs to a Boolean: it either says "yes, this relationship holds between the arguments" or "no, it doesn't."  It's a pain to write one as a big `if`/`then`/`else`, so we've provided a `relation` primitive that takes a list of argument pairs that it should return true for.  It returns false for other pairs:
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

## Choice loop

Our outer loop repeatedly picks a position (X-Y coordinates for a cell) that isn't already a singleton (isn't already a single value) and chooses a tile from the position's set of remaining possible tiles.
```ndscript
var p = chooseElement(remaining);
narrowTo(p, setOf(chooseElement(g[p])));
```
Here,
* `remaining` is the set of positions in `g` that haven't already been narrowed to singletons.
* The primitive `chooseElement` takes a set and clairvoyantly guesses an element of it that won't lead to `fail`ing.
* The procedure `narrowTo(position, restriction)`, which we will write below, removes any tiles from `g[position]` that aren't in `restriction`, and then propagates those changes to neighboring tiles.

So this code fragment chooses a position, chooses a tile from that position's remaining set of allowable tiles, and narrows that position to just that tile, propagating any effects through the grid. 

The loop looks like this:
```ndscript
function solve() {
    var remaining = nonsingletonPositionsOf(g);
    while (!isEmpty(remaining)) {
      var p = chooseElement(remaining);
      narrowTo(p, setOf(chooseElement(g[p])));
      remaining = nonsingletonPositionsOf(g);
    }
}
```

## Narrowing and propagation

Finally, we need to write `narrowTo(position, restriction)`, which restricts the set of allowable tiles at `position` to only elements in the set `restriction`.  Note that this is different from setting `g[position] = restriction`; instead it sets `g[position]` to the tiles that are allowed both by the current set in `g[position]` and the new `restriction`.  That is, the [intersection](set_operations) of the two sets (the elements common to both):
```ndscript
// Restrict the tile at position to only tiles in the specified set
function narrowTo(position, restriction) {
  var old = g[position];
  var new = intersection(old, restriction);
  g[position] = new;
}
```
That updates the one cell, but now we want to propagate that change to the neighbors.  We only need to do that if we've actually changed the tiles at position (i.e. if `old != new`).  But if so, we need to compute the set of tiles that are allowed to be next to that reduced set of tiles.  That set of neighbor tiles compatible with `new` is called the [image](images_of_relations) of `new` through the `compatible` relation, and NDScript has a built-in function that computes it.
```ndscript
var neighborCompatible = rightImage(compatible, new);
```
Having computed that, all we have to do is narrow all the neighbors to the image.  Here's the code:
```ndscript
// Restrict the tile at position to only tiles in the specified set
// If that removes candidate tiles, then update neighboring
// positions to only the tiles compatible with the new, limited
// candidate tiles for this position.
deterministic function narrowTo(position, restriction) {
  var old = g[position];
  var new = intersection(old, restriction);
  if (old != new) {
     g[position] = new;
     var neighborCompatible = rightImage(compatible, new);
     foreach (n in neighborsOf(position, g))
       narrowTo(n, neighborCompatible);
  }
}
```
Ignore the `deterministic` keyword for the moment.  It's an optimization declaration.[^1]

This is basically a simplified version of [the standard constraint-propagation algorithm](wiki:AC-3_algorithm) that people use to solve constraint satisfaction problems.  The real version uses a queue of tiles that need to be updated rather than recursion.  We just used the recursive version because it's slightly simpler.  We'll talk about the real version and how you write high performance implementations of it in [Part II](part_ii).


## Try it out

Here's the complete code.  Give it a try.  Note that we've added an extra print call in `solve`.  If you leave it commented out, you'll just see the final result.  If you uncomment it, you can watch the results of each iteration: 
```NDScript
// Tiles: sand, grass, and water
var sand = "brown";
var grass = "green";
var water = "blue";

// 10x10 grid with each cell initialized to the set { sand, grass, water }
var g = makeGrid(10, 10, setOf(sand, grass, water));

// What tiles can be adjaccent to what other tiles.
// Any combination is allowed EXCEPT water next to grass.
// This forces there to be a sand tile between any pair of
// water and grass tiles.
var compatible = relation(
   [sand, grass], [sand, water], [sand, sand],
   [water, water], [water, sand],
   [grass, grass], [grass, sand]);

function solve() {
    var remaining = nonsingletonPositionsOf(g);
    while (!isEmpty(remaining)) {
      var p = chooseElement(remaining);
      narrowTo(p, setOf(chooseElement(g[p])));
      remaining = nonsingletonPositionsOf(g);
      // printTilesetMap(g, "gray");
    }
}

// Restrict the tile at position to only tiles in the specified set
// If that removes candidate tiles, then update neighboring
// positions to only the tiles compatible with the new, limited
// candidate tiles for this position.
deterministic function narrowTo(position, restriction) {
  var old = g[position];
  var new = intersection(old, restriction);
  if (old != new) {
     g[position] = new;
     var neighborCompatible = rightImage(compatible, new);
     foreach (n in neighborsOf(position, g))
       narrowTo(n, neighborCompatible);
  }
}

solve();
printTilesetMap(g, "gray");
```


## Notes

[^1]: Esoteric: one of the problems with non-deterministic languages is that if procedure either contains a choice operation (a `choose` statement or a `chooseElement` call, etc.) or calls something that contains a choice operation, then it can't actually deallocate its stack frame when it returns.  That's because if something `fails` downstream, we need to wake the procedure up and restart it from its last choice point.  Unoptimized implementations like NDScript just leave everything on the stack until the program completes.  As a result, NDScript programs eat stack space and tend to fill the stack easily.  The `deterministic` keyword promises that the `narrowTo` function involves no choices and so can free up its stack space upon completion.