---
pagetitle: Utility systems
status: alpha
---
If designers annotate actions with [utilities](describing_actions#utility), we can use those utilities to select actions.  When the system chooses an action, it:
- Computes the utilities of all candidate actions
- Chooses a high-utility candidate
- Executes it

This requires designers to score the appeal of each action as a number, with all the scores on the same scale.  In some fields, there are clear proxies to use for utility, such as money.  Some areas of evolutionary biology use food calories: the utility of hunting some prey is the number of calories you get from eating it minus the calories you expend hunting it.

In games, there usually isn't a good way of choosing utilities from first principles.  So designers often opt for very flexible scoring systems with lots of parameters that can be tuned until the system seems to make good decisions.

If you are a Ph.D. student, be aware that action utilities in game AI differ significantly from the concept of [utility](wiki:utility) found in other fields such as economics or [ethical philosophy](wiki:utilitarianism).[^world_utilities]

## Trivial example
Suppose we have a hungry character in a field of avocado toast (as one does).  We set the utility of eating a given piece of toast to be a decreasing function of its distance from the character.  As mentioned above, a biologist might set the utility to be the number of calories in the toast minus the calories spent walking to the toast.

However, if we're only choosing which toast to go to, all we really care about is that the nearest toast has the highest utility.  For reasons that will become clear later, a common scheme that's used is to set the utility to one divided by the distance $d$: 
$$
1 / d
$$
Here's an implementation you can try.  We've also included an `idle` action with a utility of 0 so there's a default action to pick even after all the toast is gone:
```Step
# Try: [Run]
###
### Utility declarations
###
predicate Utility ?character ?action ?utility.

# The utility of doing nothing is zero
Utility ? idle 0.
# The utility of eating some toast decreases with the toast's distance
Utility ?c [eat ?t] ?u: [GameObject ?t avocado_toast] [InverseDistance ?c ?t ?u]

###
### Action selector
###

# To do the next action, find the one with the highest utility and execute it
NextAction ?c: [Maximal ?u [Utility ?c ?a ?u]] [SetText ?c ?a] [Execute ?c ?a]

###
### Initial layout of the world.  Tune this as you like.
###

predicate InitialCharacter ?name ?sprite ?x ?y.
InitialCharacter bugsy steampunk_m10 500 300.

predicate InitialObject ?name ?sprite ?x ?y.
InitialObject toast1 avocado_toast 100 100.
InitialObject toast2 avocado_toast 400 100.
InitialObject toast3 avocado_toast 100 400.

###
### Driver code - ignore me
### It needs to be here, but the details are irrelevant to our discusssion.
###

# Action implementations
Execute ?c idle: [SetText ?c "Bored now."]
Execute ?c [eat ?x]: [Distance ?c ?x ?d] [< ?d 5] [EatGameObject ?c ?x]
Execute ?c [eat ?x]: [GotoGameObject ?c ?x 2]

# Driver code
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

## Consideration systems

Now suppose there are two kinds of food: the free-range avocado toast and corporate slop bowls abandoned in the field by workers returning from the company cafeteria.[^mercedes]  The avocado toast is preferable to the slop, but if you're starving you'll eat anything.  So now there are two different components to utility: the distance to the food item, as before, and its palatability.  These components are referred to in game utility systems as **considerations** or **decision factors**.

The usual approach to combining multiple factors is to:
- Map them all into numbers between zero and one, where larger numbers are better
- Combine them all into a single number between zero and one, generally through multiplication

### Normalization
Putting them all in the range $[0,1]$ is called *normalization*.  Normalization generally makes action scoring easier to design and maintain.

To see why, imagine that we have many actions besides eating, and that one of our food considerations is temperature: hot food is preferable to cold food.  We carefully build and balance our system so that everything seems to work.

Now imagine a summer intern changes all the temperatures from Fahrenheit to Celsius.  Suddenly, NPCs begin starving to death because food is now uniformly treated as less appetizing because what used to have a temperature of 160 now has a temperature of 71, cutting its utility by more than half.

### Combination
The obvious way to combine considerations is to add their scores.  The problem with that is that different actions involve different numbers of considerations, and combining using addition biases the system toward actions whose scoring involve more considerations.

So the usual approach is to require that the combined scores **also** be in the range $[0,1]$.  This prevents us from using addition, since addition doesn't have that property.  The most common approach is to use multiplication.  However, one can use other approaches, such as taking the minimum or maximum of the considerations, or their average.[^t_norm]

Although multiplication avoids penalizing actions for having fewer considerations, it can instead penalize them for having more considerations, since multiplying small numbers tends to result in even smaller ones.  

### Example
Here's a simple implementation of the two-kinds-of-food example.  Feel free to tweak the palatability levels and the placements of the objects to see how the character's behavior changes:
```Step
# Try: [Run]
###
### Consideration declarations
###
predicate Consideration ?character ?consideration ?action ?utility.

# The utility of eating something decreases with its distance
Consideration ?c distance [eat ?t] ?u: [GameObject ?t ?type] [Food ?type] [InverseDistance ?c ?t ?u]
# The utility of eating something increases with its palatability.
Consideration ?c palatability [eat ?t] 1: [GameObject ?t avocado_toast]
Consideration ?c palatability [eat ?t] 0.1: [GameObject ?t slop_bowl]

# Avocado toast and slop bowls are food.
[predicate]
Food avocado_toast.
Food slop_bowl.

# The utility of doing nothing is still zero (only one consideration)
Consideration ? utility idle 0.

[predicate]
Utility ?c ?a ?u: [Action ?c ?a] [Product ?factor [Consideration ?c ? ?a ?factor] ?u]

###
### Action selector
###

# ?a is an action that ?c can take
[predicate]
Action ?c ?a: [FindUnique ?a [Consideration ?c ? ?a ?] ?all] [Member ?a ?all]

# To do the next action, find the one with the highest utility and execute it
NextAction ?c: [Maximal ?u [Utility ?c ?a ?u]] [SetText ?c ?a] [Execute ?c ?a]

###
### Initial layout of the world.  Tune this as you like.
###

predicate InitialCharacter ?name ?sprite ?x ?y.
InitialCharacter bugsy steampunk_m10 500 300.

predicate InitialObject ?name ?sprite ?x ?y.
InitialObject toast1 avocado_toast 100 100.
InitialObject toast2 avocado_toast 400 100.
InitialObject toast3 avocado_toast 100 400.
InitialObject slop slop_bowl 400 300.

###
### Driver code - ignore me
### It needs to be here, but the details are irrelevant to our discusssion.
###

# Action implementations
Execute ?c idle: [SetText ?c "Bored now."]
Execute ?c [eat ?x]: [Distance ?c ?x ?d] [< ?d 5] [EatGameObject ?c ?x]
Execute ?c [eat ?x]: [GotoGameObject ?c ?x 2]

# Driver code
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
### Making a general utility system (technical)

The general version of this is that a character utility $U(a)$ for an action $a$ is the product of all its considerations.  Consideration may vary from action to action, so we'll say the considerations relevant to action $a$ are $C(a)$.

#### Computing utiltities

At any point in time, a consideration $c$ will have a value in the range $[0,1]$.  That value will usually be determined by some internal game variable, call it $g_c$.  However, game variables aren't usually nicely in the range $[0,1]$.  They may not even be numbers.  So we assume there is some *normalizing* function $N_c$ that maps whatever $g_c$ is into a number between 0 and 1, so that at any point in time, the value of the consideration $c$ is:
$$
N_c(g_c)
$$
The utility of the action is just the product (multiplication) of those different values:
$$
U(a) = \prod_{c \in C(a)} N_c(g_c)
$$
The big $\Pi$ just means multiply all the different $N_c(g_c)$.

#### Final selection

Then we choose a specific action $\hat{a}$ from among the candidate $a$'s.  Again, the most obvious choice is to choose the one with the largest utility:
$$
\hat{a} = \arg \max_a U(a) = \arg \max_a \prod_{c \in C(a)} N_c(g_c)
$$

That's the correct choice in something like a strategy game where you want the character always making the "best" choice.

However, it makes the characters more predictable and potentially robotic.  So in other kinds of games with other kinds of characters, we often choose randomly from among the highest scoring actions with a probability proportional to the action's utility.

Another issue is that in some games you want to be able to break off an action before it's done if it ceases to be relevant.  You can do that by simply continuing to re-run the action selection algorithm every second or tenth of a second, or whatever seems appropriate.  However, it can lead to a phenomenon called **chattering** , where the character keeps switching between two actions and never makes progress on either of them.  Chattering has been studied extensively in [control theory](wiki:optimal_control).  But in game AI, it's usually sufficient to simply add a small extra utility to whatever action you are currently performing, which provides [hysteresis](wiki:hysteresis).  The bigger the extra utility, the larger the utility difference another action needs to overcome it.

## Further reading

* Graham, David "Rez" (2013). "An Introduction to Utility Theory" in S. Rabin (ed.) *GameAIPro*,  CRS Press.  Available online [here](http://www.gameaipro.com/GameAIPro/GameAIPro_Chapter09_An_Introduction_to_Utility_Theory.pdf).
* Mark, Dave (2009). *Behavioral Mathematics for Game AI*, Course Technology Cengage Learning.


## Endnotes

[^world_utilities]: In most fields, utility is a happiness rating attached to a state of the world rather than something attached to an action.  One can certainly define the utility of an action to be the utility of the world state it results in, or the increase in utility from the start state to the end state.  [Versu](https://versu.com/) works that way, but most games do not.  It's just a terminological distinction, and we'll follow the usage in the game industry here.  But you should be aware of it if you're talking to someone outside the game AI world.

[^mercedes]: Thanks to Mercedes Sandu for the phrase "corporate slop bowl."

[^t_norm]: There is a whole field of study of functions that combine numbers in the range $[0,1]$ and have certain desirable properties.  These functions are called [t-norms](wiki:t_norm) and are used to represent conjunction ("and") in logics such as [fuzzy logic](wiki:fuzzy_logic) that use numbers in the range $[0,1]$ to represent degree of truth.