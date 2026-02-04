---
pagetitle: Describing objectives
status: alpha
---
Action-selection systems often have some mechanism for directing them to accomplish specific objectives.  The most common of these are:

- **Goals**  
  A goal is some [partial state](describing_states#partial-states) that the system should try to achieve.
  For example, being in a particular location, possessing a particular item, killing another character.
  The goal says "put me in some state where this is true."  Goals are often divided into:
    - *Achievement* goals are to get into some partial state.  Once you get into it, you're done.  All the examples above are achievement goals.
    - *Maintenance* goals are to stay in some state you're already in.  "Stay alive" is a maintenance goal.
    - *Avoidance* goals are to stay out of some partial state.  ["Don't starve"](wiki:Don%27t_Starve) is an avoidance goal.
      Avoidance goals can also be seen as a particular kind of maintenance goal.
- **Tasks**  
  A task is some activity to perform, for example, having dinner with someone.  Tasks are easy to confuse with goals.  *Getting married*, in the
  sense of going through the marriage ceremony, is a task in this sense; it's an activity to perform.  Whereas *being married* is a goal because
  it's a state the character should be in at the end.
- **Utilities**  
  Utilities are a kind of implicit specification of an objective.  Many systems that use utilities just have one objective, which is to maximize utility.
  The designer specifies the object by adjusting how utilities are calculated.