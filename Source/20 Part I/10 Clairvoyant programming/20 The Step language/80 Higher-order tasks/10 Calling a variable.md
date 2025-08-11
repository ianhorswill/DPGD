---
pagetitle: Running code in a variable
status: alpha
---
The simplest possible higher-order procedures are `Succeeds` and `Fails`:

* `[Succeeds ?x]` runs the code in `?x` and succeeds if it succeeds, fails if it fails.  Afterward, any bindings or state changes caused by that code will still be in effect.  So running `[Succeeds [Task abc]]`  behaves as if you had just run `[Task abc]`directly.
* `[Fails ?x]` also runs the code in `?x`; but if that code succeeds, then `Fails` undoes any changes it made and fails.  If `?x`fails, then `Fails` itself succeeds.  So calling `Fails` will never bind any variables.

These primitives usually go by different names, which we'll get to shortly, but these names work too.  If you write a task that stores code in a variable, be it a parameter or some other variable, you can use `Succeeds` and `Fails` to run it.

## Example: automated testing

It's common in software development to do automate the testing of a program.  That usually consists of writing a series of **test cases**: a bit of code to run, along with its expected behavior.  A **testing rig** runs all the bits of code and compares their actual behavior to their intended behavior.  If something doesn't behave as expected, the testing rig reports it.

We can easily write a test system in Step.  To start with, we write the test cases as methods for two predicates; let's call them `Test` and  `TestFailure`:

* `Test ?code.` means `?code` should always succeed when we test it.
* `TestFailure ?code.` means `?code` should never succeed when we test it.

So, for example, our [`Append` predicate](matching_tuples):
```step
# [Append ?before ?after ?combined] is true when ?combined is a list consisting
# of the elements of ?before, followed by those of ?after
[predicate]
Append [] ?list ?list.
Append [?first | ?rest]  ?list  [?first | ?restAndList]: [Append ?rest ?list ?restAndList]
```
We might have test cases like:
```step
Test [Append [] [] []].  # appending the empty list to the empty list gives you the empty list
Test [Append [] [a b c] [a b c]].
Test [Append [a b c] [] [a b c]].
Test [Append [a b] [c d] [a b c d]].
TestFailure [Append [a b] [c d] [x y z]].
```
Now we can write a test rig using `Succeeds` and `Fails`:
```step
Problem: [Test ?shouldSucceed] [Fails ?shouldSucceed] ?shouldSucceed failed!
Problem: [TestFailure ?shouldFail] [Succeeds ?shouldFail] ?shouldFail succeeed, but should not have!
Problem: No problems found.
```
The first line says there's a problem if `[Test ?shouldSucceed]` is one of the test cases, but `?shouldSucceed` fails when you call it.  The second says there's a problem if `[TestFailure ?shouldFail]`is a test case, but `?shouldFail` succeeds.  The list line only runs if the first two lines don't detect any problems, so it prints that there are no problems.

This isn't a great test rig.  For example, it stops after finding one problem rather than testing all the test cases.  But it's a good example of higher-order programming.

You can try it here.  It's a little boring since it just says there aren't any problems.  But if you delete one of the lines of Append and rerun it, you'll see that it will detect a problem:
```Step
# Try: [Problem]

# [Append ?before ?after ?combined] is true when ?combined is a list consisting
# of the elements of ?before, followed by those of ?after
[predicate]
Append [] ?list ?list.
Append [?first | ?rest]  ?list  [?first | ?restAndList]: [Append ?rest ?list ?restAndList]

# Test cases
Test [Append [] [] []].  # appending the empty list to the empty list gives you the empty list
Test [Append [] [a b c] [a b c]].
Test [Append [a b c] [] [a b c]].
Test [Append [a b] [c d] [a b c d]].
TestFailure [Append [a b] [c d] [x y z]].

# Simple test rig
Problem: [Test ?shouldSucceed] [Fails ?shouldSucceed] ?shouldSucceed failed!
Problem: [TestFailure ?shouldFail] [Succeeds ?shouldFail] ?shouldFail succeeed, but should not have!
Problem: No problems found.
```

## Using `Succeeds` and `Fails` to answer questions

Recall our [previous example](answering_questions):
```step
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
As we said, calls to a predicate such as `Likes` can be thought of as asking questions and the execution of the predicate answers them:

|Call                  | Meaning                                 | Result                             |
|----------------------|-----------------------------------------|------------------------------------|
|`[Likes tanya sushi]` | Does Tanya like sushi?                  | Yes (call succeeds)                |
|`[Likes jayden sushi]`| Does Jayden like sushi?                 | No (call fails)                    |
|`[Likes tanya ?]`     | Is there **something** Tanya likes?                   | `?=sushi` (call succeeds)            |
|`[Likes ? sushi]`     | Is there **someone** who likes sushi?                        | `?=tanya` (call succeeds)            |
|`[Likes ?a ?b]`       | Is there **someone** who likes **something**?   | `?a=tanya`,`?b=sushi` (call succeeds)  |

In each case, it tells us "yes" or "no" (by succeeding or failing) and if yes, it gives values for the variables that make it true.

This is about to become important: queries with variables are treated as **existence** (is there) queries: they're asking if there is a value for the variable that makes it true.

### `Succeeds` is simple

If we wrap the calls to `Likes` in calls to `Succeeds`, we don't change the behavior of anything.  In each case, the call succeeds if some method of `Likes` matches the parameters of the `Likes` call:

|Call                  | Meaning                                 | Result                             |
|----------------------|-----------------------------------------|------------------------------------|
|`[Succeeds [Likes tanya sushi]]` | Does Tanya like sushi?                  | Yes (call succeeds)                |
|`[Succeeds [Likes jayden sushi]]`| Does Jayden like sushi?                 | No (call fails)                    |
|`[Succeeds [Likes tanya ?]]`     | Is there **something** Tanya likes?    | `?=sushi` (call succeeds)            |
|`[Succeeds [Likes ? sushi]]`     | Is there **someone** who likes sushi?                         | `?=tanya` (call succeeds)            |
|`[Succeeds [Likes ?a ?b]]`       | Is there **someone** who likes sushi?    | `?a=tanya`,`?b=sushi` (call succeeds)  |

Saying `[Succeeds [Likes tanya sushi]]` just calls `[Likes tanya sushi]`.  As we said, all it does is call its parameter.  So it's common name is `Call`.  You can use either name in your code: `Call` or `Succeeds`, whichever seems to better communicate your intent.

Once again, queries with variables are treated as **existence** (is there) queries: they're asking if there is a value for the variable that makes it true.

### `Fails` is complicated

`Fails` is different.  Wrapping the `Likes` calls in calls to `Fails` does change the behavior of things:

|Call                  | Meaning                                 | Result                             |
|----------------------|-----------------------------------------|------------------------------------|
|`[Fails [Likes tanya sushi]]` | Does Tanya **not** like sushi?                  | No (call fails)                |
|`[Fails [Likes jayden sushi]]`| Does Jayden **not** like sushi?                 | Yes (call succeeds)                    |
|`[Fails [Likes tanya ?]]`     | Is there **nothing** Tanya likes?                   | No (call fails because Tanya likes something)            |
|`[Fails [Likes ? sushi]]`     | Is there **no one** who likes sushi?                        | No (call fails because someone likes sushi)            |
|`[Fails [Likes ?a ?b]]`       | Is there  **no one** who likes **anything**?   | No (call fails because someone likes something)  |

Here, the query succeeds if the original version failed, and vice-versa.  So you might think the common name for `Fails` would be `Not`, but it isn't.  Why is that?

Well, again, remember that
```step
[Likes ? sushi]
```
succeeds if there is some value for `?` that makes it true.  So it functions as an existence query: it's asking if there is a `?` that likes sushi.  The failure of that means there **isn't** a `?` that likes sushi.  So
```step
[Fails [Likes ? sushi]]
```
is a **nonexistence** query: is there nobody who likes sushi?

`[Likes ? sushi]` is true if **someone** likes sushi.  `[Fails [Likes ? sushi]]` is true if **no one** likes sushi, not if there's someone who doesn't like sushi.

For that reason, the common name of `Fails` is `NotAny` rather than `Not`.  Since
```step
[Likes ? sushi]
```
means "find me someone who likes sushi."  You'd expect:
```step
[Not [Likes ? sushi]]
```
to mean "find me someone who doesn't like sushi".   But:
```step
[Fails [Likes ? sushi]]
```
doesn't do that; it tells you whether nobody likes sushi.  The name `NotAny` conveys that better:
```step
[NotAny [Likes ? sushi]]
```
So the common name of `Fails` is `NotAny`.