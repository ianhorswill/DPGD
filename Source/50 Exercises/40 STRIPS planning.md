---
pagetitle: STRIPS planning
status: alpha
---


```Step
# Try: [Feed athena]
Feed ?who: [Achieve [TummyFull ?who]]

###
### Story world
###

[randomly]
predicate Character ?who.
[randomly]
predicate PreferredPronoun ?who ?pronoun.
[randomly]
predicate Food ?what.
[randomly]
predicate HasBankAccount ?who.

Character roy.
At roy roys_home.
CustomPrint roys_home: Roy's home
PreferredPronoun roy he.
Has roy money.
Likes roy athena.

Character athena.
At athena athenas_home.
CustomPrint athenas_home: Athena's home
PreferredPronoun athena she.
HasBankAccount athena.

Character taco_dude.
PreferredPronoun taco_dude he.
At taco_dude taco_truck.
CustomPrint taco_truck: the taco truck
Has taco_dude taco.
Food taco.

Character sam.
PreferredPronoun sam she.
At sam deli.
CustomPrint deli: the deli
Has sam sandwich.
Food sandwich.

Character nyarlathotep.
PreferredPronoun nyarlathotep he.
At nyarlathotep white_castle.
CustomPrint white_castle: White Castle
Has nyarlathotep sliders.
Food sliders.

CustomPrint atm: the ATM
CustomPrint money: money

###
### Actions
###

## Goto
fluent At ?who ?where.
Achieves [At ?who ?where] [Goto ?who ?where].
Goto ?who ?where: ?who goes to ?where. [NowAt ?who ?where]

NowAt ?who ?where: [At ?who ?old] [now [Not [At ?who ?old]]] [now [At ?who ?where]]
NowAt ?who ?where: [now [At ?who ?where]]

## Give
fluent Has ?who ?what.
fluent Likes ?liker likee.

Achieves [Has ?receiver ?item] [Give ?giver ?receiver ?item]:
    [Character ?giver] [Character ?receiver]
    [Has ?giver ?item]
[end]

Give ?giver ?receiver ?item:
    [Has ?giver ?item]
    [Achieve [Likes ?giver ?receiver]]
    [At ?giver ?location]
    [Achieve [At ?receiver ?location]]
    ?giver gives ?receiver/Obj ?giver/Possessive ?item/Write.
    [Transfer ?item ?giver ?receiver]
[end]

Transfer ?item ?from ?to: [now [Not [Has ?from ?item]] [Has ?to ?item]]

## Flatter
Achieves [Likes ?flateree ?flaterer] [Flatter ?flaterer ?flateree].
Flatter ?flaterer ?flateree:
    [At ?flateree ?location]
    [Achieve [At ?flaterer ?location]]
    ?flaterer flatters ?flateree/Obj.
    [now [Likes ?flateree ?flaterer]]
[end]

## Buy
Achieves [Has ?buyer ?item] [Buy ?buyer ?item ?seller]:
    [Character ?buyer] [Character ?seller]
    [Has ?seller ?item]
    [Not [= ?item money]]
[end]

Buy ?buyer ?item ?seller:
    [Achieve [Has ?buyer money]]
    [At ?seller ?store]
    [Achieve [At ?buyer ?store]]
    ?buyer buys ?item from ?seller/Obj.
    [Transfer money ?buyer ?seller]
    [Transfer ?item ?seller ?buyer]
[end]

## Eat
fluent TummyFull ?who.
Achieves [TummyFull ?who] [Eat ?who ?_what]: [Character ?who]
Eat ?who ?what:
    [Food ?what]
    [Achieve [Has ?who ?what]]
    ?who eats ?who/Possessive ?what/Write.
    [now [Not [Has ?who ?what]]]
    [now [TummyFull ?who]]
[end]

## Withdraw cash from ATM
Achieves [Has ?who money] [Withdraw ?who]: [Character ?who] [HasBankAccount ?who]
Withdraw ?who:
    [Achieve [At ?who atm]]
    ?who takes out some money from the ATM.
    [now [Has ?who money]]
[end]

## Steal
Achieves [Has ?who ?what] [Steal ?who ?what ?victim]: [Character ?who] [Character ?victim] [Has ?victim ?what]
Steal ?thief ?item ?victim:
    [At ?victim ?location]
    [Achieve [At ?thief ?location]]
    ?thief steals ?victim/Possessive ?item/Write.
    [Transfer ?item ?victim ?thief]
[end]

fluent Dead ?who.

###
### Core planning algorithm
###

[randomly]
predicate Achieves ?goal ?action.

# Used for loop detection
fluent TryingToAchieve ?goal.

# If it's already true, we don't need to do anything.
[predicate]
Achieve ?goal: [Call ?goal]
# It's not already true, so try to make it true.   
Achieve ?goal:
    [Not [TryingToAchieve ?goal]]
    [now [TryingToAchieve ?goal]]
    [GenerateActions ?goal]
    [now [Not [TryingToAchieve ?goal]]]
[end]

[predicate]
GenerateActions ?goal:
    [Achieves ?goal ?action]
    [FreshLine]<i>Doing ?action/WriteVerbatim to achieve ?goal/WriteVerbatim</i>[FreshLine]
    [Call ?action]
[end]

###
### This configures Step to be able to generate pronouns
### You don't need to touch this code.
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
NotePronouns ?who: [Character ?who] [NotePersonalPronouns ?who]
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

fluent Mentioned ?what.
[fallible]
task CustomPrint ?x.
Print ?x: [CustomPrint ?x]
Print (Character ?x): ?x/WriteCapitalized
Print (Mentioned ?x): the ?x/Write
Print ?x: a ?x/Write [now [Mentioned ?x]]

# Possessive ?x
# Generates the possessive case of x - either "x's" or a possessive pronoun.
[main]
Possessive Him: his
Possessive Her: her
Possessive Them: their
Possessive It: its
Possessive ?x: ?x's

Plural werewolf: werewolves
Plural ?x: ?x/NounSingularPlural/Write

Is: [MentionedPlural] are
Is: is

predicate PreferredPronoun ?who ?heshethey.
```