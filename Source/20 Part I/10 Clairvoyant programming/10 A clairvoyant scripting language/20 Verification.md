---
pagetitle: Generation vs. verification
shorttitle: Verification
status: alpha
---
Let's look at the key parts of our pathfinder again:
```ndscript
function solve()
{
   while (!done())
      choose right(); or down();
}

function right() { x = x+1; if (x == size || map[x,y] != s) fail; }

function down() { y = y+1; if (y == size || map[x,y] != s) fail; }

function done() { return x == size-1 && y == size-1; }
```
This can be paraphrased algorithmically as:

> To find a path, go right or down repeatedly until you reach (4,4).  Fail if you move off the map or into an occupied square.

But we can also paraphrase **declaratively** it as:

> A path goes right or down repeatedly and ends at (4,4).  It does not move off the map or into an occupied square.

That is, we can also read it as a **spec**.  Programs that use clairvoyant choice don't specify how to *generate* a solution, so much as they specify how to **recognize** or **verify** a solution.

So clairvoyant/nondeterministic languages are declarative in spite of looking like normal code.  It's just that we generally use them to write programs that verify solutions without having to generate them.  And verification is usually much easier.