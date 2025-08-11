---
pagetitle: Subject and object case
status: alpha
---

There’s one final wrinkle to worry about.  Most Indo-European languages have a sophisticated case system.  Nouns are inflected differently depending on whether they’re the subject or object of a verb, for example.  That case system is almost entirely gone in English, but it lives on in our pronouns: we say “he” and “she” for subjects of verbs, but “him” and “her” for objects.  So if we say something like:
```step
Text ?who: ?who decided to run a marathon. It almost killed ?who.
```
And then run `[Text bill]`, we’ll get the output “Bill Holmquist decided to run a marathon.  It almost killed **they**.”  That’s dysfluent because it should be “It almost killed **them**.”  We need some way of communicating the that first ?who is the subject of a verb but the second one is the object.  We can do this just by making a different task that’s like `Mention`, but generates pronouns in object case.  Let’s call this task `Object`:
```step
Object They: [PreferredObjectPronoun They ?pronoun] [Write ?pronoun]
Object (Character ?c): ?c/GivenName+FamilyName [set They = ?c]
Object ?anythingElse: [Write ?anythingElse]
```
Notice that this one’s simpler because it doesn’t have to keep track of whether something is third person singular, since we only worry about that for the subjects of sentences.  It does need to get a different pronoun, but we can determine the object pronoun to use from the subject pronoun:
```step
PreferredObjectPronoun ?who them: [PreferrredPronoun ?who they]
PreferredObjectPronoun ?who her: [PreferrredPronoun ?who she]
PreferredObjectPronoun ?who him: [PreferrredPronoun ?who he]
```
This says to use “them” if they use “they”, “her” if they use “she”, etc.  Now we just change our definition above to:
```step
Text ?who: ?who decided to run a marathon. It almost killed [Object ?who].
```
Or equivalently, but more compactly:
```step
Text ?who: ?who decided to run a marathon. It almost killed ?who/Object.
```

