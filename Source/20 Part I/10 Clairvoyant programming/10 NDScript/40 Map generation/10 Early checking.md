---
pagetitle: Early checking
status: alpha
---
The previous algorithm chooses tiles completely randomly:
```ndscript
foreach (position in positionsOf(grid))
   grid[position] = chooseElement(setOf(grass, sand, water));
```
So it can place a grass tile somewhere, even when it's already placed water in an adjacent position.  It won't notice until it's places all the tiles and finally checks them at the end.

## Proactive checking

A better approach would be to notice right away.  We proactively check each time we place a tile:
```ndscript
foreach (position in positionsOf(grid)) {
   grid[position] = chooseElement(setOf(grass, sand, water));
   foreach (neighbor in neighborsOf(position, grid))
     if (!compatible(grid[position], grid[neighbor]))
        fail;
}
```
Now, if it places incompatible tiles next to each other, it fails right away rather than continuing to generate all the possible completions of the map.  

The earlier we fail, the more candidate maps we rule out.  Suppose we're doing a $10\times 10$ map (100 tiles) and we fail halfway through.  Then there were 50 tiles remaining, for a total of $3^{50}$ possible maps that we've ruled out.

So moving our check earlier saves us a lot of work.  This is a general principle in clairvoyant programming: **check for failure as early as possible**.