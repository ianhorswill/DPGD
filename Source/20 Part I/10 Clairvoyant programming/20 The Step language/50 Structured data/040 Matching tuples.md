---
pagetitle: Matching tuples
status: alpha
---
Tuples match if they have the same number of elements and all the elements themselves match.  Again, if that makes sense to you, skip this page and move on.  You can come back here if/when you need clarification.

That said, since tuples can have not only variables, but other tuples as elements, things can get fast.  So here are examples of the different kinds of matching that can happen with tuples.

## Tuples without variables

Let's start with tuples containing non-variables.  Here's a table of what tuples can and can't match against one another:

|         | `[1]`  | `[1 1]` | `[1 2]` |
| -----   | ------ | ------- | --------|
| `[1]`   | 🟩    | 🟥      | 🟥     |
| `[1 1]` | 🟥    | 🟩      | 🟥     |
| `[1 2]` | 🟥    | 🟥      | 🟩      |
| `?a`    | 🟩 `?a=[1]` | 🟩 `?a=[1 1]` |🟩 `?a=[1 2]` |

## Tuples containing variables

As we said, tuples can contain variables.  So here are some examples:

|          | `[1]`  | `[1 ?x]`          | `[?x ?y]`           | `[?x ?x]` |
| -----    | ------ | -------           | --------            | ----      |
| `[1]`    | 🟩    | 🟥                | 🟥                 | 🟥        |
| `[1 ?a]` | 🟥    | 🟩 `?a=?x`        | 🟩 `?x=1`, `?a=?y` | 🟩 `?a=?x=1` |
| `[?a 2]` | 🟥    | 🟩 `?a=1`, `?x=2` | 🟩 `?a=?x`, `?y=2` | 🟩 `?a=?x=2` |
| `[?a ?a]` | 🟥    | 🟩 `?a=?x=1`     | 🟩 `?a=?x=?y`      | 🟩 `?a=?x` |
| `?a`    | 🟩 `?a=[1]` | 🟩 `?a=[1 ?x]` |🟩 `?a=[?x ?y]` | 🟩 `?a=[?x ?x]` |

## Tuples containing tuples

So here are some examples of matching tuples containing sub-tuples:

|          | `[1]`  | `[[1]]` | `[1 [1 ?x]]`   | `[1 [?x ?y]]` | `[?x [?y 1]]` |
| -----    | ------ | ------- | --------       | ----          | -----------   |
| `[1]`    | 🟩    | 🟥      | 🟥            | 🟥           | 🟥           |
| `[1 ?a]` | 🟥    | 🟥      | 🟩 `?a=[1 ?x]`|🟩 `?a=[?x ?y]` | 🟩 `?x=1`, `?a=[?y 1]` |
| `[?a 2]` | 🟥    | 🟥      | 🟥            |🟥             | 🟥             |
| `[?a ?a]` | 🟥    | 🟩 `?a=?x=1`| 🟩 `?a=?x=?y`| | 🟩 `?a=?x=[?y 1]` |
| `?a`    | 🟩 `?a=[1]` | 🟩 `?a=[1 ?x]` |🟩 `?a=[?x ?y]` | 🟩 `?a=[1 [?x ?y]]` | 🟩 `?a=[?x [?y 1]]` |