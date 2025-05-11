---
pagetitle: Real language is hard
status: alpha
---
This is the basic idea of how you adapt text based on context.  A real, complete version of `Mention` would be more complicated.  Here are some things you might want in an “industrial strength” version of `Mention`:

* In addition to subject and object case, there are also reflexive (himself/herself) and possessive (his/her) pronouns.  So you’d have tasks like `Object` that generated text in each of those cases.
* This version only keeps track of one person being discussed, `They`, and each time a new person is mentioned, it replaces the old person.  That means that if it was generating text talking about Bill and Diana, it would only use a pronoun when it referred to the same person twice in a row.  But since Bill and Diana use different pronouns, you can always use “they” for Bill and “she” for Diana, once you’ve introduced the characters.  A better version would have separate variables to track the current `He` and `She` characters, as well as `They`.  That way, having mentioned Bill recently won’t prevent us from using she to refer to Diana.

These issues get handled the same way that the other issues get handled: using a combination of pattern matching and using global variables to track state information.

## Real human language use

Real people are much smarter than Step programs and use context in much more sophisticated ways.  Real people can be more nuanced.  Our Step program just uses recency to decide on pronouns; “he” always means the most recently mentioned person who uses male pronouns.  So for example, if it generates a sentence that looks like this:

> Bill *something* Ted; he *something* he *something* him

It will intend all the pronouns to refer to Ted, since Ted is the most recently mentioned person.
But humans are way smarter than that.  If you take an example like:

> Bill hated Ted; he thought he’d stolen his boyfriend.  And he never stopped missing him.

We, as human readers, can use context to understand that the first pronoun refers to Bill, the second to Ted, the third to Bill again, and the last one to Bill's ex.  In principle, you could write a Step program that could understand these kinds of subtleties.  But in practice it would be very difficult, and you’d likely want to use more sophisticated techniques than we’ve shown here.   This is one of the many reasons AI is really hard.

Fortunately, Step programs aren’t trying to do full natural language generation, much less natural language understanding.  Step is designed to let humans hand-author text and then make simple changes and substitutions to it without destroying fluency.