




  Before we deal with clairvoyant algorithms, let's talk about how we analyze the performance of normal algorithms.

## Characterizing algorithm performance

So when we evaluate an algorithm, we start by looking not at its exact execution time, which varies based on a huge number of factors.[^executionfactors]  Instead, we look at how execution time **scales** as the algorithm's input becomes "bigger" or otherwise "harder".  We generally describe scaling properties using "big O" notation.  If we have a sort algorithm and it's a good one, its execution time will usually be roughly proportional to the number of elements $n$ in the array times the log of the number of elements, which we write by saying the execution time is:
$$
O(n \log n)
$$
This says that execution time grows no worse than proportionately to $n \log n$[^bigO].
If it's bad, it will be:
$$
O(n^2)
$$
That's worse because $n^2$ grows faster than $n \log n$; the ratio of the two gets larger and larger as $n$ grows:
$$
\lim_{n\rightarrow \infty} \frac{n^2}{n \log n} = \lim_{n\rightarrow \infty}\frac{n}{\log n}=\infty
$$
So the worst, slowest possible implementation of the $n \log n$ algorithm will still beat the best possible implementation of the $n^2$ algorithm if $n$ is big enough.

The other thing we usually do when assessing an algorithm is focus on its **worst-case** performance.  If you're considering a rendering algorithm that 

## Notes

[^executionfactors]: What machine?  What CPU architecture and clock rate?  How much of each kind of cache did it have?  What kind of RAM?  How much?  What compiler and optimization settings?  Did the CPU have SIMD instructions?  If so, did the compiler know how to vectorize your code into them?  Even more importantly, what was the input to the algorithm?  How big was it?

[^bigO]: We have to use $O$ notation rather than just saying "is proportional to" because execution times are almost never *exactly* proportional to anything.  So the $O(f(n))$ notation says that for large enough values of $n$, the thing being describe is never *larger* than some multiple of $f(n)$.  What multiple?  We don't specify because we don't care.  We care that it's roughly growing with the same shape as $f(n)$.  Why "for large enough values"?  Because $f(n)$ is usually some function that's zero when $n$ is zero and no algorithm runs in zero time -- it at least has to execute a return instruction.  So we ignore the question of proportionality for small values of n.  The actual formal definition of big O is that when we say $g(n) = O(f(n))$ we mean that there are constants $n_0$ and $k$ such that $g(n) \leq kf(n)$ for all $n > n_0$.