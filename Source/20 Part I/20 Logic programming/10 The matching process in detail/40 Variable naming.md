---
pagetitle: Variables and names
---
In these examples, I’ve been at pains to make sure that the variables that appear in the calls have different names from the variables that appear in the methods, so as to prevent confusion.  So this is a good time to mention that:

* Variables with the name in the same method are interpreted as meaning the same variable (we knew this already).
* However, variables in different methods with the same name are treated as different variables that just happen to have the same name.  The system won’t confuse them with one another.
* If a task is called more than once, each call has its own set of variables.  So calling a task doesn’t permanently set any of its variables.

I know this is confusing.  It takes some getting used to.  But remember that this is just describing something you’d already understood at least the simple cases of.  We’ve just gone into more detail to talk about how things are working under the hood.  Knowing this will help you when we look at some fancier techniques.  But most of the time as a programmer, you don’t have to think down at this level of detail.