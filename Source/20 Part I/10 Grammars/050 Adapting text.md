---
pagetitle: A silly context-free-grammar
---
The Situationist International’s 1960 manifesto begins:

> The existing framework cannot subdue the new human force that is increasing day by day alongside the irresistible development of technology
> and the dissatisfaction of its possible uses in our senseless social life.

We can appropriate this text and use it to make a manifesto generator more adapted to the present day by “bracketing” parts of it so that they are generated randomly.  For example:
```Step
# Try: [Manifesto]
Manifesto:
   The existing framework cannot subdue the new human force that is increasing day by day
   alongside the irresistible development of [Technology] and the dissatisfaction of its
   possible uses in [Our] [Senseless] [Social] life.
[end]

[randomly]
Our: our
Our: your
Our: my

[randomly]
Technology: Facebook
Technology: Twitter
Technology: Zoom
Technology: email

[randomly]
Senseless: senseless
Senseless: worthless
Senseless: hopeless
Senseless: lame

[randomly]
Social: social
Social: work
Social: love
Social: school
```
This version can then generate dumb little tweets such as:
> The existing framework cannot subdue the new human force that is increasing day by day alongside the irresistible development
> of Zoom and the dissatisfaction of its possible uses in my lame social life.