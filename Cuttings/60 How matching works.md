---
pagetitle: How matching works
---

## Mechanical view: sticky variables

![Variables in Step stick to values and other variables when they match to them](https://upload.wikimedia.org/wikipedia/en/a/aa/KatamariDamacybox.jpg)

Variables in languages like Step start like without values.  They only acquire values through being matched to things.  But variables are "sticky": when variable without a value matches against something else, it becomes glued to it.  So when we match the call `[Give "Mary" "Jill" "a nice raise"]` against the method:

```step
Give ?giver ?receiver ?item: ?giver gave ?receiver ?item.
```

`?giver` becomes "glued" to `"Mary"`, `?receiver` to `"Jill"`, and `?item` to `"a nice raise"`.  Henceforth, `?giver` can continue to be used, but it can only match to `"Mary"`, the value it's glued to, or variables that don't have values.  In the latter case, those other variables are *also* glued to `"Mary"`.

When it matches that call against that method, it goes through the parameters of each

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | `"Mary"`    | `"Jill"`    | `"a nice raise"` |
| Method | `Give` | `?giver`    | `?receiver`    | `?item` |

And matches them together: `?giver` to `"Mary"`, `?receiver` to `"Jill"`, etc.

Now supposed we match the same call `[Give "Mary" "Jill" "a nice raise"]` to the other method:
```step
Give ?giver ?giver ?item: ?giver gave [Reflexive ?giver] ?item
```

Then, when it matches the parameters:

|        | Task   | Parameter 1 | Parameter 2 | Parameter 3 |
|--------|--------|-------------|-------------|------------------|
| Call   | `Give` | **`"Mary"`**    | **`"Jill"`**    | `"a nice raise"` |
| Method | `Give` | **`?giver`**    | **`?giver`**    | `?item` |

It first matches the first parameter, gluing `?giver` to ``"Mary"`.  But then when it tries to match the second parameter, tries to match `?giver` to `"Jill"`, but can't because `?giver`  is now permanently glued to `"Mary"`.

## Notes

[^1]: Assuming we haven't already assigned some variable to a different value.