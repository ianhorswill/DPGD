---
pagetitle: Tracking pronouns
status: alpha
---
Let’s use a global variable to keep track of the most recently discussed character.  We’ll just have `Mention` remember the most recently discussed character in the variable `They`.
```step
Mention They: they 
Mention (Character ?c):
  ?c/GivenName+FamilyName
  [set They = ?c]
[end]
Mention ?anythingElse: [Write ?anythingElse]

initially: [set They = nobody]
```
The first line here says that if you call `Mention` on whoever is the current value of the variable `They`, just print the pronoun “they”.  If the character being mentioned isn’t the character in the variable `They`, then we move on to the next line, which says if they’re a character, print their first and last names, and then update `They` to be the character we just mentioned.  Now, if we say:
```step
Introduce ?who:
   ?who is ?who/Age years old. ?who are a ?who/Occupation.
[end]
```
And run `[Introduce diana]`, it will print “Diana Ratcliffe is 34 years old.  They are a titan of industry.”

Unfortunately, we’ve now assumed that Diana’s preferred pronoun is they.  A better approach would be to let the author specify preferred pronouns for the different characters.  So something like this:
```step
Mention They: [PreferredPronoun They ?pronoun] [Write ?pronoun] 
Mention (Character ?c): ?c/GivenName+FamilyName [set They = ?c]
Mention ?anythingElse: [Write ?anythingElse]

initially: [set They = nobody]

PreferredPronoun diana she.
PreferredPronoun bill: they.
```
This says that when we mention `They`, we just generate that character’s preferred pronoun, whatever it might be.  Now it will generate “she” for Diana and “they” for Bill.


