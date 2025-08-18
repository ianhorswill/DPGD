---
pagetitle: Tagged grammars
status: alpha
---
Tagged grammars[^tg] are a controllable text-generation tool that has been used in both research and commercial games.  The idea is simple: it's a relatively normal grammar, where some of the rules can be "tagged" with strings.  When you generate an output, you tell it only to produce strings that include a given tag.

Returning to our [greeting example](parameterized_grammars):
```step
[randomly][predicate]
Greet ?who: Hello, ?who.
Greet ?who: Hey, ?who.
Greet ?who: Good morning, ?who.
```
We might tag various rules as "formal", "informal", "rude", etc. (you may disagree with some of these classifications):
```step
[randomly][predicate]
Greet ?who: Hello, ?who. 
Greet ?who: Hey, ?who. [Tag informal]
Greet ?who: Yo! [Tag informal]
Greet ?who: Good morning, ?who. [Tag formal]
Greet ?who: Good day, ?who.  [Tag formal]
Greet ?who: ?who [Tag rude]
Greet ?who: Drop dead, ?who [Tag rude]
...
```
Here, the `Tag` task doesn't need to do anything:
```step
Tag ?.
```
Its only purpose is to be in the execution history so that if we want a rude greeting we can say:
```step
[Greet fred] [PreviousCall [Tag rude]]
```
This will generate a greeting, but specifically a rude one.  Go ahead and try it:
```Step
# Try: [Greet fred] [PreviousCall [Tag rude]]
[randomly] [predicate]
Greet ?who: Hello, ?who. 
Greet ?who: Hey, ?who. [Tag informal]
Greet ?who: Yo! [Tag informal]
Greet ?who: Good morning, ?who. [Tag formal]
Greet ?who: Good day, ?who.  [Tag formal]
Greet ?who: ?who [Tag rude]
Greet ?who: Drop dead, ?who [Tag rude]

Tag ?.
```
You can add as many tags to a given rule as you like.  And you can use it with complicated grammars with lots of phrase types.


## Notes

[^tg]: [Ryan, J., Seither, E., Mateas, M., Wardrip-Fruin, N. (2016). Expressionist: An Authoring Tool for In-Game Text Generation. In: Nack, F., Gordon, A. (eds) Interactive Storytelling. ICIDS 2016. Lecture Notes in Computer Science(), vol 10045. Springer, Cham. https://doi.org/10.1007/978-3-319-48279-8_20](https://link.springer.com/chapter/10.1007/978-3-319-48279-8_20)