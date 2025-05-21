---
pagetitle: List and feature structure predicates
status: alpha
---
Step includes useful predicates for working with [lists](lists), and [feature structures](feature_structures).

## Lists

* `[Member `*element*`  `*list*`]`  
True when *element* is an element of *list*.
* `[Length `*list*`  `*length*`]`  
True when *list* has exactly *length* elements.
* `[Nth `*list*`  `*index*`  `*element*`]`  
True when the element of *list* at position *index* is *element*.  Note that programming languages traditionally number elements starting from 0.  So the first element is index 0, the second is index 1, etc.

## Feature structures

* `[HasFeature `*featureStructure*`  `*feature*`]`  
True when *featureStructure* contains a feature named *feature*.