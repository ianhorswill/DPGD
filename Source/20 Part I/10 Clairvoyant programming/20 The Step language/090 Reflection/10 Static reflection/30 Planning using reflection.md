---
pagetitle: Planning using reflection
shortitle: Planning
status: alpha
---
Planners are declarative systems that allow you to, in some sense, tell the system about actions they can take and their effects on the world, then ask to have some specific effect (a **goal**) and the system will figure out how to achieve that.  Most planners come in one of two flavors.  Hierarchical task network planners let you describe activity in terms of tasks and methods and then the goal you specify is to carry out some task.  Step is based in part on HTN planners, which is why it uses the terminology of tasks and methods.

The other primary kind of planner, which goes by the name **GOAP** (Goal-Oriented Action Planning) in the game industry, and sometimes known as **STRIPS planning** or just "planning" in the research literature, lets you describe a set of actions, together with their **preconditions** (things that must be true to successfully execute them), and their **effects** (changes they make to the state of the world).  We could write actions as Step tasks:
```step
Shoot ?who: [Gun ?gun] [Require [Location ?gun me]] [Require [Loaded ?gun]] You shoot ?who with the ?gun.  [Effect [Dead ?who]]
```
We'll write `Require` and `Effect` in a moment, but you should read this as saying that to shoot someone, you must have a loaded gun.  After shooting them, they're dead.

How do you get the gun?  You pick it up:
```step
Pickup ?what: [Require [Location ?what floor]] You pick up the ?what.  [Effect [Location ?what me]]
```
That says that to pick something up, it has to be on the floor, and after you do, it's in your inventory.

Finally, to load the gun, you need the gun and ammo:
```step
Load ?gun ?ammo: [Gun ?gun] [Require [Location ?gun me]] [Ammo ?ammo] [Require [Location ?ammo me]] You load the ?gun.  [Effect [Loaded ?gun]]
```
That says "to load `?gun` with `?ammo`, they need to be a gun and ammo, respectively, and you need to have both of them.  Afterward, `?gun` is loaded."

## The world's shortest, dumbest GOAP planner

Our reflection primitives are enough to write a very short and simple planner.  It's not fancy; there are solvable planning problems it can't solve, and even for the ones it can solve, it doesn't guarantee it will find the best solution.  But it's crazy simple:
```step
[predicate]
Require ?condition: [Succeeds ?condition]
Require ?condition: [Fails ?condition] [Achieves ?action ?condition] [Succeeds ?action]

[predicate]
Achieves ?action ?effect: [Action ?action] [Method ?action ?subgoals] [Member [Effect ?effect] ?subgoals]

[predicate]
Action [?task | ?args]: [TaskCalls ?task Effect]
```
Let's walk through how it works.


### `Effect`

The `Effect` task just makes something true.  So it's basically a synonym for `now`:
```step
Effect ?condition: [now ?condition]
```

### `Require`

The `Require` task says that an action needs something to be true.  So we should write it so that when we run it, it makes it true if it's not already true.  We'll assume we have a predicate `[Achieves ?action ?condition]` that's true when running `?aciton` would make `?condition` true:
```step
[predicate]
Require ?condition: [Succeeds ?condition]
Require ?condition: [Fails ?condition] [Achieves ?action ?condition] [Succeeds ?condition]
```
The first rule says "if it's already true, you're done."  The second says that if it isn't true, then find an action that makes it true and run it.

The goal is then an effect you want it to have.  The planner figures out how to make that happen.

### `Achieves`

Now all we have to do is write `Achieves` that tells you what goal will achieve a given effect, that is to make a given thing true.  We can do that by looking for an action (a call to something like `Shoot` or `Pickup`) that, if called, will call `Effect` with the effect we want:
```step
Achieves ?action ?effect: [Action ?action] [Method ?action ?subgoals] [Member [Effect ?effect] ?subgoals]
```
This says "`?action` achieves `?effect` if it's an action, it has a matching rule that runs the calls in `?subgoals` and one of those calls is `[Effect ?effect]`, i.e. the effect we're looking for.

### Finding actions

Our planner needs to know what candidate actions are.  We can do that by saying an action is a call to a task that has an effect.  It has an effect if it called the `Effect` task:
```step
Action [?task | ?args]: [TaskCalls ?task Effect]
```
This says "a call is an action if the `?task` is something that called `Effect`."  The `| ?args` is just a way of leaving the arguments of the call unspecified, since `TaskCalls` doesn't tell us anything about what the arguments are to the task or how many arguments it takes.

### Putting it all together

Let's say we want to murder Fred:
```step
[Require [Dead fred]]
```
Nothing against Fred in particular, although he does snore and he did forget your birthday five years ago. calling:

`Require` will check if Fred's already dead:
```step
Require ?condition: [Succeeds ?condition]
```
If so, it doesn't do anything.  Otherwise, the next line calls:
```step
[Achieves ?action [Dead fred]]
```
which has the rule:
```step
Achieves ?action [Dead fred]: [Action ?action] [Method ?action ?subgoals] [Member [Effect [Dead fred]] ?subgoals]
```
which starts by looking up an `?action`, then trying to call `Method` on it.  The first action is `Shoots`.  When we ask `Method`, "what is a method for "shoots" (remember the `| ?args` is just a say of saying "I'll take any tuple of any length that starts with `Shoots`"):
```step
[Method [Shoots | ?args] ?subgoals]
```
There's only one method for `Shoots`:
```step
Shoot ?who: [Gun ?gun] [Require [Location ?gun me]] [Require [Loaded ?gun]] You shoot ?who with the ?gun.  [Effect [Dead ?who]]
```
So the call to `Method` binds `?args` and `?subgoals` so that we have:
```step
[Method [Shoot ?who] [[Gun ?gun] [Require [Location ?gun me]] [Require [Loaded ?gun]] [Write "You shoot"] [Mention ?who] [Write "with the"] [Write "?gun"] [Write "."] [Effect [Dead ?who]]]
```
This tells us that:
* The action we're considering is `?action=[Shoot ?who]`, although we haven't verified yet that it has the effect we want.
     * (Incidentally, this tells us that `?args = [?who]`, but don't stress if that confuses you)
* If we were to call `[Shoot ?who]`, it would run all the stuff in the second list:  
  `?subgoals=[[Gun ?gun] [Require [Location ?gun me]] [Require [Loaded ?gun]] [Write "You shoot"] [Mention ?who] [Write "with the"] [Write "?gun"] [Write "."] [Effect [Dead ?who]]]`

Now, `Achivies` needs to verify that the effect we want is in `?subgoals`, so it runs:
```step
[Member [Effect [Dead fred]] ?subgoals]
```
where `?subgoals` is that long list above.  `Member` searches for an element of `?subgoals` that matches `[Effect [Dead fred]]`.  In this case, it matches:
```step
[Effect [Dead ?who]]
```
giving us `?who=fred`, which means our action, `[Shoot ?who]` is really `[Shoot fred]`.  So `Achieves` succeeds and tells us:
```step
[Achieves [Shoot fred] [Dead fred]]
```
Now we return to `Require`, which runs `[Shoot fred]`.  It:

* Looks for a gun, and finds `[Gun bfg]`
* Calls `[Require [Location bfg me]]`, which ultimately runs `[Pickup bfg]`
* Calls `[Require [Loaded bfg]]`, which will recursively find the ammo and pick it up, then load the gun.
* Print that it's shot Fred
* Call `[Effect [Dead fred]]` to mark him as dead. 

You can try it for yourself:
```Step
# Try: [Require [Dead fred]]
Shoot ?who: [Gun ?gun] [Require [Location ?gun me]] [Require [Loaded ?gun]] You shoot ?who with the ?gun.  [Effect [Dead ?who]]
Pickup ?what: [Require [Location ?what floor]] You pick up the ?what.  [Effect [Location ?what me]]
Load ?gun ?ammo: [Gun ?gun] [Require [Location ?gun me]]  [Ammo ?ammo] [Require [Location ?ammo me]] You load the ?gun.  [Effect [Loaded ?gun]]

Effect ?condition: [now ?condition]

[predicate]
Require ?condition: [Succeeds ?condition]
Require ?condition: [Fails ?condition] [Achieves ?action ?condition] [Succeeds ?action]

[predicate]
Achieves ?action ?effect: [Action ?action] [Method ?action ?subgoals] [Member [Effect ?effect] ?subgoals]

[predicate]
Action [?task | ?args]: [TaskCalls ?task Effect]

[predicate]
Gun bfg.

[predicate]
Ammo ammo.

[function] [fluent]
Location bfg floor.
Location ammo floor.

fluent Dead ?who.
fluent Loaded ?gun.
```