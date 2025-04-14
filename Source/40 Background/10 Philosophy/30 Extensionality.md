---
pagetitle: Sense, reference, and extensionality
---
The **reference** of a term is the object or objects it referrs to.  The other components of its meaning are collectively referred to as its **sense**.[^1]

For example, ["Pope Francis"](https://en.wikipedia.org/wiki/Pope_Francis) and ["Jorge Mario Bergoglio"](https://en.wikipedia.org/wiki/Pope_Francis) have the same reference -- they mean the same person.  However, most people wouldn't consider them to be synonymous because have different senses. You may not have even known that the latter was the birth name of the former.

There are a number of similar distinctions, such as connotation vs. denotation or intension vs. extension.  They get at somewhat different distinctions, but the second halves of the distinctions (reference, denotation, extension) are basically synonyms and the first halves (sense, connotation, intension) are all components of meaning outside of reference.

## Extension

Nearly all branches of [mathematics](mathematics) and [formal logic](logic) work entirely with reference; the meaning of a term is its extension reference, nothign more.  However, while it makes sense to think of some terms, such as "Earth", as referring to specific objects, others are more naturally thought of as referring to [sets](sets) of objects:

* "Cat" refers to the set of all cats
* "Blue" refers to the set of all blue things

This can also be applied to terms for [relationships](relations)): "brother" can be thought of as referring to the set of all pairs of brothers, or geometric objects: a circle can be thought of as the set of points it encloses.  In these kinds of cases, the reference delineates the space of things the term refers to: it's "extent", if you like.  Perhaps for this reason, math and logic generally use the term **extension** rather than reference.  But again, extension simply means the thing of things the term refers to. 

## Extensionality

A system that bases meaning only on reference rather than sense is called **extensional**.  Extension is much easier to reason about than the rest of meaning.  However, there it does introduce a number of limitations.  They're generally not a problem in math, but they become more of a problem when we try to apply the methods of mathematical logic to broader phenomena of meaning.

The easiest way to see that reasoning with extensions can be limiting is that all terms that don't refer to anything are all synonyms.  So "winged horse" and "vampire" are synonyms because they have the same extension (nothing).  You can fix that specific problem by including not just "real" objects as allowable referrents, but also fictional characters like Pegasus and Dracula.  Now "Pegasus" and "Dracula" have different extensions.  But you can see how extensional reasoning can be limited.

Again, the advantage of extensionality is that it makes reasoning *much* easier.  For example, in extensional systems statements such as "every $A$ is $B$" are usually taken to mean there is no $A$ that isn't also $B$.  That is, the extension of $A$ is a subset of the extension of $B$.  Well if $A$ is "winged horse", then which statements are you comfortable with?

* Every winged horse has wings
* Every winged horse can fly
* Every winged horse is a wingless centipedes 
* Every winged horse is Grover Cleveland, 22nd President of the United States

The first of these seems harmless enough.  Certainly winged horses have wings.  That's what "winged" means.  The second one might be more arguable, since we know there are winged creatures that can't fly.  But the last two are blantantly self-contradictory.  But if the meaning of a term is *just* its extension, and if winged horses don't exist, then its extension is nothing, and so all these statements are equally true.  Yes, we can say the extension of "winged horse" includes mythological creatures, but then just substitute and other term with no referrents:

* Every omnipotent chicken has wings
* Every omnipotent chicken can fly
* Every omnipotent chicken is a wingless centipedes 
* Every omnipotent chicken is Grover Cleveland, 22nd President of the United States

Are you any more comfortable with these statements?

Again, these problems tend not to come up in mathematics, where extensionality is most frequently used.  But hopefully this gives you an understanding both of why extensionality is used and why one might want to depart from it.

## Endnotes

[^1]: The [sense/reference distinction](https://en.wikipedia.org/wiki/Sense_and_reference) is originally due to Gottlob Frege, developer of the first [formal logic](logic).