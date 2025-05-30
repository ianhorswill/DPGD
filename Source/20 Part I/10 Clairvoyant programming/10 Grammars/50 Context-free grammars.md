---
pagetitle: Context-free grammars
status: alpha
---
Our ending example from the last section was:
```step
[randomly]
Sentence: the cat [Verb] the dog
Sentence: the dog [Verb] the cat
```
Another way to write this is to say:
```Step
# Try: [Sentence]
Sentence: [Noun] [Verb] [Noun]

[randomly]
Noun: the cat
Noun: the dog

[randomly]
Verb: ate 
Verb: chased 
Verb: plotted world domination with
```
As we said, this structure of templates-within-templates is called a **context-free grammar**.  If you'd seen the phrase used elsewhere and were intimidated by it, that's all it is.  Context-free grammars are popular ways of generating text, and the near-universal way of defining and parsing computer languages.  

One issue with context-free grammars is that they often generate odd-sounding sentences.  For example, this one generates

> the cat ate the cat

which leaves the reader wondering if the cat ate itself or another cat.  In either scenario, a fluent English speaker wouldn’t use the phrase “the cat ate the cat” to describe it.  Issues like this are one of the reasons it’s difficult to generate good text.  We’ll talk about ways of dealing with some of these issues [shortly](reflexive_pronouns).
