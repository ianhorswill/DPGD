---
pagetitle: Action planning
---
Although some games only have a few actions an NPC can take, such as running and shooting, many games have a much larger range.  For example, games that include crafting might have many possible actions between harvesting materials and crafting them in different ways.  Combat games might have numerous weapons, ammo types, and so on.  Writing code to decide what action a character can take next can be complicated and error-prone.  And each time a new kind of weapon is introduced, it might potentially require rewriting the code from scratch.

The declarative approach to this, known as automated planning, involves telling the system what the available actions are, and for each:

- Their **preconditions**: what they require to be possible to execute (e.g. guns must have bullets in order to shoot)
- Their **effects**: how they change the game state (e.g. shooting reduces the number of bullets and kills the target)

A **planner** is a program that, given such as description and a change that an NPC might want to make to the game state (e.g. kill that guy), generates a sequence of actions (a plan) that should accomplish the change.  Typically, there are many different plans that can achieve it (e.g. you can shoot someone or stab them or …), and so actions are annotated with some notion of cost (e.g. how long the action takes or how it depletes resources) and the planner finds the lowest cost solution.

The advantage of this approach is that you write the planner once and then as the game changes, you just update the action definitions; you don’t have to keep rewriting and testing some bespoke action selection algorithm.

## TODO: Example
