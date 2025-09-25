---
pagetitle: "Exercise: building a cat generator"
status: alpha
---
Suppose we want to write a system to generate random cats.  A cat has:
* A **breed**: for example, tabby, Siamese, Persian, or Maine coon
* A type of **coat**: long- or short-hair
* A coat **color**: ginger, black, white, or grey
* A coat **pattern**: solid, striped, or tortoiseshell
Feel free to add other breeds, colors, etc., or other attributes, but we've writing them up as arrays below:
```NDScript
var breeds = ["tabby", "Siamese", "Persian",  "Maine coon"];
var coats = ["long-haired", "short-haired"];
var colors = ["ginger", "black", "white", "grey"];
var patterns = ["solid", "striped", "tortoiseshell"];
```
## Problem 1

Click on the code above and add `chooseElement` and `printLine` statements to generate an example cat and print its attributes.

## Problem 2

Now modify your solution so it never generates cats that violate the constraints:
* Tabbies are always striped
* Persians always have long hair
* Siamese are always short-haired, solid grey colors

## Problem 3

Let's say a cat is magical if it is at least one of:

* Long-haired
* Grey 
* Striped

Modify it so that it only generates magical cats; that is, only generates cats that are at least one of the above.

## Problem 4

Add a personality attribute from the set:
```ndscript
var personalities = ["friendly", "fearful", "haughty", "easy-going"];
```
And the constraint that Persians are always haughty.