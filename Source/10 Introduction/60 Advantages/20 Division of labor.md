---
pagetitle: Empowering designers
status: early-draft
---
Building a game requires a vast range of knowledge, from C++ programming to quaternion exponentiation to color theory to writing snappy dialog.  Even starting from a modern game engine, the expertise required is still daunting.  Very few people have the expertise to do everything involved in developing a good game.  Even if they did, most games require many person-years of effort.  Very large games can require thousands of person-years.  Human lifespan is wildly insufficient to make *Grand Theft Auto V* on one’s own.

So realistically, most games, even small indie games, are built by diverse groups of specialists.  Not all are programmers, and often only one is a programmer.  If your game requires a lot of AI or procedural content generation, and that content is written in C++, then even small additions or changes to the AI or the generators require programmer involvement.

The success of [behavior trees](https://en.wikipedia.org/wiki/Behavior_tree) in combat AI was due in part to the fact that the AI programmers could build the behavior tree system itself, and then the designers could directly control it using a GUI-based editor, while the AI programmers went on to work on other things.  Declarative systems can have the same kind of value.  If the behavior of some part of the game is controlled by grammars, constraint problems, planning problems, etc., the designers can control them directly without requiring the programmers to modify C++ code.