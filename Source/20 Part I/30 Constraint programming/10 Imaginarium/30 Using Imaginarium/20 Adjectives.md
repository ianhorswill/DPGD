---
pagetitle: Adjectives
status: alpha
---
As with nouns, you can tell the system about an adjective just by using it.  Also like nouns, adjectives can consist of short phrases rather than single words.  You generally teach the system about a new adjective by saying one of:

* *Noun* `is`/`are` *adjective.`
* *Noun* `is`/`are` *adjective*`,` …`, or` *adjective*`.`
* *Noun* `can be` *adjective*`.`
* *Noun* `can be` *adjective*`,` …`, or` *adjective*`.`

These all introduce relationships between nouns and adjectives but have slightly different meanings.  When you say “`or`” you’re saying the different adjectives are alternatives, meaning the noun can’t be more than one of them at a time.  When you say `is`/`are`, you’re saying the noun always has that property (or one of the alternatives).  When you say `can be`, you’re saying the property is optional.  It might be true but doesn’t have to be.  For example, if you say:
```imaginarium
A chair is solid.
```
You’re saying all `chairs` are always `solid`.  But if you say: 
```imaginarium
A chair can be comfy.
```
You’re saying some `chairs` are `comfy` chairs and others aren’t.
If you say:
```imaginarium
Chairs are sturdy or cheaply built.
```
You’re saying all `chairs` are either `study` chairs or `cheaply built` chairs, but never both, i.e. there are no `sturdy cheaply built chairs`.
But if you say: 
```imaginarium
Chairs can be sturdy or cheaply built.
```
You’re saying `chairs` can be `study`, `cheaply built`, or neither (but still not both).  Thus, there are sturdy chairs, cheaply built chairs, and (just plain old) chairs that are neither.
