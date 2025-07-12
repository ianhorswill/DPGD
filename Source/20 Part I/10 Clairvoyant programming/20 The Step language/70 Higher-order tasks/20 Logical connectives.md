---
pagetitle: Ands and Ors
status: early-draft
---
Once again, calling [predicates](predicates) [asks questions](answering_questions), which the predicates then answer.  You can ask if multiple things are true using a series of calls; the system will find values for the variables to make all the calls be true simultaneously.  So [a series of calls means "and"](complex_questions).  So we've seen how to do "not" queries and "and" queries.  How do we do "or" queries?

## The Or predicate

The `Or` predicate takes a series of calls as parameters[^1], chooses one of them, and runs it:
```step
[Or call1 call2 ...]
```
It only chooses *call*s that will succeed.  If no *call* can succeed, then `Or` fails.  And if multiple *call*s can succeed, it prefers the leftmost one.



## Endnotes

[^1]: Again, it is technically taking a tuple as an argument.  But from here on in, we're going to stop reminding you of this just say that things take calls as inputs.