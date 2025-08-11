---
pagetitle: "Assignment: Monster High fandom"
status: alpha
---
## Introduction

In this assignment, you’ll work and extended version of the code we used in class to generate random fan tweets from the account *@MonsterHighlights* about the current episode of the soap opera, *Monster High*.

This code works by first creating a **plausible plot** point that might occur in an episode, and then printing it in the form of a tweet.  Plot points will be represented as [tuples](step_tuples), so if you haven’t done [the reading on tuples](structured_data), do that now.

For example, we might represent the plot point that Jayden confesses their love to Tiana with the tuple: `[confess_love jayden tiana]`.  That might then be printed as:

> It was so great when Jayden confessed their love to Tiana!

However, this only makes sense if we know that Jayden has a crush on Tiana.  Otherwise, why would they confess?  And it doesn’t make sense if the two are already dating.  So you need to make sure that your plot point generator only generates `confess_love` plot points when there’s an attraction that isn’t being acted on.

Note also that we’ve provided you with a version of [`Mention`](mention) that understands things like pronoun generation and capitalization of character names.  You don’t need to modify it, just realize that it’s there.  If you don’t know what `Mention` is, read [generating text in context](adaptive_text_generation).

## Getting started

The code for the assignment is below.  You can just click on it to bring it up in the Step interpreter.

## Part One (optional): Making a student body

We included a bare-bones student database.  There are only a few characters defined in them.  So feel free to add to it or to replace it with the code you and your troupe added to those files in class.  However, you don’t need to do this if you don’t want to.

### Specifying pronouns

Note that the `Mention` code we gave you uses *they* as the default pronoun.  If you prefer, you may specify preferred pronouns for some or all of your characters.  To do that, just add statements of the form:
```step
PreferredPronoun student pronoun.
```
Where *student* is the student you’re specifying a pronoun for, and *pronoun* is either `he` or `she`.  You can specify `they`, but since that’s the default anyway, there’s no particular point in doing so.  Anyone you don’t specify a pronoun for will be referred to using `they`.

## Part two: Generating plot points

Here’s how tweet generation works.

The task called `Tweet` generates a random plot point then prints it as a tweet.  Tweet works by calling `PlotPoint`, which generates plot points, and `PrintPlotPoint`, which prints them.  These are the tasks you will fill in.

`PlotPoint` is a predicate: `[PlotPoint  `*event*`]` means that *event* is a plausible thing to happen in a *Monster High* episode given the characters and relationships specified.  We will represent plot points as tuples:
* `[hot_character  `*who*`  `*monsterType*`]`  
This isn’t really something that happens in the episode; it just means the fan is expressing their enthusiasm for how hot *who* is and that they like *monsterType* characters (vampires, humans, etc.).  You are free to generate this for any character, but the monster type should be correct for the character.
* `[confess_love  `*a*`  `*b*`]`  
means *a* confessed their love for *b*.  This plot point should only be generated when *a* has a crush on *b* but they aren’t already dating.
* `[smoldering_look  `*a*`  `*b*`  `*club*`]`  
means *a* gave *b* a smoldering look when they were together at *club*.  This should only be generated when the characters have crushes on one another and they both belong to the *club*.
* `[got_together  `*a*`  `*b*`]`  
means *a* and *b* started dating.  This should only be generated when they have crushes on one another and aren’t already dating.
* `[breakup  `*a*`  `*b*`]`  
means *a* and *b* broke up.  This only makes sense if they’re actually dating.
* `[rejected  `*a*`  `*b*`]`  
means *a* rejected *b* when *b* confessed to *a*.  This only makes sense if *b* has a crush on *a* but not vice-versa.
* `[conflict `*attacker*`  `*defender*`  `*reason*`]`  
means *attacker* started a fight (verbal or physical) with *defender* because of *reason*.  Reason is another tuple, describing why the fight broke out:
    * `[conflict `*cheatee*`  `*cheater*`  [cheating  `*cheater*`  `*cheetee*`  `*other*`]]`
    * `[conflict `*cheatee*`  `*other*`  [cheating  `*cheater*`  `*cheetee*`  `*other*`]]`  
    These mean *cheater* and *cheetee* are dating but *cheater* is also dating *other* and *cheatee* starts the fight.  So only generate this event when cheating is happening in the story world.
    * `[conflict `*attacker*`  `*defender*`  [triangle  `*attacker*`  `*defender*`  `*loveInterest*`]]`  
    Means there’s a love triangle and both *attacker* and *defender* are interested in the *love interest*.  Only generate this event when the triangle exists in the story world.
* `[cheating `*a*`  `*b*`]`  
means *a* is cheating on *b*.  Only generate this when cheating is happening in the story world.
* `[star_crossed_lovers `*a*`  `*atype*`  `*b*`  `*btype*`]`   
means *a* and *b* are dating, but their monster types (*atype* and *btype*) are supposed to be in conflict with one another.  Only generate this when they are dating and their types are incompatible.  Incompatible types are specified using the `RivalMonsterTypes` predicate.

So for this part, you need to add methods for PlotPoint.  The methods are going to look like:
```step
PlotPoint [eventType other-information …]: condition
```
Where:
* *eventType* is the kind of event (e.g. cheating, star_crossed_lovers, etc.)
* *other-information* is the other information that appears in that kind of event: definitely the characters participating in it, but for some of them, there are things like the monster types or clubs the students belong to
* *condition* is the information to determine whether this plot point makes sense given the story world

Here’s an example.  For the `breakup` plot point, it only makes sense for it to happen if the characters are already dating.  So the rule for that would look like:
```step
PlotPoint [breakup ?a ?b]: [Dating ?a ?b]
```
This says that `[breakup ?a ?b]` is a valid plot point provided `[Dating ?a ?b]`.  In other words, breaking up is a valid plot point when the characters are currently dating.

Add methods for each of the types of plot points and make sure they only generate in plausible circumstances.

### Testing your plot-point generator

You can test your generator in a few different ways:
* Running: `[PlotPoint ?]`  
That is, typing `[PlotPoint ?]` in the command box, and hitting Run, will generate a completely random plot point and print it in tuple form.
* Running: `[PlotPoint [type args …]]`  
This will force it to try to generate a plot point of the specified type.  For example:
    * `[PlotPoint [cheating ?a ?b]]`  
    Will find an `?a` that is cheating on `?b`
    * `[PlotPoint [cheating cameron hailey]]`  
    Will test whether `[cheating cameron hailey]` is a valid plot point.  If Step says "yes", it’s valid.  If it say "no", then that’s not a valid plot point.  This is a valid plot point in the version of the code we hand out because Cameron is actually cheating on Hailey.  But it might not be true in your story world.
    * `[PlotPoint [cheating tiana jada]]`  
    Tests if that’s a valid plot point in your story world.  It isn’t valid in the version of the code we hand out because they aren’t even dating in that story world.  So in that version of the code, this would print “no”.

## Part three: generating text

Now write methods for `PrintPlotPoint`.  These should take the form of:
```step
PrintPlotPoint [eventType other-information …]: text-to-print …
```
Where, *eventType* and *other-information* are as above, and *text-to-print* is what to print to describe this kind of plot point.  The text will need to refer to the variables in other-information to fill in blanks.  For example, we can write something like this:
```step
PrintPlotPoint [breakup ?a ?b]: I’m so bummed that ?a and ?b broke up. ?a seemed so great!
```
Note that these are supposed to be tweets printed by a fan of the series, so they should not only say what happened (e.g. `?a` and `?b` broke up), but also what the fan thinks about it (“I’m so bummed”, “`?a` seemed so great”). 

Write at least one `PrintPlotPoint` method for each event type, so that the system will be able to print any plot points it generates.  You are welcome, but not required, to write multiple methods if you want to have more variation in how the system prints a given plot point.  You can test `PrintPlotPoint` by typing a call into the command box.  For example, typing:
```step
[PrintPlotPoint [breakup jayden cameron]]
```
Will run whatever method you specified for printing a breakup.  If you used the method above, it would print:

> I’m so bummed that Jayden and Cameron broke up.  Jayden seemed so great!

When you have print methods for all your plot points, you can generate random tweets by running:
```step
[Tweets]
```
However, if you don’t have print methods for all the plot points, it might generate a plot point it can’t print in which case it will say that the call to `PrintPlotPoint` failed.

### Pronoun generation

As discussed above, if a tweet uses a character’s name more than once, it will generate pronouns to refer to them when appropriate.  By default, it uses `they` as everyone’s pronoun, but you can specify pronouns for a specific character using `PreferredPronoun` (see above).  That’s purely up to you, though.

What you should definitely pay attention to is whether it’s generating pronouns in the right grammatical case.  If your code to print says something like:
```step
PrintPlotPoint [hot_character ?who ?]: I love ?who. ?who is just so great.
```
This will generate something like:

> I love Jayden.  They are so great.

Because the second use of `?who` is the subject of a sentence, this is fine.  We want it to say "they" rather than "them."  But if our code says:
```step
PrintPlotPoint [hot_character ?who ?]: I love ?who. I could just hug ?who.
```
Then we get something a little odd:
> I like Jayden.  I could just hug they.

Here we want to use "them" rather than "they" because the second use of `?who` is the *object* of the verb rather than the subject.  This is easy to fix.  Just change `?x` to `?x/Obj`:
```step
PrintPlotPoint [hot_character ?who ?]: I love ?who. I could just hug ?who/Obj.
```
This will produce the correct text:
> I like Jayden.  I could just hug them.

When you see your code is generating pronouns in the wrong case, just change it as follows:

* `?x`  
Prints they/she/he
* `?x/Obj`  
Prints them/her/him
* `?x/Possessive`  
Prints their/her/his

### Verb conjugation

Hopefully this won’t affect you for this assignment.  I didn’t have to use it for my reference solution, but you may want to generate more ambitious text than I did.  As discussed in the reading, you sometimes want to generate different forms of verbs, depending on how the subject is in third-person plural or not.  We’ve provided you with [the `[Is]` task from the reading](Subject-verb_agreement), which prints “is” or “are”, depending on what’s appropriate, as well as `[Has]`, which prints “has” or “have” as appropriate.  For example:
```step
PrintPlotPoint [got_together ?a ?b]: ?a [Is] going out with ?b
```
Will generate “bill is going out with jenny” or “he is going out with jenny”, but “they are going out with jenny” when ?who is realized with the pronoun they.

For regular verbs, you can add `[s]` at the end of the verb and it will add an -s or an -es, as appropriate.  For example:
```step
TestConjugation ?who: I like ?who.  ?who read[s] books.
```
Will generate:
> I like Jayden.  They read books.

If Jayden’s preferred pronoun is they, but:
> I like Jayden.  He reads books.

If Jayden’s preferred pronoun is he.

The magic `[s]` task only works for regular verbs.  If you want to handle a different verb, then grab the code for Is from Mention.step and just change it for your verb.  Or just post to Discord and we’ll walk you through it.

## Part four: Invent some more plot points

Now write `PlotPoint` and `PrintPlotPoint` methods for two more kinds of plot points.  They can be anything of your choosing, although they need to depend on the story world.  Feel free to add new information to the story world if you like.

Some ideas:
* Two characters have a heart-to-heart discussion while at their club.  This would obviously only make sense when they’re in the same club.
* Two characters become friends after a fight.  For that, there’d need to be a reason for them to have the fight.  And they probably shouldn’t be dating, since people who are dating should probably already be friends.
* A werewolf character does something on the full moon
* A vampire character bites a human character

## Part five: showing off

At this point, you should be able to run `[Tweets]` over and over again and generate lots of tweets.  Do this until you find one or more that you like and post them to the *#MonsterHighlights* channel on Discord.

## Turning it in

Press **Download program** to save your code.  It will appear in your Download folder as `Saved.step`.  Now upload it to canvas.

## Grading

This assignment will be machine graded by running `PlotPoint` to verify that particular plot points that should exist can be generated by your code and that others that shouldn’t aren’t generated by your code.  Since you’re able to change your story world by adding and removing characters and romances, we’ll remove your characters and romance information and replace it with our own, just for testing purposes.

Since we didn’t specify specific text to generate, we will not check that your code generates specific text.  We will just test that for each of the plot points specified in part 2, it is able to generate some text without failing or producing an error.


# Code

Click below to run the code and start working with it.

```Step
###
### Students
###

[randomly] 
predicate IsA ?who ?what.
# ?who (a student) is a ?what (human, vampire, etc.)

# Fill in as you like
IsA aniyah human.
IsA tiana vampire.
IsA cameron werewolf.
IsA david witch.
IsA jayden werewolf.
IsA hailey ghost.
IsA jada werewolf.

[predicate] [randomly]
RivalMonsterTypes vampire werewolf.

[randomly]
predicate InClub ?who ?club.
# ?who is in the club ?club

# Fill in as you like
InClub aniyah ttrpg_club.
InClub jayden ttrpg_club.
InClub hailey track_team.
InClub tiana ttrpg_club.

###
### Romances
###

[randomly]
predicate CrushOn ?crusher ?crushee.
# Crusher has a crush on crushee, not not necessarily the other way around

[randomly]
predicate AssertDating ?a ?b.
# A and B are dating.  Use this when you want to write a fact
# stating that A and B are dating, but use CheckDating when
# you want to ask if A and B are dating.

[randomly]
predicate Dating ?a ?b.
# Check if A and B are dating
Dating ?a ?b: [AssertDating ?a ?b]
Dating ?a ?b: [AssertDating ?b ?a]

# Write the romances for your school below

CrushOn cameron jayden.
CrushOn jayden cameron.
AssertDating jayden cameron.

CrushOn tiana jayden.
CrushOn jayden tiana.
CrushOn hailey jada.
CrushOn hailey cameron.

CrushOn jayden david.

CrushOn aniyah jada.
AssertDating aniyah jada.

AssertDating hailey cameron.

###
### Queries
###

predicate UnrequitedLove ?crusher ?crushee.
# Crusher has an unrequired crush on crushee.
UnrequitedLove ?a ?b: [CrushOn ?a ?b] [Not [CrushOn ?b ?a]]

# MutualAttraction ?a ?b
# True if ?a and ?b have crushes on each other
[predicate]
MutualAttraction ?a ?b: [CrushOn ?a ?b] [CrushOn ?b ?a]

predicate Student ?who.
# True if ?who is a student.
# Write a rule to define Student in terms of IsA
Student ?who: [IsA ?who ?]

predicate SameClub ?a ?b.
# A and B are in the same club.
# Write a rule for SameClub here
SameClub ?a ?b: [InClub ?a ?c] [InClub ?b ?c] [Not [= ?a ?b]]

predicate LoveTriangle ?a ?b ?c.
# A and B both have crushes on C
# Write a rule here
LoveTriangle ?rival1 ?rival2 ?sharedLoveInterest: [CrushOn ?rival1 ?sharedLoveInterest] [CrushOn ?rival2 ?sharedLoveInterest] [Not [= ?rival1 ?rival2]]

predicate LovelessRelationship ?a ?b.
# A and B are dating but not actually into each other
# Write a rule here
LovelessRelationship ?a ?b: [Dating ?a ?b] [Not [CrushOn ?a ?b]] [Not [CrushOn ?b ?a]]

predicate CheatingOn ?cheater ?cheatee.
# Cheater and cheatee are dating, but cheater is also dating someone else
# Write a rule here
CheatingOn ?a ?b: [Dating ?a ?b] [Dating ?a ?c] [Not [= ?b ?c]]

predicate CheatingOnWith ?cheater ?cheatee ?other.
# Cheater and cheatee are dating, but cheater is also dating other
# Write a rule here
CheatingOnWith ?a ?b ?c: [Dating ?a ?b] [Dating ?a ?c] [Not [= ?b ?c]]

predicate PossibleRomance ?a ?b.
# A and B are into each other and in the same club, but not presently dating
# Write a rule here
PossibleRomance ?a ?b: [MutualAttraction ?a ?b] [Not [Dating ?a ?b]] [OpportunityToMeet ?a ?b]

[predicate]
OpportunityToMeet ?a ?b: [SameClub ?a ?b]

###
### Twitter
###

# Print 6 tweets
Tweets: [Tweet] [Tweet] [Tweet] [Tweet] [Tweet] [Tweet]

# Tweet
# Print a tweet for a randomly selected plot point.
Tweet: <b>Monster Highlights</b> [NewLine] @MonsterHighlights [NewLine] [ClearContext] [Event] [Paragraph]

# Event
# Generate a random plot point and print it.
Event: [PlotPoint ?event] [PrintPlotPoint ?event]

###
### What you need to write
###

[randomly]
predicate PlotPoint ?event.
# ?event is a possible plot point in a Monster High episode given
# the characters and their relationships.  Fill in methods for this,
# below.

[randomly]
task PrintPlotPoint ?event.
# Generate text to describe the specified plot point. Fill in methods
# for this, below.

###
### Utilities
###

# Find all the solutions to ?query and for each one, print ?var.
# This only makes sense if ?var appears in ?query.
PrintAll ?var ?query: [DoAll ?query [Write ?var] [NewLine]]

# Find all solutions to ?query and for each one print ?a and ?b.
# Again, only makes sense if ?a and ?b appear in ?query.
PrintAllPairs ?a ?b ?query: [DoAll ?query [Write ?a] [Write ?b] [NewLine]]

###
### Mention
###

###
### Stuff you can call from your code (you would use these in PrintPlotPoint):
###
### Mention ?x      (or just ?x)
### Prints ?x.  If it uses a pronoun, it will be he/she/they rather than him/her/them
###
### Obj ?x          (or just ?x/Obj)
### Prints ?x, but if it uses a pronoun, uses him/her/them rather than he/she/they
###
### Possessive ?x   (or just ?x/Possessive)
### Prints ?x's or his/her/their, as appropriate
###
### Plural ?x       (or just ?x/Plural)
### Tries to guess the plural of ?x and prints it.
###

### Using gendered pronouns (optional)
###
### By default the system will use they/their for all students.  If you want it to
### use gendered pronouns, add facts saying:
###
###     PreferredPronoun <student> <pronoun>
###
### where <student> is the student student you're specifying the pronoun for and
### <pronoun> is either he, she, or they.
###
### If you want to specify gendered pronouns, I would recommend you add these to
### Student.step.

ClearContext:
  [set Him = nothing]
  [set Her = nobody]
  [set Them = nobody]
  [set It = nothing]
  [set ThirdPersonSingular = true]
  [set MentionedPlural = false]
[end]

initially: [ClearContext]

# Mention ?x
# Print ?x however is appropriate, and keeping track of pronouns.
Mention Him: he [set ThirdPersonSingular = true] [set MentionedPlural = false]
Mention Her: she [set ThirdPersonSingular = true] [set MentionedPlural = false]
Mention Them: they [set ThirdPersonSingular = false] [set MentionedPlural = true] 
Mention It: it [set ThirdPersonSingular = true] [set MentionedPlural = false]
Mention ?x: ?x/Print [NotePronouns ?x] [set ThirdPersonSingular = true] [set MentionedPlural = false]

# Update Him/Her/Them/It based on the argument.
NotePronouns ?who: [Student ?who] [NotePersonalPronouns ?who]
NotePronouns ?what: [set It = ?what]

# Update Him/Her/Them based on the preferred pronouns of the character.
NotePersonalPronouns ?who: [PreferredPronoun ?who he] [set Him = ?who]
NotePersonalPronouns ?who: [PreferredPronoun ?who she] [set Her = ?who]
NotePersonalPronouns ?who: [set Them = ?who] 

# Obj ?x
# Like Mention, but prints in object case (substitutes him for he, etc.)
Obj Him: him [set MentionedPlural = false] [set ThirdPersonSingular = truee]
Obj Her: her [set MentionedPlural = false] [set ThirdPersonSingular = true]
Obj Them: them [set MentionedPlural = true] [set ThirdPersonSingular = false]
Obj It: it [set MentionedPlural = false] [set ThirdPersonSingular = true]
Obj ?x: [Mention ?x]


Print ?who: [Student ?who] ?who/WriteCapitalized
Print ?x: ?x/Write

# Possessive ?x
# Generates the possessive case of x - either "x's" or a possessive pronoun.
Possessive Him: his
Possessive Her: her
Possessive Them: their
Possessive It: its
Possessive ?x: ?x's

Plural werewolf: werewolves
Plural ?x: ?x/NounSingularPlural/Write

Has: [MentionedPlural] have
Has: has

Is: [MentionedPlural] are
Is: is

predicate PreferredPronoun ?who ?heshethey.
```