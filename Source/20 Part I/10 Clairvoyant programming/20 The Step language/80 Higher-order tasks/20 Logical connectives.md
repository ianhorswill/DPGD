---
pagetitle: Ands and Ors
status: alpha
---
Once again, calling [predicates](predicates) [asks questions](answering_questions), which the predicates then answer.  You can ask if multiple things are true using a series of calls; the system will find values for the variables to make all the calls be true simultaneously.  So [a series of calls means "and"](complex_questions).  How do we do "or" queries?

## The `Or` predicate

The `Or` predicate takes a series of calls as parameters, chooses one of them, and runs it:
```step
[Or call1 call2 ...]
```
It only chooses *call*s that will succeed (are "true").  If no *call* can succeed, then `Or` fails (is "false").  And if multiple *call*s can succeed, it prefers the leftmost one.

## The `And` predicate

The `And` predicate is the "and" version of the same thing: it takes a series of calls as parameters and runs all of them from left to right:
```step
[Or call1 call2 ...]
```
If all the calls succeed (are "true"), it succeeds (it's "true").  If any of them fail, it fails (it's "false").  Why would you want this if you can do "and" by just making multiple calls?  Because you might want to put an "and" inside an "or".  This gives you a way of doing that:
```step
[Or [A] [And [B] [C]]]
```
Will be true (succeed) if either `[A]` is true *or* both `[B]` and `[C]` are true.