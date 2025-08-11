---
pagetitle: Adjusting the amounts of grass, sand, and water
shorttitle: Tuning it
status: alpha
---
You may have noticed that the version from the previous page tends to generate lots of long, thin bits of grass, water, and sand, rather than big blocks of grass and water.  That's because the choice loop is choosing tiles randomly.  On average, it will choose equal numbers of grass, water, and sand tiles.  The algorithm is then forced, in some sense, to find places to put all that sand.  That tends to break up chunks of grass or water.

We can fix this by telling it to try to use less sand and more grass and water.  The `chooseElement` function takes an optional argument giving weightings of the different allowable elements.  So we'll add a new variable, `weighting` specifying the ideal distribution of tile types (remember the sets like the names of the tiles, which are colors, rather than the names water, sand, and grass):
```ndscript
var weighting = { green: 1, blue: 1, brown: 0.1 };
```
And then we just add it to our call for selecting a tile:
```ndscript
narrowTo(p, setOf(chooseElement(g[p], weighting)));
```
It will still generate more brown (sand) tiles than the weighting would suggest because the constraints will force it to put a sand tile between any water and grass tiles, but this is still much better.

Give it a try:
```NDScript
// Tiles: sand, grass, and water
var sand = "brown";
var grass = "green";
var water = "blue";

// Weightings for frequency of choice of different kinds of tiles
var weighting = { green: 1, blue: 1, brown: 0.1 };

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
      narrowTo(p, setOf(chooseElement(g[p], weighting)));
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