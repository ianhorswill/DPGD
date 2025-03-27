---
pagetitle: "Specializing methods to inputs: handling preferred pronouns"
---
The example above brings up the issue that English, and many other human languages, “mark” certain words based on gender: most speakers say “himself” when the person referred to identifies as male, “herself” when the person identifies as female, “themselves” when the person/people referred to are unknown or a group of people, or otherwise take “them” as their preferred pronoun, and “itself” when the object in question either isn’t alive, or is a person who uses it as their preferred pronoun.

The code above uses the fixed text “himself” regardless of who the giver is.  So if we’re generating text about Mary, then it’s going to refer to Mary with the masculine pronoun regardless of whether that’s their preferred pronoun or not.

We can fix this, by making the generation of the pronoun it’s own task.  “Himself” is called a reflexive pronoun, so we’ll call the task Reflexive:
```step
Give ?giver ?giver ?item: ?giver gave [Reflexive ?giver] ?item
Give ?giver ?receiver ?item: ?giver gave ?receiver ?item.
```
Now we can define `Reflexive` to generate the preferred pronoun for each person:
```step
Reflexive “Mr. Boss”: himself
Reflexive “Mary”: herself
Reflexive ?: themselves
```
Notice that the first two of these methods specify **specific values** for their parameters.  The first method will only match when the parameter is `“Mr. Boss”`.  For any other value, it will fail to match and the system will move on to the second method.  But it will only match for the specific value, `“Mary”`.  So we have Mary and Mr. Boss covered.  The last method is a catch-all.  If the parameter is anything else (remember `?` is a variable), then the system will be conservative and print “themselves”.

Note that it’s important that the catch-all method come last, since the system tries methods in order (unless you told it to try them randomly, of course).  It doesn’t matter what order the Mr. Boss and Mary methods are in, however, so long as they’re before the catch-all method.

