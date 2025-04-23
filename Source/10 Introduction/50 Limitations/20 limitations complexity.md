---
pagetitle: Complexity
---
The second problem is efficiency.  Sorting is a fast operation.  But there are specs that provably require at least certain amounts of time.  Most problems, for example, require at least enough time to read the input.  Sorting by comparing elements[^1] requires at least $$O(n \log ⁡n)$$ time because that’s how many pairwise comparisons you need in order to know which permutation of the input you were given.

There are problems that have been proven to be wildly expensive.  For example, determining the truth or falsity of statements in a particular logical theory called [Presburger arithmetic](https://en.wikipedia.org/wiki/Presburger_arithmetic) is $O(2^{2^n})$.  And many problems we care about are [NP-complete](https://en.wikipedia.org/wiki/NP-completeness), meaning we can’t prove they require exponential time, but there’s very strong evidence that they do.  More on this later.

Nearly everything in declarative programming is NP-complete or worse.  This means that so far as we know, there will always be times when declarative programming will take exponential time.  In fact, most solver algorithms come down to very cleaver versions of “try things until something works,” and there’s generally an exponential (or worse) number of things that could be tried.

The good news is that this is works better in practice than anyone would have expected 40 years ago.  For example, chipmakers use programs called SAT solvers to verify designs.  SAT is the canonical NP-complete problem.  When I was in graduate school, we would have expected the kinds of large SAT problems used by chip-makers to take longer to solve than the heat death of the universe.  But they turn out to be realistically solvable in practice.  Nonetheless, declarative systems will never be faster than a well-crafted bespoke algorithm.  We use declarative systems to save developer resources, not compute resources.

## Endnotes

[^1]: There are sort algorithms that don’t, such as [radix sort](https://en.wikipedia.org/wiki/Radix_sort), but these can't be used for all applications.