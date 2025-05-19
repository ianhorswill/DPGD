---
pagetitle: Monster High
status: alpha
---
Below is the database of students at Monster High we talked about in class.  Click on it to run it and edit it.  Try the following:
* Add more students
* Add more clubs
* Write a query to ask what kind of monster a given student is
* Write a query to ask who is a given type of monster
* Add some clubs
* Add some crushes and some dating couples
* Write a predicate `Student` that's true when its parameter is a student; define it in terms of `IsA`
* Write a predicate `SameClub` that's true when two students are in the same club
* Write a `LoveTriangle` predicate that's true when three students form a love triangle
* Write a `LovelessRelationship` predicate that's true when two students are dating but not in love.
* Write a `CheatingOn` predicate that's true when somebody is dating two different people
* Write a `PossibleRomance` predicate that's true when two students are in the same club, aren't dating, and have crushes on one another
* Add a `RivalMonsterType` predicate to keep track of what kinds of monsters have rivalries (e.g. vampires and werewolves)
* Write a predicate that's true when two students are crushing on one another but are of rival monster types.

```Step
###
### Students
###

# ?who (a student) is a ?what (human, vampire, etc.)
predicate IsA ?who ?what.

# Fill in as you like
IsA aniyah human.
IsA tiana vampire.
IsA cameron werewolf.
IsA david witch.
IsA jayden ghost.
IsA hailey human.
IsA jada werewolf.

# True when ?who is a person (human or monster)
# This assumes we only have people in the IsA database.
[predicate]
Person ?who: [IsA ?who ?]

# ?who is in the club ?club
predicate InClub ?who ?club.

# Fill in as you like
InClub aniyah ttrpg_club.
InClub jayden ttrpg_club.
InClub hailey track_team.

###
### Romance
###

# Crusher has a crush on crushee, not not necessarily the other way around
predicate CrushOn ?crusher ?crushee.

# A and B are dating.  Use this when you want to write a fact
# stating that A and B are dating, but use CheckDating when
# you want to ask if A and B are dating.
predicate AssertDating ?a ?b.

# Check if A and B are dating
Dating ?a ?b: [AssertDating ?a ?b]
Dating ?a ?b: [AssertDating ?b ?a]

# Write the romances for your school below

CrushOn cameron jayden.
CrushOn jayden cameron.
AssertDating jayden cameron.

CrushOn tiana jayden.
CrushOn hailey jada.
CrushOn hailey cameron.

CrushOn jayden david.

CrushOn aniyah jada.
AssertDating aniyah jada.

AssertDating hailey cameron.

###
### Utilities
###

# Find all the solutions to ?query and for each one, print ?var.
# This only makes sense if ?var appears in ?query.
PrintAll ?var ?query: [DoAll ?query [Write ?var] [NewLine]]

# Find all solutions to ?query and for each one print ?a and ?b.
# Again, only makes sense if ?a and ?b appear in ?query.
PrintAllPairs ?a ?b ?query: [DoAll ?query [Write ?a] [Write ?b] [NewLine]]
```