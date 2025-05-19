---
pagetitle: A simple database of classes
status: alpha
---
Here's a simple list of courses.  Try asking it for a course that's on Monday or a day that phil250 tales place.
```Step
# Try: [Class monday ?]
# [Class ?day ?course]
# True (succeeds) when ?course takes place on ?day
[predicate]
Class monday math300.
Class monday phil250.
Class tuesday cs396.
Class tuesday rtvf376.
Class wednesday math300.
Class wednesday phil250.
Class thursday cs396.
Class friday math300.
```
Now try writing a query that will tell you a day of the week when there is no class.  Note that you can check if there is a class on day `?day` by saying `[Class ?day ?]` and if there is *not* a class that day by saying `[NotAny [Class ?day ?]]`.
```Step
# [Class ?day ?course]
# True (succeeds) when ?course takes place on ?day
[predicate]
Class monday math300.
Class monday phil250.
Class tuesday cs396.
Class tuesday rtvf376.
Class wednesday math300.
Class wednesday phil250.
Class thursday cs396.
Class friday math300.

# [DayOfWeek ?day]
# True (succeeds) when ?day is a day of the week
[predicate]
DayOfWeek monday.
DayOfWeek tuesday.
DayOfWeek wednesday.
DayOfWeek thursday.
DayOfWeek friday.
DayOfWeek saturday.
DayOfWeek sunday.
```