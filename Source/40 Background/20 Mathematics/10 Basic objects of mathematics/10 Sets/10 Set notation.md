---
pagetitle: Writing sets
status: alpha
---
Much of the time, we discuss sets that are given to us by context, and we don't worry about specifying what their members are.  But sometimes we do need to write a set down explicitly in terms of its members.  When we do, there are two main ways of doing this.  One is to literally write the elements down.  The other is to give a rule for deciding if something is a member.

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
\{ element \;|\; \text{something about } element \}
$$
The vertical bar is usually pronounced "such that" in this context.  For example, the set of even numbers might be written as:
$$
\{ n \;|\; n \; \text{is an even integer} \}
$$
Or alternatively as:
$$
\{ 2n \; | \; n \;\text{ is an integer}\}
$$
We haven't talked about this yet, but the symbol $\in$ means "is an element of".  And the symbol $\mathbb Z$ is used to mean the set of integers.[^1]
Given that, a couple of other ways of writing it would be:
$$
\{ 2n \; | \; n \in {\mathbb Z} \}
$$
or:
$$
\{ n \in {\mathbb Z} \;|\; n \; \text{is even} \}
$$

## Notes

[^1]: Because it's short for *zahl* which is the German term for integer.