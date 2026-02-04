---
pagetitle: Describing actions
status: alpha
---
In game design, the things a player can do to the world are often called **verbs**.[^verbs]  Similarly, the game objects on which you can perform the verbs are often referred to as **nouns**.

We'll adopt that terminology here.  We'll use the word **action** to mean something like walking to the kitchen: a verb applied to nouns.  When we want to talk about walking *in general*, we'll refer to that as the walk *verb*.

Action-selection systems reason about which actions to choose based on verb metadata provided by the designers.  Different systems involve different kinds of metadata, but here we'll talk about the most common ones.

## Parameters

The nouns required by a verb are called its **parameters** or **arguments**.[^parameters]  Some verbs, like walking, require a destination.  Others, like stopping, don't.

Keeping track of parameter values complicates the design of a solver.  So many action-selection systems don't allow parameters.  Rather that one verb, `goto`, and multiple nouns, such as `kitchen`, `bedroom`, *etc*., they have multiple **parameterless** verbs, `gotoKitchen`, `gotoBedroom`, *etc*., for which the destination is baked into the verb itself, in much the way the window is baked into the verb "defenestrate."

It's often easier to use a solver that allows parameters.  But it's often easier to build a solver that doesn't.  As a result, **parameterless** systems, also known as "propositional"[^propositional] systems, are very common both in the game industry and in the research literature.

### Implicit parameters

A common approach used in the game industry, is to use what we might call "implicit" parameters.  For example, the `shoot` verb might always shoot whoever the gun is already pointed at.  Then a separate `aim` verb would point the gun.  The `aim` verb might take the target as a parameter.  Alternatively, we might have a parameterless `aimAtClosestEnemy` verb that chooses the target itself at run-time.  Designing all actions this way allows us to build a parameterless solver, which is generally easier.  This is the approach used in [behavior trees](wiki:Behavior_tree), which don't allow parameters.  It's also used in most action planners found in games, such as the one used in [*F.E.A.R.*](wiki:F.E.A.R._(video_game))

This is closely related to an approach from the research literature known as indexical-functional representation[^pengi] (later *deictic* representation[^deictic]).

## Preconditions

Some actions can only be performed in certain states.  You can't swim in a desert.  You can't eat without food.  An action's requirements on the starting state are known as its *preconditions*.  Preconditions are described in terms of state variables and/or parameters.  For example, the action of buying something might have a precondition that the state variable $\textbf{bankBalance}$ be above a certain, for example,
$$
\textbf{bankBalance} > 5
$$

## Effects

The effects of an action are the way it changes the gamestate.  This is almost always described in terms of changes to specific state variables.  For example, the effect of the `gotoKitchen` action would be to set the `location` state variable to have the value `kitchen`.  For the version that takes a parameter, we'd say the effect of `goto(destination)` would be that `location = destination`.

## Other

There are other kinds of annotations that are common, for example restrictions on the kinds of nouns that can be used for the parameters (e.g. the destination of `goto` should be a place).  But the most relevant ones for us here are utility and cost.

### Utility

[Utility](wiki:Utility) is a blanket term for the value or goodness of something, expressed as a number.  Many systems tag actions with utilities, either fixed numbers or some expression for computing utility from the current state and the action's parameters.  For example, the utility of eating a meal might be higher than that of eating a snack.  Systems that use utilities generally choose the action with the highest utility, or at least break ties between actions by choosing the one with the higher utility.

### Cost

Cost is a measure of the badness or resource consumption of something.  Many planning systems allow you to annotate actions with costs then they choose the plan with the least total cost that achieves the specified goal.  For example, given two otherwise equally good destinations, they'll choose the closer one.

## Examples

Here are some examples of actions described in a kind of ersatz YAML.

### Goto

Here's a general, parameterized version of the verb `goto`
```yaml
goto(destination):
  effects:
    location = destination
```
the parameterless versions would look like:
```yaml
gotoKitchen():
  effects:
    location = kitchen

gotoBedroom():
  effects:
    location = bedroom
```
etc., for each possible room.

If we wanted to specify costs, we would likely use the distance to the destination as the cost:
```yaml
goto(destination):
  effects:
    location = destination
  cost: distance(here, destination)
```

### Shooting

Here's a version of `shoot` with parameters for the weapon to use and the target to shoot:
```yaml
shoot(weapon,target):
   preconditions:
      equipped(weapon)
      loaded(weapon)
      aimed(weapon, target)
   effects:
      dead(target)
```
This is an oversimplification; it ignores the effect that you might run out of ammo, it pretends that you'll always hit and kill with one shot.  But it's a common oversimplification.

Now here's a version that would be more common in a G.O.A.P. planner for a game:
```yaml
shoot():
    preconditions:
       gunEquipped
       gunLoaded
       gunAimed
    preconditions:
       targetDead
```

## Endnotes

[^verbs]: Even though those verbs are more commonly expressed by pushing a controller button or clicking the mouse than by typing an English sentence.

[^parameters]: Parameters don't have to be nouns (game objects); sometimes they are things like speeds, but we can generally ignore that issue.

[^propositional]: The term "propositional" comes from the research literature.  The reason for the non-obvious name is that it's inherited from formal logic.  In formal logic, a proposition is something that can be true or false.  A proposition that takes parameters is called a predicate.  The simple logics that don't allow predicates (only parameterless propositions) are called propositional logics.  Those that do allow parameters are called predicate logics.  This terminology was carried over into the literature on planning systems; planners that didn't allow actions to take parameters were called propositional planners.

[^pengi]: [Philip Agre and David Chapman.  "Pengi: An Implementation of a Theory of Activity" in AAAI-87: Proceedings of the sixth National conference on Artificial intelligence, Vol 1 pp. 268-272, July 1987](https://aaai.org/papers/00268-AAAI87-048-pengi-an-implementation-of-a-theory-of-activity/) 

[^deictic]: Philip Agre.  *Computation and Human Experience*.  Cambridge University Press, 2008.
