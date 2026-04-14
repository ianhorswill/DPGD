---
pagetitle: Needs-Based AI
status: alpha
---
An important special case of utility systems, pioneered in the [*The Sims*](wiki:The_Sims_(video_game)) and continued throughout the franchise, is when actions are scored based on their ability to satisfy the character's built-in **needs**, such as hunger or thirst.  Needs gradually build up, and with them, the scores of actions that can satisfy them.  When an action is performed that satisfies a need, that need decreases by an amount determined by the action.

For example, hunger might be a need.  Hunger gradually increases over time.  Eating a snack decreases hunger, but might not eliminate it.  Eating a large meal, however, probably does eliminate it.

## Demo

Here's a trivial (and sped up) demo of the basic algorithm.  The character oscillates between the refrigerator to eat and the TV (for fun), periodically going to the couch for rest.  There aren't any interesting animations here, but it gives you the basic idea, and you can tweak it if you like:
```Step
# Try: [Run]
require needs_driver.

# Using ?object will increment the satisfaction level of ?need by ?increment percent.
predicate Advertisement ?object ?need ?increment.
Advertisement refrigerator hunger 40.
Advertisement tv fun 50.
Advertisement couch sleep 100.

###
### Utilities and action selection
###

# Utility of idling is fixed
[predicate]
Utility ? idle 0.01.
# Utility of using an object is the sum of utilities it gets from the different needs it satisfies
Utility ?c [use ?o] ?u: [GameObject ?o ?] [Sum ?sat [AddedSatisfaction ?c ?o ?sat] ?u]
[predicate]
AddedSatisfaction ?c ?o ?sat:
    [Advertisement ?o ?need ?inc]
    [Satisfaction ?c ?need ?current]
    [set ?sat = @(- (/ 100 ?current) (/ 100 (min 100 (+ ?current ?inc))))]
[end]

# For debugging
ShowUtilities ?who: [ForEach [Utility ?who ?action ?u] [Write [?action ?u]]]

# To do the next action, find the one with the highest utility and execute it
NextAction ?c: [Maximal ?u [Utility ?c ?a ?u]] [SetText ?c ?a] [Execute ?c ?a]

###
### Need states
###
[function]
fluent Satisfaction ?who ?need ?satisfaction.
Satisfaction ? ? 100.

[predicate]
DecayRate hunger 2.
DecayRate fun 3.
DecayRate sleep 1.

# Bump up ?who's satisfaction of ?what by ?amount
Satisfy ?who ?what ?amount: [Satisfaction ?who ?what ?sat] [now [Satisfaction ?who ?what @(min 100 (+ ?sat ?amount))]]
# Reduce ?who's satisfaction of ?what by ?rate
DecaySatisfaction ?who ?what ?rate: [Satisfaction ?who ?what ?sat] [now [Satisfaction ?who ?what @(max 1 (- ?sat ?rate))]]
# Decay all satisfactions for ?who by their appropriate rates
DecayAll ?who: [ForEach [DecayRate ?what ?rate] [DecaySatisfaction ?who ?what ?rate]]

NeedsReport ?who: [ForEach [DecayRate ?what ?] [PrintNeed ?who ?what]]
PrintNeed ?who ?what: [Satisfaction ?who ?what ?sat] ?what: ?sat [NewLine]

# Action implementations
Execute ?c idle: [SetText ?c "Bored now."]
Execute ?c [use ?o]: [Distance ?c ?o ?d] [< ?d 20] [ReallyUse ?c ?o]
Execute ?c [use ?o]: [GotoGameObject ?c ?o 2]
ReallyUse ?c ?o: [ForEach [Advertisement ?o ?need ?inc] [Satisfy ?c ?need ?inc]]
```


## Representing needs (technical)

Needs are typically represented by numbers in the engine, for example in the range $[0,1]$ or $[0,100]$.  Although referred to as needs, their numerical representations most commonly correspond to the level of **satiety** of the need, so that 0 represents maximal need, rather than the level of the need itself, where 100 would represent maximal need.  

In keeping with the conventions of *The Sims*, we will represent needs (which it called *motives*) as percentages with smaller numbers indicating more dire need.  This makes phrases like "greater need" confusing: does it mean needing something more (smaller number) or having a bigger number (needing it less)?  To avoid that confusion, I'll called the numbers *satieties*, i.e. satisfaction levels.  So for hunger, a satiety level of 100 means you're full.  While a satiety of 0 means you're starving or perhaps already dead.

### Decaying satiety

The game then grows needs by decaying their associated satieties.  On each game tick, for each need $n$, its satiety level $s_n$ is updated to:
$$
\max(0, s_n-r_n)
$$
where $r_n$ is a *decay rate* chosen by the designer for that particular need.  The $\max$ prevents satiety from falling below 0%, although in many games, a satiety of zero means character death.

### Satisfying a need

A given action, such as eating avocado toast, increments the satiety levels of one or more needs by some fixed amount $i_{a,n}$.  Thus, the satiety level $s_n$ would be updated to be:
$$
\min(100, s_n+i_{a,c})
$$
Again, the $\min$ prevents satiety from exceeding 100%.

## Scoring actions

The score/utility for an action $a$ is then based on the degree to which is satisfies each need.  The simplest version of this is the difference between the final satiety and the starting satiety:[^not_normalized]
$$
U(a) = \sum_n \left( \min(100, s_n+i_{a,n})-s_n \right)
$$
(again, the $\min$ function prevents the final satiety from going above 100%)

The problem with this is that it means that a character who's slightly thirsty but dying of hunger will treat an action satisfying thirst by 10% as being equally desirable as one desiring hunger by the same amount.  Clearly, it should prioritize hunger.  So it is standard to use an **attenuation function** $A_n$ to increase or decrease the utility of the action based on how dire the need state is:
$$
U(a) = \sum_n \left( A_n(s_n) - A_n(\min(100, s_n+i_{a,n})) \right)
$$
Using an attenuation function such as $A_n(x) = 1/x$ will have the effect of discounting the utility of actions that satisfy needs that are already satisfied.

It's also common to discount actions based on the distance to the object being consumed, as in our avocado toast example.  This is basically equivalent to making distance a [consideration](utility_systems#consideration_systems) in the sense used on the previous page: we just multiply in a weight that decreases with distance.

## Advertising actions

Games that use needs-based AI commonly tag objects in the game level with annotations the actions they afford and the needs they satisfy.  For example, the avocado toast in the previous example might be tagged with the annotation that using the `eat` action on it will increase `hunger` satiety by 10%.  These annotations are referred to in *The Sims* as **advertisements**.  Having **smart objects** that advertise actions allow characters to choose actions by iterating over the advertisements of the objects in the immediate vicinity, rather than over all possible actions.  It's also very convenient for level designers.

## Further reading

* Zubek, R. (2010). "Needs-based AI." In A. Lake (ed.), *Game Programming Gems 8*, Cengage Learning, Florence, KY.  Available online [here](https://robert.zubek.net/publications/Needs-based-AI-draft.pdf).
* Graham, David "Rez" (2013). "An Introduction to Utility Theory" in S. Rabin (ed.) *GameAIPro*,  CRS Press.  Available online [here](http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter09_An_Introduction_to_Utility_Theory.pdf).

## Endnotes

[^not_normalized]: Note that utilities here are *not* normalized to the range $[0,1]$ as they were in some of the systems on the previous page.