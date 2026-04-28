---
pagetitle: "Getting acquainted with imaginarium"
status: released
---
Click the code below and press Run:
```Imaginarium
# Try: imagine 10 cats
A cat is a kind of person.
Persian, tabby, Siamese, manx, Chartreux, and Maine coon are kinds of cat.
Cats have an age between 1 and 20.
Cats are male or female.
A male cat has a name from male cat names
A female cat has a name from female cat names
Cats are long-haired or short-haired.
Cats can be big or small.
Cats can be cuddly or haughty.
A cat can be staid or crazy.
The plural of Chartreux is Chartreux.
The plural of Siamese is Siamese.
Chartreux are grey.
Siamese are grey.
Persians are long-haired.
Siamese are short-haired.
Maine coons are large.
Cats are black, white, grey, or ginger.

Cats can love one other cat.
Cats can hate one other cat.
Love and hate are mutually exclusive.
```
This shows you a bunch of randomly generated cats as well as the randomly generated relationships between them.

## Generating things

Try changing the command to each of these and then pressing Run again:
- `imagine a cat`
- `imagine 10 cats`
- `imagine 10 haughty cats`
- `imagine 10 grey tabbies`

## The concept graph

Try pressing the **Show Ontology** button.  This will generate a graph (network) showing all the concepts from the code, together with (most of) their relationships.  The concept graph is a good way of debugging things if the system isn't generating what you expect.  For example, if you see a concept sitting by itself without any relationships to anything else, that's usually a bug, such as a typo.  If you mouse over a concept, it also lets you see its different forms (e.g. plural and singular), and other information that can help you understand where Imaginarium is getting confused.

## Making D&D cats

Now let's add some information.  Add this to the code:
```imaginarium
magic user, fighter, and cleric are kinds of player character
Feel free to alter this as you like
```
And then try running:
```imaginarium
imagine a player character
```

## Types and subtypes

Now add:
```imaginarium
magic users can be dark or light
necromancer, wizard, and thaumaturge are kinds of magic user
necromancers are always dark
```
Feel free to alter this as you like.  Then try:
```imaginarium
imagine 10 magic users
```

## Mixing and matching

Now you can:
```imaginarium
imagine player character cats
imagine fighter cats
imagine magic user cats
imagine cat magic users
imagine a persian necromancer
```
