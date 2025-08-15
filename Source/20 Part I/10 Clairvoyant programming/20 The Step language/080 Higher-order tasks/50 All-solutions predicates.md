---
pagetitle: All-solutions predicates
status: alpha
---
If we run `[P ?x]`, it will give us a single value for `?x` that makes `P` true.  But what if we want all the values?  We could use `ForEach` to print them, but that doesn't make it easy for some other part of the program to look at them.  What we want is a way of getting all the solutions in a list.  These are known as **all-solutions predicates** in logic programming.

## `FindAll`

The most basic in both Step and Prolog is `FindAll`.  If we wanted to get a list of all the people who like burgers from our previous example, we'd use `[FindAll ?who [Likes ?who burgers] ?burgerEaters]`:
```Step
# Try: [FindAll ?who [Likes ?who burgers] ?burgerEaters]
[predicate]
Likes tanya sushi.
Likes tanya burgers.
Likes tanya mexican.
Likes jayden burgers.
Likes jayden ethiopean.
# Kimiko likes everything
Likes kimiko ?.
# Everyone likes pizza.
Likes ? pizza.
```
This says, "give me a list of all the values of `?who` from all the solutions of `[Likes ?who burgers]` and put that list in `?burgerEaters`.  It generates `?burgerEaters = [tanya jayden kimiko]`.

More generally,
```step
[FindAll ?solutionVariable ?call ?allSolutions]
```
This runs all solution paths for `?call`, and makes a list of the values of `?solutionVariable` for each one and puts it in `?allSolutions`.  It's a little fancier than that[^FindAllFeatures], but that's the basic idea.

## `FindUnique`

`FindAll` finds all solution paths to the call you give it.  So if it can generate the same solution two different ways, it will appear twice in the list.  `FindUnique` is the same as `FindAll` except that it removes duplicates.

## `Min` and `Max`

These predicates find the minimum/maximum solution to a numeric query:
```step
[Min ?score ?call]
[Max ?score ?call]
```
Runs `?call` but chooses whichever path if it yields the largest value of `?score`.  If `?call` has no solution, the call fails.  For example `[Max ?age [Age ?who ?age]]` in the code below:
```Step
# Try: [Max ?age [Age ?who ?age]]
[predicate]
Age fred 18.
Age tanya 21.
Age jayden 20.
```
will return `?who=tanya ?age=21`:

## Notes

[^FindAllFeatures]: The main extra feature is that `?solutionVariable` doesn't have to be just a variable.  It could be a tuple of variables, for example.  That gives you a way of capturing the values of multiple variables at once.  So if we say `[FindAll [?who ?what] [Likes ?who ?what] ?x]`, then `?x` will end up being a list of pairs: `[[tanya sushi] [tanya burgers] [tanya mexican] [jayden burgers] [jayden ethiopean] [kimiko ?] [? pizza]]`.  The other, mostly useless feature is that you can pass a value into `?allSolutions` rather than an unbound variable.  In that case, it will only succeed if the list it makes is the same as the list you passed in.  But there aren't a lot of use cases for that.