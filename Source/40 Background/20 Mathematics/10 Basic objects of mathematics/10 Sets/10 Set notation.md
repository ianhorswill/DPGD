---
pagetitle: Writing sets
---
Much of the time, we discuss sets that are given to us by context and we don't worry about specifying what their members are.  But sometimes we do need to write a set down explicitly in terms of its membes.  When we do, there are two main ways of doing this.  One is to literally write the elements down.  The other is to give a rule for deciding if something is a member.

## Roster notation

When you can write all the elements down, you do just that and wrap the list in curly braces:
$$
\{ 1, 2, 3, 4 \} \\
$$
$$
\{ a, b, c, d \} \\
$$
$$
\{ \text{Monday}, \text{Tuesday}, \text{Wednesday} \}
$$
$$
\{ a, \{ b, c \}, d \}
$$

## Specifying a set using a rule

The other way of specifying a set is to give a rule for deciding if a object is a member or not.  This is variously referred to as **predicated set notation** or **set comprehensions**.  If you're familiar with list comprehensions in Python, those are a riff on set comprehensions.  The basic format for specifying a set this way is:
$$
\{ element \;s.t. \text{something about } element \}
$$
The $$s.t.$$ is short for "such that" and is often written as a vertical bar:
$$
\{ element\; |\; \text{something about } element \}
$$
For example, the set of even numbers might be written as:
$$
\{ 2n \; | \; n \text{ is an integer}\}
$$