---
pagetitle: Describing states
status: alpha
---
Actions change the world; that's their point.  Before the action, the world is in one state, and afterward it's in another.  An action selection system's understanding of these states is always a simplification of what the world is truly like.  Even in the case of games, it is generally simpler than the true gamestate.

Nevertheless, we assume there is an identifiable set of possible gamestates.  The set of all possible gamestates is called the game's **state space**.

## State variables

While it is sometimes useful to talk about the state as a whole, such as when we talk about the before- and after-states of an action, we usually think of states as being composed of several different parts that can change independently.  These are known as *state variables*.  For example, the location of each character might be a state variable, as might each character's health, inventory, etc.  Each of these has its own set of possible values. And you can generally change the value of one state variable without changing the others.

A full gamestate is determined by the values of each state variable.

Breaking the state up into components makes it easier to represent and reason about actions.  Actions generally affect only a few state variables, not all.  For example, eating affects your energy level but not your location.  Driving affects your location but not your energy level.  Running affects both.

To make things a little clearer, when we refer to the names of state variables, we'll put them in `code font`.  So when we want to refer to a state variable representing a character's health, we'll say `health`.

## Partial states

There will be many cases where we'll only want to talk about the values of a few state variables and ignore the others.  For example, in *The Sims*, the state of a character is their location together with set of their need states (hunger, energy, fun, etc.), all of which are numbers, together and a few miscellaneous state variables such as what they're holding etc.  The "state" of being in the living room isn't a state in the sense described above; it simply means that whatever state you are in, a particular state variable (`location`) has a particular value (`living_room`).  So we can write something like:
```text
location = living_room
```
when we want to specify part of a state without specifying it completely.

Many planning systems manipulate partial state specifications in which only the state variables relevant to the problem at hand are given values.

## Formal modeling (esoteric)

We can model states formally (i.e. mathematically).  Let's call the state space, the set of all possible gamestates, $S$.  

### Actions

An action, $a$ takes you from one state to another.  And for any given before state, it reliably takes you to some specific after state.  So it behaves like a function from $S$ to $S$:
$$
a: S\rightarrow  S
$$  

If we start in some state $s$ and execute action $a$, we end up in state $a(s)$.  If we execute a series of actions $a_1, a_2, ..., a_n$, we went up in state
$$
a_n(a_{n-1}(...a_2(a_1(s))))
$$

If we want to treat actions as being unreliable, then things are more complicated. We might, for example, model them as mappings from states to probability distributions over states.  But for our purposes we can generally focus on deterministic actions.

### State  variables

If we model states in terms of state variables, then we have a set of state variables $\boldsymbol{v}_i$, each of which has some set of possible values, $V_i$.  A full world state is then a tuple of values for the state variables, first the value of $v_1$, then of $v_2$, etc.:
$$
(s_1, s_2, ..., s_n)\text{ where }s_i \in V_i
$$

The set of all possible states $$S$$ is then the set of all such tuples.  This is the [Cartesian product](set_operations#cartesian-product) of the possible values for each state variable:
$$
S = V_1 \times V_2 \times ... \times V_n
$$

### Propositional state spaces

One representation common in the research literature, but less common in games, it to track the truth or falsity of a set of possible statements (propositions or ground instances of predicates) about the world.  The system then reasons about what sets of statements are known to be true.  Many [PDDL](wiki:Planning_Domain_Definition_Language) planners work with this kind of representation.

In a sense, these systems treat each proposition as a state variable with the possible values of *true* and *false*.  A state can be thought of as an assignment of truth values to each proposition.

Systems that use propositional state spaces often use partial representations of those states.  Instead of representing complete states (the truth values of all possible propositions), they represent only the set of propositions known to be true in whatever state they're considering.  Propositions not in the set aren't known to be false, they just aren't known (or are irrelevant).