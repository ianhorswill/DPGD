---
pagetitle: The Call primitive
status: early-draft
---
The simplest and most fundamental higher-order primitive is `Call`, which just calls its parameter: `[Call `*code*`]` runs *code*.  If *code* succeeds, then `Call` succeeds.  If *code* fails, then `Call` fails.

So:
```step
[Call [Write hello]]
```
behaves exactly as if you'd typed:
```step
[Write hello]
```
