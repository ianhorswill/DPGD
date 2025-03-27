---
pagetitle: Context-free grammars
---
Our ending example from the last section was:
```step
[randomly]
Sentence: the cat [Verb] the dog
Sentence: the dog [Verb] the cat
```
Another way to write this is to say:
```step
Sentence: [Noun] [Verb] [Noun]

[randomly]
Noun: the cat
Noun: the dog

[randomly]
Verb: ate 
Verb: chased 
Verb: plotted world domination with
```
In linguistics and computer science, this structure of templates inside templates inside other templates is called a **grammar**.  The grammars we’ve written so far where there are no restrictions on how choices are made between different templates are called **context-free grammars**.  Context-free grammars are popular ways of generating text.  

One issue with context-free grammars is that they often generate odd-sounding sentences.  For example, this one generates “the cat ate the cat”, which leaves the reader wondering if the cat ate itself or another cat.  In either scenario, a fluent English speaker wouldn’t use the phrase “the cat ate the cat” to describe it.  Issues like this are one of the reasons it’s difficult to generate good text.  We’ll talk about ways of dealing with some of these issues later.
