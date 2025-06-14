---
pagetitle: Story generation
status: alpha
---
```Step
# Try: [MonsterStory]
###
### Story fragments
###

MonsterStory:
    [IntroduceProtagonist]
    [MonsterHurtsLovedOne]  
    [ProtagonistKillsMonster]
    [Coda]
[end]    

IntroduceProtagonist:
    [Protagonist ?p] [Home ?h] [MagicalArtifact ?a] [LovedOne ?]
    There once was ?p who lived in ?h. ?p/Possessive prized possession was ?a.
[end]

[randomly]
MonsterHurtsLovedOne:
    [Monster ?m] [LovedOne ?l] [Protagonist ?p]
    One day, ?m killed ?l/Obj. ?p was distraught.
    [now [Killed ?l]]
[end]
MonsterHurtsLovedOne:
    [Monster ?m] [Infectious ?m] [LovedOne ?l] [Protagonist ?p]
    One day, ?m bit ?l/Obj, turning ?l/Obj into a ?m/Write. ?p was distraught.
    [now [Infected ?l]] 
[end]

[generator]
ProtagonistKillsMonster:
    [Monster ?m] [Protagonist ?p] [MagicalArtifact ?a] [CanKill ?a ?m]
    ?p killed ?m/Obj with ?a.
[end]

Coda:
    [Killed ?lovedOne] [Protagonist ?p] [Monster ?m]
    ?p knew this act of revenge wouldn't bring ?lovedOne/Obj back. But at least ?m wouldn't be huring any others.
[end]

Coda:
    [Infected ?lovedOne] [Protagonist ?p] [Monster ?m]
    The moment ?m died, ?lovedOne passed out. ?lovedOne slept for many days, but when ?lovedOne awoke,
    ?lovedOne was human again. ?lovedOne and ?p shared a tearful reunion.
[end]

###
### Roles
###

[predicate]
Protagonist ?who: [Role protagonist ?who]
[predicate]
Monster ?who: [Role monster ?who]
[predicate]
LovedOne ?who: [Role lovedOne ?who]
[predicate]
Home ?where: [Role home ?where]
[predicate]
MagicalArtifact ?what: [Role artifact ?what]

# Tracks what characters are cast in what roles.
fluent Cast ?role ?character.

# Return the character cast in the role, or cast one if none has yet been cast
[predicate]
Role ?role ?character: [Cast ?role ?character]
Role ?role ?character:
    [NotAny [Cast ?role ?]]
    [Possible ?role ?character]        # Find someone who can do the role
    [NotAny [Cast ? ?character]]          # Who isn't already cast in another role
    [now [Cast ?role ?character]]      # And cast them
[end]

###
### Characters
###

predicate Infectious ?montster.
predicate Human ?monster.
predicate Royalty ?who.

[randomly] [predicate]
Possible protagonist girl.
PreferredPronoun girl she.
Possible protagonist boy.
PreferredPronoun boy he.
Possible protagonist prince.
Royalty prince.
PreferredPronoun prince he.
Possible protagonist princess.
Royalty princess.
PreferredPronoun princess she.

Possible home shoe.
Possible home cottage.
Possible home castle.

Possible monster vampire.
Infectious vampire.
Possible monster werewolf.
Infectious werewolf.
Possible monster bandit.
Human bandit.
Possible monster sheriff.
Human sheriff.

Possible monster dragon.
Possible monster sorcerer.

Possible artifact magic_sword.
Possible artifact magic_wand.
Possible artifact battle_crucifix.
Possible artifact silver_pistol.

predicate Family ?lovedOne.
predicate LoveInterest ?lovedOne.

Possible lovedOne little_brother.
Family little_brother.
PreferredPronoun little_brother he.

Possible lovedOne little_sister.
Family little_sister.
PreferredPronoun little_sister she.

Possible lovedOne mother.
Family mother.
PreferredPronoun mother she.

Possible lovedOne father.
Family father.
PreferredPronoun father he.

Possible lovedOne cat.

Possible lovedOne boyfriend.
LoveInterest boyfriend.
PreferredPronoun boyfriend he.

Possible lovedOne girlfriend.
LoveInterest girlfriend.
PreferredPronoun girlfriend she.

[predicate]
CanKill ? ?who: [Human ?who]
CanKill silver_pistol ?.
CanKill battle_crucifix ?.

[predicate]
Character ?who: [Possible ?role ?who] [CharacterRole ?role]
[predicate]
CharacterRole protagonist.
CharacterRole monster.
CharacterRole lovedOne.

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
Print ?x: [Possible lovedOne ?x] [Protagonist ?p] ?p/Possessive ?x/Write
Print ?x: [Possible artifact ?x] [Protagonist ?p] ?p/Possessive ?x/Write
Print ?x: [Mentioned ?x] the ?x/Write
Print ?x: a ?x/Write [now [Mentioned ?x]]

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