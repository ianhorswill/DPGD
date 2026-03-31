---
pagetitle: Kinds (common nouns)
status: alpha
---
Kinds of entities are expressed as common[^common_nouns] nouns like `cat`, `book`, `chair`, or `candy factory`.  Notice from the latter that **Imaginarium** is okay with a “noun” consisting of a series of words.  That lets you say things like `candy factory` without having to teach it separately about what `candy` means, irrespective of factories, and `factory`, irrespective of candy.

For the most part, you can teach the system a new kind (a new noun) by just using it in a statement someplace.  For example, if you say:
```imaginarium
Chairs are wooden, steel, or plastic.
```
Then it will figure out that `chair` is a noun, even if you haven’t previously used the word chair.[^learning]  Kinds are important because the other sorts of words tend to get organized around them.  For example, you don’t tell it `fluffy is an adjective`, you tell it:
```imaginarium
Cats can be fluffy.
```
Which tells it that it needs to worry about entities being `fluffy` when those entities are `cat`s.  But if you told it about some other kind of entity, like `books`, it doesn’t need to worry about whether they’re `fluffy` unless for some reason you also specifically told it: `books can be fluffy`.

## Nouns can have multiple words

*Imaginarium* allows nouns to have more than one word, such as in the example candy factory, above.[^phrasal_nouns]  This is really useful, but it’s also a little complicated.  How does the system know that `candy factory` is a two-word noun, but `black cat` is a one-word noun with an adjective attached?  The answer is that it always assumes something is a multiword noun, unless you’ve already taught it that the words inside the noun have other meanings.  So if you say:
```Imaginarium
A cat can be black.
Black cats are great.
```
Then the first line teaches it that `cat` and `black` are separate concepts, and the second that when you have a `cat` who is specifically `black` then that cat will always be `great`.  But if you just say the second sentence, without ever having used the words `black` or `cat`, then it will assume that `black cat` is a single, indivisible noun and subsequent uses of `cat`, without `black`, will confuse it.

## Subkinds and superkinds

You can teach the system that one kind is a subkind of another kind by saying:
> *noun* `is a kind of` *noun*.

For example, `chair is a kind of furniture` or `sword is a kind of weapon`.  This tells it that all `swords` are also `weapons`.  This can get tedious when you have to teach it about a lot of kinds, so you can just say:
```imaginarium
Sword, gun, and club are kinds of weapon.
```
And it will treat it as equivalent to typing three separate `is a kind of` statements.  Note that you have to use the commas here so that it doesn’t think there’s a kind of `weapon` called a `sword gun`, although if you want that, take out the comma. 

Note that when you tell the system to generate an entity of some kind that has subkinds, it will always choose a specific subkind.  That is, if you say “imagine a weapon”, it will always generate a sword, gun, or club, not some generic thing described only as `a weapon`.  It will generate the different subkinds with equal probability.  But if you want one to be more common than the others, you can put how much more common in parentheses:
```Imaginarium
Sword (2), gun, and club are kinds of weapon.
```
This says that swords are twice as common as guns and clubs in our world.  If you want guns to be rare, you can put in a fractional number:
```Imaginarium
Sword, gun (0.1), and club are kinds of weapon.
```

## Endnotes

[^common_nouns]: Common nouns are regular nouns that refer to kinds of things rather than one particular thing.  Words that refer to one particular thing are called proper nouns.

[^learning]: And, similarly, it will learn that `wooden`, `steel`, and `plastic` are adjectives.

[^phrasal_nouns]: Linguists call these "phrasal nouns."  They’re phrases, but they act like single nouns.  For example, a `face-off` is not an `off` with the extra property of being `face` such that there can be `off`s that are not `face`.  `Face-off` acts as if it were a single word, even though it’s spelled as two.