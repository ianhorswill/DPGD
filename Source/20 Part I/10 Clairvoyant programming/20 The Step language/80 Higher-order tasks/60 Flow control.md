---
pagetitle: Other flow-control operations
shorttitle: Flow-control
status: alpha
---
There are a few other miscellaneous higher-order tasks that are useful for running other code in controlled ways.  You may want to skip over this unless you want to do a lot of Step programming.

## `Begin`

```step
[Begin code ...]
```
Like `Call`, but allows you to specify several calls in a row.  It runs them as if they'd been typed in the code directly.

## `Once`

```step
[Once ?call]
```

Runs `?call` but stops after the first successful path.  If the program backtracks, it won't search for another solution to `?call`.  This is useful if you only care about one solution but `?call` might potentially have many (or infinite) solutions that could bog the program down.

## `IgnoreOutput`

```step
[IgnoreOutput ?call]
```

Runs `?call` but throws away any output it generates.


