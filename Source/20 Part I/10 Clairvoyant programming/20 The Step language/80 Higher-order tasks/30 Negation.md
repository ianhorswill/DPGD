---
pagetitle: Negation is (necessary) evil
status: alpha
---
> **Prince Charming**: You're telling me you don't know where Shrek is?
>
> **Pinocchio**: It wouldn't be inaccurate to assume that I couldn't exactly not say that it is or isn't almost partially incorrect.
>
> **Prince Charming**: So you do know where he is!
>
> **Pinocchio**: On the contrary. I'm possibly more or less not definitely rejecting the idea that in no way with any amount of uncertainty that I undeniably ---
>
> **Prince Charming**: Stop it!
>
> — *Shrek the Third*[^citation]

The concept of **negation** (being *not X* rather than being *X*) is inherently confusing.  So much so, that it's been the subject of countless Ph.D. theses in philosophy, mathematics, logic, and computer science.  There are entire, [century-long debates between different schools in logic and mathematics](wiki:intuitionism) that amount to disagreements as to whether *not not being true* is the same as *being true*.  Distressingly, both sides have persuasive arguments.

Negation (`Not` and `NotAny`) in logic programming has an equally controversial history.  The technical name for it is [negation-as-failure](wiki:Negation_as_failure) and there were 30 years of Ph.D. theses trying to address the problems with it.  

## Best practices for negation

We'll talk about why negation-as-failure is problematic shortly.  But it's quite technical and you may want to skip it on a first reading.  So first, let's talk about how to protect yourself from the problems.

### Best practice: avoid unbound variables in negations

The thing to remember is that negation is only problematic when there are **unbound variables** in the query; that is, any variables that haven't been given a value.  It's not that the program crashes, it's that unbound variables in negative queries behave differently than those in positive queries, and that leads to bugs.  So best practice is to avoid them unless you really know what you're doing.  Here's how you do that.

### Best practice: use `Not` in preference to `NotAny` when possible

`Not` is the same as `NotAny` except that it throws an exception whenever it finds an unbound variable in its argument.  So if you're writing code with negation and you don't specifically want and expect it to have an unbound variable, use `Not`.  That way, if you mess up and call it with a variable, it will stop and let you know.

### Best practice: use domain predicates to fill in variables before calling `Not`

The **domain** of a variable is its set of possible values.[^domain]  A **domain predicate** is a predicate that's true of its argument if it's in some domain (i.e. some specific set).  For example, you might have a predicate like `[Character ?x]` that is true when `?x` is a character in your game.  So:

* `[Character john]` will be true if `john` is a character, and
* `[Character ?x]` will bind `?x` to some character.

If you have some other predicate like `[Married ?x]` that's true when the character `?x` is married.

Let's write an a `[Unmarried ?x]` predicate that's true when `?x` is unmarried.  We want it to behave "normally" in the sense that if we call it with an unbound variable, it fills in the variable with someone who's unmarried.  That means we have to use `NotAny` rather than `Not` since not will error you call it with an unbound variable.  You might write this as:
```step
Unmarried ?x: [NotAny [Married ?x]]
```
This looks good.  If we call `[Unmarried john]`, then as we except it succeeds if `john` is married and fails if he isn't.  We get the same behavior when we call `[Unmarried ?x]` when `?x=john`.

But if we call `[Unmarried ?x]` when `?x` is unbound, then this succeeds only when `[Married ?x]` fails.  That only happens when **every character in your game is unmarried**.  That's not the behavior we intended; we wanted it to report back a specific value for `?x` that was an unmarried character.

The good news is that it's easy to fix.  We just change the definition to:
```step
Unmarried ?x: [Character ?x] [Not [Married ?x]]
```
Adding the `Character` call forces `?x` to be bound when you enter the `Not` call, and specifically forces it to be bound to a character.  Now, if you call `[Unmarried john]`, if first checks if `john` is a character, and assuming he is, continues on to check his marital status.  But if you say `[Unmarried ?x]` when `?x` is unbound, then it will search for an `?x` that is both a character and unmarried, as we wanted.

**Important:** this doesn't work if you reverse the order:
```step
[Not [Married ?x]] [Character ?x]
```
This brings us to our last best practice.

### Best practice: put negations at the end

Because a negation means something different when it has an unbound variable in it, and because variables tend to get bound over time (that is, as we move left to right in a method), it's generally best to put your negations as late in the rule as possible.

## Technical: why negation-as-failure is problematic

Now let's talk a bit more about why negation in these languages is problematic.  The problems can be divided roughly into *ambivalent features*, which are good sometimes and bad in others, *misfeatures* which aren't necessarily bugs but which programmers with weren't true, and *bugs* which are clearly bad.

### Ambivalent: the closed-world assumption

Negation-as-failure is the assumption that anything that isn't provable is false.  It's often useful, maybe even usually useful.  But it's only valid if the system has all relevant information.  Consider the following example of US presidents:
```Step
# Try: [President kennedy]
[predicate]
President washington.
President j_adams.
President jefferson.
President madison.
President monrow.
President j_q_adams.
President jackson.
President van_buren.
President harrison.
President tyler.
```
Here, it will reply "no" to the question "was Kennedy a President?" because its list is incomplete.  If you run `[Not [President kennedy]]` it will reply "yes."

Another way of thinking about it is that the system treats "don't know" as "is false."  It can't distinguish the two.

### Misfeature: some vs. every

Negation in languages like Step and [Prolog](wiki:prolog) changes the meaning of variables in a query.

A query like `[P ?x]`, when `?x` is unbound, means "is `P` true for **some** `?x`?".  But `[NotAny [P ?x]]` means:

* Is `[P ?x]` false?
* In other words: is it false that `P` is true for **some** `?x`?
* In other words: is it true that `P` is false for **every** `?x`?

It quietly flips **some** to **every**.  Even experienced programmers routinely forget this, and it leads to innumerable bugs.

One way to see how this can trip you up is that, normally, if a predicate is true for some particular value, for example `[President washington]`, then it's also true for a variable: `[President ?x]`.  But in the case of negation, it doesn't work that way.  We just showed that `[NotAny [President kennedy]]` was true.  So we'd think that `[NotAny [President ?x]]` would also be true, but it isn't because it's asking whether there are no presidents rather than whether there are any non-presidents.  

Worse yet, there's no real way to write a version of `Not` that works the way we'd expect it to.  The best you can do is the [domain predicate work-around](#best-practice-use-domain-predicates-to-fill-in-variables-before-calling-not) that we discussed above.

### Bug: negation gives you different answers at different times

This one is awful.  As we said above, if you use a [domain predicate](#best-practice-use-domain-predicates-to-fill-in-variables-before-calling-not) to prevent unbound variables in a negation:
```step
Unmarried ?x: [Character ?x] [Not [Married ?x]]
```
It only works if the domain predicate comes *before*.  If we put it after, it breaks:
```step
Unmarried ?x: [Not [Married ?x]] [Character ?x] 
```
This means "and" in logic programming **isn't commutative!**

This is a disaster.  It's why there were 30 years of people doing Ph.D. theses trying to clean up negation-as-failure.


## Notes

[^citation]: This example is lovingly stolen from [TVTropes](https://tvtropes.org/pmwiki/pmwiki.php/Main/ConfusingMultipleNegatives).

[^domain]: Much like a datatype in a normal programming language.
