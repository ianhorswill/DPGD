---
pagetitle: "Advanced: writing your own primitives"
status: alpha
---
If you're writing interactive fiction in Step, you probably don't need any new primitives.  But if you're using it inside of a game engine such as [Unity](https://unity.com/) or [Godot](https://godotengine.org/), you'll need some mechanism for letting Step code read and write the game state.  This is more of a [Part II](part_ii) topic, and it does vary from language to language.  However, for those who are game programmers who want some sense of what's involved, here's a simple example of how you would write a simple primitive for Step.  If you're not that person, I recommend you [skip to the next page](next).

## Accessing a component type

Suppose you game has a component type called `Enemy` and you want some way of letting Step code interact with it.  We'll start by writing a type predicate for it.  So we're writing a one-argument predicate:

* `[Enemy `*x*`]`  
True when *x* is an `Enemy` component.

When we write primitives, we generally have to worry about different input/output modes.  Since this predicate only has one parameter, we only have to worry about two modes:

* Input mode: test whether an object is an `Enemy`
* Output mode: enumerate all the `Enemy` objects

It's up to you which of these you implement.  The `Number` predicate doesn't implement output mode because there are too many numbers to enumerate.  But let's assume you do want to implement output mode.  Then we're going to write two methods (two lambda expressions), one for each mode, and we'll wrap them using one of Step's built-in classes:
```csharp
Step.Module.Global["Enemy"] = new GeneralPredicate<Enemy>("Enemy",  inMode, outMode);
```
where `inMode` and `outMode` are the implementations for the two modes.  `Step.Module.Global` is the namespace holding all the predefined Step predicates.  So this line says to add a new one named `Enemy`.

### Type testing

When your predicate runs in input mode, it's being passed an object *x* and it needs to determine if it's of type `Enemy`.  The C# code for that is just:
```csharp
x is Enemy
```
and so `inMode` above is just:
```csharp
x => x is Enemy
```

### Enumerating objects

When we call it in output mode, the primitive needs to iterate through all the existing `Enemy` objects in the game.  The API for that is to have the output implementation just return an `IEnumerable<Enemy>` and then the Step interpreter manages the rest.  In Unity, you ask for all the instances of a component type using `Unity.Object.FindObjectsOfType<Type>()`.  So our `outMode` implementation is just:
```csharp
() => Unity.Object.FindObjectsOfType<Type>()
```
And so our full implementation is:
```csharp   
Step.Module.Global["Enemy"] = new GeneralPredicate<Enemy>("Enemy",
    x => x is Enemy,
    () => Unity.Object.FindObjectsOfType<Type>());
```

## Extracting information from a component

To write accessors for a C# object, we define predicates that are true when the specified object has the specified information.  So suppose we want to access the `name` field of the enemies.  We might write a predicate:

* `[EnemyName `*enemy*`  `*name*`]`  
True when *enemy* has the name *name*.

This is basically a function from the first parameter to the second parameter, and that's a very common pattern in primitives, so there's a wrapper for it:
```csharp
Step.Module.Global["EnemyName"] = new SimpleFunction<Enemy,string>("EnemyName",  enemy => enemy.name);
```
This will work in input-output and input-input mode.  That is, it will require the enemy to be specified but not the name.  If you want to support output-input mode (given a name, return the enemy) or output-output (get all pairs of enemy/name), that's possible too but requires more work.

## Calling a C# method on an object

Finally, let's say we want to run some engine method on the component, such as Unity's `Destroy` method, which removes a `GameObject` or `Component` from the game.  Again, that's a common pattern and there's a wrapper for it:
```csharp
Step.Module.Global["Destroy"] = new SimplePredicate<Component>("Destroy", component => {
    Object.Destroy(component));
    return true;
}
```
We `return true` at the end to tell Step that the predicate succeeded.  If we want it to fail, for example, because we did something that returned an error code, we would return `false`.  To throw an exception, just use C#'s `throw` normally.

**VERY IMPORTANT**: Step is carefully designed so that if it tries an execution path that fails after printing something or updating a variable, that output or variable update are **undone** before trying another execution path.  That is not true for primitives like these; Step has no way to reach in and "undestroy" a Unity object.  There are more complicated wrappers for primitives that allow you to be informed when a failure has happened so that you can undo things, but we won't cover them here.  And in any case, it's entirely up to the author of the primitives to implement any undoing.