---
pagetitle: Generating text
---
The simplest Step program is:
```step
Hello: Hello world!
```
The portion in boldface tells us that we’re defining a little program called `Hello` and when we run it, it should print the text, “Hello world!”  If we put this in a file, load the file into Step, and then type “Hello” at Step to tell it to run `Hello`, it will respond with:

> Hello world!

## Theme and variation

We can define several different ways of saying hello:
```step
Hello: Hello world!
Hello: Hola!
Hello: Hi there!
Hello: Bon jour!
```
Each of these lines specifies a different way of saying hello.  However, if you put this in your file, Step, will still always use the first line it finds.[^1]  To make it choose randomly, we add the annotation `[randomly]` at the beginning:
```step
[randomly]
Hello: Hello world!
Hello: Hola!
Hello: Hi there!
Hello: Bon jour!
```

## Endnotes

[^1]: This might seem like a stupid design.  Why allow lines that can never run?  Why not just always randomize?  For more complicated programs, lines (methods) can "fail" and then the system needs to try the next line.  We'll talk more about this soon, but right now, we haven't seen anything that can fail.