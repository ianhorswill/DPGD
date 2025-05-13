---
pagetitle: Gossip generator
status: alpha
---
Here's a dumb little grammar that generates bits of gossip about imaginary people:
```Step
# Try: [Gossip]
Gossip: [Person] [JuicyVerb] [Person]

[randomly]
JuicyVerb: is dating
JuicyVerb: was trash-talking
JuicyVerb: got in a fight with

[randomly]
MetaGossip: [Gossip]
[2] MetaGossip: [Person] said [MetaGossip]

# Lots of random names for people
[randomly]
Person: Alexandra
Person: Alexis
Person: Alyssa
Person: Angel
Person: Aniyah
Person: Brianna
Person: Chloe
Person: Destiny
Person: Diamond
Person: Gabrielle
Person: Hailey
Person: Hannah
Person: Imani
Person: Isis
Person: Jada
Person: Jasmine
Person: Jayla
Person: Jordan
Person: Kayla
Person: Kennedy
Person: Kiara
Person: Laila
Person: Madison
Person: Makayla
Person: Nevaeh
Person: Sydney
Person: Taylor
Person: Tiana
Person: Trinity
Person: Anthony
Person: Brandon
Person: Caleb
Person: Cameron
Person: Christian
Person: Christopher
Person: Daniel
Person: David
Person: Elijah
Person: Ethan
Person: Gabriel
Person: Isaiah
Person: James
Person: Jayden
Person: Jaylen
Person: Jeremiah
Person: Jordan
Person: Joseph
Person: Joshua
Person: Josiah
Person: Justin
Person: Kevin
Person: Malik
Person: Matthew
Person: Michael
Person: Nathan
Person: Tyler
Person: William
Person: Xavier
Person: Zion
```