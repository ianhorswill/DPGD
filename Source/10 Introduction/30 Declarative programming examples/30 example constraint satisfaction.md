---
pagetitle: Constraint satisfaction
---
Constraint satisfaction also involves describing a problem in terms of relationships and rules.  In constraint satisfaction, we present the system with a set of choices to make, each with a set of options, together with a set of relationships that are required or forbidden to hold between the choices.

For example, if we are making a character for a game, we may want to choose a personality for them.  A common personality representation in games is the “bag of traits” model: each character has some small number of traits (e.g. 2 or 3) chosen from a much larger collection of possible traits.  Traits might be very general, such as “introvert” or “liar”, or very specific, such as “cat person” or “natural born salesman.”  Often times these traits are correlated in some way, either because they’re mutually exclusive or because one necessarily implies the other.  So if a game is to randomly generate character personalities, it must take care not to generate contradictory personalities such as introverted extroverts.

We can do this using a constraint satisfaction system by giving it the set of possible traits (choices), the set of restrictions on combinations (constraints), and the requirement that it choose a particular number of traits.  This is used the the SomaSim game [*City of Gangsters*](https://www.kasedogames.com/cityofgangsters).
