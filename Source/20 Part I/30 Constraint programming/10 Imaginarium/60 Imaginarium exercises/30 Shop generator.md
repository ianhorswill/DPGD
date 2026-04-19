---
pagetitle: A Medieval Fantasy Shop Generator
status: released
---
## Introduction

In this assignment, you’ll work with a generator for shops (businesses) in a D&D-like medieval fantasy setting.  It defines a number of different kinds of shops and shopkeepers:
- **Shops**: magical supply store, apothecary, materia shop, healer, ritual objects shop, magical herb shop, scary animal parts shop, bakery, armorer, jeweler, butcher, brewer and fishmonger.
- **Shopkeepers**: human, child, dog, cat, kitsune, bear, owl, and spider.

Each of these has a set of properties they can have.  Shops have alignments (shopkeepers are assumed to have the same alignment) and levels of expensiveness.  Shopkeepers have attributes related to their appearance, intelligence, wisdom, greed, and so on.

## Getting started

Try the code below:
```Imaginarium
# Try: test
magical shop and mundane shop are kinds of shop.
a shop has a shopkeeper
a shop can be expensive or cheap.
a shop is lawful, chaotic, or Swiss.
a shop is good, evil, or neutral.

magical supply store, apothecary, materia shop, and healer are kinds of magical shop.
ritual objects shop, magical herb shop, and scary animal parts shop are kinds of magical supply store.

non-evil scary animal parts shops should not exist.
chaotic healers should not exist.

bakery, armorer, jeweler, butcher, brewer and fishmonger are kinds of mundane shop.
non-expensive jewelers should not exist.
non-chaotic brewers should not exist.

human (10), child, dog, cat, kitsune, bear, owl, and spider are kinds of shopkeeper.

a shopkeeper can be tall or short.
a shopkeeper can be skinny or stout.
a shopkeeper can be intelligent, cunning, or stupid.
a shopkeeper can be wise or foolish.
a shopkeeper can be greedy or benevolent.
a shopkeeper can be dour, cheerful, reserved, suspicious, or bored.
a shopkeeper can be trustworthy or sketchy.

sketchy wise shopkeepers should not exist.
dour wise shopkeepers should not exist.
suspicious wise shopkeepers should not exist.

suspicious benevolent shopkeepers should not exist.
dour benevolent shopkeepers should not exist.
trustworthy suspicious shopkeepers should not exist.
cunning trustworthy shopkeepers should not exist.
greedy cheerful shopkeepers should not exist.

skinny bears should not exist.
non-cheerful bears should not exist.

a stout kitsune should not exist.
non-wise kitsunes should not exist.
non-intelligent owls should not exist.
tall spiders should not exist.
tall owls should not exist.
tall kitsunes should not exist.
tall dogs should not exist.
tall cats should not exist.

every kind of shop should exist.
every kind of shopkeeper should exist.
```
Try the command `imagine 5 shops` a few times to see what kinds of things are getting generated.  Now look at the code to get a sense of how it is the system is generating those things.

**Important**: This all runs in your browser.  So **don't reload your browser window or close the tab**, or you'll lose your work!  If you need to stop work, press the Download button to save the code to a file, or just do Select-All / Copy (Command-A Command-C for Mac or Control-A Control-C for Windows) and paste the code into a file.

## Part One: Adding constraints

You’ll probably notice that the system is generating some questionable combinations, like tall spiders.  We’ve peppered the code with `should not exist` statements.  These are tests that are automatically run when you run the command `test`.  Your first job is to add statements to the file that will outlaw the problematic combinations that shouldn’t exist, so that when you run `test`, it tells you that all the tests passed:
- Find the first test.  It says `non-evil scary animal parts shops should not exist`.  If you run `test`, you’ll see that that test fails and prints in red.
- What is a line that you can add that will ensure that when the system produces scary animal parts shops, they’re always evil?  Add that line and `test` again.
  - If Imaginarium displays an error message, that almost certainly means that the line you added has a problem, since that's the only thing that's changed.  Read the message and try to fix the line, then `test` again.
  - If you can’t figure out how to fix it, come to office hours or write on `#imaginarium-questions` on Discord.
- Lather, rinse, repeat
  - If that first test is now passing, congratulations!  Just move on to the next test and repeat the process.
  - If it’s a `should not exist` that's not passing, it will display an example that contradicts the test.  Ask yourself why it is that the line you wrote doesn’t rule this example out, then try to formulate a new version that does rule it out.

When you have all the tests passing, congratulations!

## Part Two: Fun (honor system)

Now extend the generator in some way that you find fun and/or interesting.  You can add whatever you like, but you should at a minimum add:
- 4 new kinds of shops
- 6 new adjectives for shops
- 3 new kinds of shopkeepers
- 6 new adjectives for shopkeepers
- 5 new constraints limiting the application of adjectives (such as you did in part one).
