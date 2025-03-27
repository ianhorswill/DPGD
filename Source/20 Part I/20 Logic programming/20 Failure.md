---
pagetitle: Failed matches
---
** UPDATE **
Finally, it should be pointed out that if the system gets partway through a match, but then fails, for example because the first parameters match, but not the second, then any changes to the variables made during the match get undone.  For example, when matching "`[Task ?a 1]`" to "`Task 1 2:`", in the previous table, the system will tentatively set `?a` to `1` when matching the first parameter.  But when the second parameters fail to match, it restores ?a to its original, “unset” state.


