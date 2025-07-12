---
pagetitle: "Family relationships: siblings"
status: alpha
---
## Reasoning about family relationships

Let’s return to our definition of siblinghood, and add a few family members to reason about:
```Step
# Try: [Siblings bart ?who]
[predicate]
Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent]

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
If we use the call `[Siblings bart ?who]` to ask who Bart's siblings are, we get the following choice tree.  Again, I'll only include the methods that match, so as to keep the diagram manageable:
```mermaid
graph TB
    start("[Siblings bart ?who]") -- "<b>Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent]</b> <br> ?a = bart <br> ?b = ?who" --> p1("[Parent bart ?parent]")
    p1 -- "<b>Parent bart marge.</b> <br> ?parent = marge" --> p2marge("[Parent ?b marge]")
    p2marge -- "<b>Parent bart marge.</b> <br> ?b = bart" --> s1[Succeed]
    style s1 fill:green
    p2marge -- "<b>Parent lisa marge.</b> <br> ?b = lisa" --> s2[Succeed]
    style s2 fill:green

    p1 -- "<b>Parent bart homer.</b> <br> ?parent = homer" --> p2homer("[Parent ?b homer]")
    p2homer -- "<b>Parent bart homer.</b> <br> ?b = bart" --> s3[Succeed]
    style s3 fill:green
    p2homer -- "<b>Parent lisa homer.</b> <br> ?b = lisa" --> s4[Succeed]
    style s4 fill:green
```
There are a couple of things worth noticing here.  First, under this definition, **people are their own siblings**.  Moreover, since we didn't mark anything `[randomly]`, it always chooses the leftmost solution, which is that Bart is his own sibling.  If we don't want that, we can fix it by modifying the definition:
```Step
# Try: [Siblings bart ?who]
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
`Different` is a [built-in predicate](primitive_tasks): it's not defined in terms of methods; rather, is a part of Step itself.  It succeeds if its two parameters are different, and fails if they're the same.  This gives us a slightly more elaborate choice tree, but one that filters out the result that Bart is his own sibling:
```mermaid
graph TB
    start("[Siblings bart ?who]") -- "<b>Siblings ?a ?b: [Parent ?a ?parent] [Parent ?b ?parent]</b> <br> ?a = bart <br> ?b = ?who" --> p1("[Parent bart ?parent]")
    p1 -- "<b>Parent bart marge.</b> <br> ?parent = marge" --> p2marge("[Parent ?b marge]")
    p2marge -- "<b>Parent bart marge.</b> <br> ?b = bart" --> d1("[Different bart bart]") --> f1[Fail]
    style f1 fill:red
    p2marge -- "<b>Parent lisa marge.</b> <br> ?b = lisa" --> d2("[Different bart lisa]") --> s2[Succeed]
    style s2 fill:green

    p1 -- "<b>Parent bart homer.</b> <br> ?parent = homer" --> p2homer("[Parent ?b homer]")
    p2homer -- "<b>Parent bart homer.</b> <br> ?b = bart" --> d3("[Different bart bart]") --> f3[Fail]
    style f3 fill:red
    p2homer -- "<b>Parent lisa homer.</b> <br> ?b = lisa" --> d4("[Different bart lisa]") --> s4[Succeed]
    style s4 fill:green
```

The other thing to notice here is that there are actually two different choice paths that give the same answer (Lisa).  That's fairly common in logic programming and generally not something to worry about.
