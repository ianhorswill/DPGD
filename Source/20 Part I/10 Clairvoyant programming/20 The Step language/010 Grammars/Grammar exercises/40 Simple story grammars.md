---
pagetitle: Very simple story grammars
status: alpha
---
Here's an incomplete grammar for a simple story.  Try running `[Story]` a few times, and then complete the story as you like.
```Step
# Try: [Story]
Story:
 Once upon a time, there was a [Protagonist] who lived in a [Home].
 One day, a [Antagonist] [Stole] the [Protagonist]'s [Possession].
 The [Protagonist] was [NegativeEmotion]. The [Protagonist] searched
 for days for their beloved [Possession], but could not find it.
 [Paragraph]
 Then, one day, the [Protagonist] [Discovery].
[end]

Discovery: heard that [Antagonist] could be found at [AntagonistHome]

# [remembered] means to always chose the same output within a given
# run of the Story.
[randomly] [remembered]
AntagonistHome: the batcave
AntagonistHome: the drunk tank

[randomly] [remembered]
Protagonist: old woman
Protagonist: blacksmith
Protagonist: Northwestern undergrad
Protagonist: game designer
Protagonist: musician
Protagonist: stoner

[randomly] [remembered]
Home: dorm
Home: shoe
Home: cottage
Home: thimble
Home: luxury condo on Michigan Avenue
Home: old VW microbus

[randomly] [remembered]
Antagonist: vampire
Antagonist: thief
Antagonist: high school student
Antagonist: CEO
Antagonist: rat
Antagonist: faculty member

[randomly]
Stole: stole
Stole: pilfered
Stole: swiped

[randomly] [remembered]
Possession: Nintendo Switch
Possession: copy of iHunt
Possession: money
Possession: cat
Possession: laptop
Possession: makeup kit

[randomly]
NegativeEmotion: sad
NegativeEmotion: very sad
NegativeEmotion: distraught
NegativeEmotion: seriously bummed
NegativeEmotion: having an anxiety attack
NegativeEmotion: seriously pissed
NegativeEmotion: incandescent with rage
NegativeEmotion: in a homicidal rage
```