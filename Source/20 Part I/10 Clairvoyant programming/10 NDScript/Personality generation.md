---
pagetitle: "Exercise: Personality generation"
status: alpha
---
The game [*City of Gangsters*](https://store.steampowered.com/app/1386780/City_of_Gangsters/) supports over 1000 simultaneous non-player characters.  These characters are randomly generated at the beginning of the game.  The personalities are created by selecting a small number of traits from a large list of possible traits and weeding out bad combinations.  In AI, such a bad combination is sometimes called a "nogood".

We can write a personality generator in NDScript by making an array of possible traits and an array of nogoods, each of which is an array of traits:
```NDScript
var traits = [ 
    // Positive
    "adventurous", "empathetic", "generous", "honest", "loyal", "optimistic", "resilient", "sociable", "trustworthy", "creative",
    // Negative
    "arrogant", "impulsive", "jealous", "moody", "pessimistic", "stubborn", "selfish", "withdrawn", "indecisive", "critical"
];

var nogoods = [
     ["adventurous", "withdrawn"],
     ["adventurous", "indecisive"],
     ["empathetic", "selfish"],
     ["empathetic", "jealous"],
     ["empathetic", "critical"],
     ["empathetic", "selfish"],
     ["generous", "selfish"],
     ["loyal", "selfish"],
     ["optimistic", "pessimistic"],
     ["optimistic", "critical"],
     ["optimistic", "moody"],
     ["resilient", "pessimistic"],
     ["resilient", "withdrawn"],
     ["sociable", "withdrawn"],
     ["sociable", "withdrawn"],
     // I don't know if this is really a contradiction, but I wanted a nogood with 3 elements
     ["arrogant", "critical", "loyal"] 
 ];

function makePersonality() {
	// Fill me in!
}
print(makePersonality());
```
Fill in the definition of `makePersonality()`.  It should generate a set of 3 random personality traits but never any combination that violates the nogoods.  You may want to write additional helper function(s).

Note that my solution uses
* The `var`, `function`, `foreach`, `if`, `fail`, and `return` statements
    * Note the syntax of `foreach` is: `foreach (variable in collection) statement` where `statement` can be `{ stuff ...}`
* The built-in functions:
    * `chooseElement(collection)`  
       Randomly chooses an element of a set or array
    * `contains(element, collection)`  
       Returns true if `element` appears in `collection`, otherwise false
    * `print(value, ...)`  
       Prints its argument or arguments.
    * `setOf(element1, ... , elementn)`
       Makes a set of the specified elements.  Note that sets aren't arrays; they don't distinguish the positions of elements and they remove duplicates.  So if you generate 3 traits but only get 2 out, it's probably that you made a set with two copies of the same trait.
    * `sizeOf(set)`  
       Tells you how many elements are in a set.
    