---
pagetitle: What and How
status: early-draft
---
Programming is an act of communication.  Most obviously, a program teaches a machine to perform a task.  But software design is a social endeavor: people work together to make software that solves a needed task.  Programs are written not only to communicate with the computer but with other developers.  Were that not the case, we would have no need for comments or meaningful variable names.

And yet, software is a decidedly peculiar form of communication.  Consider the following, deliberately uncommented, program:
```c#
void Q(int[] A, int lo, int hi) { 
  if (lo >= hi || lo < 0) 
    return;    
  var p = P(A, lo, hi);       
  Q(A, lo, p - 1);
  Q(A, p + 1, hi);
}

int P(int[] A, int lo, int hi) { 
  var p = A[hi];
  var i = lo;
  for (var j = lo; j < hi – 1; j++) 
     if (A[j] <= p) 
       (A[i], A[j]) = (A[j], A[i]);
  (A[i], A[hi]) = (A[hi], A[i]);
  return i;
}
```
If you’ve recently taken the right course or otherwise had to implement it, you might recognize this as Tony Hoare’s Quicksort algorithm.  It sorts the contents of the array `A`, in place, into ascending order.  If you didn’t recognize it, don’t feel bad. The computer doesn’t know it’s a sort algorithm either.  The program does sorting, but it never mentions sorting.  

Programmers often start with some kind of **specification** (spec) for a function before writing it, even if it’s informal.  For example, a spec for sorting might be:

> *Rearrange the data in array A, such that A[i]≤A[i+1] for all i.*

The spec isn’t part of the program because the computer can’t understand specs.  Any mention of sorting in a sort routine is relegated to comments or identifier names.

By the way, I lied.  This isn’t really Quicksort: the `if` inside `P` should increment the variable `i` after swapping the two array elements.  But you’re even less likely to have realized it was broken than that it was Quicksort.  Programming is hard precisely because the relation between the spec (sorting) and the code (iterating, recursing, comparing, and swapping elements) is so tenuous.

Moreover, the relationship between spec and code is **unstable**: small changes in the spec can require wildly different code.  Modifying our code to sort into descending order is a one-character change (`<` to `>`).  But changing it to be stable (identical elements are kept in their original order) requires an entirely different sort algorithm. [^1]

This has real-world implications.  It means that recognizing bugs is hard.  It also means that communication between programmers is hard.  When you read my code, or I read my own code 2 months after writing it, it can be hard to know why it works or even what it was trying to do to begin with.  Programming is at least as much a social-psychological discipline as it is a mathematical one.  Most programming language design aims make programs easier for humans to understand, not to make the programs faster.

## Notes

[^1]: Not strictly true but making Quicksort stable does indeed require major changes.
