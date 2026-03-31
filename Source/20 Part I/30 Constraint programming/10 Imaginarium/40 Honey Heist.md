---
pagetitle: "Example: a Honey-Heist character generator"
status: alpha
---
We can put all these features to make a generator for the popular table-top role-playing game [*Honey Heist*](wiki:Honey_Heist), in which players act out a caper in which criminal bears attempt to steal honey from a honey convention (Honeycon):
```Imaginarium
# Try: imagine 10 bears
grizzly, polar bear, panda, black bear, sun bear, and honey badger are kinds of bear.
Bears are rookie, washed up, retired, unhinged, slick, or incompetent.
Bears are muscle, brains, driver, hacker, thief, or face.
trilby, top hat, bowler, flat-cap, cowboy hat, fez, and crown are kinds of hat.
Bears have a hat called its favorite hat.
Bears have a name from bear names

A honeycon has a prize from prizes.
A honeycon has a surprise from surprises.
A honeycon has a locale called its location.
A honeycon has a convention organizer called its chair.
A honeycon is identified as "Honeycon".
A honeycon has two security features called its security features.

A convention organizer is cunning sly, greedy wicked, clueless exploitable, maybe too obessed with honey, spoilt trust-fund kid, or ruthless corrupt.

lakeside camp, fishing village, metropolitan city, convention centre, truck convoy, and wilderness retreat are kinds of locale.
A locale is creepy, busy, run-down. beautiful, dangerous, or lavish.

armed guards, electronically locked doors, laser tripwire grids, cctv network, "impenetrable" vault, and poison gas are kinds of security feature.
A security feature is identified as "[Noun]"
```
By running `imagine a bear` you can generate random player characters for the game, although you'll probably prefer to say `imagine 10 bears` and then pick the one you like best.  The Game Master can generate a scenario by saying `imagine a honeycon`.