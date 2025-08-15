---
pagetitle: Self-referential rules
status: alpha
---
So far, so good.  We can define the `Parent` relationship and then define most everything else in terms of that: grandparents and grandchildren, great-grandparents, siblings, etc. But what about ancestors?  An ancestor is your parent or grandparent or great-grandparent or great, great-grandparent, etc.  We could write:
```step
[predicate]
Ancestor ?c ?a: [Parent ?c ?a]
Ancestor ?c ?g: [Grandparent ?c ?g]
Ancestor ?c ?g: [Greatgrandparent ?c ?g]
Ancestor ?c ?g: [Greatgreatgrandparent ?c ?g]
```
And so on, forever.  But forever is a lot of typing.

What we can do instead, that doesn't involve literally typing for eternity, is to define an ancestor as either:

* Your parent, or
* An ancestor of your parent.

We can write that in Step using just two rules that do the equivalent work of an infinite number of rules:
```step
[predicate]
Ancestor ?c ?p: [Parent ?c ?p]
Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]
```
Let's look at how this runs with our little database of cartoon characters:
```Step
# Try: [Ancestor stan ?who]
[predicate]
Ancestor ?c ?p: [Parent ?c ?p]
Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]

[predicate]
Parent bart marge.
Parent bart homer.
Parent lisa homer.
Parent lisa marge.
Parent stan sharon.
Parent stan randy.
Parent randy grandpa.
Parent jimbo grandpa.
```
The choice tree for this is more involved, but it gives us the right answers, sharon, randy, and grandpa:
```mermaid
graph TB
    start("[Ancestor stan ?who]") -- "<b>Ancestor ?c ?p: [Parent ?c ?p]</b> <br> ?c = stan <br> ?p = ?who" --> p1("[Parent stan ?who]") -- "<b>Parent stan sharon.</b>" <br> ?who = sharon --> s1[Succeed]
    style s1 fill:green
    p1 -- "<b>Parent stan randy.</b>" <br> ?who = randy --> s2[Succeed]
    style s2 fill:green

    start -- "<b>Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]</b> <br> ?c = stan <br> ?a = ?who" --> p2("[Parent stan ?p]") -- "<b>Parent stan sharon.</b>" <br> ?p = sharon --> a1("[Ancestor sharon ?who]")
    a1 -- "<b>Ancestor ?c ?p: [Parent ?c ?p]</b> <br> ?c = sharon ?p = ?who" --> p3("[Parent sharon ?who]") --> f1(Fail)
    style f1 fill:red
    a1 -- "<b>Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]</b> <br> ?c = sharon ?a = ?who" --> p4("[Parent sharon ?p]") --> f2(Fail)
    style f2 fill:red

    p2 -- "<b>Parent stan randy.</b>" <br> ?p = randy --> a2("[Ancestor randy ?who]")
    a2 -- "<b>Ancestor ?c ?p: [Parent ?c ?p]</b> <br> ?c = randy ?p = ?who" --> p5("[Parent randy ?who]") -- "<b>Parent randy grandpa.</b> <br> ?who = grandpa" --> s3(Succeed)
    style s3 fill:green

    a2 -- "<b>Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]</b> <br> ?c = randy ?a = ?who" --> p6("[Parent randy ?p]") -- "<b>Parent randy grandpa.</b> <br> ?who = grandpa" --> a3("[Ancestor grandpa ?who]")

    a3 -- "<b>Ancestor ?c ?p: [Parent ?c ?p]</b> <br> ?c = grandpa ?p = ?who" --> p7("[Parent grandpa ?who]") --> f3(Fail)
    style f3 fill:red
    a3 -- "<b>Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]</b> <br> ?c = grandpa ?a = ?who" --> p8("[Parent grandpa ?p]") --> f4(Fail)
    style f4 fill:red
```
We can also visualize it and it's correct:
```mermaid
graph TD
n0("bart") --> n1("marge")
n0 --> n2("homer")
n3("lisa") --> n2
n3 --> n1
n4("stan") --> n5("sharon")
n4 --> n6("randy")
n6 --> n7("grandpa")
n8("jimbo") --> n7
n4 --> n7
```
You can check this yourself by running `[VisualizeGraph Ancestor]` in the code above.  Because of our little database, this is almost the same as the visualization of `Parent`, but it adds the arrow from `stan` to `grandpa`.  If we add Homer Simpson's parents[^marge]: 
```Step
# Try: [VisualizeGraph Ancestor]
[predicate]
Ancestor ?c ?p: [Parent ?c ?p]
Ancestor ?c ?a: [Parent ?c ?p] [Ancestor ?p ?a]

[predicate]
Parent bart marge.
Parent bart homer.
Parent lisa homer.
Parent lisa marge.
Parent homer grampa_simpson.   # new
Parent homer mona_simpson.     # new
Parent stan sharon.
Parent stan randy.
Parent randy grandpa.
Parent jimbo grandpa.
```
then we get a slightly bigger graph:
```mermaid
graph TD
n0("bart") --> n1("marge")
n0 --> n2("homer")
n3("lisa") --> n2
n3 --> n1
n2 --> n4("grampa_simpson")
n2 --> n5("mona_simpson")
n6("stan") --> n7("sharon")
n6 --> n8("randy")
n8 --> n9("grandpa")
n10("jimbo") --> n9
n0 --> n4
n0 --> n5
n3 --> n4
n3 --> n5
n6 --> n9
```
Note that while the [mermaid.js graph renderer](https://mermaid.js.org/) used here places Jimbo so as to look like he's part of the Simpson family, he isn't, and the arrows from Lisa and Bart to Homer and Marge just happen to cross over his node.  They aren't actually connected to him.


## Recursion

In mathematics, logic, and computer science, self-referential definitions like this are said to be **recursive**[^inductive], and when the `Ancestor` rule turns around and calls `Ancestor` again, that’s called **recursion**.  

### How to write a recursive predicate

Recursive predicates have a fairly standard format:

* They start with a rule that doesn’t recurse (doesn't call the predicate we're defining).  This is called a **base case**.  It notices when it can decide immediately without having to recurse. 
* Then there’s another rule called, unsurprisingly, the **recursive case**, that ends with a recursive call (a call to the predicate being defined).

Note that you can run into problems if you put the rules in the opposite order, or tag them `[randomly]`.  In this case, it would work.  But there are cases where it doesn't.  We'll talk more about this later.  

## Notes

[^inductive]: *Esoteric*: Sometimes self-referential rules are called *inductive* rather than *recursive*.  The distinction is that recursions start with the complex case and move to the base case and inductions move from the base case to the complex case.  Self-referential functions are usually described as recursive, whereas self-referential data structures are usually described as inductive.

[^marge]: Again, I'd add Marge's parents too, but I can't find any record of them.