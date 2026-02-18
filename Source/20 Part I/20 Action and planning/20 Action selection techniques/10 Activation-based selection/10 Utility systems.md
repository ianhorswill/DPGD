---
pagetitle: Utility systems
status: incomplete draft
---
If the designers have annotated actions [utilities](describing_actions#utility), then we can use it to select actions.  When the system chooses an action, it:
- Computes the utilities of all candidate actions
- Chooses a high-utility candidate
- Executes it

## Trivial example
For example, suppose we have a hungry character in a field of avocado toast (as one does).  We set the utility of eating a given piece of toast to be a decreasing function of its distance.  The most common choice is to use one divided by the distance $d$:[^many_ways]  
$$
1 / d
$$
Here's an implementation try.  We also include an `idle` action with a utility of 0 so it doesn't crash after it eats all the toast:
```Step
# Try: [Run]
predicate Utility ?character ?action ?utility.

# The utility of doing nothing is zero
Utility ? idle 0.
# The utility of eating some toast decreases with the toast's distance
Utility ?c [eat ?t] ?u: [GameObject ?t avocado_toast] [InverseDistance ?c ?t ?u]

# To do the next action, find the one with the highest utility and execute it
NextAction ?c: [Max ?u [Utility ?c ?a ?u]] [SetText ?c ?a] [Execute ?c ?a]

# Initial layout of the world
[predicate]
InitialCharacter bugsy steampunk_m10 500 300.
[predicate]
InitialObject toast1 avocado_toast 100 100.
InitialObject toast2 avocado_toast 400 100.
InitialObject toast3 avocado_toast 100 400.

# Action implementations - ignore me
Execute ?c idle: [SetText ?c "Bored now."]
Execute ?c [eat ?x]: [Distance ?c ?x ?d] [< ?d 5] [EatGameObject ?c ?x]
Execute ?c [eat ?x]: [GotoGameObject ?c ?x 2]

# Driver code - ignore me
Run:
   [FindAll [?who ?type ?x ?y false false false] [InitialCharacter ?who ?type ?x ?y] ?cs]
   [FindAll [?what ?type ?x ?y false false false] [InitialObject ?what ?type ?x ?y] ?os]
   [StartGame ?cs ?os]
[end]

[predicate]
GameObject ?object ?type: [AllGameObjects ?list] [Member [?object ?type] ?list]

GameEvent [spawn ?c]: [NextAction ?c]
GameEvent [arrived ?c ?]: [NextAction ?c]
GameEvent ?.
```

## Endnotes

[^many_ways]: You need larger distances $d$ to give you smaller utilities.  So you could use $-d$ instead, although people generally prefer utilities that are in the range $[0,1]$.  So it's more common to use $1/d$ or $1/d^2$.  It needs to be a [decreasing function](wiki:Monotonic_function) of $d$, but in this simple example, it doesn't matter which one we choose.