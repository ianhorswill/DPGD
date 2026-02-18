---
pagetitle: Describing objectives
status: alpha
---
Action-selection systems often have some mechanism for directing them to accomplish specific objectives.  The most common of these are:

- **Goals**  
  A goal is some [partial state](describing_states#partial-states) that the system should try to achieve.
  For example, being in a particular location, possessing a particular item, or some other character being dead.
  The goal says "put me in some state where this is true."  Goals are often divided into:
    - *Achievement* goals are to get into some partial state.  Once you get into it, you're done.  All the examples above are achievement goals.
    - *Maintenance* goals are to stay in some partial state you're already in.  "Stay alive" is a maintenance goal.
    - *Avoidance* goals are to stay out of some partial state.  "Don't starve" is an avoidance goal.
      Avoidance goals a special case of maintenance goal: avoiding something is the goal of maintaining its opposite.
- **Tasks**  
  A task is some activity to perform, such as having dinner with someone.  Tasks are easy to confuse with goals.  *Getting married*, in the
  sense of going through the marriage ceremony, is a task in this sense of an activity to perform.  *Being married*, on the other hand, is a goal because
  it's a partial state the character should be in at the end.
- **Utilities**  
  Utilities are a kind of implicit specification of an objective.  Many systems that use utilities just have one objective: maximize utility.
  The designer specifies the object implicitly by adjusting how utilities are calculated.