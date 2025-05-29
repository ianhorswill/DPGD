---
pagetitle: Output
status: alpha
---
There are a number of primitive tasks that print.  You've already seen `Write` but here's the full list:

* `[Write `*x*`]`  
Prints *x*.  Any '_' characters contained in strings are changed to spaces.  Unbound variables, tuples, feature structures print in the form you would see them in code.  It is printed as a separate word, and so in the final text generation, it is separated from whatever was previously printed by a space, except in limited circumstances such as if it comes after an open quote or if what we're printing is a close quote.
* `[WriteVerbatim `*x*`]`  
Identical to `Write`, but does not change '_' characters in strings to spaces.
* `[WriteCapitalized `*x*`]`  
Identical to `Write` except the first character is converted to upper case.
* `[WriteConcatenated `*x*`  `*y*`]`  
Identical to `Write` but prints both *x* and *y* without any space between them.
* `[NewLine]`  
Starts a new line.
* `[FreshLine]`  
Starts a new line unless we're already at the start of a line.
* `[Paragraph]`  
Starts a new paragraph.

These primitives are all deterministic.  And for most purposes they operate only in **input mode**.  However, when [parsing text](parsing), they flip from being input mode and printing, to being output mode and reading from the input string.  See [parsing text](parsing).



