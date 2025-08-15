---
pagetitle: "Piblings: aunts and uncles"
status: alpha
---
A [pibling](https://en.wikipedia.org/wiki/Family#Roles) is a parent's sibling, i.e. an aunt or uncle.  We can define piblings easily in terms of parents and siblings:
```Step
# Try: [Pibling stan ?who]
[predicate]
Pibling ?c ?a: [Parent ?c ?p] [Siblings ?p ?a]

[predicate]
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent] [Different ?a ?b]

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
Which says that the pibling of a child is the sibling of the child's parent.  If we run `[Pibling stan ?who]` we get this choice tree:

```mermaid
graph TB
    start("[Pibling stan ?who]") -- "<b>Pibling ?c ?a: [Parent ?c ?p] [Siblings ?p ?a]</b> <br> ?c = stan <br> ?a = ?who" --> p1("[Parent stan ?p]")
    p1 -- "<b>Parent stan sharon.</b> <br> ?p = sharon" --> sibSharon("[Siblings sharon ?who]")
    sibSharon -- "<b>Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent] [Different ?a ?b]</b> <br> ?a = sharon <br> ?b = ?who " --> p2("[Parent sharon ?parent]") --> f(Fail)
    style f fill:red

    p1 -- "<b>Parent stan randy.</b> <br> ?p = randy" --> sibRandy("[Siblings randy ?who]")
    sibRandy -- "<b>Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent] [Different ?a ?b]</b> <br> ?a = randy <br> ?b = ?who " --> p3("[Parent randy ?parent]") -- "<b>Parent randy grandpa.</b>" --> p4("[Parent ?who grandpa]") -- "<b>Parent randy grandpa.</b> <br> ?who = randy" --> d1("[Different randy randy]") --> f2[Fail]
    style f2 fill:red

    p4 -- "<b>Parent jimbo grandpa.</b> <br> ?who = jimbo" --> d2("[Different randy jimbo]") --> s[Succeed]
    style s fill:green
```
Again, the left subtree fails because the *South Park* doesn't tell us anything about Sharon's siblings.[^1]

## Notes

[^1]: For those who aren't familiar, these examples are taken from the TV shows [*The Simpsons*](https://en.wikipedia.org/wiki/The_Simpsons) and [*South Park*](https://en.wikipedia.org/wiki/South_Park).  Sharon is a character from *South Park* and so far as I know, her parents haven't appeared in any episodes.  Or at least, Wikipedia doesn't list any names for them.