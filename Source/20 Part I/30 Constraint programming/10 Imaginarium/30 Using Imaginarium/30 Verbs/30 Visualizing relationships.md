---
pagetitle: Visualizing relationships
status: alpha
---
When *Imaginarium* generates objects with relationships, it also diagrams those relationships.  Suppose we allow our cats to love and hate each other.  To do this, we just  add the three lines at the end:
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
Click this, and then press the Run button as usual.  This will make 10 cats.  But if you scroll down, you will see it also diagrams their relationships.  For example,
```mermaid
---
config:
  layout: cose
---
graph TD
   n0[Toby] -- hate --> n1[Annie]
   linkStyle 0 stroke-width:2px,fill:none,stroke:red;
   n0 -- love --> n2[Fluffy]
   linkStyle 1 stroke-width:2px,fill:none,stroke:green;
   n3[Rosie] -- hate --> n4[Ollie]
   linkStyle 2 stroke-width:2px,fill:none,stroke:red;
   n3 -- love --> n2
   linkStyle 3 stroke-width:2px,fill:none,stroke:green;
   n5[Sasha] -- hate --> n6[Charlie]
   linkStyle 4 stroke-width:2px,fill:none,stroke:red;
   n5 -- love --> n2
   linkStyle 5 stroke-width:2px,fill:none,stroke:green;
   n4 -- love --> n6
   linkStyle 6 stroke-width:2px,fill:none,stroke:green;
   n4 -- hate --> n2
   linkStyle 7 stroke-width:2px,fill:none,stroke:red;
   n1 -- love --> n5
   linkStyle 8 stroke-width:2px,fill:none,stroke:green;
   n1 -- hate --> n2
   linkStyle 9 stroke-width:2px,fill:none,stroke:red;
   n7[Misty] -- hate --> n4
   linkStyle 10 stroke-width:2px,fill:none,stroke:red;
   n7 -- love --> n1
   linkStyle 11 stroke-width:2px,fill:none,stroke:green;
   n8[Daisy] -- love --> n3
   linkStyle 12 stroke-width:2px,fill:none,stroke:green;
   n8 -- hate --> n5
   linkStyle 13 stroke-width:2px,fill:none,stroke:red;
   n6 -- hate --> n7
   linkStyle 14 stroke-width:2px,fill:none,stroke:red;
   n6 -- love --> n9[Princess]
   linkStyle 15 stroke-width:2px,fill:none,stroke:green;
   n2 -- hate --> n7
   linkStyle 16 stroke-width:2px,fill:none,stroke:red;
   n2 -- love --> n8
   linkStyle 17 stroke-width:2px,fill:none,stroke:green;
   n9 -- hate --> n0
   linkStyle 18 stroke-width:2px,fill:none,stroke:red;
   n9 -- love --> n8
   linkStyle 19 stroke-width:2px,fill:none,stroke:green;
click n0 callback "Toby is a male, short-haired, big, crazy, black tabby, age: 8"
click n1 callback "Annie is a female, long-haired, haughty, staid, grey Chartreux, age: 19"
click n2 callback "Fluffy is a female, long-haired, big, grey Chartreux, age: 3"
click n3 callback "Rosie is a female, short-haired, small, cuddly, staid, ginger Maine coon, age: 11"
click n4 callback "Ollie is a male, short-haired, cuddly, grey Chartreux, age: 1"
click n5 callback "Sasha is a female, short-haired, big, staid, white tabby, age: 12"
click n6 callback "Charlie is a male, long-haired, small, haughty, black manx, age: 5"
click n7 callback "Misty is a female, long-haired, big, staid, black Persian, age: 17"
click n8 callback "Daisy is a female, long-haired, big, haughty, staid, grey Chartreux, age: 20"
click n9 callback "Princess is a female, short-haired, crazy, black Maine coon, age: 15"
```
This lets you see all the generated cats and who loves or hates whom.  If you mouse over one of the cats, it will also show you the information about that particular cat.