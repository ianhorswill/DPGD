---
pagetitle: Describing time and change
status: alpha
---
> *You come home for the day.  You unlock the door, you open it, pass through, and close it.  Then you drop your keys in the little bowl you keep near the door.  You hang up your coat.*

We've described this as a series of distinct actions.  If were physicists, we might describe it in much more granular detail: when you drop your keys, gravity gradually moves the keys downward.  Each infinitesimal moment accelerates the keys infinitesimally.  Those moments accumulate until the keys finally land in the bowl and stop.

For our purposes the first way of describing things is generally more useful.  But which way we choose also affects how we describe time.

## Discrete and continuous time

Our first description involves **discrete** time and actions.  The series of actions take us through a series of discrete moments or *time-points*, $t_0$, $t_1$, $t_2$, *etc*.:
$$
t_0\rightarrow \textbf{unlock} \rightarrow t_1 \rightarrow \textbf{open} \rightarrow t_2 \rightarrow \textbf{enter} \rightarrow  t_3 \rightarrow \textbf{close} \rightarrow t_4 \; ...
$$

In a discrete-time model, each moment has a well-defined *next* moment.  Time proceeds from a moment directly to its next moment without any intervening moments.  And we can talk meaningfully about the change from one moment to the next.

The physicist's description of the keys involves **continuous** time and action.  There are no "next" moments: between one moment and another, there are infinite intervening moments.[^density]  It's difficult to talk about the change at any given moment, since it's infinitesimal; we can only talk about the rate of change.  Calculus was invented for thinking about these kinds of situations.  But we won't need it, since we'll focus on discrete time.

## Events, change, and action

We will focus on discrete models of time and change.  Our basic model is this:
- At any given moment, the world is in some **state**.
- Then some **event** occurs, after which we're in a different moment in some new state, which will be further changed by whatever the next event is, and so on.
- When some agent (person, character, game subsystem) instigates an event, we call it an **action**.

The continuous view of time does get used in games, particularly in physics engines.  However, even then, continuous time is approximated as a series of discrete ticks.  The code that implements a given high-level action may well be implemented in terms of this kind of pseudo-continuous time, but the action selection system is more likely to operate in terms of the discrete model.

## Endnotes

[^density]: (Super esoteric) Ph.D. students: this is actually a lie.  The property of having more time points between any give pain of time points is called [density](wiki:dense_order).  The real numbers have this property, but so do the rational numbers.  Usually, when mathematicians talk about something being continuous they mean something that [behaves like the real numbers](wiki:Linear_continuum).  That means density plus the additional property that any bounded set has a least upper bound.  However, for our purposes the relevant distinction is that discrete time has a "next" moment and continuous time doesn't.
<p>
To make things more complicated, when mathematicians talk about a set being discrete they usually mean that it's either finite or countably infinite.  The rationals are dense but a discrete set.  If you're not a Ph.D. student, don't worry about any this.  It's only relevant if you're worried about someone being snarky in the Q/A section of your talk and saying "well *actually*, the rationals are discrete..."