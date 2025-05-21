---
pagetitle: Testing binding status
status: alpha
---
There are times when a method only wants to run if a given argument is a variable, or if it is not a variable.  You can test these using the built-in predicates `Var` and `NonVar`:
* `[NonVar `*x*`]`  
Succeeds when its argument is a *not* an uninstantiated variable.
* `[Var `*x*`]`  
Succeeds when its argument is an uninstantiated variable (a variable without a value)

These do not change *x* in any way; they just succeed or fail depending on whether it's a value, or an unbound variable, respectively.  These are useful as guards on methods.  For example, if you want to use different methods for when called in input and output mode, you can say:
```step
Task (NonVar ?x): ... method for input mode ...
Tast (Var ?x): ... method for output mode ...
```
These are common enough that there's a shorthand for them; you can use `+` and `-` as substitutes for the more verbose `NonVar` and `Var`:
```step
Task (+ ?x): ... method for input mode ...
Tast (- ?x): ... method for output mode ...
```

## Ground values

`NonVar` will accept any value that isn't itself an unbound variable; but that doesn't preclude it *containing* an unbound variable.  For example, the value `[a b ?x]` isn't a variable, it's a tuple.  But it does contain a variable and depending on context, that variable may be unbound.  

* `[Ground `*x*`]`  
True when its argument is a value and doesn't contain unbound variables.  So not only is it `NonVar`, but its elements (if any) are also `NonVar`, as their elements (if any), and so on.
* `[Nonground `*x*`]`  
True when its argument isn't ground; either it's an unbound variable, or contains an unbound variable somewhere within it.