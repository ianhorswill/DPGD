---
pagetitle: Greetings
status: alpha
---
Here's a variant on the greeting code from [the readings](parameterized_grammars):
```Step
# Try: [GreetPerson "Alicia"]
Greeting: Hello.
GreetPerson ?who: Hello, ?who.

[randomly]
FancyGreeting informal ?who: Hi, ?who!
FancyGreeting formal ?who: Hello, ?who.
FancyGreeting informal ?who: Hey, ?who!
FancyGreeting formal ?who: Good day to you, ?who.
```
Try running each of the following:
* `[Greeting]`
* `[Greet "Ricardo"]`
* `[FancyGreeting informal "Lassie"]`
* `[FancyGreeting formal "Lassie"]`

